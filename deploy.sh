# deploy.sh
#!/bin/bash
set -e

echo "Building and deploying AI Classification Service..."

# Build Docker image
docker build -t ecocommerce-ai:latest .

# Tag for deployment (adjust for your registry)
docker tag ecocommerce-ai:latest registry.fly.io/ecocommerce-ai:latest
