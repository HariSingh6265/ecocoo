import { SectionAnalysisItem } from '@/types';
import { STANDARD_SECTION_HEADERS } from '@/lib/ats/ats-config';

export function detectResumeSections(lines: string[], cleanText: string): {
  sections: Record<string, string>;
  detectedSections: SectionAnalysisItem[];
} {
  const sections: Record<string, string[]> = {};
  let currentSection = 'header';
  sections[currentSection] = [];

  const headerMatches: Array<{ lineIndex: number; sectionKey: string; headerText: string }> = [];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i].trim();
    if (!rawLine) continue;

    const normalizedLine = rawLine
      .toLowerCase()
      .replace(/[^a-z0-9\s&]/g, '')
      .trim();

    // Check if this line matches any standard section alias
    let matchedKey: string | null = null;
    let matchedTitle: string | null = null;

    for (const headerDef of STANDARD_SECTION_HEADERS) {
      for (const alias of headerDef.aliases) {
        // Line should be short (under 40 chars) and match alias closely or be prefixed/suffixed
        if (
          normalizedLine === alias ||
          normalizedLine === `${alias}s` ||
          (rawLine.length < 40 && (normalizedLine.startsWith(alias) || normalizedLine.endsWith(alias)))
        ) {
          // Additional check: not a bullet point
          if (!rawLine.startsWith('•') && !rawLine.startsWith('-') && !rawLine.startsWith('*')) {
            matchedKey = headerDef.key;
            matchedTitle = headerDef.title;
            break;
          }
        }
      }
      if (matchedKey) break;
    }

    if (matchedKey && matchedKey !== 'contact') {
      headerMatches.push({ lineIndex: i, sectionKey: matchedKey, headerText: rawLine });
    }
  }

  // Segment lines based on header matches
  let currentHeaderIdx = 0;
  for (let i = 0; i < lines.length; i++) {
    if (currentHeaderIdx < headerMatches.length && i === headerMatches[currentHeaderIdx].lineIndex) {
      currentSection = headerMatches[currentHeaderIdx].sectionKey;
      if (!sections[currentSection]) {
        sections[currentSection] = [];
      }
      currentHeaderIdx++;
      continue; // skip the heading line itself
    }

    if (!sections[currentSection]) {
      sections[currentSection] = [];
    }
    sections[currentSection].push(lines[i]);
  }

  // Combine section strings
  const combinedSections: Record<string, string> = {};
  for (const [key, contentLines] of Object.entries(sections)) {
    combinedSections[key] = contentLines.join('\n').trim();
  }

  // Build section analysis items
  const detectedSections: SectionAnalysisItem[] = STANDARD_SECTION_HEADERS.map((headerDef) => {
    const content = combinedSections[headerDef.key] || '';
    const wordCount = content ? content.split(/\s+/).filter(Boolean).length : 0;
    const lineCount = content ? content.split('\n').filter(Boolean).length : 0;
    
    let status: 'present' | 'missing' | 'weak' | 'optional' = 'missing';
    let summary = '';

    const isCoreSection = ['experience', 'education', 'skills', 'contact'].includes(headerDef.key);
    const isRecommendedSection = ['summary', 'projects', 'certifications'].includes(headerDef.key);

    if (headerDef.key === 'contact') {
      // Handled by contact extractor
      status = 'present';
      summary = 'Contact details detected at top of resume.';
    } else if (content.length > 0) {
      if (wordCount < 15 && isCoreSection) {
        status = 'weak';
        summary = `Section detected but contains very brief information (${wordCount} words). Add more details and quantifiable points.`;
      } else {
        status = 'present';
        summary = `Well-defined ${headerDef.title.toLowerCase()} section with ${wordCount} words across ${lineCount} lines.`;
      }
    } else {
      if (isCoreSection) {
        status = 'missing';
        summary = `Crucial section missing. ATS parsers and hiring managers expect a dedicated ${headerDef.title} section.`;
      } else if (isRecommendedSection) {
        status = 'missing';
        summary = `Recommended section not found. Adding a ${headerDef.title} can boost ATS keyword score.`;
      } else {
        status = 'optional';
        summary = `Optional section. Consider adding if relevant to your target role.`;
      }
    }

    return {
      name: headerDef.key,
      displayName: headerDef.title,
      status,
      summary,
      contentSnippet: content ? content.slice(0, 160) + (content.length > 160 ? '...' : '') : undefined,
      lineCount,
      wordCount,
    };
  });

  return {
    sections: combinedSections,
    detectedSections,
  };
}
