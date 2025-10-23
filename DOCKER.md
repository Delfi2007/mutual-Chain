# Docker Deployment Guide

## Overview

MutualChain uses Docker and Docker Compose for easy deployment and development environment setup. This guide covers local development, production deployment, and troubleshooting.

## Prerequisites

- **Docker Desktop**: [Download here](https://www.docker.com/products/docker-desktop/)
- **Docker Compose**: Included with Docker Desktop
- **Git**: For cloning the repository
- **Environment Variables**: See `.env.example`

## Quick Start

### 1. Environment Setup

Create a `.env` file in the root directory:

```bash
# Copy the example file
cp .env.example .env
```

Edit `.env` with your values:

```env
# WalletConnect Project ID
NEXT_PUBLIC_WALLET_CONNECT_ID=your_project_id_here

# Alchemy API Key
NEXT_PUBLIC_ALCHEMY_KEY=your_alchemy_key_here

# Network Configuration
NEXT_PUBLIC_CHAIN_ID=42161

# AI Backend URL (use container name)
NEXT_PUBLIC_AI_API_URL=http://ai-backend:5000
```

### 2. Build and Run

```bash
# Build all services
docker-compose build

# Start all services
docker-compose up

# Or run in detached mode
docker-compose up -d
```

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **AI Backend**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

### 4. Stop Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

## Docker Compose Architecture

### Services

#### Frontend (Next.js)
- **Port**: 3000
- **Build Context**: Root directory
- **Dockerfile**: `./Dockerfile`
- **Dependencies**: ai-backend service

#### AI Backend (Flask)
- **Port**: 5000
- **Build Context**: `./ai-backend`
- **Dockerfile**: `./ai-backend/Dockerfile`
- **Features**: Risk assessment, fraud detection, claim verification

### Network

All services run on a dedicated bridge network named `mutualchain` for secure inter-service communication.

## Development Workflow

### Hot Reload Development

For active development with hot reload:

```bash
# Run only AI backend in Docker
docker-compose up ai-backend

# Run frontend locally with hot reload
npm run dev
```

Update `NEXT_PUBLIC_AI_API_URL` to `http://localhost:5000` in `.env` for local development.

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f frontend
docker-compose logs -f ai-backend
```

### Rebuild After Code Changes

```bash
# Rebuild specific service
docker-compose build frontend
docker-compose build ai-backend

# Rebuild and restart
docker-compose up --build
```

## Production Deployment

### Multi-Stage Build Optimization

The frontend Dockerfile uses multi-stage builds to:
- ✅ Minimize final image size
- ✅ Separate dependencies from source code
- ✅ Enable standalone Next.js output
- ✅ Run as non-root user (nextjs:nodejs)

### Security Best Practices

1. **Non-Root User**: Both containers run as non-root users
2. **Image Scanning**: Run security scans regularly
3. **Secrets Management**: Use Docker secrets or environment variables
4. **Network Isolation**: Services communicate via internal network

### Environment Variables for Production

```env
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
FLASK_ENV=production
```

### Build Production Images

```bash
# Build optimized images
docker-compose -f docker-compose.yml build --no-cache

# Tag images for registry
docker tag mutualchain-frontend:latest your-registry/mutualchain-frontend:v1.0.0
docker tag mutualchain-ai-backend:latest your-registry/mutualchain-ai-backend:v1.0.0

# Push to registry
docker push your-registry/mutualchain-frontend:v1.0.0
docker push your-registry/mutualchain-ai-backend:v1.0.0
```

## Cloud Deployment

### AWS ECS / Fargate

1. **Push images to ECR**:
```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

docker tag mutualchain-frontend:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/mutualchain-frontend:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/mutualchain-frontend:latest
```

2. **Create ECS Task Definition** with both containers
3. **Configure Load Balancer** for port 3000
4. **Set Environment Variables** in task definition

### Google Cloud Run

```bash
# Build and push to Google Container Registry
gcloud builds submit --tag gcr.io/your-project/mutualchain-frontend
gcloud builds submit --tag gcr.io/your-project/mutualchain-ai-backend ./ai-backend

# Deploy services
gcloud run deploy mutualchain-frontend \
  --image gcr.io/your-project/mutualchain-frontend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated

gcloud run deploy mutualchain-ai-backend \
  --image gcr.io/your-project/mutualchain-ai-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Azure Container Instances

```bash
# Create resource group
az group create --name mutualchain-rg --location eastus

# Create container registry
az acr create --resource-group mutualchain-rg --name mutualchainacr --sku Basic

# Push images
az acr build --registry mutualchainacr --image mutualchain-frontend:latest .
az acr build --registry mutualchainacr --image mutualchain-ai-backend:latest ./ai-backend

# Deploy container group
az container create \
  --resource-group mutualchain-rg \
  --name mutualchain \
  --image mutualchainacr.azurecr.io/mutualchain-frontend:latest \
  --ports 3000 \
  --environment-variables NEXT_PUBLIC_WALLET_CONNECT_ID=xxx
```

### Kubernetes / Helm

Create `k8s/deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mutualchain-frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: mutualchain-frontend
  template:
    metadata:
      labels:
        app: mutualchain-frontend
    spec:
      containers:
      - name: frontend
        image: your-registry/mutualchain-frontend:latest
        ports:
        - containerPort: 3000
        env:
        - name: NEXT_PUBLIC_WALLET_CONNECT_ID
          valueFrom:
            secretKeyRef:
              name: mutualchain-secrets
              key: walletconnect-id
---
apiVersion: v1
kind: Service
metadata:
  name: mutualchain-frontend
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 3000
  selector:
    app: mutualchain-frontend
```

Deploy:

```bash
kubectl apply -f k8s/deployment.yaml
kubectl get services mutualchain-frontend
```

## Troubleshooting

### Common Issues

#### Port Already in Use

```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (Windows)
taskkill /PID <PID> /F

# Or change port in docker-compose.yml
ports:
  - "3001:3000"
```

#### Build Failures

```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache
```

#### Container Won't Start

```bash
# Check logs
docker-compose logs frontend

# Inspect container
docker inspect mutualchain-frontend-1

# Debug with shell
docker-compose run frontend sh
```

#### Network Issues

```bash
# Recreate network
docker-compose down
docker network prune
docker-compose up
```

#### MetaMask SDK Warnings

These warnings about `@react-native-async-storage` are **non-blocking** for web deployments:

```
Module not found: Can't resolve '@react-native-async-storage/async-storage'
```

The application will work correctly in browsers.

### Performance Optimization

#### Image Size Reduction

```bash
# Check image sizes
docker images | grep mutualchain

# Use Alpine base images (already configured)
# Enable layer caching in CI/CD

# Analyze image layers
docker history mutualchain-frontend:latest
```

#### Memory Limits

Add to `docker-compose.yml`:

```yaml
services:
  frontend:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
        reservations:
          memory: 512M
```

### Health Checks

Add health checks to `docker-compose.yml`:

```yaml
services:
  frontend:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

## CI/CD Integration

### GitHub Actions

Create `.github/workflows/docker.yml`:

```yaml
name: Docker Build and Push

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v2
    
    - name: Login to DockerHub
      uses: docker/login-action@v2
      with:
        username: ${{ secrets.DOCKERHUB_USERNAME }}
        password: ${{ secrets.DOCKERHUB_TOKEN }}
    
    - name: Build and push frontend
      uses: docker/build-push-action@v4
      with:
        context: .
        push: true
        tags: your-username/mutualchain-frontend:latest
        cache-from: type=registry,ref=your-username/mutualchain-frontend:buildcache
        cache-to: type=registry,ref=your-username/mutualchain-frontend:buildcache,mode=max
    
    - name: Build and push AI backend
      uses: docker/build-push-action@v4
      with:
        context: ./ai-backend
        push: true
        tags: your-username/mutualchain-ai-backend:latest
```

### GitLab CI

Create `.gitlab-ci.yml`:

```yaml
stages:
  - build
  - deploy

variables:
  DOCKER_DRIVER: overlay2
  DOCKER_TLS_CERTDIR: "/certs"

build:
  stage: build
  image: docker:latest
  services:
    - docker:dind
  script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    - docker build -t $CI_REGISTRY_IMAGE/frontend:$CI_COMMIT_SHA .
    - docker build -t $CI_REGISTRY_IMAGE/ai-backend:$CI_COMMIT_SHA ./ai-backend
    - docker push $CI_REGISTRY_IMAGE/frontend:$CI_COMMIT_SHA
    - docker push $CI_REGISTRY_IMAGE/ai-backend:$CI_COMMIT_SHA
```

## Monitoring

### Container Metrics

```bash
# Resource usage
docker stats

# Specific container
docker stats mutualchain-frontend-1
```

### Logging

```bash
# Export logs
docker-compose logs > logs.txt

# Filter by time
docker-compose logs --since 30m

# Follow logs for debugging
docker-compose logs -f --tail=100
```

## Backup and Recovery

### Database Volumes (if added)

```bash
# Backup volume
docker run --rm -v mutualchain_db_data:/data -v $(pwd):/backup alpine tar czf /backup/db-backup.tar.gz /data

# Restore volume
docker run --rm -v mutualchain_db_data:/data -v $(pwd):/backup alpine sh -c "cd /data && tar xzf /backup/db-backup.tar.gz --strip 1"
```

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [Next.js Docker Deployment](https://nextjs.org/docs/deployment#docker-image)
- [Flask Docker Best Practices](https://flask.palletsprojects.com/en/2.3.x/deploying/)

## Support

For issues and questions:
- **GitHub Issues**: [Create an issue](https://github.com/yourusername/mutualchain/issues)
- **Documentation**: Check README.md and SETUP.md
- **Community**: Join our Discord server

---

**MutualChain** - Decentralized Insurance Powered by AI and Blockchain
