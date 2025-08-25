# Vercel Hobby Compatibility Refactor

## Overview
This refactor removes high-frequency cron job dependencies to make the eco-commerce prototype compatible with Vercel Hobby plan (which only supports once-per-day cron jobs).

## Changes Made

### 1. **Removed High-Frequency Cron Job**
- **Before**: `*/1 * * * *` (every minute) calling `/api/relayer`
- **After**: `0 2 * * *` (daily at 2 AM) calling `/api/background`

### 2. **Immediate Minting Process**
- **File**: `app/api/orders/[id]/verify/route.ts`
- **Change**: Eco-credit minting now happens immediately during waste verification
- **Impact**: No more queuing jobs for cron processing - blockchain transactions happen in real-time

### 3. **New API Endpoints Created**

#### `/api/orders/[id]/mint` (POST)
- **Purpose**: Manual retry endpoint for failed minting operations
- **Use Case**: If immediate minting fails during verification, frontend can retry
- **Auth**: Requires user authentication

#### `/api/progress` (GET)
- **Purpose**: Calculate user's ecological impact and progress banners on-demand
- **Features**: 
  - Total waste recycled, credits earned
  - Environmental impact calculations (CO2, energy, water saved)
  - Achievement badges
  - User leaderboard ranking
- **Auth**: Requires user authentication

#### `/api/leaderboard` (GET)
- **Purpose**: Generate leaderboard data on-demand
- **Features**:
  - Top users by credits earned
  - Pagination support
  - Global statistics
  - Privacy-friendly address display
- **Auth**: Public endpoint

#### `/api/background` (POST)
- **Purpose**: Daily maintenance tasks (Vercel Hobby compatible)
- **Tasks**:
  - Process any remaining queued jobs (fallback)
  - Clean up old temporary data (30+ days)
  - Check for stuck orders
- **Schedule**: Once per day at 2 AM

### 4. **Deprecated Endpoints**
- **File**: `app/api/relayer/route.ts`
- **Status**: Marked as deprecated, kept for manual testing only
- **Note**: No longer called by cron jobs

## Workflow Changes

### Before (Cron-Dependent)
1. User uploads image → AI classifies → Order created → Verification
2. **Verification queues minting job**
3. **Cron job (every minute) processes queue**
4. **Blockchain transaction happens asynchronously**

### After (API-Driven)
1. User uploads image → AI classifies → Order created → Verification
2. **Verification immediately processes minting**
3. **Blockchain transaction happens synchronously**
4. **Daily cron only handles cleanup and fallback processing**

## Frontend Integration Required

The frontend needs to call these new endpoints:

### Real-Time User Flow
```javascript
// After waste verification, minting happens automatically
// No frontend changes needed for main flow

// For retry scenarios:
POST /api/orders/{orderId}/mint
```

### User Dashboard
```javascript
// Get user progress and achievements
GET /api/progress

// Display leaderboard
GET /api/leaderboard?limit=10&offset=0
```

## Benefits

1. **✅ Vercel Hobby Compatible**: Only uses one daily cron job
2. **⚡ Faster User Experience**: Immediate minting instead of waiting for cron
3. **🔄 Better Error Handling**: Failed minting can be retried immediately
4. **📊 Real-Time Data**: Progress and leaderboards calculated on-demand
5. **🛡️ More Reliable**: Less dependency on background job processing

## Error Handling

- If immediate minting fails during verification, the order is still marked as verified
- Failed minting jobs can be retried via `/api/orders/[id]/mint`
- Daily background job provides fallback processing for edge cases
- Timeline events track all minting attempts and failures

## Environment Variables

No new environment variables required. All existing blockchain and database configurations remain the same.
