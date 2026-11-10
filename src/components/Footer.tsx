import React from 'react';
import { Terminal, Shield, ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050811] border-t border-slate-900 py-12 text-slate-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-lg bg-cyan-950 border border-cyan-800/50 flex items-center justify-center text-cyan-400">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Mohammed Sulayman</div>
              <div className="text-[11px] text-slate-500">DevOps & Site Reliability Engineer</div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <a href="#overview" className="hover:text-cyan-400 transition-colors">Overview</a>
            <a href="#pipeline" className="hover:text-cyan-400 transition-colors">CI/CD Pipeline</a>
            <a href="#cluster-topology" className="hover:text-cyan-400 transition-colors">K8s Topology</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
            <a href="#observability" className="hover:text-cyan-400 transition-colors">Observability</a>
            <a href="#experience" className="hover:text-cyan-400 transition-colors">Experience</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition-colors border border-slate-800"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-blue-400 transition-colors border border-slate-800"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-slate-800"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-400 transition-colors border border-cyan-800/40 ml-2"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>DEPLOYMENT: commit <code className="text-cyan-400">#9a4f210</code> (main)</span>
            <span className="text-slate-600">|</span>
            <span>Zero-Downtime Rolling Update</span>
          </div>

          <div className="text-center sm:text-right">
            Designed for Mohammed Sulayman • Bengaluru, India • All Systems Operational
          </div>
        </div>

      </div>
    </footer>
  );
};

