// app/api/orders/[id]/timeline/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { verifyAuth } from '@/src/lib/auth';

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const auth = await verifyAuth(request);
		if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

		const order = await prisma.order.findUnique({
			where: { id: params.id },
			include: { facility: true },
		});
		if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 });

		const timeline = await prisma.timelineEvent.findMany({
			where: { orderId: params.id },
			orderBy: { createdAt: 'asc' },
		});

		return NextResponse.json({ order, timeline });
	} catch (e) {
		return NextResponse.json({ error: 'Failed' }, { status: 500 });
	}
}


