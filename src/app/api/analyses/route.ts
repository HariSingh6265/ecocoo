import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/auth';
import { prisma } from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const analyses = await prisma.analysis.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        resumeName: true,
        jobTitle: true,
        overallScore: true,
        formattingScore: true,
        contentScore: true,
        keywordScore: true,
        experienceScore: true,
        contactScore: true,
        atsCompatibilityScore: true,
        jobMatchScore: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ analyses });
  } catch (error) {
    console.error('Error fetching analyses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analyses' },
      { status: 500 }
    );
  }
}
