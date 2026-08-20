import { runATSAnalysis } from './ats/engine';
import { ParsedResumeData } from '@/types';

// Sample Candidate 1: Strong ATS Resume (Single column, strong action verbs, metrics, rich skills)
const strongResumeText = `
Alex Chen
San Francisco, CA | alex.chen@example.com | +1 (555) 234-5678 | linkedin.com/in/alexchen-dev | github.com/alexchen-dev

PROFESSIONAL SUMMARY
Senior Full Stack Engineer with 4+ years of experience designing high-scale web applications, microservices, and cloud architectures. Proven track record of improving latency by 40% and deploying mission-critical systems in React, Node.js, and AWS.

TECHNICAL SKILLS
- Languages: JavaScript, TypeScript, Python, SQL, Go, HTML5, CSS3
- Frameworks & Libraries: React, Next.js, Node.js, Express, Tailwind CSS, Redux, Jest
- Databases & Cloud: PostgreSQL, MongoDB, Redis, Docker, Kubernetes, AWS (ECS, Lambda, S3), CI/CD, Git

WORK EXPERIENCE
Senior Software Engineer | TechScale Solutions | 2022 - Present
- Architected and deployed scalable microservices using Node.js and TypeScript, reducing API response times by 35% across 50k+ daily active users.
- Developed responsive client-facing web applications using React, Next.js, and Tailwind CSS, increasing user engagement by 28%.
- Engineered automated CI/CD deployment pipelines using GitHub Actions and Docker, cutting release deployment cycles by 50%.
- Optimized complex PostgreSQL database queries and indexing strategies, improving query throughput by 42%.

Software Engineer | CloudWave Systems | 2020 - 2022
- Spearheaded the redesign of core payment processing workflows, handling $2.5M in monthly transaction volume with 99.99% uptime.
- Implemented comprehensive unit and integration test suites using Jest and Cypress, achieving 88% test coverage and reducing production bugs by 30%.
- Mentored 4 junior engineers in modern React best practices, code review standards, and agile sprint workflows.

EDUCATION
Bachelor of Science in Computer Science
University of California, Berkeley | Graduated 2020

PROJECTS
OpenSource API Gateway | github.com/alexchen-dev/api-gateway
- Engineered a lightweight API gateway in Go and Docker, handling 10k+ requests per second with under 5ms latency.
- Implemented rate limiting and JWT authentication middleware, adopted by 500+ GitHub developers.
`;

// Sample Candidate 2: Weak Resume (Passive, lacks metrics, missing headers, vague)
const weakResumeText = `
John Doe
Resume

About Me
I am a hard worker looking for a job in software development.

Experience
Tech Corp
- Worked on a website using React.
- Responsible for fixing bugs in the backend.
- Assisted team with database tasks.
- Duties included helping with meetings.

Education
College Degree
`;

const sampleJobDescription = `
We are looking for a Senior Full Stack Software Engineer to build scalable microservices and client applications.
Requirements:
- 3+ years of professional experience in full-stack development
- Strong proficiency in React, TypeScript, Node.js, and PostgreSQL
- Experience with Docker, Kubernetes, and AWS cloud infrastructure
- Familiarity with CI/CD pipelines, Jest testing, and Git version control
- Bachelor's degree in Computer Science or related field
`;

