export interface Project {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  category: 'DevOps / CI/CD' | 'Kubernetes / Cloud' | 'AI / Cloud Systems' | 'Full-Stack / Microservices';
  tags: string[];
  metrics: { label: string; value: string; color: string }[];
  bulletPoints: string[];
  architecture: {
    layers: string[];
    security: string[];
    tools: string[];
  };
  githubUrl?: string;
  liveUrl?: string;
  dockerHub?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  badge: string;
  items: { name: string; level: number; note: string }[];
}

export const PERSONAL_INFO = {
  name: "MOHAMMED SULAYMAN",
  title: "DevOps & Site Reliability Engineer",
  tagline: "Engineering zero-downtime deployments, hardened DevSecOps pipelines, and self-healing Kubernetes infrastructure.",
  location: "Bengaluru, India",
  phone: "+91-7338591975",
  email: "mdsulaymanzain2@gmail.com",
  linkedin: "https://www.linkedin.com/in/mohammed-sulayman-958b4b28b/",
  github: "https://github.com/Mohammedsulayman123",
  education: {
    institution: "BMS COLLEGE OF ENGINEERING",
    degree: "B.E. Computer Science and Engineering",
    cgpa: "8.2",
    period: "Sep 2023 – Present",
    location: "Bangalore, India",
    highlights: [
      "Specialized coursework in Distributed Systems, Operating Systems, Computer Networks, and Database Systems",
      "Active participant in technical symposiums, hackathons, and cloud architecture challenges"
    ]
  },
  stats: [
    { label: "Target Uptime SLA", value: "99.9%", subtext: "Maintained in production workloads" },
    { label: "Pipeline Speedup", value: "30%", subtext: "Reduced time-to-market at Ooredoo" },
    { label: "Manual Effort Cut", value: "40%", subtext: "Automated test-to-deploy pipelines" },
    { label: "Security Scanning", value: "0 CVEs", subtext: "Trivy & SonarQube quality gate" },
  ]
};

export const INTERNSHIP = {
  company: "Ooredoo Qatar",
  role: "DevOps Intern",
  location: "Doha, Qatar (Remote / Hybrid)",
  period: "Aug 2026 – Aug 2026",
  status: "COMPLETED",
  description: "Accelerated cloud delivery cycles and reinforced infrastructure reliability for telecom-scale services.",
  highlights: [
    "Built and Managed CI/CD pipelines using Jenkins, automating applications testing, Docker builds, Security Scanning, and Deployment Workflows, contributing to a 30% reduction in time-to-market.",
    "Worked with Docker for containerization and implemented DevSecOps practices using SonarQube and Trivy for code-quality and security scanning.",
    "Deployed and managed applications using Kubernetes, Minikube, and Kind, working with Pods, Deployments, Services, persistent storage, Helm, Ingress, and auto-scaling.",
    "Implemented Prometheus and Grafana for monitoring and observability, including metrics visualization and alerting, helping maintain 99.9% application uptime."
  ],
  stack: ["Jenkins", "Docker", "Kubernetes", "Helm", "Prometheus", "Grafana", "SonarQube", "Trivy", "Minikube", "Kind"]
};

