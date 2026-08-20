import { ParsedContactInfo } from '@/types';

const EMAIL_REGEX = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/;
const PHONE_REGEX = /(\+?\d{1,3}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{3,4}\b/;
const LINKEDIN_REGEX = /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/(?:in|profile)\/([a-zA-Z0-9_-]+)/i;
const GITHUB_REGEX = /(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_-]+)/i;
const PORTFOLIO_REGEX = /(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+\.(?:dev|me|io|tech|co|site|app|com))(?:\/[^\s]*)?/gi;

export function extractContactInfo(rawText: string, lines: string[]): ParsedContactInfo {
  let email: string | null = null;
  let phone: string | null = null;
  let linkedIn: string | null = null;
  let github: string | null = null;
  let portfolio: string | null = null;
  let location: string | null = null;
  let name: string | null = null;

  // Extract Email
  const emailMatch = rawText.match(EMAIL_REGEX);
  if (emailMatch) {
    email = emailMatch[0].trim();
  }

  // Extract LinkedIn
  const linkedInMatch = rawText.match(LINKEDIN_REGEX);
  if (linkedInMatch) {
    linkedIn = linkedInMatch[0].trim();
  }

  // Extract GitHub
  const githubMatch = rawText.match(GITHUB_REGEX);
  if (githubMatch) {
    github = githubMatch[0].trim();
  }

  // Extract Portfolio (excluding linkedin/github/google/etc)
  const portfolioMatches = Array.from(rawText.matchAll(PORTFOLIO_REGEX));
  for (const match of portfolioMatches) {
    const url = match[0].toLowerCase();
    if (
      !url.includes('linkedin.com') &&
      !url.includes('github.com') &&
      !url.includes('google.com') &&
      !url.includes('gmail.com')
    ) {
      portfolio = match[0].trim();
      break;
    }
  }

  // Extract Phone Number
  const phoneSearchLines = lines.slice(0, 20).join('\n');
  const phoneMatch = phoneSearchLines.match(PHONE_REGEX);
  if (phoneMatch && phoneMatch[0].replace(/\D/g, '').length >= 7) {
    phone = phoneMatch[0].trim();
  } else {
    const allPhoneMatch = rawText.match(PHONE_REGEX);
    if (allPhoneMatch && allPhoneMatch[0].replace(/\D/g, '').length >= 7) {
      phone = allPhoneMatch[0].trim();
    }
  }

  // Extract Name (Typically first non-empty line with 2-4 words, no email/phone)
  for (let i = 0; i < Math.min(lines.length, 8); i++) {
    const line = lines[i].trim();
    if (!line) continue;
    if (line.length < 2 || line.length > 50) continue;
    if (EMAIL_REGEX.test(line)) continue;
    if (PHONE_REGEX.test(line) && line.replace(/\D/g, '').length >= 7) continue;
    if (line.toLowerCase().includes('resume') || line.toLowerCase().includes('curriculum vitae')) continue;
    if (line.toLowerCase().includes('http') || line.toLowerCase().includes('www.')) continue;

    const words = line.split(/\s+/);
    if (words.length >= 1 && words.length <= 4 && /^[a-zA-Z\s\.\-']+$/.test(line)) {
      name = line;
      break;
    }
  }

  // Extract Location (City, State / Country patterns)
  const locationRegex = /\b([A-Z][a-zA-Z\s.-]+),\s*([A-Z]{2}|[A-Z][a-zA-Z]+)(?:,\s*([A-Z][a-zA-Z]+))?\b/;
  for (let i = 0; i < Math.min(lines.length, 12); i++) {
    const line = lines[i];
    const locMatch = line.match(locationRegex);
    if (
      locMatch &&
      !locMatch[0].includes('University') &&
      !locMatch[0].includes('College') &&
      !locMatch[0].includes('Inc') &&
      !locMatch[0].includes('LLC')
    ) {
      location = locMatch[0].trim();
      break;
    }
  }

  return {
    name,
    email,
    phone,
    linkedIn,
    github,
    portfolio,
    location,
  };
}
