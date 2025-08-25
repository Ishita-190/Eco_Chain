# main.py
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch
import torchvision.transforms as transforms
from PIL import Image
import requests
import io
import logging
from typing import List, Optional
import json

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="EcoCommerce AI Classifier", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class ClassificationRequest(BaseModel):
    cid: Optional[str] = None
    image_url: Optional[str] = None

class ClassificationResponse(BaseModel):
    label: str
    confidence: float
    secondary: List[str]
    explanation_md: str
    tips_md: str

# Waste type mappings and explanations
WASTE_CATEGORIES = {
    "plastic": {
        "explanation": """
## Plastic Waste Detected

This appears to be **plastic waste**. Plastic is one of the most common recyclable materials, 
but proper sorting is crucial for effective recycling.

### Common Types:
- **PET bottles** (water, soda bottles)
- **HDPE containers** (milk jugs, detergent bottles)
- **Plastic bags and films**
- **Food containers and packaging**

### Environmental Impact:
Plastic can take **hundreds of years** to decompose naturally. Proper recycling helps:
- Reduce ocean pollution
- Conserve petroleum resources
- Decrease landfill waste
        """,
        "tips": """
## Safety & Disposal Tips

### Before Disposal:
- ✅ **Rinse containers** to remove food residue
- ✅ **Remove labels** when possible
- ✅ **Check recycling codes** (look for numbers 1-7)
- ❌ **Don't mix different plastic types**

### Safety Precautions:
- Wear gloves when handling sharp plastic edges
- Ensure containers are empty and clean
- Remove caps and lids (different plastic types)

### Special Notes:
- Plastic bags should go to special collection points
- Styrofoam requires special handling
- Some facilities don't accept all plastic types
        """
    },
    "metal": {
        "explanation": """
## Metal Waste Detected

This appears to be **metal waste**. Metals are highly recyclable and valuable materials 
that can be recycled indefinitely without losing quality.

### Common Types:
- **Aluminum cans** (beverages)
- **Steel cans** (food containers)
- **Copper wire and pipes**
- **Brass and bronze items**

### Environmental Impact:
Metal recycling is extremely beneficial:
- **95% less energy** than producing from raw materials
- Reduces mining and ore extraction
- Prevents toxic metal contamination
        """,
        "tips": """
## Safety & Disposal Tips

### Before Disposal:
- ✅ **Clean containers** thoroughly
- ✅ **Remove labels and adhesive**
- ✅ **Separate different metal types**
- ✅ **Check for magnetic properties** (steel vs aluminum)

### Safety Precautions:
- ⚠️ **Sharp edges** - handle carefully
- ⚠️ **Heavy items** - use proper lifting techniques
- ⚠️ **Chemical residue** - ensure complete cleaning

### Special Notes:
- Aluminum has higher value than steel
- Some facilities pay for scrap metal
- Remove any non-metal components
        """
    },
    "paper": {
        "explanation": """
## Paper Waste Detected

This appears to be **paper waste**. Paper is one of the most successfully recycled materials,
but contamination can make entire batches unusable.

### Common Types:
- **Cardboard boxes**
- **Newspapers and magazines**
- **Office paper**
- **Paperboard packaging**

### Environmental Impact:
Paper recycling provides significant benefits:
- Saves trees and forest ecosystems
- Reduces water and energy consumption
- Decreases methane emissions from landfills
        """,
        "tips": """
## Safety & Disposal Tips

### Before Disposal:
- ✅ **Remove all tape and staples**
- ✅ **Flatten cardboard boxes**
- ✅ **Keep paper dry and clean**
- ❌ **No food-contaminated paper**

### Safety Precautions:
- Check for mold on wet paper
- Remove any plastic coatings
- Separate shredded paper (special handling)

### Special Notes:
- Pizza boxes: only recycle if grease-free
- Waxed paper and cups are not recyclable
- Newspapers can be composted if clean
        """
    },
    "glass": {
        "explanation": """
## Glass Waste Detected

This appears to be **glass waste**. Glass is 100% recyclable and can be recycled 
endlessly without loss of quality or purity.

### Common Types:
- **Food and beverage bottles**
- **Jars and containers**
- **Window glass** (special handling)
- **Decorative glassware**

### Environmental Impact:
Glass recycling offers excellent benefits:
- Melts at lower temperatures than raw materials
- Reduces mining of sand, limestone, and soda ash
- Every ton of recycled glass saves 1,300 pounds of sand
        """,
        "tips": """
## Safety & Disposal Tips

### Before Disposal:
- ✅ **Remove all caps and lids**
- ✅ **Rinse containers clean**
- ✅ **Sort by color** (clear, brown, green)
- ✅ **Remove metal rings and labels**

### Safety Precautions:
- ⚠️ **Sharp fragments** - handle with extreme care
- ⚠️ **Use protective gear** - gloves and closed shoes
- ⚠️ **Broken glass** - wrap in newspaper before disposal

### Special Notes:
- Different colored glass cannot be mixed
- Mirrors and window glass need special processing
- Light bulbs and ceramics contaminate glass recycling
        """
    },
    "organic": {
        "explanation": """
## Organic Waste Detected

This appears to be **organic/compostable waste**. Organic materials can be composted
to create valuable soil amendments and reduce methane emissions.

### Common Types:
- **Food scraps and peels**
- **Yard trimmings**
- **Paper products** (uncoated)
- **Natural fiber materials**

### Environmental Impact:
Proper organic waste management:
- Reduces methane emissions from landfills
- Creates valuable compost for soil health
- Completes natural nutrient cycles
        """,
        "tips": """
## Safety & Disposal Tips

### Before Disposal:
- ✅ **Separate from non-organic materials**
- ✅ **Remove stickers from produce**
- ✅ **Chop large pieces** for faster composting
- ❌ **No meat, dairy, or oils** in home compost

### Safety Precautions:
- Monitor for pests and odors
- Maintain proper moisture levels
- Turn compost regularly for aeration

### Special Notes:
- Some facilities accept meat and dairy
- Compostable packaging needs industrial facilities
- Home composting works for most fruit/vegetable waste
        """
    },
    "mixed": {
        "explanation": """
## Mixed or Complex Waste Detected

This appears to be **mixed waste** or contains multiple materials that require separation.
Mixed waste often needs manual sorting before proper recycling.

### Common Issues:
- **Multiple material types** combined
- **Contaminated recyclables**
- **Complex packaging** with various components
- **Unclear material composition**

### Environmental Impact:
Proper sorting is crucial because:
- Contamination ruins entire recycling batches
- Mixed waste often ends up in landfills
- Manual sorting increases processing costs
        """,
        "tips": """
## Safety & Disposal Tips

### Before Disposal:
- ✅ **Separate different materials** when possible
- ✅ **Research local facility requirements**
- ✅ **Clean all components** thoroughly
- ✅ **Check for recycling symbols and codes**

### Safety Precautions:
- Wear protective equipment when sorting
- Be cautious of sharp edges or toxic materials
- Wash hands thoroughly after handling

### Special Notes:
- Contact your local facility for guidance
- Some mixed items may need special programs
- When in doubt, choose the safest disposal method
        """
    }
}