function createMockParsedData(text: string): ParsedResumeData {
  const lines = text.trim().split('\n').map((l) => l.trim()).filter(Boolean);
  const words = text.trim().split(/\s+/).filter(Boolean);
  
  return {
    rawText: text,
    cleanText: text,
    lines,
    wordCount: words.length,
    charCount: text.length,
    pageCountEstimate: 1,
    contactInfo: {
      name: text.includes('Alex Chen') ? 'Alex Chen' : 'John Doe',
      email: text.includes('alex.chen@example.com') ? 'alex.chen@example.com' : null,
      phone: text.includes('+1 (555) 234-5678') ? '+1 (555) 234-5678' : null,
      linkedIn: text.includes('linkedin.com/in/alexchen-dev') ? 'linkedin.com/in/alexchen-dev' : null,
      github: text.includes('github.com/alexchen-dev') ? 'github.com/alexchen-dev' : null,
      portfolio: null,
      location: text.includes('San Francisco, CA') ? 'San Francisco, CA' : null,
    },
    sections: {
      summary: text.includes('PROFESSIONAL SUMMARY') ? text.slice(text.indexOf('PROFESSIONAL SUMMARY'), text.indexOf('TECHNICAL SKILLS')) : '',
      skills: text.includes('TECHNICAL SKILLS') ? text.slice(text.indexOf('TECHNICAL SKILLS'), text.indexOf('WORK EXPERIENCE')) : '',
      experience: text.includes('WORK EXPERIENCE') ? text.slice(text.indexOf('WORK EXPERIENCE'), text.indexOf('EDUCATION')) : (text.includes('Experience') ? text.slice(text.indexOf('Experience')) : ''),
      education: text.includes('EDUCATION') ? text.slice(text.indexOf('EDUCATION'), text.indexOf('PROJECTS')) : '',
      projects: text.includes('PROJECTS') ? text.slice(text.indexOf('PROJECTS')) : '',
    },
    detectedSections: [
      { name: 'contact', displayName: 'Contact Information', status: 'present', summary: 'Found' },
      { name: 'summary', displayName: 'Professional Summary', status: text.includes('SUMMARY') ? 'present' : 'missing', summary: 'Found' },
      { name: 'experience', displayName: 'Work Experience', status: 'present', summary: 'Found' },
      { name: 'education', displayName: 'Education', status: text.includes('Berkeley') ? 'present' : 'weak', summary: 'Found' },
      { name: 'skills', displayName: 'Technical Skills', status: text.includes('TECHNICAL SKILLS') ? 'present' : 'missing', summary: 'Found' },
      { name: 'projects', displayName: 'Projects', status: text.includes('PROJECTS') ? 'present' : 'missing', summary: 'Found' },
    ],
    hasTables: false,
    hasMultiColumns: false,
    hasUnusualSymbols: false,
    hasImagesOrGraphics: false,
    isScannedOrLowText: false,
  };
}

console.log('--- Testing Strong Resume Analysis ---');
const strongResult = runATSAnalysis(createMockParsedData(strongResumeText), {
  resumeName: 'alex_chen_resume.pdf',
  jobDescription: sampleJobDescription,
  jobTitle: 'Senior Full Stack Engineer',
  jobCompany: 'Tech Corp',
});

console.log(`Overall Score: ${strongResult.overallScore}/100 (${strongResult.overallRating})`);
console.log(`Job Match: ${strongResult.jobMatch?.overallMatchPercentage}%`);
console.log(`Matched Keywords: ${strongResult.keywords.matched.map(k => k.keyword).join(', ')}`);
console.log(`Problems Found: ${strongResult.problems.length}`);
console.log(`Top Improvement: ${strongResult.topImprovements[0]}`);

console.log('\n--- Testing Weak Resume Analysis ---');
const weakResult = runATSAnalysis(createMockParsedData(weakResumeText), {
  resumeName: 'john_doe_resume.pdf',
  jobDescription: sampleJobDescription,
});

console.log(`Overall Score: ${weakResult.overallScore}/100 (${weakResult.overallRating})`);
console.log(`Job Match: ${weakResult.jobMatch?.overallMatchPercentage}%`);
console.log(`Missing Keywords: ${weakResult.keywords.missing.map(k => k.keyword).slice(0, 5).join(', ')}`);
console.log(`Problems Found: ${weakResult.problems.length}`);
console.log(`Weak Bullets Detected: ${weakResult.bulletAnalysis.length}`);
console.log(`Sample Bullet Improvement: ${weakResult.bulletAnalysis[0]?.suggestedImprovement}`);
