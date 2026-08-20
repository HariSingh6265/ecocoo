export interface ATSWeightConfig {
  formatting: number;
  content: number;
  keywords: number;
  experience: number;
  contact: number;
  atsCompatibility: number;
}

export const DEFAULT_ATS_WEIGHTS: ATSWeightConfig = {
  formatting: 20,
  content: 20,
  keywords: 25,
  experience: 15,
  contact: 10,
  atsCompatibility: 10,
};

export const STANDARD_SECTION_HEADERS = [
  { key: 'contact', title: 'Contact Information', aliases: ['contact', 'contact info', 'personal details', 'personal information'] },
  { key: 'summary', title: 'Professional Summary', aliases: ['summary', 'professional summary', 'executive summary', 'profile', 'about me', 'career summary', 'objective', 'career objective'] },
  { key: 'experience', title: 'Work Experience', aliases: ['experience', 'work experience', 'employment history', 'professional experience', 'work history', 'internships', 'career history'] },
  { key: 'education', title: 'Education', aliases: ['education', 'academic background', 'academic history', 'qualifications', 'degrees'] },
  { key: 'skills', title: 'Technical Skills', aliases: ['skills', 'technical skills', 'skills & competencies', 'core competencies', 'technologies', 'technical proficiencies', 'tools & technologies', 'expertise'] },
  { key: 'projects', title: 'Projects', aliases: ['projects', 'academic projects', 'personal projects', 'key projects', 'notable projects', 'technical projects', 'open source'] },
  { key: 'certifications', title: 'Certifications', aliases: ['certifications', 'certificates', 'licenses & certifications', 'accreditations', 'courses & certifications'] },
  { key: 'achievements', title: 'Achievements & Awards', aliases: ['achievements', 'awards', 'honors', 'accomplishments', 'recognition', 'awards & achievements'] },
  { key: 'publications', title: 'Publications & Research', aliases: ['publications', 'research', 'papers', 'conferences'] },
  { key: 'extracurricular', title: 'Extracurricular Activities', aliases: ['extracurricular', 'extracurricular activities', 'leadership', 'volunteering', 'community involvement', 'hobbies'] },
];

export const ACTION_VERBS = {
  leadership: [
    'spearheaded', 'led', 'orchestrated', 'directed', 'championed', 'founded', 'mentored',
    'guided', 'supervised', 'oversaw', 'pioneered', 'empowered', 'managed', 'steered',
    'mobilized', 'delegated', 'chaired', 'recruited', 'fostered', 'aligned'
  ],
  technical: [
    'architected', 'engineered', 'developed', 'implemented', 'programmed', 'deployed',
    'configured', 'integrated', 'refactored', 'automated', 'debugged', 'migrated',
    'containerized', 'modeled', 'scaled', 'provisioned', 'built', 'coded', 'designed'
  ],
  optimization: [
    'accelerated', 'optimized', 'streamlined', 'reduced', 'boosted', 'enhanced',
    'maximized', 'minimized', 'improved', 'consolidated', 'modernized', 'standardized',
    'upgraded', 'revitalized', 'eliminated', 'transformed', 'restructured'
  ],
  quantitative: [
    'increased', 'decreased', 'generated', 'saved', 'negotiated', 'yielded',
    'delivered', 'expanded', 'boosted', 'scaled', 'captured', 'doubled', 'tripled',
    'exceeded', 'outperformed', 'amplified'
  ],
  creation: [
    'authored', 'devised', 'formulated', 'established', 'initiated', 'launched',
    'introduced', 'created', 'crafted', 'constructed', 'published', 'produced'
  ]
};

export const COMMON_SKILLS_DICTIONARY: Record<string, string[]> = {
  languages: [
    'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'c', 'go', 'golang', 'rust',
    'ruby', 'php', 'swift', 'kotlin', 'r', 'scala', 'dart', 'html', 'html5', 'css', 'css3',
    'sass', 'sql', 'bash', 'shell', 'powershell', 'matlab', 'graphql'
  ],
  frameworks_frontend: [
    'react', 'react.js', 'reactjs', 'next.js', 'nextjs', 'vue', 'vue.js', 'vuejs', 'angular',
    'angularjs', 'svelte', 'remix', 'nuxt.js', 'tailwindcss', 'tailwind', 'bootstrap',
    'material-ui', 'mui', 'chakra-ui', 'redux', 'zustand', 'mobx', 'jquery', 'webpack', 'vite'
  ],
  frameworks_backend: [
    'node.js', 'nodejs', 'express', 'express.js', 'nestjs', 'django', 'fastapi', 'flask',
    'spring', 'spring boot', 'ruby on rails', 'asp.net', 'laravel', '.net core', 'fiber', 'gin'
  ],
  databases: [
    'postgresql', 'postgres', 'mysql', 'mongodb', 'sqlite', 'redis', 'elasticsearch',
    'dynamodb', 'cassandra', 'supabase', 'firebase', 'mariadb', 'oracle', 'ms sql', 'neo4j'
  ],
  cloud_devops: [
    'aws', 'amazon web services', 'azure', 'google cloud', 'gcp', 'docker', 'kubernetes',
    'k8s', 'terraform', 'ansible', 'ci/cd', 'github actions', 'gitlab ci', 'jenkins',
    'nginx', 'linux', 'unix', 'serverless', 'lambda', 'helm', 'prometheus', 'grafana'
  ],
  ai_data: [
    'machine learning', 'deep learning', 'artificial intelligence', 'nlp', 'natural language processing',
    'computer vision', 'pandas', 'numpy', 'scikit-learn', 'tensorflow', 'pytorch', 'keras',
    'opencv', 'llm', 'generative ai', 'huggingface', 'data analysis', 'data visualization',
    'tableau', 'power bi', 'spark', 'hadoop', 'kafka', 'airflow'
  ],
  tools_methodologies: [
    'git', 'github', 'gitlab', 'bitbucket', 'jira', 'confluence', 'postman', 'swagger',
    'agile', 'scrum', 'kanban', 'rest api', 'restful api', 'microservices', 'unit testing',
    'integration testing', 'jest', 'cypress', 'playwright', 'tdd', 'oop', 'system design'
  ],
  soft_skills: [
    'problem solving', 'communication', 'team leadership', 'collaboration', 'critical thinking',
    'adaptability', 'time management', 'project management', 'cross-functional', 'mentorship',
    'analytical skills', 'conflict resolution', 'stakeholder management'
  ]
};

export const METRIC_REGEX = /\b(\d+(\.\d+)?%|\$\d+([,\.]\d+)?([kmbKMB])?|\d+x|\d+\s*(users|clients|customers|requests|transactions|ms|seconds|minutes|hours|days|weeks|months|years|members|engineers|people|percent|increase|reduction|improvement|dollars|revenue|growth|points))\b/i;
