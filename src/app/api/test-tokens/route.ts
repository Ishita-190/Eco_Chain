import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { wasteType, userAddress } = await request.json();
    
    // Token amounts based on waste type
    const tokenAmounts = {
      plastic: 10,
      metal: 15,
      paper: 8,
      glass: 12,
      organic: 5
    };

    const amount = tokenAmounts[wasteType as keyof typeof tokenAmounts] || 10;

    // Mock token distribution
    const mockTransaction = {
      hash: `0x${Math.random().toString(16).substr(2, 64)}`,
      to: userAddress,
      amount: amount,
      wasteType: wasteType,
      timestamp: new Date().toISOString(),
      status: 'success'
    };

    return NextResponse.json({
      success: true,
      transaction: mockTransaction,
      message: `${amount} ECO tokens distributed for ${wasteType} waste`,
      contractAddress: process.env.CONTRACT_ECOCREDIT
    });

  } catch (error) {
    return NextResponse.json({ error: 'Token distribution failed' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    contractAddress: process.env.CONTRACT_ECOCREDIT,
    tokenAmounts: { plastic: 10, metal: 15, paper: 8, glass: 12, organic: 5 },
    network: 'Sepolia Testnet'
  });
}