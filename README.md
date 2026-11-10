# Mohammed Sulayman — DevOps & SRE Engineer Portfolio 🚀

A high-performance, command-center style portfolio designed specifically for **DevOps & Site Reliability Engineering (SRE)** roles.

Live demonstration of infrastructure automation, Kubernetes orchestration, DevSecOps gates, and Prometheus/Grafana observability.

---

## ⚡ Key Highlights & Features

- **Interactive CI/CD Pipeline Visualizer**: 
  - 6-stage automated Jenkins pipeline simulation (Webhook Trigger → SonarQube SAST → Docker Multi-Stage Build → Trivy CVE Scan → Docker Hub Push → Kubernetes Rolling Rollout).
  - Live streaming build console and step duration telemetry.
- **Embedded SRE Terminal CLI**:
  - Full-featured interactive terminal with commands like `kubectl get pods -A`, `kubectl get nodes`, `cat skills.yaml`, `trivy scan wanderlust`, `sonarqube status`, `curl /contact`, `uptime`, etc.
  - Can be toggled globally anytime using the backtick shortcut (`~`).
- **Grafana-Style Observability Dashboard**:
  - Live telemetry simulation (SLA Uptime 99.98%, CI/CD success rate 98.4%, Cluster CPU/Memory load, and DevSecOps vulnerability counters).
- **Projects Showcase with Architecture Spec Inspector**:
  - **Wanderlust DevSecOps** (Jenkins, Docker, SonarQube, Trivy, Git/GitHub)
  - **Three-Tier Chat Application** (Kubernetes, Docker, Helm, Prometheus, Grafana, MongoDB)
  - **AI Kubernetes Agent** (Next.js, FastAPI, Kubernetes, OpenRouter, InsForge, Docker)
  - **Industrial Symbiosis Platform** (React, Go Gin, Python Async Worker, PostgreSQL JSONB, Gemini API)
- **Work Experience & Education**:
  - **Ooredoo Qatar** (DevOps Intern — 30% time-to-market reduction, 99.9% uptime)
  - **BMS College of Engineering** (B.E. Computer Science & Engineering, CGPA 8.2)
- **SRE Dispatch Pager / Incident Contact Form**:
  - Direct contact links, click-to-copy email/phone, and alert routing simulator.
- **Resume Modal**:
  - High-fidelity view and instant printable/save-as-PDF version matching Mohammed Sulayman's resume.

---

## 🛠️ Quickstart

### 1. Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Build for Production
```bash
npm run build
```
Generates optimized static assets in the `dist/` folder ready for zero-cost hosting.

### 3. Preview Production Build
```bash
npm run preview
```

---

## 🐳 Docker Containerization (Optional)

You can containerize this portfolio with Docker and run it on Nginx:

```dockerfile
# Multi-stage Dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
docker build -t sulayman-portfolio:latest .
docker run -d -p 8080:80 sulayman-portfolio:latest
```

---

## 👤 Profile & Contacts

- **Name:** Mohammed Sulayman
- **Role:** DevOps & Site Reliability Engineer
- **Email:** [mdsulaymanzain2@gmail.com](mailto:mdsulaymanzain2@gmail.com)
- **Phone:** +91-7338591975
- **Location:** Bengaluru, India
- **GitHub:** [https://github.com/Mohammedsulayman123](https://github.com/Mohammedsulayman123)
- **Education:** BMS College of Engineering (B.E. CSE, CGPA 8.2)
- **Internship:** Ooredoo Qatar (DevOps Intern)

