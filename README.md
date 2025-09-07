# README.md
# Eco_Chain Platform

A modern waste management platform that rewards users with blockchain-based eco credits for proper waste disposal, featuring an intuitive visual tracking system.

## 🌟 Features

- **AI-Powered Classification**: Advanced image recognition for waste type identification
- **Smart Matching**: Find compatible recycling facilities near you
- **Blockchain Rewards**: Earn ECO tokens stored securely on Ethereum
- **Visual Flow Tracking**: Interactive flowmap showing collection progress with smooth animations
- **Modern UI/UX**: Clean, responsive design with glass morphism effects
- **Smooth Navigation**: Seamless page transitions and user experience
- **Feedback System**: Integrated user feedback and reporting functionality

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
- **App Router**: Modern React architecture with smooth page transitions
- **Visual Tracking**: Interactive flowmap with status progression
- **Modern Design**: Glass morphism effects and gradient backgrounds
- **Responsive Layout**: Mobile-first design with centered content
- **User Feedback**: Integrated feedback and reporting system

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
- PostgreSQL (configured with Prisma)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ishita-190/codesynth_1.git
   cd codesynth_1-11
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env.local
   # Add your JWT_SECRET and database configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Features: Visual tracking, feedback system, smooth animations

### Key Pages

- **Home**: Landing page with enhanced footer and modern design
- **Schedule**: Pickup/dropoff scheduling with improved UI
- **Tracking**: Visual flowmap showing collection progress (/track/[id])
- **Feedback**: User feedback and reporting system (/feedback)
- **Profile & Leaderboard**: User engagement features

## 📱 User Flow

1. **Upload**: Take photo of waste item
2. **Classify**: AI identifies waste type and provides guidance
3. **Match**: System suggests nearby compatible facilities
4. **Schedule**: Book pickup or drop-off appointment with modern UI
5. **Track**: Visual flowmap shows real-time collection progress
6. **Verify**: Facility staff confirms waste collection
7. **Reward**: Eco credits automatically minted to wallet
8. **Feedback**: Rate and provide feedback on the service

## 🔧 API Endpoints

### Main APIs
- `POST /api/uploads` - Upload image to IPFS
- `POST /api/classify` - Classify waste with AI
- `POST /api/orders` - Create pickup/dropoff request
- `POST /api/orders/:id/verify` - Verify waste collection
- `GET /api/orders/:id/timeline` - Get collection status and timeline
- `POST /api/auth` - Authentication for mock users
- `POST /api/feedback` - Submit user feedback and reports

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

## 🎨 UI/UX Improvements

- **Visual Tracking**: Interactive flowmap with animated progress indicators
- **Modern Design**: Glass morphism effects and gradient backgrounds
- **Smooth Transitions**: Page animations and hover effects
- **Responsive Layout**: Mobile-first design with centered content
- **Enhanced Footer**: Improved design with better navigation
- **Feedback Integration**: User rating and reporting system

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

## 🔄 Recent Updates

- **Enhanced Tracking Page**: Visual flowmap with real-time status updates
- **Improved Navigation**: Smooth page transitions and animations
- **Modern UI Design**: Glass morphism and gradient styling
- **Feedback System**: Integrated user feedback and reporting
- **Simplified Authentication**: Mock authentication for development
- **Responsive Design**: Centered layout with better mobile support

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
