import { NextResponse } from 'next/server';
import { SAMPLE_JOBS } from '@/lib/sample-jobs';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({ sampleJobs: SAMPLE_JOBS });
}
