import React from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Terminal, 
  ShieldCheck, 
  TrendingUp,
  Cpu
} from 'lucide-react';
import { INTERNSHIP, PERSONAL_INFO } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-[#070b14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-wider uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            Track Record & Professional Background
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Work Experience & Education
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            Hands-on DevOps engineering in telecom-grade environments, paired with rigorous Computer Science fundamentals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Work Experience: Ooredoo Qatar (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl bg-[#0c1220] border border-cyan-500/30 p-6 sm:p-8 shadow-xl shadow-cyan-950/20">
              
              {/* Top Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
                      <Briefcase className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {INTERNSHIP.company}
                      </h3>
                      <div className="text-sm font-mono text-cyan-400 font-semibold">
                        {INTERNSHIP.role}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-start sm:items-end gap-1 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    {INTERNSHIP.period}
                  </span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {INTERNSHIP.location}
                  </span>
                </div>
              </div>

              {/* Impact Callout Banner */}
              <div className="grid grid-cols-2 gap-3 mb-6 font-mono text-xs">
                <div className="p-3 rounded-lg bg-[#070b14] border border-emerald-900/50 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div>
                    <div className="text-emerald-400 font-bold text-base sm:text-lg">30% Reduction</div>
                    <div className="text-slate-400 text-[11px]">in Time-to-Market</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#070b14] border border-cyan-900/50 flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-cyan-400 shrink-0" />
                  <div>
                    <div className="text-cyan-400 font-bold text-base sm:text-lg">99.9% Uptime</div>
                    <div className="text-slate-400 text-[11px]">with Prometheus & Grafana</div>
                  </div>
                </div>
              </div>

              {/* Achievements from Resume */}
              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
                  Key Responsibilities & Deliverables:
                </div>
                {INTERNSHIP.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                    <span className="leading-relaxed">{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Stack Used */}
              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <div className="text-xs font-mono text-slate-400 mb-2">
                  Toolchain Applied:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {INTERNSHIP.stack.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 rounded bg-[#070b14] border border-slate-800 text-cyan-300 text-xs font-mono"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Education: BMS College of Engineering (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Education Card */}
            <div className="rounded-2xl bg-[#0c1220] border border-slate-800 p-6 sm:p-7 shadow-xl">
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
                <span className="p-2.5 rounded-lg bg-blue-950/80 border border-blue-500/40 text-blue-400">
                  <GraduationCap className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {PERSONAL_INFO.education.institution}
                  </h3>
                  <div className="text-xs font-mono text-blue-400">
                    {PERSONAL_INFO.education.degree}
                  </div>
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#070b14] border border-slate-800">
                  <span className="text-slate-400">Academic Standing:</span>
                  <span className="text-emerald-400 font-bold text-sm">CGPA: {PERSONAL_INFO.education.cgpa}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#070b14] border border-slate-800">
                  <span className="text-slate-400">Duration:</span>
                  <span className="text-slate-200">{PERSONAL_INFO.education.period}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#070b14] border border-slate-800">
                  <span className="text-slate-400">Campus:</span>
                  <span className="text-slate-200">{PERSONAL_INFO.education.location}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2 text-xs text-slate-300">
                {PERSONAL_INFO.education.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-cyan-400 font-mono mt-0.5">&gt;</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SRE Core Competency Card */}
            <div className="rounded-2xl bg-gradient-to-br from-cyan-950/40 via-[#0c1220] to-[#0c1220] border border-cyan-800/30 p-6 font-mono text-xs space-y-3">
              <div className="text-cyan-400 font-bold flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>DevSecOps & SRE Tenets Followed:</span>
              </div>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                "Infrastructure must be immutable, declarative, auditable, and automated. 
                Manual interventions are anti-patterns. Every commit goes through automated static analysis, 
                vulnerability scanning, container packaging, and health-checked rollout."
              </p>
              <div className="text-slate-400 text-[11px] pt-1">
                — Mohammed Sulayman
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

