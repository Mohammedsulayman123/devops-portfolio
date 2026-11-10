import React from 'react';
import { 
  Terminal, 
  GitBranch, 
  ShieldCheck, 
  Server, 
  Activity, 
  ArrowRight, 
  Download, 
  ExternalLink,
  MapPin,
  Mail,
  Linkedin,
  Github
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenTerminal: () => void;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal, onOpenResume }) => {
  return (
    <section id="overview" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden devops-grid devops-radial">
      {/* Decorative background glow rings */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Bio & Core Pitch */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span>SRE & DEVOPS INFRASTRUCTURE SPECIALIST</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h2 className="text-sm font-mono text-cyan-400 tracking-wider uppercase font-semibold">
                Mohammed Sulayman
              </h2>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Bridging Code & Infrastructure with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">Zero-Downtime</span> Reliability.
              </h1>
            </div>

            {/* Sub-paragraph */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              DevOps Engineer experienced in automating high-throughput CI/CD pipelines (Jenkins), 
              deploying resilient microservices on Kubernetes, enforcing DevSecOps quality gates 
              (SonarQube & Trivy), and maintaining 99.9% application uptime with Prometheus & Grafana.
            </p>

            {/* Meta info chips: Location, College, Internship */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 pt-1">
              <span className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                Bengaluru, India
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800 text-slate-300">
                <Server className="w-3.5 h-3.5 text-emerald-400" />
                Ex-DevOps Intern @ Ooredoo Qatar
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800 text-slate-300">
                BMS College of Engineering (B.E. CSE)
              </span>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href="#pipeline"
                className="flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono text-xs sm:text-sm font-semibold shadow-lg shadow-cyan-900/30 hover:shadow-cyan-500/20 transition-all group"
              >
                <GitBranch className="w-4 h-4 text-cyan-100 group-hover:rotate-45 transition-transform" />
                <span>Simulate CI/CD Pipeline</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={onOpenTerminal}
                className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#0e1626] hover:bg-slate-800/90 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 font-mono text-xs sm:text-sm font-semibold transition-all group shadow-sm"
              >
                <Terminal className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>Open SRE Terminal</span>
              </button>

              <button
                onClick={onOpenResume}
                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 font-mono text-xs sm:text-sm transition-all"
              >
                <Download className="w-4 h-4 text-slate-400" />
                <span>Resume</span>
              </button>
            </div>

            {/* Social & Contact Links */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-800/80 text-slate-400 font-mono text-xs">
              <span className="text-slate-500">CONNECT:</span>
              <a 
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
                title="Send Email"
              >
                <Mail className="w-4 h-4 text-cyan-500" />
                <span className="hidden sm:inline">{PERSONAL_INFO.email}</span>
                <span className="sm:hidden">Email</span>
              </a>
              <a 
                href={PERSONAL_INFO.linkedin}
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span>LinkedIn</span>
              </a>
              <a 
                href={PERSONAL_INFO.github}
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
              >
                <Github className="w-4 h-4 text-slate-300" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Right Column: Live Kubernetes & SLA Mission Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl bg-[#0d1424] border border-cyan-500/25 p-5 shadow-2xl shadow-cyan-950/50 backdrop-blur-md">
              
              {/* Window Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-400 ml-2">cluster-dashboard.sre.local</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  HEALTHY
                </div>
              </div>

              {/* SRE Stats Grid */}
              <div className="grid grid-cols-2 gap-3 my-4">
                {PERSONAL_INFO.stats.map((stat, idx) => (
                  <div key={idx} className="bg-[#090d18] border border-slate-800/90 rounded-lg p-3 hover:border-cyan-500/40 transition-colors">
                    <div className="text-2xl font-extrabold font-mono text-cyan-400">
                      {stat.value}
                    </div>
                    <div className="text-xs font-semibold text-slate-200 mt-0.5">
                      {stat.label}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {stat.subtext}
                    </div>
                  </div>
                ))}
              </div>

              {/* Live Cluster Simulation Feed */}
              <div className="space-y-2 bg-[#060a12] rounded-lg p-3 border border-slate-800/80 font-mono text-xs">
                <div className="text-[11px] text-slate-400 flex items-center justify-between pb-1 border-b border-slate-900">
                  <span className="text-cyan-400">&gt; KUBERNETES WORKLOAD HEALTH</span>
                  <span className="text-emerald-400">0 Crashes</span>
                </div>

                <div className="space-y-1.5 pt-1 text-[11px]">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      wanderlust-api-pod
                    </span>
                    <span className="text-emerald-400">Running (1/1)</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      chat-service-hpa
                    </span>
                    <span className="text-emerald-400">Autoscaled: 3 Pods</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      prometheus-operator
                    </span>
                    <span className="text-cyan-400">Scraping: 28 Targets</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      trivy-security-cron
                    </span>
                    <span className="text-purple-400">0 Vulns Detected</span>
                  </div>
                </div>

                {/* Simulated CLI command hint */}
                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Press <code className="text-cyan-400 bg-slate-900 px-1 py-0.5 rounded">`~`</code> or click Terminal</span>
                  <span className="text-cyan-500 font-mono">Ready for input_</span>
                </div>
              </div>

              {/* DevSecOps Quality Gate Badge */}
              <div className="mt-3 flex items-center justify-between p-2 rounded-lg bg-cyan-950/30 border border-cyan-800/30 text-xs font-mono">
                <div className="flex items-center gap-2 text-cyan-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>SonarQube & Trivy Gate:</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-bold border border-emerald-700/50">
                  PASSED (0 BLOCKERS)
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