class WasteClassifier:
    def __init__(self):
        """Initialize the classifier with a simple rule-based system"""
        logger.info("Initializing waste classifier...")
        # In a real implementation, load a trained model here
        # For demo purposes, we'll use keyword detection
        
        self.keywords = {
            "plastic": ["bottle", "container", "bag", "plastic", "pet", "hdpe"],
            "metal": ["can", "aluminum", "steel", "metal", "tin", "copper"],
            "paper": ["cardboard", "box", "paper", "newspaper", "magazine"],
            "glass": ["bottle", "jar", "glass", "wine", "beer"],
            "organic": ["food", "fruit", "vegetable", "organic", "compost"]
        }
        
    def predict(self, image: Image.Image) -> dict:
        """
        Predict waste type from image
        In production, this would use a trained CNN model
        """
        try:
            # Convert to RGB if needed
            if image.mode != 'RGB':
                image = image.convert('RGB')
            
            # For demo: simulate prediction based on image properties
            # In reality, this would use a trained model
            width, height = image.size
            
            # Simple heuristic based on image properties
            # This is just for demonstration
            if width > height * 1.5:  # Wide images might be bottles
                return {
                    "label": "plastic",
                    "confidence": 0.85,
                    "secondary": ["glass"]
                }
            elif width * 1.5 < height:  # Tall images might be cans
                return {
                    "label": "metal",
                    "confidence": 0.78,
                    "secondary": ["plastic"]
                }
            else:  # Square-ish images
                return {
                    "label": "paper",
                    "confidence": 0.72,
                    "secondary": ["organic", "mixed"]
                }
                
        except Exception as e:
            logger.error(f"Prediction error: {e}")
            return {
                "label": "mixed",
                "confidence": 0.5,
                "secondary": []
            }

