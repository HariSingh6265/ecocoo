import { CategoryScoreDetail, ParsedResumeData, ResumeProblem } from '@/types';
import { formatScoreRating } from '@/lib/utils';
import { DEFAULT_ATS_WEIGHTS } from './ats-config';

export function analyzeFormatting(data: ParsedResumeData): {
  scoreDetail: CategoryScoreDetail;
  problems: ResumeProblem[];
} {
  const maxScore = DEFAULT_ATS_WEIGHTS.formatting; // 20
  let score = maxScore;
  const problems: ResumeProblem[] = [];
  const whatWasChecked: string[] = [
    'Standard section heading recognition',
    'Multi-column layout risk',
    'Table and grid structure safety',
    'Special character and icon encoding',
    'Line density and readable text flow',
    'Header/footer parsing safety'
  ];
  const whatIsGood: string[] = [];
  const whatIsWrong: string[] = [];
  const howToImprove: string[] = [];

  // Check 1: Section Headings
  const coreSectionsFound = data.detectedSections.filter(
    (s) => ['experience', 'education', 'skills'].includes(s.name) && s.status === 'present'
  );
  if (coreSectionsFound.length >= 3) {
    whatIsGood.push('Clear, standard section headings that ATS parsers easily index.');
  } else if (coreSectionsFound.length >= 2) {
    score -= 3;
    whatIsWrong.push('Some core section headings are non-standard or missing.');
    howToImprove.push('Use conventional headings like "Work Experience", "Education", and "Technical Skills".');
    problems.push({
      id: 'fmt-nonstandard-headings',
      category: 'formatting',
      severity: 'warning',
      problem: 'Non-standard or ambiguous section headings detected.',
      whyItMatters: 'ATS parsers rely on recognized headings to index your career history into standard fields.',
      recommendedFix: 'Rename your sections to conventional titles: "Work Experience", "Education", "Skills", "Projects".',
    });
  } else {
    score -= 6;
    whatIsWrong.push('Crucial standard section headings could not be identified.');
    howToImprove.push('Structure your resume using standard single-line headers.');
    problems.push({
      id: 'fmt-missing-core-headers',
      category: 'formatting',
      severity: 'critical',
      problem: 'Major standard section headings are missing or unreadable.',
      whyItMatters: 'If ATS cannot find your experience or education headings, the entire resume may parse as unorganized plain text.',
      recommendedFix: 'Add clear, bold section headers on separate lines (e.g., EXPERIENCE, EDUCATION, SKILLS).',
    });
  }

  // Check 2: Multi-columns
  if (data.hasMultiColumns) {
    score -= 4;
    whatIsWrong.push('Multi-column layout detected, which can scramble text in older ATS engines.');
    howToImprove.push('Use a clean, single-column layout to ensure left-to-right reading order.');
    problems.push({
      id: 'fmt-multi-column',
      category: 'formatting',
      severity: 'warning',
      problem: 'Multi-column layout detected.',
      whyItMatters: 'Many ATS systems read across the page horizontally, causing text from column 1 and column 2 to be merged into incoherent sentences.',
      recommendedFix: 'Convert your resume to a single-column layout with consistent vertical flow.',
    });
  } else {
    whatIsGood.push('Single-column vertical layout ensures reliable top-to-bottom text extraction.');
  }

  // Check 3: Tables
  if (data.hasTables) {
    score -= 3;
    whatIsWrong.push('Embedded tables or complex grid formatting detected.');
    howToImprove.push('Replace tables with standard tabbed or bulleted lists.');
    problems.push({
      id: 'fmt-tables',
      category: 'formatting',
      severity: 'warning',
      problem: 'Tables or complex box structures detected.',
      whyItMatters: 'ATS parsers frequently strip table borders and mix up table cells.',
      recommendedFix: 'Remove table borders and use simple bulleted lists with bold dates/titles.',
    });
  } else {
    whatIsGood.push('No problematic table formatting detected.');
  }

  // Check 4: Unusual symbols
  if (data.hasUnusualSymbols) {
    score -= 3;
    whatIsWrong.push('Non-standard symbols, emojis, or icon fonts found.');
    howToImprove.push('Use standard bullet points (•, -) and plain ASCII characters.');
    problems.push({
      id: 'fmt-symbols',
      category: 'formatting',
      severity: 'improvement',
      problem: 'Special icons, rating bars, or non-standard symbols detected.',
      whyItMatters: 'Custom icons for phone/email or graphical skill rating stars often parse as question marks or corrupt text in ATS.',
      recommendedFix: 'Replace graphical icons with text labels (e.g. "Email: ", "Phone: ") and use standard bullets.',
    });
  } else {
    whatIsGood.push('Clean character encoding without corrupted glyphs or icons.');
  }

  // Check 5: Scanned / Low text
  if (data.isScannedOrLowText) {
    score -= 8;
    whatIsWrong.push('Very low extractable text volume — document may be an image or scanned file.');
    howToImprove.push('Export your resume directly from Microsoft Word or Google Docs as a searchable PDF.');
    problems.push({
      id: 'fmt-scanned-pdf',
      category: 'formatting',
      severity: 'critical',
      problem: 'Resume appears to be scanned or contains unextractable text.',
      whyItMatters: 'Image-based PDFs cannot be read by ATS software, resulting in an automatic 0% score.',
      recommendedFix: 'Never upload a flattened graphic or scan. Export directly to PDF or DOCX from your text editor.',
    });
  }

  // Ensure bounds
  score = Math.max(0, Math.min(maxScore, score));
  const percentage = Math.round((score / maxScore) * 100);

  if (howToImprove.length === 0) {
    howToImprove.push('Maintain clean typography and consistent margin spacing.');
  }

  return {
    scoreDetail: {
      score,
      maxScore,
      percentage,
      rating: formatScoreRating(percentage),
      whatWasChecked,
      whatIsGood,
      whatIsWrong,
      howToImprove,
    },
    problems,
  };
}
