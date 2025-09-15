# Waste Classification Training Dataset

## Dataset Structure
```
training-dataset/
├── plastic/          # 200+ images
├── metal/           # 200+ images  
├── paper/           # 200+ images
├── glass/           # 200+ images
├── organic/         # 200+ images
└── validation/      # 20% of each category
```

## Image Collection Guidelines

### Plastic (Target: 200+ images)
- **Bottles**: Water bottles, soda bottles, shampoo bottles
- **Containers**: Food containers, yogurt cups, takeout boxes
- **Bags**: Shopping bags, garbage bags, zip-lock bags

### Metal (Target: 200+ images)
- **Cans**: Soda cans, beer cans, food cans
- **Foil**: Aluminum foil, food wrapping
- **Utensils**: Forks, knives, spoons

### Paper (Target: 200+ images)
- **Documents**: Newspapers, magazines, books, receipts
- **Cardboard**: Boxes, packaging, tubes
- **Tissues**: Paper towels, napkins, toilet paper

### Glass (Target: 200+ images)
- **Bottles**: Wine bottles, beer bottles, juice bottles
- **Jars**: Food jars, mason jars, cosmetic jars

### Organic (Target: 200+ images)
- **Fruits**: Apple cores, banana peels, orange peels
- **Vegetables**: Potato peels, carrot tops, lettuce
- **Food**: Bread, meat scraps, cooked food

## Training Process
1. Collect 1000+ total images (200 per category)
2. Use Teachable Machine (teachablemachine.withgoogle.com)
3. Export model for integration
4. Expected accuracy: 75-85%