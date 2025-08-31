# README.md
# EcoCommerce Platform

A comprehensive waste management platform that rewards users with blockchain-based eco credits for proper waste disposal.

## 🌟 Features

- **AI-Powered Classification**: Advanced image recognition for waste type identification
- **Smart Matching**: Find compatible recycling facilities near you
- **Blockchain Rewards**: Earn ECO tokens stored securely on Ethereum
- **Real-time Tracking**: Monitor your order from pickup to credit minting
- **PWA Support**: Mobile-first design with offline capabilities
- **Gasless Experience**: No gas fees for users - all handled by relayers

## 🏗️ Architecture

### Smart Contracts
- **EcoCredit (ERC-20)**: Reward token with role-based minting
- **AttestationRegistry**: On-chain proof of waste processing

### Backend (Next.js API Routes)
- **Serverless**: Deployed on Vercel with edge functions
- **Database**: PostgreSQL with Prisma ORM
- **Queue System**: Redis-based job processing
- **IPFS Storage**: Decentralized image storage

### AI Service (FastAPI)
- **Classification**: Lightweight ML model for waste identification
- **Containerized**: Docker deployment on Fly.io
- **Fallback Logic**: Handles edge cases gracefully

### Frontend (Next.js 14)
- **App Router**: Modern React architecture
- **Wallet Integration**: RainbowKit + wagmi
- **Real-time Updates**: WebSocket connections for live tracking
- **Mobile PWA**: Installable progressive web app

### Project Structure
```
codesynth_1-8/
│
├── .github/                    # GitHub workflows
│   └── workflows/
│       └── ci.yml              # CI/CD configuration
│
├── artifacts/                  # Compiled smart contracts
│   └── build-info/             # Build information
│
├── blockchain/                 # Blockchain related code
│   └── scripts/                # Deployment scripts
│
├── contracts/                  # Smart contracts
│   ├── AttestationRegistry.sol # Attestation management
│   └── EcoCredit.sol           # Token contract
│
├── prisma/                     # Database ORM
│   ├── schema.prisma           # Database schema
│   └── seed.ts                 # Database seeding
│
├── public/                     # Static assets
│   └── waves.svg               # SVG assets
│
├── scripts/                    # Utility scripts
│   ├── deploy.sh               # Deployment script
│   └── setup.sh                # Setup script
│
├── src/                        # Application source
│   ├── app/                    # Next.js app directory
│   │   ├── api/                # API routes
│   │   ├── leaderboard/        # Leaderboard page
│   │   ├── profile/            # User profile
│   │   ├── result/             # Results page
│   │   ├── schedule/           # Scheduling
│   │   ├── track/              # Tracking
│   │   └── upload/             # File upload
│   │
│   ├── components/             # React components
│   │   └── ui/                 # UI components
│   │
│   ├── hooks/                  # Custom React hooks
│   └── lib/                    # Utility functions
│       ├── auth.ts             # Authentication
│       ├── prisma.ts           # Database client
│       └── queue.ts            # Task queue
│
├── test/                       # Test files
├── types/                      # TypeScript type definitions
│
├── .env.example                # Environment variables example
├── docker-compose.yml          # Docker configuration
├── hardhat.config.js           # Hardhat configuration
├── next.config.js              # Next.js configuration
├── package.json                # Node.js dependencies
├── README.md                   # Project documentation
└── tsconfig.json               # TypeScript configuration

```

### Project Architecture
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│   Frontend      │◄───►│   Backend       │◄───►│   Blockchain    │
│   (Next.js)     │     │   (Python)      │     │   (Hardhat)     │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        ▲                        ▲                       ▲
        │                        │                       │
        ▼                        ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   UI Components │     │   API Routes    │     │ Smart Contracts │
│   (React)       │     │   (Next.js)     │     │ (Solidity)      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```
## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Python 3.11+
- Docker & Docker Compose
- PostgreSQL
- Redis

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/ecocommerce.git
   cd ecocommerce
   ```

2. **Run setup script**
   ```bash
   chmod +x scripts/setup.sh
   ./scripts/setup.sh
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development environment**
   ```bash
   docker-compose up
   ```

5. **Deploy smart contracts**
   ```bash
   npm run deploy:contracts
   ```

### Development

- **Frontend**: http://localhost:3000
- **AI Service**: http://localhost:8000
- **Database**: localhost:5432
- **Redis**: localhost:6379

## 📱 User Flow

1. **Upload**: Take photo of waste item
2. **Classify**: AI identifies waste type and provides guidance
3. **Match**: System suggests nearby compatible facilities
4. **Schedule**: Book pickup or drop-off appointment
5. **Verify**: Facility staff confirms waste collection
6. **Reward**: Eco credits automatically minted to wallet

## 🔧 API Endpoints

### Main APIs
- `POST /api/uploads` - Upload image to IPFS
- `POST /api/classify` - Classify waste with AI
- `POST /api/orders` - Create pickup order
- `POST /api/orders/:id/verify` - Verify waste collection
- `GET /api/orders/:id/timeline` - Get order status

### AI Service
- `POST /classify` - Classify waste from image/CID
- `GET /health` - Health check
- `GET /categories` - Available waste categories

## 🔐 Security Features

- **Role-Based Access**: Smart contract permissions
- **Rate Limiting**: API protection against abuse  
- **Input Validation**: Comprehensive data sanitization
- **IPFS Content**: Immutable image storage
- **JWT Authentication**: Secure user sessions

## 🌱 Environmental Impact

Each transaction creates measurable environmental benefit:
- **Waste Diverted**: Tracked by weight and type
- **Carbon Offset**: Calculated based on waste processing
- **Recycling Metrics**: Material recovery statistics
- **User Rankings**: Gamified environmental leadership

## 📊 Analytics & Monitoring

- **Real-time Dashboards**: Order processing metrics
- **Environmental Impact**: CO2 savings, waste diverted
- **User Engagement**: Activity patterns and retention
- **System Health**: API performance and uptime

## 🚢 Deployment

### Production Setup

1. **Smart Contracts** (Ethereum Mainnet)
   ```bash
   npm run deploy:contracts -- mainnet
   ```

2. **AI Service** (Fly.io)
   ```bash
   cd ai-service
   flyctl deploy
   ```

3. **Frontend/API** (Vercel)
   ```bash
   vercel --prod
   ```

4. **Relayer Service** (Background worker)
   ```bash
   npm run start:relayer
   ```

### Environment Variables
See `.env.example` for required configuration.

## 🧪 Testing

```bash
# Smart contracts
npx hardhat test

# Backend API
npm test

# AI service
pytest ai-service/tests/

# End-to-end
npm run test:e2e
```

## 📈 Performance Targets

- **Classification**: <3s p95 response time
- **Order Creation**: <500ms API response
- **Credit Minting**: <2 minutes end-to-end
- **Uptime**: 99.9% availability

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenZeppelin for secure smart contract libraries
- Vercel for seamless deployment platform
- Fly.io for AI service hosting
- The Ethereum community for blockchain infrastructure
