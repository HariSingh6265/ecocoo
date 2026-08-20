export interface SampleJob {
  id: string;
  title: string;
  company: string;
  roleType: string;
  description: string;
}

export const SAMPLE_JOBS: SampleJob[] = [
  {
    id: 'job-fullstack',
    title: 'Senior Full Stack Software Engineer',
    company: 'Stripe / Tech Corp',
    roleType: 'Full-time · Remote',
    description: `We are looking for a Senior Full Stack Engineer to build high-scale payment workflows and developer APIs.

Key Responsibilities:
- Design, build, and maintain scalable microservices using Node.js, TypeScript, and Go.
- Architect high-performance client applications with React, Next.js, and Tailwind CSS.
- Design relational database schemas and optimize queries in PostgreSQL and Redis.
- Deploy and manage containerized services using Docker, Kubernetes, and AWS (ECS, Lambda, S3).
- Implement automated testing with Jest, Cypress, and CI/CD pipelines via GitHub Actions.
- Collaborate with product managers and designers in an agile/scrum environment.

Requirements:
- 3+ years of professional experience in full-stack software development.
- Strong proficiency in JavaScript/TypeScript, React, Node.js, and SQL.
- Hands-on experience with RESTful APIs, GraphQL, and microservices architecture.
- Experience with cloud providers (AWS or GCP) and Docker containerization.
- Strong problem-solving, communication, and system design skills.
- Bachelor's or Master's degree in Computer Science or equivalent practical experience.`,
  },
  {
    id: 'job-frontend',
    title: 'Frontend React Developer',
    company: 'Vercel / NextGen UI',
    roleType: 'Full-time · Hybrid',
    description: `Seeking a passionate Frontend React Developer to craft world-class interactive web experiences.

Responsibilities:
- Build responsive, accessible, and high-performance user interfaces using React, Next.js, and TypeScript.
- Implement sleek animations and modern UI design systems using Tailwind CSS and Framer Motion.
- Optimize frontend web vitals (LCP, FID, CLS) and improve client-side rendering performance.
- Integrate frontend applications with REST and GraphQL backend services.
- Write unit and end-to-end tests using Jest, React Testing Library, and Playwright.

Qualifications:
- 2+ years of experience with modern React, TypeScript, HTML5, and CSS3/Tailwind.
- Deep understanding of state management (Zustand, Redux) and React Server Components.
- Proficiency in Git, CI/CD, responsive web design, and cross-browser compatibility.
- Experience with Webpack/Vite and Web Performance Optimization.`,
  },
  {
    id: 'job-data-scientist',
    title: 'Data Scientist / Machine Learning Engineer',
    company: 'Anthropic / AI Labs',
    roleType: 'Full-time · Remote',
    description: `Join our team to develop state-of-the-art machine learning models and data analytics pipelines.

Responsibilities:
- Build, evaluate, and deploy machine learning models using Python, PyTorch, Scikit-learn, and TensorFlow.
- Conduct exploratory data analysis (EDA) and feature engineering using Pandas, NumPy, and SQL.
- Implement NLP and Generative AI solutions leveraging LLMs and HuggingFace transformers.
- Build automated data processing and model retraining pipelines using Airflow and Kafka.
- Create data visualizations and executive dashboards in Tableau or Power BI.

Qualifications:
- Bachelor's or Master's degree in Data Science, Computer Science, Statistics, or related field.
- 2+ years of hands-on experience in predictive modeling, statistical analysis, and ML deployment.
- Strong proficiency in Python, SQL, Docker, and AWS SageMaker or GCP Vertex AI.`,
  },
  {
    id: 'job-devops',
    title: 'Cloud & DevOps Engineer',
    company: 'CloudScale Inc',
    roleType: 'Full-time · Remote',
    description: `We are hiring a Cloud & DevOps Engineer to scale our multi-cloud infrastructure and automate deployments.

Key Requirements:
- Build Infrastructure as Code (IaC) using Terraform and Ansible on AWS/Azure.
- Manage container orchestration with Kubernetes (EKS/GKE) and Docker.
- Implement robust CI/CD pipelines using GitHub Actions, GitLab CI, or Jenkins.
- Configure monitoring, alerting, and log aggregation with Prometheus, Grafana, and ELK Stack.
- Strong Linux administration, Bash scripting, Python automation, and security hardening skills.`,
  },
];
