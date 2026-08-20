import mammoth from 'mammoth';

export interface DOCXParseResult {
  text: string;
  isScannedOrLowText: boolean;
  hasTables: boolean;
}

export async function parseDOCXBuffer(buffer: Buffer): Promise<DOCXParseResult> {
  try {
    const textResult = await mammoth.extractRawText({ buffer });
    const htmlResult = await mammoth.convertToHtml({ buffer });
    
    const text = textResult.value || '';
    const cleanWords = text.trim().split(/\s+/).filter(Boolean);
    const isScannedOrLowText = cleanWords.length < 50;
    
    // Check if HTML output contains <table> tags
    const hasTables = /<table\b[^>]*>/i.test(htmlResult.value || '');

    return {
      text,
      isScannedOrLowText,
      hasTables,
    };
  } catch (error: any) {
    console.error('DOCX parsing error:', error);
    throw new Error(`Failed to parse DOCX: ${error?.message || 'Corrupted or unreadable DOCX document'}`);
  }
}
