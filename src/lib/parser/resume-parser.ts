import { ParsedResumeData } from '@/types';
import { parsePDFBuffer } from './pdf-parser';
import { parseDOCXBuffer } from './docx-parser';
import { extractContactInfo } from './contact-extractor';
import { detectResumeSections } from './section-detector';

export async function parseResume(
  buffer: Buffer,
  filename: string,
  mimeType: string
): Promise<ParsedResumeData> {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  let rawText = '';
  let pageCountEstimate = 1;
  let hasTables = false;
  let hasMultiColumns = false;
  let isScannedOrLowText = false;

  if (ext === 'pdf' || mimeType === 'application/pdf') {
    const pdfData = await parsePDFBuffer(buffer);
    rawText = pdfData.text;
    pageCountEstimate = pdfData.numPages;
    hasTables = pdfData.hasTables;
    hasMultiColumns = pdfData.hasMultiColumns;
    isScannedOrLowText = pdfData.isScannedOrLowText;
  } else if (
    ext === 'docx' ||
    mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    mimeType === 'application/msword'
  ) {
    const docxData = await parseDOCXBuffer(buffer);
    rawText = docxData.text;
    hasTables = docxData.hasTables;
    isScannedOrLowText = docxData.isScannedOrLowText;
    pageCountEstimate = Math.max(1, Math.ceil(rawText.split(/\s+/).length / 450));
  } else {
    throw new Error('Unsupported file format. Please upload a PDF (.pdf) or Word document (.docx).');
  }

  // Normalize text lines
  const lines = rawText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const cleanText = lines.join('\n');
  const words = cleanText.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const charCount = cleanText.length;

  // Check for unusual symbols / icons / non-standard characters
  const nonAsciiCount = (cleanText.match(/[^\x00-\x7F]/g) || []).length;
  const hasUnusualSymbols = nonAsciiCount > (charCount * 0.04);

  // Extract contact info
  const contactInfo = extractContactInfo(cleanText, lines);

  // Detect sections
  const { sections, detectedSections } = detectResumeSections(lines, cleanText);

  // If pageCountEstimate is still 1 but wordCount is large, adjust estimate
  if (pageCountEstimate === 1 && wordCount > 650) {
    pageCountEstimate = Math.ceil(wordCount / 500);
  }

  return {
    rawText,
    cleanText,
    lines,
    wordCount,
    charCount,
    pageCountEstimate,
    contactInfo,
    sections,
    detectedSections,
    hasTables,
    hasMultiColumns,
    hasUnusualSymbols,
    hasImagesOrGraphics: false,
    isScannedOrLowText,
  };
}