export const PROJECTS: Project[] = [
  {
    id: "wanderlust-devsecops",
    title: "Wanderlust DevSecOps",
    subtitle: "End-to-End Hardened CI/CD Pipeline & Vulnerability Shield",
    date: "Jul 2026",
    category: "DevOps / CI/CD",
    tags: ["Jenkins", "Docker", "SonarQube", "Trivy", "Git/GitHub", "Docker Hub", "DevSecOps"],
    metrics: [
      { label: "Deployment Effort", value: "-40%", color: "text-emerald-400" },
      { label: "Pipeline Stages", value: "6 Automated", color: "text-cyan-400" },
      { label: "Security Gates", value: "Strict SAST/CVE", color: "text-purple-400" },
    ],
    bulletPoints: [
      "Engineered Jenkins CI/CD pipelines connected to Git/GitHub across 6 automated stages including testing, Docker image builds, security scanning, and deployment workflows.",
      "Containerized the application using Docker and integrated SonarQube for code-quality analysis and Trivy for container vulnerability scanning.",
      "Implemented a DevSecOps workflow that integrates automated testing, code-quality checks, security scanning, and Docker image publishing to Docker Hub, reducing manual deployment effort by 40%."
    ],
    architecture: {
      layers: ["GitHub Webhook Trigger", "Jenkins Pipeline Runner", "SonarQube SAST Analysis", "Trivy Vulnerability Gate", "Docker Hub Registry"],
      security: ["Static Application Security Testing (SAST)", "Container Base-Image CVE Scan", "Secret Scanning", "Quality Gate Blocker"],
      tools: ["Jenkins Declarative Pipeline", "Docker Engine", "SonarScanner", "Trivy CLI"]
    }
  },
  {
    id: "three-tier-chat",
    title: "Three-Tier Chat Application",
    subtitle: "Production-Grade Kubernetes Architecture with Automated Monitoring",
    date: "Aug 2026",
    category: "Kubernetes / Cloud",
    tags: ["Kubernetes", "Docker", "Helm", "Prometheus", "Grafana", "Jenkins", "MongoDB", "Ingress"],
    metrics: [
      { label: "Service Availability", value: "99.9%", color: "text-emerald-400" },
      { label: "Tier Isolation", value: "Frontend / API / DB", color: "text-cyan-400" },
      { label: "Scaling Policy", value: "HPA Auto-Scale", color: "text-blue-400" },
    ],
    bulletPoints: [
      "Automated application builds, testing, Docker image creation, security scanning, and deployment through Jenkins and Git/GitHub.",
      "Deployed a 3-tier full-stack chat application using Docker and Kubernetes, separating frontend, backend, and MongoDB layers with Helm, Ingress, persistent storage, and auto-scaling.",
      "Established DevSecOps practices with security scanning and used Prometheus and Grafana for monitoring, observability, metrics visualization, and alerting, supporting 99.9% application availability."
    ],
    architecture: {
      layers: ["NGINX Ingress Controller", "React Web Frontend Pods", "Node.js API Services", "StatefulSet MongoDB with PVC Storage"],
      security: ["Network Policies", "TLS Termination at Ingress", "Non-root Container Users", "RBAC Service Accounts"],
      tools: ["Kubernetes (K8s)", "Helm Charts", "Prometheus Node Exporter", "Grafana Dashboards"]
    }
  },
  {
    id: "ai-k8s-agent",
    title: "AI Kubernetes Agent",
    subtitle: "Autonomous Cluster Diagnostics & Incident Remediation Assistant",
    date: "Oct 2026",
    category: "AI / Cloud Systems",
    tags: ["Next.js", "FastAPI", "Kubernetes", "OpenRouter", "InsForge", "Docker", "Docker Compose"],
    metrics: [
      { label: "Investigation Scope", value: "Pod / Node / Cluster", color: "text-cyan-400" },
      { label: "MTTR Reduction", value: "Instant RCA", color: "text-purple-400" },
      { label: "Stack", value: "FastAPI + Next.js", color: "text-emerald-400" },
    ],
    bulletPoints: [
      "Built an AI-assisted Kubernetes troubleshooting dashboard with Next.js and FastAPI, supporting cluster, namespace, and pod-level investigations.",
      "Developed evidence collection across pods, logs, events, deployments, and networking, with OpenRouter-generated root-cause analysis and remediation suggestions.",
      "Integrated InsForge authentication, real-time progress, and per-user investigation history; containerized the application with Docker Compose."
    ],
    architecture: {
      layers: ["Next.js UI & WebSockets", "FastAPI Agent Orchestrator", "K8s API Collector (Client-Go / Python K8s)", "LLM Root-Cause Engine (OpenRouter)"],
      security: ["Scoped ClusterRole Tokens", "InsForge Auth & JWT", "Audited Prompt Sanitization", "Sandboxed Execution"],
      tools: ["Kubernetes Client", "Docker Compose", "FastAPI Asynchronous Engine", "Next.js 14"]
    }
  },
  {
    id: "industrial-symbiosis",
    title: "Industrial Symbiosis Platform",
    subtitle: "AI-Driven Waste-to-Resource Circular Economy Matching Engine",
    date: "Dec 2025",
    category: "Full-Stack / Microservices",
    tags: ["React", "Tailwind CSS", "Python", "Go (Gin)", "PostgreSQL", "Google Gemini API"],
    metrics: [
      { label: "Document Formats", value: "PDF / DOCX / TXT", color: "text-amber-400" },
      { label: "Processing Mode", value: "Async Pipelines", color: "text-cyan-400" },
      { label: "AI Reasoning", value: "Gemini Pro", color: "text-purple-400" },
    ],
    bulletPoints: [
      "Developed an AI-driven industrial symbiosis platform matching companies' waste outputs with other firms' input needs for sustainable resource exchange.",
      "Architected a full-stack system with a Go (Gin) backend, Python document-processing worker, PostgreSQL (JSONB), and a modern React dashboard for managing profiles and matches.",
      "Implemented multi-format document parsing (PDF, DOCX, TXT) and an asynchronous processing pipeline to automatically extract company profiles, waste streams, and resource requirements.",
      "Integrated Google Gemini API to classify waste streams, discover potential consumer industries, estimate conversion requirements, and generate explainable reasoning and scores for each recommended match."
    ],
    architecture: {
      layers: ["React 18 Dashboard", "Go Gin REST Gateway", "Python Async Celery/Worker", "PostgreSQL JSONB Store", "Google Gemini API"],
      security: ["Role-Based Access Control", "Encrypted Document Storage", "Rate-Limiting Middleware", "Secure API Vault"],
      tools: ["Go (Gin)", "Python Document Parsers", "PostgreSQL", "Google Gemini API", "Tailwind CSS"]
    }
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Container & Orchestration",
    icon: "Layers",
    badge: "Production Ready",
    items: [
      { name: "Kubernetes (K8s)", level: 92, note: "Pods, Deployments, Services, Ingress, HPA, PVC" },
      { name: "Docker & Containerization", level: 95, note: "Multi-stage builds, layer caching, rootless containers" },
      { name: "Helm Package Manager", level: 88, note: "Custom charts, value templating, rollbacks" },
      { name: "Minikube & Kind", level: 90, note: "Local cluster staging, multi-node testing" }
    ]
  },
  {
    title: "CI/CD & DevSecOps",
    icon: "GitBranch",
    badge: "Automated Gates",
    items: [
      { name: "Jenkins Pipelines", level: 94, note: "Declarative Groovy, multi-stage pipelines, webhooks" },
      { name: "Trivy Security Scanning", level: 90, note: "Container CVE detection, image quality gates" },
      { name: "SonarQube SAST", level: 88, note: "Static code analysis, quality gate rules, code smells" },
      { name: "Git / GitHub / Workflows", level: 95, note: "Branching strategies, PR automation, release tagging" }
    ]
  },
  {
    title: "Observability & SRE",
    icon: "Activity",
    badge: "99.9% SLA",
    items: [
      { name: "Prometheus", level: 89, note: "PromQL, Node Exporter, alert rules, scraping targets" },
      { name: "Grafana", level: 92, note: "Custom dashboards, incident telemetry, alert channels" },
      { name: "Linux & Shell Scripting", level: 92, note: "Bash, systemd, process debugging, networking" },
      { name: "Reliability & SLI/SLO", level: 86, note: "Error budget tracking, MTTR reduction, runbooks" }
    ]
  },
  {
    title: "Backend & Systems",
    icon: "Server",
    badge: "Distributed",
    items: [
      { name: "Python & FastAPI", level: 90, note: "Async workers, K8s SDK, AI agent orchestration" },
      { name: "Go (Golang / Gin)", level: 82, note: "High-throughput APIs, microservice backends" },
      { name: "Java & C", level: 80, note: "Core systems engineering, algorithms, memory models" },
      { name: "Next.js & React", level: 88, note: "SRE dashboards, real-time telemetry UIs" }
    ]
  },
  {
    title: "Databases & Cloud APIs",
    icon: "Database",
    badge: "Resilient Data",
    items: [
      { name: "PostgreSQL & JSONB", level: 87, note: "Relational modeling, semi-structured queries" },
      { name: "MongoDB", level: 85, note: "Document store, replica sets, K8s stateful deployments" },
      { name: "MySQL / SQL", level: 85, note: "Queries, indexing, transactions, backups" },
      { name: "Google Gemini & OpenRouter", level: 88, note: "LLM agents, root-cause diagnosis, structured reasoning" }
    ]
  }
];

