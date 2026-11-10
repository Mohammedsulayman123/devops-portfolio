import React, { useState, useEffect } from 'react';
import { Terminal, Shield, FileText, Menu, X, CheckCircle2, Cpu } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeaderProps {
  onOpenTerminal: () => void;
  onOpenResume: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenTerminal, onOpenResume }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [latency, setLatency] = useState(14);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Fluctuate latency slightly to simulate live telemetry
    const interval = setInterval(() => {
      setLatency(prev => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const next = prev + delta;
        return next < 8 ? 9 : next > 22 ? 21 : next;
      });
    }, 4000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { label: "Overview", href: "#overview" },
    { label: "CI/CD", href: "#pipeline" },
    { label: "K8s Topology", href: "#cluster-topology" },
    { label: "IaC Generator", href: "#manifest-generator" },
    { label: "Projects", href: "#projects" },
    { label: "Observability", href: "#observability" },
    { label: "SRE Runbook", href: "#runbooks" },
    { label: "Experience", href: "#experience" },
    { label: "Terminal", href: "#terminal-section" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#090d16]/90 backdrop-blur-md border-b border-cyan-900/30 shadow-lg shadow-black/50' 
        : 'bg-[#090d16]/60 backdrop-blur-sm border-b border-white/5'
    }`}>
      {/* SRE Telemetry Bar */}
      <div className="bg-[#050811] border-b border-slate-800/80 px-4 py-1 text-[11px] font-mono text-slate-400 flex items-center justify-between overflow-x-auto select-none">
        <div className="flex items-center space-x-4 shrink-0">
          <span className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>SYSTEMS NOMINAL</span>
          </span>
          <span className="text-slate-600">|</span>
          <span className="hidden sm:inline text-slate-300">
            <span className="text-slate-500">CLUSTER:</span> k8s-prod-blr-01
          </span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline text-slate-300">
            <span className="text-slate-500">UPTIME:</span> 99.98%
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">
            <span className="text-slate-500">PING:</span> {latency}ms
          </span>
        </div>

        <div className="flex items-center space-x-3 text-xs shrink-0 pl-2">
          <span className="text-cyan-400 flex items-center gap-1">
            <Shield className="w-3 h-3 text-emerald-400" />
            <span className="hidden sm:inline">DEVSECOPS:</span> GATES PASSED
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400 flex items-center gap-1 font-mono">
            <Cpu className="w-3 h-3 text-blue-400" />
            PODS: 12/12
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <a href="#overview" className="flex items-center space-x-2 group">
          <div className="h-9 w-9 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="font-mono text-sm sm:text-base font-bold text-white flex items-center gap-1">
              <span>sulayman</span>
              <span className="text-cyan-400">@</span>
              <span className="text-emerald-400">sre-prod</span>
              <span className="text-slate-500">:~$</span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 tracking-wider uppercase -mt-0.5">
              DevOps & Reliability Engineer
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 font-mono text-xs">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center space-x-2.5">
          <button
            onClick={onOpenTerminal}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-slate-900 border border-slate-700 text-slate-200 hover:border-cyan-500 hover:text-cyan-400 font-mono text-xs transition-all shadow-sm group"
            title="Launch Interactive Terminal"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>CLI Mode</span>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-1 rounded">`~`</span>
          </button>

          <button
            onClick={onOpenResume}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-md bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono text-xs font-medium transition-all shadow-md shadow-cyan-950/40 hover:shadow-cyan-500/25"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume PDF</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center sm:hidden space-x-2">
          <button
            onClick={onOpenResume}
            className="p-1.5 rounded-md bg-cyan-950/50 border border-cyan-800/40 text-cyan-300"
            title="Resume"
          >
            <FileText className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c1220] border-b border-cyan-900/40 px-4 pt-2 pb-4 space-y-2 font-mono text-sm">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
            >
              &gt; {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-800 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="w-full flex items-center justify-center space-x-2 py-2 rounded bg-slate-800 border border-slate-700 text-slate-200 text-xs"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Launch Terminal</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full flex items-center justify-center space-x-2 py-2 rounded bg-cyan-600 text-white text-xs font-semibold"
            >
              <FileText className="w-4 h-4" />
              <span>Resume</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

