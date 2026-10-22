export const profile = {
  name: "Nikhil Sai Nambula",
  shortName: "Nikhil Sai",
  initials: "NS",
  role: "Java Backend Developer, Distributed Systems",
  roles: [
    "Java Backend Developer",
    "Spring Boot Microservices",
    "Distributed Systems & Reliability",
  ],
  summary:
    "I build Java and Spring Boot services that stay up when a dependency does not. Three years in production on a platform serving 2 million users.",
  email: "nambula.nikhilsai@gmail.com",
  phone: "+91 63050 57714",
  location: "Hyderabad, India",
  available: true,
  availabilityNote: "Open to backend and distributed systems roles",
  links: {
    github: "https://github.com/Nikhil-sai-nambula",
    linkedin: "https://linkedin.com/in/nikhil-sai-nambula",
    leetcode: "https://leetcode.com/u/Nikhilsai007",
    resume: "/resume.pdf",
  },
};

/**
 * Single source of truth for CTA labels.
 */
export const cta = {
  work: "See the work",
  architecture: "Explore Architecture",
  email: "Email me",
  resume: "Resume",
  contact: "Get in touch",
};

export const heroStats = [
  { value: "3+", numericValue: 3, unit: "yrs", label: "in production" },
  { value: "2M+", numericValue: 2, unit: "M+", label: "users served" },
  { value: "50K+", numericValue: 50, unit: "K+", label: "requests a day" },
  { value: "1000+", numericValue: 1000, unit: "+", label: "LeetCode solved" },
];

export const marquee = [
  "Java",
  "Spring Boot",
  "Microservices",
  "Kafka",
  "Redis",
  "PostgreSQL",
  "Kubernetes",
  "AWS",
  "Docker",
  "Terraform",
  "gRPC",
  "Distributed systems",
  "Observability",
  "Circuit breakers",
  "React",
  "System design",
];

export const about = {
  heading: "The interesting problems start when something downstream stops answering.",
  paragraphs: [
    "I am a Java backend developer at Tata Consultancy Services, where I own three Spring Boot microservices end to end on AWS. The platform serves over 2 million users and about 50,000 requests a day.",
    "Most of my work sits in the gap between working and keeping working. I redesigned JPA fetch strategies to kill an N+1 query pattern, which took a request from roughly 40 database round-trips down to 8. I built a Redis caching layer with per-key TTL policies that cut primary database load by 40%. I put circuit breakers, retry with exponential backoff and dead-letter queues in front of services that are allowed to fail.",
    "Outside of work I grind DSA and design systems, which is where the 1000+ LeetCode problems and the low-level-design playground come from. AWS Certified Developer, Associate, 2026.",
  ],
  principles: [
    {
      title: "Measure first",
      body: "Every performance number I quote came off a query plan, a profiler or a load test.",
    },
    {
      title: "Design the failure path",
      body: "Timeouts, retries, poison messages and partial writes are where systems actually live.",
    },
    {
      title: "Boring technology",
      body: "A well-understood Postgres beats a distributed novelty at 3am.",
    },
    {
      title: "Readable over clever",
      body: "SOLID and named patterns exist so the next person can extend the code.",
    },
  ],
};

export type SkillCluster = {
  title: string;
  category: "all" | "languages" | "backend" | "cloud" | "data";
  layout: "wide" | "split";
  groups: { label: string; items: string[] }[];
};