export const MOCK_TERMINAL_PODS = [
  { namespace: "monitoring", name: "prometheus-k8s-0", ready: "2/2", status: "Running", restarts: 0, age: "42d", ip: "10.244.1.18" },
  { namespace: "monitoring", name: "grafana-core-7bf488f-j2k9q", ready: "1/1", status: "Running", restarts: 0, age: "42d", ip: "10.244.1.19" },
  { namespace: "security", name: "trivy-scanner-cron-8kdf2", ready: "1/1", status: "Completed", restarts: 0, age: "3h", ip: "10.244.2.04" },
  { namespace: "security", name: "sonarqube-ce-599c9c58b-x7pld", ready: "1/1", status: "Running", restarts: 0, age: "18d", ip: "10.244.2.11" },
  { namespace: "production", name: "wanderlust-api-5d76bf6774-8h2kz", ready: "1/1", status: "Running", restarts: 0, age: "12d", ip: "10.244.3.55" },
  { namespace: "production", name: "chat-backend-67f94bbcd-w8mnv", ready: "1/1", status: "Running", restarts: 0, age: "9d", ip: "10.244.3.72" },
  { namespace: "production", name: "chat-frontend-7f8976b97-l9kxp", ready: "1/1", status: "Running", restarts: 0, age: "9d", ip: "10.244.3.73" },
  { namespace: "production", name: "mongodb-statefulset-0", ready: "1/1", status: "Running", restarts: 0, age: "35d", ip: "10.244.3.40" },
  { namespace: "ai-ops", name: "k8s-ai-agent-68cb88fc7-r4jtw", ready: "1/1", status: "Running", restarts: 0, age: "4d", ip: "10.244.4.15" },
];

