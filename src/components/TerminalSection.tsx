import React from 'react';
import { Terminal as TerminalIcon, Sparkles } from 'lucide-react';
import { Terminal } from './Terminal';

export const TerminalSection: React.FC = () => {
  return (
    <section id="terminal-section" className="py-20 bg-[#060a12] relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-wider uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            Live Command-Line Interface
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Interactive DevOps Shell
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            Query Kubernetes pods, audit container images with Trivy, check SonarQube quality gates, or fetch Sulayman's contact specs directly from this terminal.
          </p>
        </div>

        {/* Embedded Terminal Component */}
        <div className="w-full">
          <Terminal isModal={false} />
        </div>

      </div>
    </section>
  );
};

