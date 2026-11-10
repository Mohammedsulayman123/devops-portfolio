import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Layers, 
  GitBranch, 
  ShieldCheck, 
  Server, 
  Database, 
  Cpu, 
  BarChart3, 
  CheckCircle2,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const ObservabilitySkills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [cpuUsage, setCpuUsage] = useState<number>(24);
  const [memoryUsage, setMemoryUsage] = useState<number>(62);

  // Slight realistic fluctuation for Grafana telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(20 + Math.floor(Math.random() * 9));
      setMemoryUsage(60 + Math.floor(Math.random() * 5));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const getCategoryIcon = (icon: string) => {
    switch (icon) {
      case 'Layers': return <Layers className="w-4 h-4 text-cyan-400" />;
      case 'GitBranch': return <GitBranch className="w-4 h-4 text-emerald-400" />;
      case 'Activity': return <Activity className="w-4 h-4 text-blue-400" />;
      case 'Server': return <Server className="w-4 h-4 text-purple-400" />;
      case 'Database': return <Database className="w-4 h-4 text-amber-400" />;
      default: return <Cpu className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <section id="observability" className="py-20 bg-[#060a13] relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-wider uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            Prometheus & Grafana Observability Dashboard
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Infrastructure Metrics & Core Skillset
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            Real-time telemetry showing operational SLOs, container health, DevSecOps gates, and verified engineering proficiencies.
          </p>
        </div>

        {/* Grafana-style Top Telemetry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* Panel 1: SLA */}
          <div className="bg-[#0b101d] rounded-xl border border-slate-800 p-4 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span>SLA AVAILABILITY</span>
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">
              99.98%
            </div>
            <div className="text-[11px] font-mono text-slate-400 mt-1 flex items-center gap-1">
              <span className="text-emerald-400">▲ Target: 99.9%</span> | Error Budget: 88%
            </div>
            <div className="w-full bg-slate-800 h-1 rounded-full mt-3 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '99.9%' }} />
            </div>
          </div>

          {/* Panel 2: Pipeline Success */}
          <div className="bg-[#0b101d] rounded-xl border border-slate-800 p-4 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span>CI/CD SUCCESS RATE</span>
              <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400">
              98.4%
            </div>
            <div className="text-[11px] font-mono text-slate-400 mt-1 flex items-center gap-1">
              <span>Avg build: 1m 29s</span> | Jenkins
            </div>
            <div className="w-full bg-slate-800 h-1 rounded-full mt-3 overflow-hidden">
              <div className="bg-cyan-500 h-full rounded-full" style={{ width: '98.4%' }} />
            </div>
          </div>

          {/* Panel 3: Cluster CPU */}
          <div className="bg-[#0b101d] rounded-xl border border-slate-800 p-4 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span>CLUSTER CPU LOAD</span>
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-blue-400">
              {cpuUsage}%
            </div>
            <div className="text-[11px] font-mono text-slate-400 mt-1">
              <span>Nodes: 3 Ready</span> | Low Contention
            </div>
            <div className="w-full bg-slate-800 h-1 rounded-full mt-3 overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{ width: `${cpuUsage}%` }} />
            </div>
          </div>

          {/* Panel 4: Memory & Trivy Gate */}
          <div className="bg-[#0b101d] rounded-xl border border-slate-800 p-4 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span>DEVSECOPS GATE</span>
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-purple-400">
              0 CVEs
            </div>
            <div className="text-[11px] font-mono text-emerald-400 mt-1">
              ✓ Trivy & SonarQube: PASSED
            </div>
            <div className="w-full bg-slate-800 h-1 rounded-full mt-3 overflow-hidden">
              <div className="bg-purple-500 h-full rounded-full" style={{ width: '100%' }} />
            </div>
          </div>
        </div>

        {/* Skills Main Card */}
        <div className="bg-[#0b101d] rounded-2xl border border-slate-800 p-6 shadow-xl">
          
          {/* Tab Selector */}
          <div className="flex flex-wrap items-center gap-2 pb-4 mb-6 border-b border-slate-800">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs transition-all ${
                  activeTab === idx
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/60 shadow-[0_0_12px_rgba(6,182,212,0.25)] font-bold'
                    : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                {getCategoryIcon(cat.icon)}
                <span>{cat.title}</span>
                <span className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-slate-800 text-[10px] text-slate-400">
                  {cat.badge}
                </span>
              </button>
            ))}
          </div>

          {/* Active Category Skills List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SKILL_CATEGORIES[activeTab].items.map((skill, idx) => (
              <div
                key={idx}
                className="bg-[#080d19] border border-slate-800/80 rounded-xl p-4 hover:border-cyan-500/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="text-sm font-mono font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>{skill.name}</span>
                  </div>
                  <div className="text-xs font-mono font-semibold text-cyan-400">
                    {skill.level}%
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden my-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>

                <div className="text-xs text-slate-400 font-mono mt-2 leading-relaxed">
                  <span className="text-slate-500">&gt; Spec:</span> {skill.note}
                </div>
              </div>
            ))}
          </div>

          {/* SRE Philosophy Footer */}
          <div className="mt-6 p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2 text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>SRE Standard: Everything as Code (IaC, Pipelines as Code, Observability as Code)</span>
            </div>
            <div className="text-slate-500">
              Linux Kernel • Systemd • TCP/IP • DNS • Container Runtime
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

