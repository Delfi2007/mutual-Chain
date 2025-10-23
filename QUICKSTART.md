# 🚀 MutualChain - Quick Start Guide

## Get Started in 5 Minutes!

### Prerequisites Check ✓

- [ ] **Docker Desktop** installed and running ([Download](https://www.docker.com/products/docker-desktop/))
- [ ] **Git** installed ([Download](https://git-scm.com/downloads))
- [ ] **MetaMask** browser extension ([Install](https://metamask.io/download/))

---

## Option 1: Docker Deployment (Recommended) 🐳

### Step 1: Clone the Repository

```powershell
git clone https://github.com/yourusername/mutualchain.git
cd mutualchain
```

### Step 2: Get API Keys (Free!)

#### WalletConnect Project ID
1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Sign up/Login (free)
3. Create a new project
4. Copy your **Project ID**

#### Alchemy API Key
1. Go to [Alchemy](https://www.alchemy.com/)
2. Sign up (free tier available)
3. Create a new app (select Arbitrum)
4. Copy your **API Key**

### Step 3: Configure Environment

```powershell
# Copy the example file
Copy-Item .env.example .env

# Edit .env with your favorite editor
notepad .env
```

Add your API keys:
```env
NEXT_PUBLIC_WALLET_CONNECT_ID=your_walletconnect_project_id_here
NEXT_PUBLIC_ALCHEMY_KEY=your_alchemy_api_key_here
NEXT_PUBLIC_CHAIN_ID=42161
NEXT_PUBLIC_AI_API_URL=http://ai-backend:5000
```

### Step 4: Build and Run

```powershell
# Build and start all services
docker-compose up --build

# Wait for build to complete (first time: 5-10 min)
# Look for "✓ Ready" messages
```

### Step 5: Access the Application

Open your browser and go to:

- **Frontend**: http://localhost:3000
- **AI Backend**: http://localhost:5000/health

### Step 6: Connect Your Wallet

1. Click "Connect Wallet" in the top right
2. Select MetaMask
3. Approve the connection
4. Switch to Arbitrum network if prompted

### Step 7: Explore the Platform

- 🏠 **Home**: Overview and features
- 📊 **Dashboard**: View your policies (requires wallet)
- 🧮 **Risk Calculator**: Get AI-powered premium estimates
- 📝 **Claims**: File insurance claims
- 📈 **Analytics**: Protocol metrics and charts
- ℹ️ **About**: Learn more about the project

---

## Option 2: Manual Development Setup

### Frontend

```powershell
# Terminal 1 - Start Next.js
npm install --legacy-peer-deps
npm run dev

# Access at http://localhost:3000
```

### AI Backend

```powershell
# Terminal 2 - Start Flask
cd ai-backend
pip install -r requirements.txt
python app.py

# Access at http://localhost:5000
```

### Blockchain (Optional)

```powershell
# Terminal 3 - Local Hardhat node
cd blockchain
npm install
npx hardhat node

# Runs at http://127.0.0.1:8545
```

For manual setup, update `.env.local`:
```env
NEXT_PUBLIC_AI_API_URL=http://localhost:5000
```

---

## Testing Your Setup

### 1. Frontend Health Check

Visit http://localhost:3000 - You should see:
- ✅ MutualChain homepage loads
- ✅ Connect Wallet button visible
- ✅ Navigation menu works
- ✅ No console errors

### 2. AI Backend Health Check

```powershell
# Test the health endpoint
curl http://localhost:5000/health

# Expected response:
# {"status":"healthy"}
```

### 3. Test Risk Calculator

1. Go to http://localhost:3000/risk-calculator
2. Fill out the form:
   - Business Type: `Retail`
   - Annual Revenue: `500000`
   - Employees: `10`
   - Location: `New York`
   - Coverage Amount: `100000`
   - Claims History: `0`
3. Click "Calculate Risk"
4. You should see AI-generated risk score and premium

### 4. Test Wallet Connection

1. Click "Connect Wallet"
2. Approve MetaMask connection
3. Your address should appear in the navbar
4. Try accessing Dashboard page

---

## Common Issues & Fixes

### Issue: Port Already in Use

```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process
taskkill /PID <PID_NUMBER> /F

# Or change port in docker-compose.yml
# ports:
#   - "3001:3000"
```

### Issue: Docker Build Fails

```powershell
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache
docker-compose up
```

### Issue: MetaMask Not Connecting

1. Make sure MetaMask is unlocked
2. Check you're on a supported network (Arbitrum, Ethereum)
3. Try disconnecting and reconnecting
4. Clear browser cache and reload

### Issue: AI Backend Not Responding

```powershell
# Check if container is running
docker-compose ps

# Check logs
docker-compose logs ai-backend

# Restart the backend
docker-compose restart ai-backend
```

### Issue: npm Install Fails

```powershell
# Use legacy peer deps flag
npm install --legacy-peer-deps

# Or use increased timeout
npm install --legacy-peer-deps --fetch-timeout=300000
```

---

## Next Steps

### 🎨 Customize Your Platform

1. **Update Branding**:
   - Edit `app/layout.tsx` for site metadata
   - Modify `components/Navbar.tsx` for logo
   - Update colors in `tailwind.config.ts`

2. **Add Your Content**:
   - Edit `app/page.tsx` for homepage content
   - Update `app/about/page.tsx` with your team info
   - Customize features in `components/Features.tsx`

### 🔗 Deploy Smart Contracts

```powershell
cd blockchain

# Compile contracts
npx hardhat compile

# Deploy to Arbitrum testnet
npx hardhat run scripts/deploy.js --network arbitrumGoerli

# Save the contract address!
```

Update the contract address in `lib/contracts.ts`:
```typescript
export const CONTRACT_ADDRESS = '0xYourDeployedContractAddress';
```

### 📊 Train ML Models

```powershell
cd ai-backend

# Add your training data to /data folder
# Create train_models.py script
python train_models.py

# Models will be saved for inference
```

### 🚀 Deploy to Production

Choose your platform:

**Vercel (Easiest for Next.js)**:
```powershell
npm install -g vercel
vercel login
vercel
```

**Docker Registry**:
```powershell
docker-compose build
docker tag mutualchain-frontend:latest your-registry/mutualchain:latest
docker push your-registry/mutualchain:latest
```

See **[DOCKER.md](./DOCKER.md)** for AWS, GCP, Azure deployment.

---

## Stopping the Application

### Docker
```powershell
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Manual
Press `Ctrl+C` in each terminal window.

---

## Development Commands

```powershell
# Frontend
npm run dev           # Start dev server
npm run build         # Production build
npm run start         # Start production server
npm run lint          # Lint code

# Docker
docker-compose up -d           # Start in background
docker-compose logs -f         # View logs
docker-compose ps              # Check status
docker-compose restart         # Restart services

# Blockchain
cd blockchain
npx hardhat compile            # Compile contracts
npx hardhat test               # Run tests
npx hardhat clean              # Clean artifacts
npx hardhat node               # Local blockchain
```

---

## Getting Help

### Documentation
- **README.md** - Project overview and tech stack
- **SETUP.md** - Detailed Windows setup guide
- **DOCKER.md** - Complete Docker deployment
- **DEPLOYMENT.md** - Production deployment checklist
- **PROJECT_SUMMARY.md** - Full project summary

### Resources
- [Next.js Docs](https://nextjs.org/docs)
- [Hardhat Docs](https://hardhat.org/docs)
- [Wagmi Docs](https://wagmi.sh/)
- [Docker Docs](https://docs.docker.com/)

### Support
- GitHub Issues: Report bugs
- Discord: Join community
- Twitter: @mutualchain (set up your own)

---

## Success! 🎉

You should now have MutualChain running locally:

- ✅ Frontend at http://localhost:3000
- ✅ AI Backend at http://localhost:5000
- ✅ Wallet connection working
- ✅ All pages accessible

**Start building the future of decentralized insurance!**

---

### Pro Tips 💡

1. **Use Docker for demos** - It's the most reliable
2. **Get tesnet ETH** - [Arbitrum Faucet](https://faucet.triangleplatform.com/arbitrum/sepolia)
3. **Test on testnet first** - Before deploying to mainnet
4. **Save contract addresses** - You'll need them
5. **Monitor gas costs** - Layer 2 is cheaper than mainnet

### Development Tips

- Use React DevTools for debugging components
- Check browser console for errors
- Use Hardhat console for contract debugging
- Test wallet connection on testnet first
- Keep environment variables secure (never commit .env)

---

**Happy Building! 🚀**

Need help? Check the documentation or create an issue on GitHub.

