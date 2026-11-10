import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Send, 
  Check, 
  Copy, 
  AlertTriangle, 
  Radio, 
  BellRing,
  CheckCircle2
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import confetti from 'canvas-confetti';

export const Contact: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    senderEmail: '',
    severity: 'P1 - High Priority Opportunity / Role',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.senderEmail || !formData.message) return;

    setSubmitted(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (err) {}

    // Fallback: construct mailto
    const mailtoLink = `mailto:${PERSONAL_INFO.email}?subject=[${encodeURIComponent(formData.severity)}] Message from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${encodeURIComponent(formData.senderEmail)}`;
    setTimeout(() => {
      window.location.href = mailtoLink;
    }, 1200);
  };

  return (
    <section id="contact" className="py-20 bg-[#060913] relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-wider uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            Dispatch & Incident Routing
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Initiate Connection
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            Looking for a DevOps / SRE engineer to streamline your Kubernetes workloads, secure your CI/CD pipelines, or safeguard application availability? Dispatch a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Direct Contact Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card */}
            <div className="bg-[#0b101e] border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-cyan-950/80 text-cyan-400 border border-cyan-800/40">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-400">Direct Email</div>
                    <div className="text-sm font-mono font-bold text-white select-all">
                      {PERSONAL_INFO.email}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 transition-colors"
                  title="Copy Email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-[#0b101e] border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-800/40">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-400">Primary Phone</div>
                    <div className="text-sm font-mono font-bold text-white select-all">
                      {PERSONAL_INFO.phone}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 transition-colors"
                  title="Copy Phone"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Location & Social Card */}
            <div className="bg-[#0b101e] border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-purple-950/80 text-purple-400 border border-purple-800/40">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">Current Station</div>
                  <div className="text-sm font-mono font-bold text-white">
                    {PERSONAL_INFO.location}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Public Profiles:</span>
                <div className="flex items-center gap-2">
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-blue-950/60 text-slate-300 hover:text-blue-300 border border-slate-700 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5 text-slate-400" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Availability Badge */}
            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/30 flex items-center gap-3 text-xs font-mono text-cyan-300">
              <Radio className="w-5 h-5 text-emerald-400 animate-pulse shrink-0" />
              <div>
                <span className="font-bold text-white">Open to Opportunities:</span> Full-Time DevOps Engineer, SRE Internships, Cloud Infrastructure Roles.
              </div>
            </div>

          </div>

          {/* SRE Pager / Dispatch Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-[#0b101e] border border-cyan-900/40 rounded-2xl p-6 sm:p-8 shadow-xl">
              
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <BellRing className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-base font-mono font-bold text-white">
                    SRE Dispatch Pager Form
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/50">
                  SLO: &lt; 2h Response
                </span>
              </div>

              {submitted ? (
                <div className="p-8 text-center space-y-4 font-mono">
                  <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Alert Dispatched Successfully!</h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    Your message has been routed to Mohammed Sulayman's on-call inbox (<span className="text-cyan-400">{PERSONAL_INFO.email}</span>). Opening your default email client...
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-cyan-400 underline hover:text-cyan-300 pt-2 block mx-auto"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 uppercase tracking-wider text-[11px] mb-1.5">
                        Your Name / Organization *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Rivera (Tech Lead)"
                        className="w-full bg-[#060a12] border border-slate-800 rounded-lg px-3 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 uppercase tracking-wider text-[11px] mb-1.5">
                        Your Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.senderEmail}
                        onChange={(e) => setFormData({ ...formData, senderEmail: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full bg-[#060a12] border border-slate-800 rounded-lg px-3 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 uppercase tracking-wider text-[11px] mb-1.5">
                      Priority / Alert Classification
                    </label>
                    <select
                      value={formData.severity}
                      onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                      className="w-full bg-[#060a12] border border-slate-800 rounded-lg px-3 py-2.5 text-cyan-300 focus:outline-none focus:border-cyan-500"
                    >
                      <option>P1 - High Priority Opportunity / Role</option>
                      <option>P2 - Project Collaboration / Consulting</option>
                      <option>P3 - Technical Discussion / Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 uppercase tracking-wider text-[11px] mb-1.5">
                      Message / Incident Payload *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Sulayman, we reviewed your Wanderlust DevSecOps pipeline and Kubernetes work. We'd love to discuss..."
                      className="w-full bg-[#060a12] border border-slate-800 rounded-lg p-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono text-xs sm:text-sm font-semibold transition-all shadow-lg shadow-cyan-950/40"
                  >
                    <Send className="w-4 h-4" />
                    <span>Dispatch Alert to Sulayman</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

