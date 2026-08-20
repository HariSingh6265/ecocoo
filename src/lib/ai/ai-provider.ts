export interface AIService {
  name: string;
  isAvailable(): boolean;
  rewriteBullet(originalBullet: string, roleContext?: string): Promise<string>;
  generateActionableTips(resumeContext: string, jobContext?: string): Promise<string[]>;
}

export class DeterministicProvider implements AIService {
  name = 'Deterministic Rule-Based Engine';

  isAvailable(): boolean {
    return true;
  }

  async rewriteBullet(originalBullet: string, roleContext = 'Software Engineer'): Promise<string> {
    const clean = originalBullet.replace(/^[•\-\*–\s]+/, '').trim();
    const lower = clean.toLowerCase();

    if (lower.includes('website') || lower.includes('react') || lower.includes('frontend')) {
      return `Architected and developed modular frontend components using React and TypeScript, accelerating load performance by 35% and improving accessibility across 10k+ active users.`;
    }
    if (lower.includes('api') || lower.includes('backend') || lower.includes('server')) {
      return `Engineered resilient backend REST APIs and microservices with Node.js and PostgreSQL, reducing latency by 45% while handling 50k+ daily transactions.`;
    }
    if (lower.includes('database') || lower.includes('sql') || lower.includes('query')) {
      return `Optimized complex database queries and indexing strategies, reducing query response times by 50% and improving overall system throughput.`;
    }
    if (lower.includes('data') || lower.includes('machine learning') || lower.includes('pipeline')) {
      return `Devised automated data processing pipelines and predictive machine learning models, achieving 94% prediction accuracy across large-scale datasets.`;
    }

    const firstWord = clean.split(/\s+/)[0] || 'Executed';
    return `Spearheaded ${clean}, leveraging industry best practices to boost operational efficiency by 25% and ensure seamless team delivery.`;
  }

  async generateActionableTips(resumeContext: string, jobContext?: string): Promise<string[]> {
    const tips = [
      'Tailor your skills section to mirror the exact technical naming conventions in target job descriptions.',
      'Quantify your accomplishments using the XYZ formula: Accomplished [X], as measured by [Y], by doing [Z].',
      'Ensure standard single-column formatting with zero tables or multi-column grids for 100% ATS readability.',
      'Add a crisp 3-line Professional Summary at the top emphasizing your core domain specialization.',
      'Include live links to your GitHub repositories or deployed projects to provide tangible proof of work.',
    ];
    if (jobContext && jobContext.length > 20) {
      tips.unshift('Incorporate high-priority missing keywords directly into your relevant project bullets.');
    }
    return tips;
  }
}

export class GeminiProvider implements AIService {
  name = 'Google Gemini AI';

  isAvailable(): boolean {
    return Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0);
  }

  async rewriteBullet(originalBullet: string, roleContext = 'Software Engineer'): Promise<string> {
    if (!this.isAvailable()) {
      return new DeterministicProvider().rewriteBullet(originalBullet, roleContext);
    }

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are an expert resume writer. Rewrite this resume bullet point to start with a strong action verb, include realistic technical context, and suggest a measurable impact (XYZ formula: Accomplished X, measured by Y, by doing Z). Do not make up absurd numbers. Return only the rewritten bullet point text with no quotes or preamble.\n\nOriginal: "${originalBullet}"\nRole: ${roleContext}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const rewritten = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      return rewritten || new DeterministicProvider().rewriteBullet(originalBullet, roleContext);
    } catch {
      return new DeterministicProvider().rewriteBullet(originalBullet, roleContext);
    }
  }

  async generateActionableTips(resumeContext: string, jobContext?: string): Promise<string[]> {
    return new DeterministicProvider().generateActionableTips(resumeContext, jobContext);
  }
}

export function getAIService(): AIService {
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0) {
    return new GeminiProvider();
  }
  return new DeterministicProvider();
}
