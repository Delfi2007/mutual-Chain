# MutualChain Setup Guide

## Prerequisites Installation

### 1. Node.js and npm
Download and install from https://nodejs.org/ (v18 or higher)

### 2. Python
Download and install Python 3.9+ from https://www.python.org/

### 3. MetaMask Wallet
Install MetaMask browser extension from https://metamask.io/

## Project Setup

### Step 1: Clone and Install Dependencies

```powershell
# Navigate to project directory
cd d:\mutual-Chain

# Install frontend dependencies
npm install --legacy-peer-deps

# Install blockchain dependencies
cd blockchain
npm install
cd ..

# Install AI backend dependencies (in a Python virtual environment)
cd ai-backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
cd ..
```

### Step 2: Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# WalletConnect Project ID (get from https://cloud.walletconnect.com/)
NEXT_PUBLIC_WALLET_CONNECT_ID=your_project_id_here

# Alchemy API Key (get from https://www.alchemy.com/)
NEXT_PUBLIC_ALCHEMY_KEY=your_alchemy_key_here

# Network Configuration
NEXT_PUBLIC_CHAIN_ID=42161

# AI Backend URL
NEXT_PUBLIC_AI_API_URL=http://localhost:5000

# Smart Contract Address (after deployment)
NEXT_PUBLIC_INSURANCE_CONTRACT=0x...
```

### Step 3: Start the Development Servers

Open **3 separate PowerShell terminals**:

**Terminal 1 - Frontend (Next.js):**
```powershell
cd d:\mutual-Chain
npm run dev
```

**Terminal 2 - AI Backend (Flask):**
```powershell
cd d:\mutual-Chain\ai-backend
.\venv\Scripts\Activate.ps1
python app.py
```

**Terminal 3 - Blockchain (Optional - Local Testing):**
```powershell
cd d:\mutual-Chain\blockchain
npx hardhat node
```

### Step 4: Access the Application

- **Frontend**: http://localhost:3000
- **AI Backend**: http://localhost:5000
- **Hardhat Node**: http://localhost:8545

## Smart Contract Deployment

### Deploy to Arbitrum Mainnet

1. Get test ETH from an Arbitrum faucet
2. Configure your private key in `.env`:
```env
PRIVATE_KEY=your_private_key_here
ARBITRUM_RPC_URL=https://arb1.arbitrum.io/rpc
```

3. Deploy:
```powershell
cd blockchain
npx hardhat run scripts/deploy.js --network arbitrum
```

4. Update `NEXT_PUBLIC_INSURANCE_CONTRACT` in `.env.local` with the deployed address

## Production Build

```powershell
# Build frontend
npm run build
npm run start

# The site will be available at http://localhost:3000
```

## Troubleshooting

### Issue: "Cannot find module"
Solution: Run `npm install --legacy-peer-deps` again

### Issue: Python dependencies fail
Solution: 
```powershell
cd ai-backend
python -m pip install --upgrade pip
pip install -r requirements.txt
```

### Issue: MetaMask not connecting
Solution: 
- Ensure you're on the correct network (Arbitrum)
- Clear MetaMask cache
- Refresh the page

### Issue: Build errors
Solution:
```powershell
# Clean install
rm -r node_modules
rm package-lock.json
npm install --legacy-peer-deps
```

## Windows-Specific Notes

- Use PowerShell (not CMD) for all commands
- Activate Python venv with: `.\venv\Scripts\Activate.ps1`
- If you get execution policy errors: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

## Next Steps

1. ✅ Install all dependencies
2. ✅ Configure environment variables
3. ✅ Start development servers
4. ✅ Connect MetaMask wallet
5. ✅ Test the application locally
6. ✅ Deploy smart contracts (optional)
7. ✅ Build for production

## Support

For issues or questions:
- Check the main README.md
- Open an issue on GitHub
- Join our Discord community

---

Happy coding! 🚀
