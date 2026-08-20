import { NextRequest, NextResponse } from 'next/server';
import { getAIService } from '@/lib/ai/ai-provider';

export async function POST(req: NextRequest) {
  try {
    const { bullet, roleContext } = await req.json();

    if (!bullet || typeof bullet !== 'string' || bullet.trim().length === 0) {
      return NextResponse.json(
        { error: 'Bullet point text is required.' },
        { status: 400 }
      );
    }

    const ai = getAIService();
    const rewritten = await ai.rewriteBullet(bullet.trim(), roleContext || 'Software Engineer');

    return NextResponse.json({
      success: true,
      original: bullet,
      rewritten,
      provider: ai.name,
    });
  } catch (error) {
    console.error('Error rewriting bullet:', error);
    return NextResponse.json(
      { error: 'Failed to rewrite bullet point.' },
      { status: 500 }
    );
  }
}
