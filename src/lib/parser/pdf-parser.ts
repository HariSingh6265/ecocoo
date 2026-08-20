// Using internal pdf-parse library file to avoid the Next.js/Webpack debug mode bug in pdf-parse/index.js
// @ts-ignore
const pdfParse = require('pdf-parse/lib/pdf-parse.js');

export interface PDFParseResult {
  text: string;
  numPages: number;
  info: any;
  isScannedOrLowText: boolean;
  hasMultiColumns: boolean;
  hasTables: boolean;
}

export async function parsePDFBuffer(buffer: Buffer): Promise<PDFParseResult> {
  try {
    const data = await pdfParse(buffer);
    const text = (data && data.text) ? data.text : '';
    const numPages = (data && data.numpages) ? data.numpages : 1;
    const cleanWords = text.trim().split(/\s+/).filter(Boolean);

    // If less than 40 words on average per page or total < 50 words, likely scanned / image-only
    const isScannedOrLowText = cleanWords.length < 50 || (cleanWords.length / numPages < 30);

    // Check for multi-column patterns (short lines interleaved or irregular whitespace gaps)
    const lines = text.split('\n');
    let multiColumnIndicators = 0;
    let tableIndicators = 0;

    for (const line of lines) {
      if (/\s{5,}/.test(line)) {
        multiColumnIndicators++;
      }
      if (/[\|\+\-]{3,}/.test(line) || /\t{2,}/.test(line)) {
        tableIndicators++;
      }
    }

    const hasMultiColumns = multiColumnIndicators > 8;
    const hasTables = tableIndicators > 4;

    return {
      text,
      numPages,
      info: (data && data.info) ? data.info : {},
      isScannedOrLowText,
      hasMultiColumns,
      hasTables,
    };
  } catch (error: any) {
    console.error('PDF parsing error:', error);
    throw new Error(`Failed to parse PDF: ${error?.message || 'Corrupted or unreadable PDF document'}`);
  }
}
