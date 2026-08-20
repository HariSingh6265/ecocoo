import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const payments = await prisma.payment.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    const totalRevenue = payments
      .filter((p) => p.status === 'APPROVED')
      .reduce((sum, p) => sum + p.amount, 0);

    return NextResponse.json({
      payments,
      stats: {
        totalPayments: payments.length,
        totalRevenueINR: totalRevenue,
        approvedCount: payments.filter((p) => p.status === 'APPROVED').length,
      },
    });
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 });
  }
}