export const PIPELINE_STEPS = [
  {
    id: 1,
    name: "Git Webhook",
    tool: "GitHub",
    command: "git fetch && git checkout main",
    duration: "2s",
    logs: [
      "[INFO] Webhook received from github.com/Mohammedsulayman123/wanderlust",
      "[INFO] Commit SHA: 8f420ac8 (feat: optimize k8s ingress routing)",
      "[INFO] Workspace initialized on runner-worker-03"
    ]
  },
  {
    id: 2,
    name: "SAST & Lint",
    tool: "SonarQube",
    command: "sonar-scanner -Dsonar.projectKey=wanderlust",
    duration: "18s",
    logs: [
      "[INFO] Executing SonarScanner 5.0.1...",
      "[INFO] Analyzing 124 source files across backend and frontend...",
      "[QUALITY GATE] Reliability: A | Security: A | Maintainability: A",
      "[QUALITY GATE] 0 Vulnerabilities | 0 Security Hotspots | Gate: PASSED"
    ]
  },
  {
    id: 3,
    name: "Docker Build",
    tool: "Docker",
    command: "docker build -t wanderlust:v2.4 -f Dockerfile .",
    duration: "34s",
    logs: [
      "[STEP 1/6] FROM node:20-alpine AS builder",
      "[STEP 2/6] COPY package*.json ./ && RUN npm ci --omit=dev",
      "[STEP 3/6] COPY . . && RUN npm run build",
      "[STEP 4/6] FROM alpine:3.19 (Non-root user: 10001:10001)",
      "[STEP 5/6] COPY --from=builder /app/dist /usr/share/app",
      "[SUCCESS] Image built successfully: wanderlust:v2.4 (Size: 48.2MB)"
    ]
  },
  {
    id: 4,
    name: "CVE Audit",
    tool: "Trivy",
    command: "trivy image --severity HIGH,CRITICAL wanderlust:v2.4",
    duration: "12s",
    logs: [
      "[INFO] Updating Trivy vulnerability database...",
      "[INFO] Scanning image wanderlust:v2.4 (alpine 3.19)...",
      "[REPORT] CRITICAL: 0 | HIGH: 0 | MEDIUM: 0 | LOW: 0",
      "[SECURITY CHECK] 0 Blockers found. Approved for registry push."
    ]
  },
  {
    id: 5,
    name: "Registry Push",
    tool: "Docker Hub",
    command: "docker push registry.hub.docker.com/sulayman/wanderlust:v2.4",
    duration: "14s",
    logs: [
      "[INFO] Authenticated to Docker Hub registry as user: sulayman",
      "[INFO] Pushing layer 931d8e... [Layer already exists]",
      "[INFO] Pushing layer 4f0a21... [Mounted from alpine]",
      "[SUCCESS] Tagged & pushed digest: sha256:d8b2e1... [SUCCESS]"
    ]
  },
  {
    id: 6,
    name: "K8s Rollout",
    tool: "Kubernetes & Helm",
    command: "helm upgrade --install wanderlust ./helm-chart --set image.tag=v2.4",
    duration: "21s",
    logs: [
      "[HELM] Release 'wanderlust' upgraded successfully to revision 14",
      "[K8S] deployment.apps/wanderlust-api rolling update started",
      "[K8S] Pod wanderlust-api-new ready (1/1). Terminating old replica.",
      "[PROMETHEUS] Synthetic health check 200 OK. Latency: 12ms. Uptime SLA: 99.98%"
    ]
  }
];

