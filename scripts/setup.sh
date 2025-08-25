# scripts/setup.sh
#!/bin/bash
set -e

echo "🚀 Setting up EcoCommerce platform..."

# Check dependencies
command -v node >/dev/null 2>&1 || { echo "Node.js is required but not installed. Aborting." >&2; exit 1; }
command -v python3 >/dev/null 2>&1 || { echo "Python 3 is required but not installed. Aborting." >&2; exit 1; }
command -v docker >/dev/null 2>&1 || { echo "Docker is required but not installed. Aborting." >&2; exit 1; }

# Copy environment file
if [ ! -f .env ]; then
    cp .env.example .env
    echo "📝 Created .env file. Please update with your configuration."
fi

# Install dependencies
echo "📦 Installing Node.js dependencies..."
npm install

echo "📦 Installing Python dependencies..."
pip install -r ai-service/requirements.txt

# Setup database
echo "🗃️ Setting up database..."
npx prisma generate
npx prisma db push

# Seed database
echo "🌱 Seeding database..."
npx tsx prisma/seed.ts

# Build AI service
echo "🤖 Building AI service..."
cd ai-service && docker build -t ecocommerce-ai . && cd ..

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env with your actual configuration"
echo "2. Deploy smart contracts: npm run deploy:contracts"
echo "3. Start development: docker-compose up"
echo "4. Visit http://localhost:3000"
