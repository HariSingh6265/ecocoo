import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/auth';
import { prisma } from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const user = await getCurrentUser();

    const analysis = await prisma.analysis.findUnique({
      where: { id },
      include: {
        resume: true,
        jobDescription: true,
      },
    });

    if (!analysis) {
      return NextResponse.json({ error: 'Analysis not found' }, { status: 404 });
    }

    // If analysis has a userId and user is logged in, verify ownership
    if (analysis.userId && (!user || user.id !== analysis.userId)) {
      return NextResponse.json({ error: 'Unauthorized to view this analysis' }, { status: 403 });
    }

    const parsedResult = JSON.parse(analysis.resultsJson);

    return NextResponse.json({
      analysis: parsedResult,
      raw: {
        id: analysis.id,
        resumeName: analysis.resumeName,
        jobTitle: analysis.jobTitle,
        createdAt: analysis.createdAt,
      },
    });
  } catch (error) {
    console.error('Error fetching analysis details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analysis' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const analysis = await prisma.analysis.findUnique({
      where: { id },
    });

    if (!analysis || analysis.userId !== user.id) {
      return NextResponse.json({ error: 'Analysis not found' }, { status: 404 });
    }

    await prisma.analysis.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Analysis deleted' });
  } catch (error) {
    console.error('Error deleting analysis:', error);
    return NextResponse.json(
      { error: 'Failed to delete analysis' },
      { status: 500 }
    );
  }
}
