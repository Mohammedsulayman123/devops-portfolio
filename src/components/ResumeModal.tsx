import React from 'react';
import { X, Download, Printer, ExternalLink, Mail, Phone, MapPin, Briefcase, GraduationCap, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO, INTERNSHIP, PROJECTS, SKILL_CATEGORIES } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0b101f] border border-cyan-500/40 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl shadow-cyan-950/80 overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-[#0e1628] px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
              Mohammed Sulayman — Resume Preview
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Printable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-[#090d16] text-slate-200 space-y-6 font-sans">
          
          {/* Resume Header */}
          <div className="border-b border-slate-800 pb-5 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide uppercase font-serif">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-cyan-400 font-mono text-xs mt-1">
                {PERSONAL_INFO.title}
              </p>
            </div>

            <div className="text-xs font-mono text-slate-300 space-y-1 sm:text-right">
              <div>📍 {PERSONAL_INFO.location}</div>
              <div>📞 {PERSONAL_INFO.phone}</div>
              <div>✉️ {PERSONAL_INFO.email}</div>
              <div>💼 linkedin.com/in/mohammed-sulayman</div>
              <div>🐙 github.com/Mohammedsulayman123</div>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold border-b border-slate-800 pb-1">
              EDUCATION
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm font-semibold text-white">
              <div>{PERSONAL_INFO.education.institution}</div>
              <div className="font-mono text-xs text-slate-400">{PERSONAL_INFO.education.period}</div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-300">
              <div>{PERSONAL_INFO.education.degree} — <span className="text-emerald-400 font-mono font-bold">CGPA: {PERSONAL_INFO.education.cgpa}</span></div>
              <div className="text-slate-400">{PERSONAL_INFO.education.location}</div>
            </div>
          </div>

          {/* Internship */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold border-b border-slate-800 pb-1">
              INTERNSHIP
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm font-semibold text-white">
              <div>{INTERNSHIP.company} — <span className="text-cyan-400 font-normal">{INTERNSHIP.role}</span></div>
              <div className="font-mono text-xs text-slate-400">{INTERNSHIP.period} | {INTERNSHIP.location}</div>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300 leading-relaxed list-disc list-inside pt-1">
              {INTERNSHIP.highlights.map((h, i) => (
                <li key={i} className="pl-1">{h}</li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold border-b border-slate-800 pb-1">
              PROJECTS
            </h2>

            {PROJECTS.map((proj) => (
              <div key={proj.id} className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm font-semibold text-white">
                  <div>
                    {proj.title} <span className="text-slate-400 font-normal text-xs font-mono">| {proj.tags.slice(0, 5).join(', ')}</span>
                  </div>
                  <div className="font-mono text-xs text-slate-400">{proj.date}</div>
                </div>
                <ul className="space-y-1 text-xs text-slate-300 leading-relaxed list-disc list-inside">
                  {proj.bulletPoints.map((bp, idx) => (
                    <li key={idx} className="pl-1">{bp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold border-b border-slate-800 pb-1">
              TECHNICAL SKILLS
            </h2>
            <div className="grid grid-cols-1 gap-1.5 text-xs font-mono">
              <div><strong className="text-slate-200">Languages:</strong> Java, Python, Go, C, SQL</div>
              <div><strong className="text-slate-200">DevOps & Infrastructure:</strong> Linux, Git/GitHub, Docker, Kubernetes, Jenkins, Prometheus, Grafana, Helm, Minikube, Kind</div>
              <div><strong className="text-slate-200">DevSecOps Tools:</strong> SonarQube, Trivy</div>
              <div><strong className="text-slate-200">Frameworks & Libraries:</strong> Next.js, React, Node.js, Express.js, FastAPI, Tailwind CSS</div>
              <div><strong className="text-slate-200">Databases & Cloud APIs:</strong> MySQL, MongoDB, PostgreSQL, OpenRouter, Google Gemini API</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

