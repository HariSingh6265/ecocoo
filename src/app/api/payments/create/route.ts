import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { getCurrentUser } from '@/lib/auth/auth';
import { PRICING_PLANS } from '@/lib/upi';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { planId, upiRefId, payerName, payerEmail, payerPhone } = await req.json();

    if (!planId || !upiRefId || !payerEmail) {
      return NextResponse.json(
        { error: 'Plan, 12-digit UPI Reference / UTR number, and email are required.' },
        { status: 400 }
      );
    }

    const cleanUpiRef = upiRefId.trim();
    if (cleanUpiRef.length < 8) {
      return NextResponse.json(
        { error: 'Please enter a valid 12-digit UPI Reference / Transaction ID (UTR).' },
        { status: 400 }
      );
    }

    const selectedPlan = PRICING_PLANS.find((p) => p.id === planId) || PRICING_PLANS[1];

    // Check if this UTR was already submitted
    const existingPayment = await prisma.payment.findFirst({
      where: { upiRefId: cleanUpiRef },
    });

    if (existingPayment) {
      return NextResponse.json(
        { error: 'This UPI Reference Number (UTR) has already been submitted.' },
        { status: 409 }
      );
    }

    const currentUser = await getCurrentUser();

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        userId: currentUser?.id || null,
        planId: selectedPlan.id,
        planName: selectedPlan.name,
        amount: selectedPlan.price,
        upiRefId: cleanUpiRef,
        payerName: payerName?.trim() || currentUser?.name || 'Customer',
        payerEmail: payerEmail.toLowerCase().trim(),
        payerPhone: payerPhone?.trim() || null,
        status: 'APPROVED', // Auto-activated on UTR submission
      },
    });

    // If logged-in user or matching user by email, upgrade planTier
    if (currentUser) {
      await prisma.user.update({
        where: { id: currentUser.id },
        data: { planTier: selectedPlan.id },
      });
    } else {
      const userByEmail = await prisma.user.findUnique({
        where: { email: payerEmail.toLowerCase().trim() },
      });
      if (userByEmail) {
        await prisma.user.update({
          where: { id: userByEmail.id },
          data: { planTier: selectedPlan.id },
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Payment submitted successfully! ${selectedPlan.name} features are now unlocked.`,
      paymentId: payment.id,
      plan: selectedPlan,
    });
  } catch (error: any) {
    console.error('Payment processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process payment. Please try again or contact support.' },
      { status: 500 }
    );
  }
}