export const skillClusters: SkillCluster[] = [
  {
    title: "Languages and low-level design",
    category: "languages",
    layout: "split",
    groups: [
      {
        label: "Languages",
        items: ["Java", "Python", "C++", "JavaScript", "SQL"],
      },
      {
        label: "Low-level design",
        items: [
          "SOLID principles",
          "Strategy Pattern",
          "Factory Pattern",
          "Observer Pattern",
          "Singleton Pattern",
          "State Machine",
        ],
      },
    ],
  },
  {
    title: "Backend and distributed systems",
    category: "backend",
    layout: "split",
    groups: [
      {
        label: "Frameworks & APIs",
        items: [
          "Spring Boot",
          "Spring Security",
          "REST APIs",
          "gRPC",
          "Hibernate",
          "JPA",
        ],
      },
      {
        label: "Distributed Architecture",
        items: [
          "Microservices",
          "Event-driven architecture",
          "Kafka message queues",
          "Resilience4j Circuit Breakers",
          "Dead-letter queues",
          "Distributed caching",
          "High availability",
          "CAP theorem",
        ],
      },
    ],
  },
  {
    title: "Data, cloud and delivery",
    category: "cloud",
    layout: "wide",
    groups: [
      {
        label: "Data stores",
        items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch"],
      },
      {
        label: "AWS Infrastructure",
        items: [
          "EC2",
          "S3",
          "Lambda",
          "DynamoDB",
          "API Gateway",
          "SQS",
          "EKS",
          "CloudWatch",
          "X-Ray",
        ],
      },
      {
        label: "DevOps & Testing",
        items: [
          "Git",
          "GitHub Actions",
          "Docker",
          "Kubernetes",
          "Terraform",
          "Linux",
          "Maven",
          "JUnit 5",
          "Mockito",
          "JMeter",
          "React",
        ],
      },
    ],
  },
];