# Initialize classifier
classifier = WasteClassifier()

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "EcoCommerce AI Classifier"}

@app.post("/classify", response_model=ClassificationResponse)
async def classify_waste(request: ClassificationRequest = None, file: UploadFile = File(None)):
    """
    Classify waste from image CID or direct upload
    """
    try:
        image = None
        
        # Handle direct file upload
        if file:
            if not file.content_type.startswith('image/'):
                raise HTTPException(status_code=400, detail="File must be an image")
            
            contents = await file.read()
            image = Image.open(io.BytesIO(contents))
            
        # Handle IPFS CID
        elif request and request.cid:
            ipfs_url = f"https://ipfs.io/ipfs/{request.cid}"
            response = requests.get(ipfs_url, timeout=30)
            response.raise_for_status()
            
            image = Image.open(io.BytesIO(response.content))
            
        # Handle direct image URL
        elif request and request.image_url:
            response = requests.get(request.image_url, timeout=30)
            response.raise_for_status()
            
            image = Image.open(io.BytesIO(response.content))
            
        else:
            raise HTTPException(status_code=400, detail="No image provided")
        
        # Validate image
        if image.size[0] < 50 or image.size[1] < 50:
            raise HTTPException(status_code=400, detail="Image too small (minimum 50x50)")
        
        # Get prediction
        prediction = classifier.predict(image)
        
        # Get waste category info
        category_info = WASTE_CATEGORIES.get(prediction["label"], WASTE_CATEGORIES["mixed"])
        
        # Handle low confidence predictions
        if prediction["confidence"] < 0.6:
            prediction["label"] = "mixed"
            category_info = WASTE_CATEGORIES["mixed"]
        
        return ClassificationResponse(
            label=prediction["label"],
            confidence=prediction["confidence"],
            secondary=prediction["secondary"],
            explanation_md=category_info["explanation"],
            tips_md=category_info["tips"]
        )
        
    except requests.RequestException as e:
        logger.error(f"Failed to fetch image: {e}")
        raise HTTPException(status_code=400, detail="Failed to fetch image from URL/IPFS")
    except Exception as e:
        logger.error(f"Classification error: {e}")
        raise HTTPException(status_code=500, detail="Classification failed")

@app.get("/categories")
async def get_waste_categories():
    """Get available waste categories and their info"""
    return {
        category: {
            "explanation_preview": info["explanation"].split("\n")[2][:100] + "...",
            "tips_preview": info["tips"].split("\n")[2][:100] + "..."
        }
        for category, info in WASTE_CATEGORIES.items()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

# Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

# Deploy to Fly.io (example)
if command -v flyctl &> /dev/null; then
    echo "Deploying to Fly.io..."
    flyctl deploy
else
    echo "flyctl not found. Please deploy manually or install flyctl"
fi

echo "Deployment complete!"
