# scripts/deploy.sh
#!/bin/bash
set -e

NETWORK=${1:-sepolia}
echo "🚀 Deploying to $NETWORK network..."

# Deploy smart contracts
echo "📄 Deploying smart contracts..."
cd contracts
npx hardhat run scripts/deploy.ts --network $NETWORK
cd ..

# Update environment with contract addresses
echo "📝 Updating environment with contract addresses..."
# This would typically read from deployment artifacts and update Vercel env vars

# Deploy AI service
echo "🤖 Deploying AI service to Fly.io..."
cd ai-service
flyctl deploy
cd ..

# Deploy frontend to Vercel
echo "🌐 Deploying frontend to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