export type Experience = {
  company: string;
  location: string;
  title: string;
  dates: string;
  summary: string;
  highlights: { metric: string; rest: string }[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    company: "Tata Consultancy Services (TCS)",
    location: "Hyderabad, India",
    title: "Java Backend Developer",
    dates: "June 2023 to present",
    summary:
      "Three Spring Boot microservices owned end to end, from design through deployment and monitoring. Serving 2 million active users and 50,000+ requests daily.",
    highlights: [
      {
        metric: "Reduced API latency by 30%",
        rest: " by redesigning JPA and Hibernate fetch strategies, cutting database round-trips per request from about 40 to 8.",
      },
      {
        metric: "Cut primary database load by 40%",
        rest: " with a distributed Redis caching layer using custom per-key TTL policies, which also improved P99 throughput under burst traffic.",
      },
      {
        metric: "Decoupled three downstream services",
        rest: " by moving them onto a Kafka event-driven architecture instead of synchronous calls.",
      },
      {
        metric: "Implemented JWT and role-based access control",
        rest: " across the REST APIs, and wrote the JUnit 5 and Mockito suites for the services I own.",
      },
    ],
    stack: ["Java", "Spring Boot", "AWS", "Kafka", "Redis", "PostgreSQL", "Kubernetes"],
  },
];

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  blurb: string;
  bullets: string[];
  stack: string[];
  category: "Distributed Systems" | "Computer Vision" | "AI & Tooling";
  links: { label: string; href: string }[];
  technicalSpecs: {
    pattern: string;
    throughputOrMetric: string;
    storage: string;
    resilience: string;
  };
  deepDive: {
    challenge: string;
    solution: string;
    keyTakeaway: string;
  };
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "shopverse",
    title: "ShopVerse",
    subtitle: "Distributed e-commerce backend platform",
    blurb:
      "A distributed commerce platform built from scratch. Orders move through an explicit finite state machine rather than mutable status flags, and sessions live in Redis cluster with token-bucket rate limiting.",
    bullets: [
      "Java, Spring Boot and MongoDB on the backend, structured strictly around SOLID and clean architecture.",
      "Stateless JWT authentication paired with Redis session management and automatic token revocation.",
      "Optimistic locking mechanism on inventory models preventing duplicate deductions during high concurrency.",
      "Automated CI/CD deployment pipeline with GitHub Actions, containerized with Docker.",
    ],
    stack: ["Java", "Spring Boot", "MongoDB", "Redis", "JWT", "Docker", "React"],
    category: "Distributed Systems",
    links: [
      { label: "Source code", href: "https://github.com/Nikhil-sai-nambula/ShopVerse" },
    ],
    technicalSpecs: {
      pattern: "Event-Driven & Finite State Machine",
      throughputOrMetric: "Sub-45ms P95 latency on order processing",
      storage: "MongoDB document store with compound indexes",
      resilience: "Redis TTL auto-invalidation & optimistic locking",
    },
    deepDive: {
      challenge:
        "Handling concurrent order checkouts without blocking the database or allowing overselling inventory during traffic spikes.",
      solution:
        "Implemented an explicit state machine (CREATED -> RESERVED -> PAID -> SHIPPED) using optimistic concurrency controls. Cart data stored in Redis with per-key TTLs rather than hitting primary storage on every mutation.",
      keyTakeaway:
        "Decoupling checkout state from immediate database writes eliminated write contention and preserved inventory accuracy.",
    },
    featured: true,
  },
  {
    id: "recipe-vision",
    title: "Recipe generation from food photos",
    subtitle: "Computer vision & deep learning pipeline",
    blurb:
      "An end-to-end vision pipeline that parses raw dish images and predicts ingredient compositions. InceptionV3 and Xception convolutional feature encoders feed an LSTM sequential decoder.",
    bullets: [
      "Achieved 87% top-5 accuracy on a custom-annotated subset of the Food-101 benchmark.",
      "Implemented transfer learning with fine-tuned top layers over dual frozen convolutional backbones.",
      "Sequence decoding optimized using beam search with a width of 3 to output coherent ingredient lists.",
    ],
    stack: ["Python", "TensorFlow", "Keras", "InceptionV3", "Xception", "LSTM"],
    category: "Computer Vision",
    links: [],
    technicalSpecs: {
      pattern: "Encoder-Decoder CNN-LSTM Architecture",
      throughputOrMetric: "87% Top-5 ingredient prediction accuracy",
      storage: "NumPy / HDF5 tensor representations",
      resilience: "Beam Search decoding with fallback greedy evaluation",
    },
    deepDive: {
      challenge:
        "Food dishes vary dramatically in visual presentation, plating, and lighting, making monolithic classifier models prone to high variance.",
      solution:
        "Fused spatial features from InceptionV3 and Xception architectures to build robust feature maps before piping embeddings into a recurrent LSTM decoder.",
      keyTakeaway:
        "Ensemble feature extraction reduced false positives on mixed ingredient dishes by 23% compared to single-backbone baselines.",
    },
  },
  {
    id: "apply-pilot",
    title: "ApplyPilot",
    subtitle: "AI Job Application Autofill Chrome Extension (Manifest V3)",
    blurb:
      "A deterministic autofill Chrome extension (Manifest V3) with semantic field ontology and dynamic verification. Automatically identifies and accurately fills multi-page job applications using an intermediate representation (FormIR) and per-kind filling strategies without blind auto-submitting.",
    bullets: [
      "Built as a modular monorepo with Manifest V3 (background worker, content scripts, React side panel) paired with a Fastify API backend.",
      "Engineered a deterministic 5-step pipeline: FormIR page scanning, semantic FieldMatcher ontology lookup, and per-kind AutofillExecutor.",
      "Validated against a golden-question benchmark suite (126 entries across 35 intents) achieving >=95% accuracy, <5ms latency, and zero false positives.",
      "End-to-end browser test automation with Playwright against a synthetic 7-page ATS simulator handling CAPTCHA, OTP, and dynamic DOM mutations.",
    ],
    stack: [
      "TypeScript",
      "Chrome Extension (MV3)",
      "Fastify",
      "React",
      "Playwright",
      "Vitest",
      "Zod",
    ],
    category: "AI & Tooling",
    links: [
      {
        label: "Source code",
        href: "https://github.com/Nikhil-sai-nambula/apply-pilot",
      },
    ],
    technicalSpecs: {
      pattern: "Deterministic FormIR & Semantic Ontology",
      throughputOrMetric: ">=95% Accuracy, <5ms Field Matching Latency",
      storage: "Chrome Storage API + Fastify Profile Store",
      resilience: "MutationObserver Re-scan & Safety Halts on Challenges",
    },
    deepDive: {
      challenge:
        "Modern applicant tracking systems (ATS) use highly variable, deeply nested custom DOM structures (custom comboboxes, date-pickers, async late-rendered inputs). Blind autofill frequently enters incorrect data or crashes when encountering verification challenges.",
      solution:
        "Abstracted web forms into a structured FormIR intermediate representation mapped by @apply-pilot/field-ontology with confidence scoring. Implemented DOM MutationObserver to catch late-rendered fields and enforced strict guardrails that halt continuous filling at CAPTCHA, OTP, or legal checkpoints without ever triggering auto-submit.",
      keyTakeaway:
        "Decoupling semantic form ontology from browser execution strategies achieved high accuracy and zero false positives across complex multi-step application portals.",
    },
  },
];

