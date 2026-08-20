import { BulletImprovement } from '@/types';
import { ACTION_VERBS, METRIC_REGEX } from './ats-config';

const ALL_ACTION_VERBS = new Set([
  ...ACTION_VERBS.leadership,
  ...ACTION_VERBS.technical,
  ...ACTION_VERBS.optimization,
  ...ACTION_VERBS.quantitative,
  ...ACTION_VERBS.creation,
]);

export function analyzeBulletPoints(
  experienceText: string,
  projectsText: string
): {
  bulletImprovements: BulletImprovement[];
  totalBullets: number;
  bulletsWithActionVerbs: number;
  bulletsWithMetrics: number;
  weakBulletsCount: number;
} {
  const bulletImprovements: BulletImprovement[] = [];
  const lines = `${experienceText}\n${projectsText}`
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  let totalBullets = 0;
  let bulletsWithActionVerbs = 0;
  let bulletsWithMetrics = 0;
  let weakBulletsCount = 0;

  for (const line of lines) {
    // Check if line looks like a bullet point or sentence
    const isBullet =
      line.startsWith('•') ||
      line.startsWith('-') ||
      line.startsWith('*') ||
      line.startsWith('–') ||
      (line.length > 25 && /^[A-Z]/.test(line));

    if (!isBullet || line.length < 20) continue;

    totalBullets++;
    const cleanLine = line.replace(/^[•\-\*–\s]+/, '').trim();
    const firstWord = cleanLine.split(/\s+/)[0]?.toLowerCase().replace(/[^a-z]/g, '') || '';

    const hasActionVerb = ALL_ACTION_VERBS.has(firstWord);
    const hasMetric = METRIC_REGEX.test(cleanLine);

    if (hasActionVerb) bulletsWithActionVerbs++;
    if (hasMetric) bulletsWithMetrics++;

    const issues: string[] = [];
    let isWeak = false;

    // Check for passive or weak phrases
    const lowerLine = cleanLine.toLowerCase();
    if (
      lowerLine.startsWith('responsible for') ||
      lowerLine.startsWith('helped in') ||
      lowerLine.startsWith('worked on') ||
      lowerLine.startsWith('assisted with') ||
      lowerLine.startsWith('involved in') ||
      lowerLine.startsWith('duties included') ||
      lowerLine.startsWith('handled')
    ) {
      issues.push('Starts with a passive or duty-oriented phrase instead of a strong action verb.');
      isWeak = true;
    } else if (!hasActionVerb) {
      issues.push('Missing a recognized strong action verb at the start.');
      isWeak = true;
    }

    if (!hasMetric && cleanLine.length > 40) {
      issues.push('Lacks measurable results, percentages, or quantifiable metrics.');
      isWeak = true;
    }

    if (cleanLine.length < 35) {
      issues.push('Very brief; lacks context on technologies used and business impact.');
      isWeak = true;
    }

    if (isWeak) {
      weakBulletsCount++;

      // Generate suggested improvement
      let suggestedImprovement = cleanLine;
      const metricsToConsider: string[] = [
        'Percentage increase in performance, efficiency, or adoption (e.g. 25%)',
        'Time or cost saved (e.g. reduced build time by 40%)',
        'Scale or user count impacted (e.g. 10k+ daily active users)',
        'Technologies or libraries utilized to execute the task'
      ];

      // Context-aware rewrite suggestion
      if (lowerLine.includes('react') || lowerLine.includes('frontend') || lowerLine.includes('website') || lowerLine.includes('ui')) {
        suggestedImprovement = `Engineered responsive user interfaces using React and modern CSS, improving page load speeds by 30% and boosting user engagement across 5k+ active visitors.`;
      } else if (lowerLine.includes('api') || lowerLine.includes('backend') || lowerLine.includes('server') || lowerLine.includes('database')) {
        suggestedImprovement = `Architected and deployed high-throughput REST APIs, reducing query latency by 40% and ensuring 99.9% uptime under high concurrency.`;
      } else if (lowerLine.includes('test') || lowerLine.includes('bug') || lowerLine.includes('qa')) {
        suggestedImprovement = `Implemented comprehensive automated unit and integration tests, increasing code coverage to 85% and cutting production bug reports by 35%.`;
      } else if (lowerLine.includes('data') || lowerLine.includes('model') || lowerLine.includes('analysis')) {
        suggestedImprovement = `Developed predictive machine learning pipelines and automated data processing, processing 100k+ records daily with 94% accuracy.`;
      } else {
        const verb = hasActionVerb ? firstWord.toUpperCase() : 'DEVELOPED';
        suggestedImprovement = `${verb} [Feature/System] utilizing [Key Technologies], optimizing [Key Metric] by [X]% and streamlining workflow for [Target Audience/Team].`;
      }

      bulletImprovements.push({
        id: `bullet-${bulletImprovements.length + 1}`,
        originalText: cleanLine,
        section: projectsText.includes(cleanLine) ? 'Projects' : 'Work Experience',
        issues,
        suggestedImprovement,
        metricsToConsider,
        actionVerbUsed: hasActionVerb ? firstWord : undefined,
        hasMetric,
      });
    }
  }

  return {
    bulletImprovements: bulletImprovements.slice(0, 6), // Top weak bullets
    totalBullets,
    bulletsWithActionVerbs,
    bulletsWithMetrics,
    weakBulletsCount,
  };
}
