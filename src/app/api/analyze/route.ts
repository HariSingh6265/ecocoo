import { NextRequest, NextResponse } from 'next/server';
import { parseResume } from '@/lib/parser/resume-parser';
import { runATSAnalysis } from '@/lib/ats/engine';
import { getCurrentUser } from '@/lib/auth/auth';
import { prisma } from '@/lib/db/prisma';
import { saveResumeFile } from '@/lib/storage';

export const dynamic = 'force-dynamic';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const jobDescription = (formData.get('jobDescription') as string | null) || '';
    const jobTitle = (formData.get('jobTitle') as string | null) || undefined;
    const jobCompany = (formData.get('jobCompany') as string | null) || undefined;

    if (!file) {
      return NextResponse.json(
        { error: 'No resume file uploaded. Please upload a PDF or DOCX file.' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds the 5MB limit. Please upload a smaller file.' },
        { status: 400 }
      );
    }

    const filename = file.name || 'resume.pdf';
    const mimeType = file.type || 'application/pdf';
    const validExtensions = ['pdf', 'docx', 'doc'];
    const ext = filename.split('.').pop()?.toLowerCase() || '';

    if (!validExtensions.includes(ext)) {
      return NextResponse.json(
        { error: 'Unsupported file format. Please upload a PDF (.pdf) or Word document (.docx).' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 1. Save uploaded resume file (to Supabase Storage if configured, or local uploads/ folder)
    const storageResult = await saveResumeFile(buffer, filename, mimeType);

    // 2. Parse resume text & layout
    let parsedData;
    try {
      parsedData = await parseResume(buffer, filename, mimeType);
    } catch (parseError: any) {
      return NextResponse.json(
        {
          error: parseError?.message || 'Unable to parse document. Please ensure the file is not corrupted or password-protected.',
        },
        { status: 422 }
      );
    }

    // 3. Run ATS scoring engine
    const analysisResult = runATSAnalysis(parsedData, {
      resumeName: filename,
      jobDescription: jobDescription.trim(),
      jobTitle,
      jobCompany,
    });

    // 4. Save record to database
    const currentUser = await getCurrentUser();
    let savedAnalysisId = analysisResult.id;

    try {
      // Save Resume record with file URL and metadata
      const resumeRecord = await prisma.resume.create({
        data: {
          userId: currentUser?.id || null,
          filename,
          fileType: mimeType,
          fileSize: file.size,
          uploadMetadata: JSON.stringify({
            storedFileName: storageResult.storedFileName,
            fileUrl: storageResult.fileUrl,
            storageProvider: storageResult.storageProvider,
            candidateName: parsedData.contactInfo.name,
            candidateEmail: parsedData.contactInfo.email,
            candidatePhone: parsedData.contactInfo.phone,
            uploadedAt: new Date().toISOString(),
          }),
        },
      });

      // Save Job Description if provided
      let jobRecordId: string | undefined = undefined;
      if (jobDescription.trim().length > 20) {
        const jdRecord = await prisma.jobDescription.create({
          data: {
            userId: currentUser?.id || null,
            title: jobTitle,
            company: jobCompany,
            description: jobDescription.trim(),
          },
        });
        jobRecordId = jdRecord.id;
      }

      // Save Analysis
      const analysisRecord = await prisma.analysis.create({
        data: {
          userId: currentUser?.id || null,
          resumeId: resumeRecord.id,
          jobDescriptionId: jobRecordId,
          resumeName: filename,
          jobTitle: jobTitle || (jobDescription.trim().length > 20 ? 'Target Job Match' : 'General Analysis'),
          overallScore: analysisResult.overallScore,
          formattingScore: analysisResult.breakdown.formatting.score,
          contentScore: analysisResult.breakdown.content.score,
          keywordScore: analysisResult.breakdown.keywords.score,
          experienceScore: analysisResult.breakdown.experience.score,
          contactScore: analysisResult.breakdown.contact.score,
          atsCompatibilityScore: analysisResult.breakdown.atsCompatibility.score,
          jobMatchScore: analysisResult.jobMatch?.overallMatchPercentage ?? null,
          resultsJson: JSON.stringify(analysisResult),
        },
      });

      savedAnalysisId = analysisRecord.id;
      analysisResult.id = savedAnalysisId;
    } catch (dbError) {
      console.error('Failed to persist analysis to DB:', dbError);
    }

    return NextResponse.json({
      success: true,
      analysis: analysisResult,
      isSaved: Boolean(currentUser),
      storedFile: storageResult.storedFileName,
      fileUrl: storageResult.fileUrl,
      storageProvider: storageResult.storageProvider,
    });
  } catch (error: any) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      {
        error: 'An unexpected error occurred while analyzing your resume. Please try again with a valid document.',
      },
      { status: 500 }
    );
  }
}