export const leetcodeStats = {
  total: 1042,
  easy: 386,
  medium: 532,
  hard: 124,
  ranking: "Top 3.8%",
  contestRating: "1860+",
  topTopics: [
    { name: "Dynamic Programming", count: 215, pct: 92 },
    { name: "Graph & Tree Algorithms", count: 260, pct: 95 },
    { name: "Binary Search & Sorting", count: 145, pct: 88 },
    { name: "Sliding Window & Pointers", count: 110, pct: 90 },
    { name: "Heaps, Tries & Design", count: 85, pct: 82 },
  ],
};

export const education = {
  school: "SRKR Engineering College",
  location: "Bhimavaram, Andhra Pradesh",
  dates: "2019 to 2023",
  degree: "B.Tech, Computer Science and Engineering",
  gpa: "GPA 8.0 / 10.0",
  coursework: [
    "Data structures and algorithms",
    "Operating systems",
    "DBMS & Transaction Management",
    "Computer networks",
    "Object-oriented analysis and design",
    "Distributed computing",
    "Cloud computing",
    "Design and analysis of algorithms",
  ],
};

export const certifications = [
  {
    title: "AWS Certified Developer, Associate",
    issuer: "Amazon Web Services",
    year: "2026",
    detail:
      "Core cloud mastery covering EC2, Lambda serverless, DynamoDB, API Gateway, SQS queues, and IAM least-privilege security.",
    credentialId: "AWS-DEV-ASSOC-2026",
  },
  {
    title: "1000+ LeetCode Solved",
    issuer: "LeetCode Competitive",
    year: "Ongoing",
    detail:
      "Top 3.8% globally. Deep focus on dynamic programming, topological sorting, graph cycle detection, and memory-efficient algorithms.",
    credentialId: "leetcode.com/u/Nikhilsai007",
  },
];

export const architectureSimulationData = {
  services: [
    {
      id: "api-gw",
      name: "API Gateway",
      type: "Gateway",
      tech: "AWS API Gateway",
      p95: "8ms",
      status: "Healthy",
    },
    {
      id: "auth-svc",
      name: "Auth Service",
      type: "Microservice",
      tech: "Spring Boot + JWT",
      p95: "14ms",
      status: "Healthy",
    },
    {
      id: "order-svc",
      name: "Order Orchestrator",
      type: "Microservice",
      tech: "Spring Boot + Resilience4j",
      p95: "24ms",
      status: "Protected",
    },
    {
      id: "redis-cache",
      name: "Redis Cache Cluster",
      type: "Cache",
      tech: "Redis In-Memory",
      p95: "2ms",
      status: "91% Hit Ratio",
    },
    {
      id: "kafka-bus",
      name: "Kafka Event Broker",
      type: "Message Queue",
      tech: "Apache Kafka",
      p95: "5ms",
      status: "0 Consumer Lag",
    },
    {
      id: "postgres-db",
      name: "Primary PostgreSQL",
      type: "Database",
      tech: "AWS RDS PostgreSQL",
      p95: "18ms",
      status: "Optimal (8 roundtrips)",
    },
  ],
};

export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "architecture", label: "Architecture" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Credentials" },
  { id: "contact", label: "Contact" },
];
