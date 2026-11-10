import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Activity, 
  Server, 
  CheckCircle2,
  X,
  FileCode,
  ArrowRight
} from 'lucide-react';
import { PROJECTS, Project, PERSONAL_INFO } from '../data/portfolioData';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['All', 'DevOps / CI/CD', 'Kubernetes / Cloud', 'AI / Cloud Systems', 'Full-Stack / Microservices'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 bg-[#070b14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-wider uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Production Workloads & Deployments
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Infrastructure Projects
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Architected for high availability, self-healing, automated security gates, and zero-downtime rollouts.
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/60 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                    : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-2xl bg-[#0c1220] border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 p-6 flex flex-col justify-between hover:shadow-2xl hover:shadow-cyan-950/30"
            >
              {/* Header: Category & Date */}
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/40 text-[11px] font-mono font-medium">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {project.date}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-cyan-400/90 mt-1">
                  {project.subtitle}
                </p>

                {/* SRE Metrics Badges */}
                <div className="grid grid-cols-3 gap-2 my-4">
                  {project.metrics.map((metric, i) => (
                    <div key={i} className="bg-[#070b14] border border-slate-800/80 rounded-lg p-2 text-center">
                      <div className={`text-sm sm:text-base font-bold font-mono ${metric.color}`}>
                        {metric.value}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bullet Points from Resume */}
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed my-4">
                  {project.bulletPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom: Tech tags & Action */}
              <div className="pt-4 border-t border-slate-800/80 mt-2 space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700/60 text-[11px] font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
                  >
                    <Layers className="w-4 h-4" />
                    <span>Inspect Architecture Spec</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                    title="View GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Architecture Spec Inspection Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0b101f] border border-cyan-500/40 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl shadow-cyan-950/80 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
                  DevOps Architecture Specification
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  {activeModalProject.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Architecture Layers */}
            <div className="space-y-2">
              <div className="text-xs font-mono text-cyan-400 font-semibold flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                <span>INFRASTRUCTURE & ORCHESTRATION LAYERS:</span>
              </div>
              <div className="space-y-1.5 font-mono text-xs">
                {activeModalProject.architecture.layers.map((layer, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded bg-slate-900/80 border border-slate-800 text-slate-200">
                    <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 flex items-center justify-center text-[10px] font-bold shrink-0">
                      {i + 1}
                    </span>
                    <span>{layer}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* DevSecOps Security Hardening */}
            <div className="space-y-2">
              <div className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>DEVSECOPS & QUALITY GATES:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
                {activeModalProject.architecture.security.map((sec, i) => (
                  <div key={i} className="p-2 rounded bg-emerald-950/20 border border-emerald-800/40 text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{sec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Tools */}
            <div className="space-y-2">
              <div className="text-xs font-mono text-purple-400 font-semibold flex items-center gap-1.5">
                <FileCode className="w-4 h-4" />
                <span>DEPLOYED TOOLCHAIN:</span>
              </div>
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                {activeModalProject.architecture.tools.map((tool, i) => (
                  <span key={i} className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setActiveModalProject(null)}
                className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-semibold"
              >
                Close Spec Inspector
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

