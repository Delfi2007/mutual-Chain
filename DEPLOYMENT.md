# 🚀 MutualChain Deployment Checklist

## Pre-Deployment Checklist

### ✅ Development Environment

- [ ] Node.js 18+ installed
- [ ] Python 3.9+ installed
- [ ] Docker Desktop installed and running
- [ ] Git configured
- [ ] Code editor (VS Code recommended)

### ✅ API Keys & Credentials

- [ ] **WalletConnect Project ID** - [Get it here](https://cloud.walletconnect.com/)
- [ ] **Alchemy API Key** - [Get it here](https://www.alchemy.com/)
- [ ] **Etherscan API Key** - [Get it here](https://etherscan.io/apis)
- [ ] MetaMask wallet with testnet ETH

### ✅ Environment Configuration

- [ ] `.env.local` created from `.env.example`
- [ ] All API keys populated
- [ ] Network configuration set (Arbitrum testnet: 421614)
- [ ] AI backend URL configured

### ✅ Code Quality

- [ ] All dependencies installed (`npm install --legacy-peer-deps`)
- [ ] TypeScript compilation passes (`npm run build`)
- [ ] No critical linting errors
- [ ] Environment variables validated

## Local Development Checklist

### Frontend (Next.js)

```bash
# Terminal 1 - Start development server
npm run dev
```

- [ ] Server starts on http://localhost:3000
- [ ] Home page loads without errors
- [ ] Navigation works (Dashboard, Claims, Risk Calculator, Analytics, About)
- [ ] Wallet connection button appears
- [ ] No console errors

### AI Backend (Python/Flask)

```bash
# Terminal 2 - Start AI backend
cd ai-backend
python app.py
```

- [ ] Server starts on http://localhost:5000
- [ ] Health endpoint responds: http://localhost:5000/health
- [ ] All 6 API endpoints accessible:
  - [ ] `/api/risk-assessment` - POST
  - [ ] `/api/fraud-detection` - POST
  - [ ] `/api/claim-verification` - POST
  - [ ] `/api/federated-training` - POST
  - [ ] `/api/parametric-trigger` - POST
  - [ ] `/api/train-models` - POST

### Blockchain Development (Hardhat)

```bash
# Terminal 3 - Run local Hardhat node
cd blockchain
npx hardhat node
```

- [ ] Local blockchain starts on http://127.0.0.1:8545
- [ ] 20 test accounts created with ETH
- [ ] Contract compiles: `npx hardhat compile`
- [ ] Tests pass: `npx hardhat test`

### Smart Contract Deployment

```bash
# Deploy to local network
npx hardhat run scripts/deploy.js --network localhost

# Deploy to testnet
npx hardhat run scripts/deploy.js --network arbitrumGoerli
```

- [ ] Contract deploys successfully
- [ ] Contract address saved
- [ ] Contract verified on block explorer
- [ ] Update contract address in frontend

## Docker Deployment Checklist

### Build Docker Images

```bash
# Build all services
docker-compose build
```

- [ ] Frontend image builds successfully
- [ ] AI backend image builds successfully
- [ ] No build errors
- [ ] Images appear in `docker images`

### Run Docker Containers

```bash
# Start all services
docker-compose up -d

# Check status
docker-compose ps
```

- [ ] All containers running
- [ ] Frontend accessible at http://localhost:3000
- [ ] AI backend accessible at http://localhost:5000
- [ ] No container crashes

### Verify Docker Deployment

```bash
# Check logs
docker-compose logs -f
```

- [ ] No error logs
- [ ] Health checks passing
- [ ] Inter-service communication working

## Testing Checklist

### Functional Testing

#### Home Page
- [ ] Hero section displays correctly
- [ ] Stats show current metrics
- [ ] Features section visible
- [ ] Technologies section loads
- [ ] CTA buttons work
- [ ] Footer links functional

#### Dashboard Page
- [ ] Requires wallet connection
- [ ] Stats cards display
- [ ] Active policies listed
- [ ] AI risk score shown
- [ ] Recent activity feed updates

#### Risk Calculator Page
- [ ] Form validation works
- [ ] All fields required
- [ ] Calculate button triggers API
- [ ] Results display correctly
- [ ] Premium amount calculated

#### Claims Page
- [ ] 3-step wizard navigation
- [ ] File upload works
- [ ] Form submission successful
- [ ] Claim ID generated
- [ ] Success message displays

#### Analytics Page
- [ ] Charts render (Recharts)
- [ ] TVL line chart displays
- [ ] Claims bar chart shows data
- [ ] Policy distribution pie chart
- [ ] Real-time activity updates

### Web3 Testing

- [ ] MetaMask connects successfully
- [ ] Network switching works
- [ ] Transaction signing prompts
- [ ] Contract reads work
- [ ] Contract writes work
- [ ] Event listening functional

### AI Backend Testing

```bash
# Test risk assessment endpoint
curl -X POST http://localhost:5000/api/risk-assessment \
  -H "Content-Type: application/json" \
  -d '{
    "businessType": "retail",
    "revenue": 500000,
    "employees": 10,
    "location": "New York",
    "coverageAmount": 100000,
    "claimsHistory": 0
  }'
```

- [ ] Risk assessment returns score
- [ ] Fraud detection responds
- [ ] Claim verification works
- [ ] Response times acceptable (<500ms)

## Production Deployment Checklist

### Pre-Production

- [ ] Code reviewed and approved
- [ ] All tests passing
- [ ] No critical security vulnerabilities
- [ ] Documentation complete
- [ ] Changelog updated

### Environment Setup

- [ ] Production `.env` configured
- [ ] All secrets secured (not in Git)
- [ ] Domain name configured
- [ ] SSL certificate obtained
- [ ] CDN configured (optional)

### Infrastructure

- [ ] Cloud provider account (AWS/GCP/Azure)
- [ ] Container registry set up
- [ ] Database provisioned (if needed)
- [ ] Load balancer configured
- [ ] Auto-scaling enabled

### Build & Push

```bash
# Build production images
docker-compose build --no-cache

# Tag for registry
docker tag mutualchain-frontend:latest your-registry/mutualchain-frontend:v1.0.0
docker tag mutualchain-ai-backend:latest your-registry/mutualchain-ai-backend:v1.0.0

# Push to registry
docker push your-registry/mutualchain-frontend:v1.0.0
docker push your-registry/mutualchain-ai-backend:v1.0.0
```

- [ ] Images built successfully
- [ ] Images pushed to registry
- [ ] Version tags applied

### Deploy to Cloud

#### AWS ECS/Fargate
- [ ] Task definition created
- [ ] Service configured
- [ ] Load balancer attached
- [ ] Environment variables set
- [ ] Health checks configured

#### Google Cloud Run
- [ ] Service deployed
- [ ] Custom domain mapped
- [ ] Environment variables set
- [ ] Scaling limits configured

#### Kubernetes
- [ ] Deployment manifest applied
- [ ] Service exposed
- [ ] Ingress configured
- [ ] ConfigMaps/Secrets created
- [ ] Horizontal Pod Autoscaler set

### Smart Contract Deployment

```bash
# Deploy to mainnet (CAREFUL!)
cd blockchain
npx hardhat run scripts/deploy.js --network arbitrum
```

- [ ] Testnet deployment successful
- [ ] Contract thoroughly tested
- [ ] Security audit completed
- [ ] Mainnet deployment executed
- [ ] Contract verified on Arbiscan

### Post-Deployment

- [ ] Application accessible via domain
- [ ] HTTPS working
- [ ] All pages load correctly
- [ ] Wallet connection works on mainnet
- [ ] Smart contract interactions functional
- [ ] AI backend responding
- [ ] Analytics tracking enabled

## Monitoring & Maintenance

### Monitoring Setup

- [ ] **Application Monitoring**: Vercel/Netlify analytics or custom
- [ ] **Error Tracking**: Sentry or similar
- [ ] **Uptime Monitoring**: UptimeRobot or Pingdom
- [ ] **Performance**: Lighthouse CI scores
- [ ] **Logs**: Centralized logging (CloudWatch, Stackdriver)

### Health Checks

```bash
# Frontend health
curl https://your-domain.com/

# AI Backend health
curl https://your-domain.com/api/health

# Smart contract status
# Check block explorer for recent transactions
```

- [ ] Frontend health check passing
- [ ] Backend health check passing
- [ ] Smart contract operational
- [ ] No errors in logs

### Backup & Recovery

- [ ] Database backups automated (if applicable)
- [ ] Smart contract addresses documented
- [ ] Private keys secured (hardware wallet)
- [ ] Recovery procedures documented
- [ ] Disaster recovery plan in place

## Security Checklist

### Frontend Security

- [ ] No sensitive data in client-side code
- [ ] Environment variables properly scoped
- [ ] CSP headers configured
- [ ] XSS protection enabled
- [ ] CSRF tokens implemented

### Backend Security

- [ ] API rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] CORS properly configured
- [ ] Authentication required for sensitive endpoints
- [ ] SQL injection prevention (if using DB)

### Smart Contract Security

- [ ] Reentrancy guards in place
- [ ] Access control modifiers used
- [ ] Integer overflow/underflow checks
- [ ] Gas optimization implemented
- [ ] Emergency pause mechanism

### Infrastructure Security

- [ ] Secrets management system (AWS Secrets Manager, etc.)
- [ ] Network security groups configured
- [ ] DDoS protection enabled
- [ ] Regular security updates
- [ ] Vulnerability scanning automated

## Performance Optimization

### Frontend

- [ ] Images optimized (WebP format)
- [ ] Code splitting enabled
- [ ] Bundle size optimized (<200KB first load)
- [ ] Lazy loading implemented
- [ ] CDN for static assets

### Backend

- [ ] API response caching
- [ ] Database query optimization
- [ ] Connection pooling
- [ ] Gzip compression
- [ ] Rate limiting

### Blockchain

- [ ] Gas optimization in contracts
- [ ] Batch transactions where possible
- [ ] Layer 2 scaling utilized
- [ ] Event indexing with The Graph

## Post-Launch Checklist

### Week 1

- [ ] Monitor error rates daily
- [ ] Check performance metrics
- [ ] Review user feedback
- [ ] Fix critical bugs
- [ ] Update documentation

### Month 1

- [ ] Analyze user behavior
- [ ] Optimize based on metrics
- [ ] Deploy minor improvements
- [ ] Security audit review
- [ ] Community engagement

### Ongoing

- [ ] Weekly health checks
- [ ] Monthly dependency updates
- [ ] Quarterly security audits
- [ ] Regular feature releases
- [ ] Community governance

## Rollback Procedure

If issues arise:

```bash
# Docker rollback
docker-compose down
docker-compose pull  # Get previous version
docker-compose up -d

# Kubernetes rollback
kubectl rollout undo deployment/mutualchain-frontend

# Vercel rollback
vercel rollback
```

- [ ] Rollback procedure documented
- [ ] Previous version tagged
- [ ] Database migration rollback plan
- [ ] Communication plan for downtime

## Success Metrics

### Technical KPIs

- [ ] Uptime: 99.9%+
- [ ] Page load time: <2s
- [ ] API response time: <500ms
- [ ] Error rate: <0.1%
- [ ] Build success rate: 100%

### Business KPIs

- [ ] User registrations
- [ ] Policies created
- [ ] Claims processed
- [ ] Total value locked (TVL)
- [ ] User retention rate

## Resources

- **Documentation**: README.md, SETUP.md, DOCKER.md
- **Deployment Guide**: DOCKER.md
- **API Documentation**: Check `/api` endpoints
- **Smart Contract**: `/blockchain/contracts/`
- **Monitoring Dashboard**: [Your monitoring URL]
- **Support**: GitHub Issues or Discord

---

## Quick Reference Commands

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Production build
npm run lint                   # Run linter

# Docker
docker-compose up --build      # Build and start
docker-compose down            # Stop containers
docker-compose logs -f         # View logs

# Blockchain
cd blockchain
npx hardhat compile            # Compile contracts
npx hardhat test               # Run tests
npx hardhat node               # Local blockchain

# AI Backend
cd ai-backend
python app.py                  # Start Flask server

# Health Checks
curl http://localhost:3000     # Frontend
curl http://localhost:5000/health  # AI Backend
```

---

**Last Updated**: 2024
**Version**: 1.0.0
**Status**: Production Ready ✅

