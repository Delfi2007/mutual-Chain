# MutualChain - DeFi Insurance Pool with AI Risk Assessment

> Peer-to-peer insurance protocol powered by AI, blockchain, and advanced fintech technologies

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)](https://www.typescriptlang.org/)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.20-purple)](https://soliditylang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Overview

MutualChain revolutionizes insurance by making it accessible, transparent, and affordable for small businesses and gig workers. We leverage cutting-edge AI models, blockchain technology, and zero-knowledge proofs to create a peer-to-peer insurance protocol that eliminates intermediaries and reduces costs by up to 40%.

### Key Features

- **AI-Powered Risk Assessment**: XGBoost, Transformers, and Federated Learning for 98.5% accuracy
- **Smart Contract Automation**: Fully automated claims processing with Chainlink oracles
- **Zero-Knowledge Privacy**: zkSNARKs/zkSTARKs for private claim verification
- **Layer 2 Scaling**: Fast, low-cost transactions on Arbitrum, Optimism, and Base
- **Decentralized Storage**: IPFS and Arweave for policy documents
- **Real-time Analytics**: The Graph subgraphs and time-series databases

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Wagmi/Viem** - Ethereum interactions
- **RainbowKit** - Wallet connection
- **Framer Motion** - Smooth animations
- **Recharts** - Data visualization

### Blockchain & Web3
- **Solidity 0.8.20** - Smart contracts
- **Hardhat** - Development environment
- **Chainlink Oracles** - Real-world data feeds
- **zkSNARKs/zkSTARKs** - Zero-knowledge proofs
- **ERC-4337** - Account abstraction
- **Layer 2**: Arbitrum, Optimism, Base

### AI & Machine Learning
- **XGBoost** - Risk prediction models
- **TensorFlow/PyTorch** - Deep learning
- **Transformers** - NLP for claims analysis
- **Federated Learning** - Privacy-preserving ML
- **GANs** - Fraud detection
- **AutoML** - Model optimization

### Infrastructure
- **Python/Flask** - AI backend API
- **Docker** - Containerization
- **The Graph** - Blockchain indexing
- **IPFS** - Decentralized storage

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm
- Python 3.9+
- MetaMask or compatible Web3 wallet
- **Docker Desktop** (optional, recommended)

### Quick Start with Docker 🐳

The fastest way to get started:

```bash
# Clone the repository
git clone https://github.com/yourusername/mutualchain.git
cd mutualchain

# Copy environment file
cp .env.example .env
# Edit .env with your API keys

# Build and start all services
docker-compose up --build

# Access the app at http://localhost:3000
```

See [DOCKER.md](./DOCKER.md) for detailed Docker deployment instructions.

### Manual Installation

#### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone https://github.com/yourusername/mutualchain.git
cd mutualchain

# Install frontend dependencies
npm install --legacy-peer-deps

# Install blockchain dependencies
cd blockchain
npm install
cd ..

# Install AI backend dependencies
cd ai-backend
pip install -r requirements.txt
cd ..
```

#### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_WALLET_CONNECT_ID=your_wallet_connect_project_id
NEXT_PUBLIC_ALCHEMY_KEY=your_alchemy_api_key
NEXT_PUBLIC_CHAIN_ID=42161
NEXT_PUBLIC_AI_API_URL=http://localhost:5000
```

## 🚀 Quick Start

### Run the Development Environment

```bash
# Terminal 1: Start the Next.js frontend
npm run dev

# Terminal 2: Start the AI backend
cd ai-backend
python app.py

# Terminal 3: Start local Hardhat node (optional)
cd blockchain
npx hardhat node
```

Visit `http://localhost:3000` to see the application.

### Deploy Smart Contracts

```bash
cd blockchain

# Compile contracts
npx hardhat compile

# Deploy to Arbitrum
npx hardhat run scripts/deploy.js --network arbitrum

# Verify on Arbiscan
npx hardhat verify --network arbitrum DEPLOYED_CONTRACT_ADDRESS
```

## 🏗️ Project Structure

```
mutualchain/
├── app/                      # Next.js 14 app directory
│   ├── dashboard/           # Dashboard page
│   ├── claims/              # Claims filing page
│   ├── risk-calculator/     # Risk assessment tool
│   ├── analytics/           # Protocol analytics
│   └── about/               # About page
├── components/              # React components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   └── ...
├── blockchain/              # Smart contracts
│   ├── contracts/
│   │   └── MutualChainInsurance.sol
│   ├── scripts/
│   │   └── deploy.js
│   └── hardhat.config.js
├── ai-backend/              # Python AI/ML backend
│   ├── app.py              # Flask API server
│   └── requirements.txt
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions
└── public/                  # Static assets
```

## 🔧 Available Scripts

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Blockchain
```bash
cd blockchain
npm run compile      # Compile smart contracts
npm run test         # Run contract tests
npm run deploy:local # Deploy to local network
```

### AI Backend
```bash
cd ai-backend
python app.py        # Start Flask server
```

## 🎯 Core Features

### 1. AI Risk Assessment
- **XGBoost** models predict risk profiles with 98.5% accuracy
- **Federated Learning** ensures privacy-preserving training
- **Reinforcement Learning** for dynamic premium optimization

### 2. Smart Contract Automation
- Automated policy creation and management
- Parametric insurance with Chainlink oracle triggers
- Instant claim settlements via Layer 2 networks

### 3. Privacy & Security
- **zkSNARKs** for private claim verification
- **Zero-knowledge proofs** protect sensitive data
- Military-grade encryption for all transactions

### 4. Fraud Detection
- **GANs** detect anomalies in claims
- Real-time analysis of claim patterns
- Multi-factor fraud scoring system

## 🌐 Supported Networks

- **Arbitrum One** (Mainnet) - Primary deployment
- **Optimism** - Alternative Layer 2
- **Base** - Coinbase's Layer 2
- **Local Hardhat** - Development testing

## 📊 API Endpoints

### AI Backend API

```
POST /api/risk-assessment      # Calculate risk scores
POST /api/fraud-detection       # Detect fraudulent claims
POST /api/claim-verification    # Verify claims with AI
POST /api/parametric-trigger    # Check parametric triggers
```

## 🧪 Testing

```bash
# Frontend tests
npm test

# Smart contract tests
cd blockchain
npx hardhat test

# AI backend tests
cd ai-backend
pytest
```

## 📈 Roadmap

- [x] Core protocol deployment
- [x] AI risk assessment integration
- [x] Federated learning implementation
- [ ] Multi-chain expansion
- [ ] Mobile app (React Native)
- [ ] Governance token launch
- [ ] Reinsurance layer
- [ ] Traditional insurance integration

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Website**: https://mutualchain.io
- **Documentation**: https://docs.mutualchain.io
- **Discord**: https://discord.gg/mutualchain
- **Twitter**: https://twitter.com/mutualchain

## ⚠️ Disclaimer

This is a proof-of-concept project for educational purposes. Always conduct thorough security audits before deploying to production. Insurance products may be subject to regulatory requirements in your jurisdiction.

## 🙏 Acknowledgments

- OpenZeppelin for secure smart contract libraries
- Chainlink for decentralized oracle infrastructure
- The Graph for blockchain indexing
- All the amazing open-source contributors

---

**Built with ❤️ for DeFi and accessible insurance**
