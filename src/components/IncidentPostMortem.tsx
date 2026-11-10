import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ShieldAlert, 
  Terminal, 
  TrendingDown, 
  Activity, 
  ChevronRight,
  ExternalLink,
  Layers,
  ArrowRight
} from 'lucide-react';

interface TimelineEvent {
  time: string;
  phase: 'Detection' | 'Triage' | 'Mitigation' | 'Resolution';
  title: string;
  description: string;
  tool: string;
}

export const IncidentPostMortem: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'rca' | 'action-items'>('timeline');

  const timelineEvents: TimelineEvent[] = [
    {
      time: "14:02:10 UTC",
      phase: "Detection",
      title: "Prometheus Alertmanager Triggered",
      description: "Synthetic probe detected HTTP 504 Gateway Timeouts on chat-backend Ingress. P99 latency exceeded 1200ms threshold.",
      tool: "Prometheus & Alertmanager"
    },
    {
      time: "14:04:22 UTC",
      phase: "Triage",
      title: "PagerDuty P1 Dispatched to On-Call SRE",
      description: "Mohammed Sulayman acknowledged page. Queried cluster telemetry via AI Kubernetes Agent; identified MongoDB socket connection exhaustion.",
      tool: "AI K8s Agent + kubectl"
    },
    {
      time: "14:07:45 UTC",
      phase: "Mitigation",
      title: "Automated HPA Scaling & Pod Pool Restart",
      description: "Triggered emergency replica scale-up from 3 to 7 pods and refreshed the stale connection pool ConfigMap.",
      tool: "Kubernetes HPA & Helm"
    },
    {
      time: "14:11:30 UTC",
      phase: "Resolution",
      title: "Traffic Normalized & Post-Deployment Verification",
      description: "HTTP 200 OK rate returned to 99.98%. Latency stabilized to 14ms baseline. 0 data dropped, 0 transactions lost.",
      tool: "Grafana Synthetic Probes"
    }
  ];

  const actionItems = [
    {
      id: "ACT-01",
      item: "Set connection pool maxLifetime to 10m to prevent stale socket leaks",
      owner: "Mohammed Sulayman",
      status: "COMPLETED",
      priority: "P1"
    },
    {
      id: "ACT-02",
      item: "Integrate Trivy container security scans in pre-commit hook",
      owner: "DevSecOps Team",
      status: "COMPLETED",
      priority: "P2"
    },
    {
      id: "ACT-03",
      item: "Add custom Prometheus alerting rule for DB pool utilization > 75%",
      owner: "Mohammed Sulayman",
      status: "COMPLETED",
      priority: "P1"
    },
    {
      id: "ACT-04",
      item: "Refactor MongoDB StatefulSet Persistent Volume claim to high-IOPS SSD",
      owner: "Infrastructure Team",
      status: "COMPLETED",
      priority: "P2"
    }
  ];

  return (
    <section id="runbooks" className="py-20 bg-[#060a12] relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-wider uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            SRE Reliability Engineering & Runbooks
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Production Incident Post-Mortem (INC-2026-0814)
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            Real Site Reliability Engineering is proved during production incidents. Below is a blameless post-mortem 
            demonstrating telemetry triage, MTTR reduction, and automated mitigation.
          </p>
        </div>

        {/* Main Incident Card */}
        <div className="bg-[#0b101e] rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xl">
          
          {/* Header Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6 mb-6 border-b border-slate-800">
            <div className="p-3 rounded-xl bg-[#060a12] border border-slate-800">
              <div className="text-[11px] font-mono text-slate-400">SEVERITY / STATUS</div>
              <div className="text-sm font-mono font-bold text-rose-400 mt-0.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                SEV-1 (RESOLVED)
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#060a12] border border-slate-800">
              <div className="text-[11px] font-mono text-slate-400">MTTR (TIME TO RESOLVE)</div>
              <div className="text-sm font-mono font-bold text-emerald-400 mt-0.5">
                9m 20s (Target: &lt; 15m)
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#060a12] border border-slate-800">
              <div className="text-[11px] font-mono text-slate-400">ERROR BUDGET IMPACT</div>
              <div className="text-sm font-mono font-bold text-cyan-400 mt-0.5">
                0.012% Consumed
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#060a12] border border-slate-800">
              <div className="text-[11px] font-mono text-slate-400">DATA INTEGRITY</div>
              <div className="text-sm font-mono font-bold text-emerald-400 mt-0.5">
                100% Zero Data Loss
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-3">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-3.5 py-1.5 rounded-lg font-mono text-xs transition-all ${
                activeTab === 'timeline'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 font-bold'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              Incident Timeline
            </button>
            <button
              onClick={() => setActiveTab('rca')}
              className={`px-3.5 py-1.5 rounded-lg font-mono text-xs transition-all ${
                activeTab === 'rca'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 font-bold'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              Root Cause Analysis (RCA)
            </button>
            <button
              onClick={() => setActiveTab('action-items')}
              className={`px-3.5 py-1.5 rounded-lg font-mono text-xs transition-all ${
                activeTab === 'action-items'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 font-bold'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              Preventive Action Items
            </button>
          </div>

          {/* Tab 1: Timeline */}
          {activeTab === 'timeline' && (
            <div className="space-y-4">
              {timelineEvents.map((event, idx) => (
                <div key={idx} className="relative pl-6 pb-4 border-l-2 border-slate-800 last:border-l-transparent last:pb-0">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#060a12] border-2 border-cyan-400 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  </div>

                  <div className="bg-[#070b14] border border-slate-800 rounded-xl p-4 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono gap-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 font-bold text-[10px]">
                          {event.phase}
                        </span>
                        <span className="text-white font-bold">{event.title}</span>
                      </div>
                      <div className="text-slate-400">{event.time}</div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                      {event.description}
                    </p>

                    <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-cyan-500" />
                      <span>Telemetry Source: {event.tool}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Root Cause Analysis */}
          {activeTab === 'rca' && (
            <div className="space-y-4 font-mono text-xs text-slate-300">
              <div className="p-4 rounded-xl bg-[#070b14] border border-slate-800 space-y-2">
                <div className="text-cyan-400 font-bold text-sm">1. Primary Failure Mode:</div>
                <p className="font-sans leading-relaxed text-slate-300">
                  A high surge in concurrent WebSocket sessions coupled with non-expiring MongoDB TCP sockets caused 
                  the chat-backend microservice to exhaust its file descriptor limit (`max_connections=500`). 
                  New ingress connections experienced upstream 504 timeouts at the NGINX Ingress Controller.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#070b14] border border-slate-800 space-y-2">
                <div className="text-emerald-400 font-bold text-sm">2. Why Kubernetes Liveness Probes Didn't Fail Immediately:</div>
                <p className="font-sans leading-relaxed text-slate-300">
                  The `/healthz` HTTP probe endpoint responded quickly because the event loop was not CPU-blocked, 
                  only the outgoing database pool was choked. The fix involved augmenting readiness probes to verify 
                  active database heartbeat round-trips before routing ingress traffic.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#070b14] border border-slate-800 space-y-2">
                <div className="text-purple-400 font-bold text-sm">3. Blameless Culture Takeaway:</div>
                <p className="font-sans leading-relaxed text-slate-300">
                  Failures are system design opportunities, not operator faults. The automated HPA policy and 
                  Prometheus metrics allowed the on-call engineer to identify and resolve the bottleneck in under 10 minutes.
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Action Items */}
          {activeTab === 'action-items' && (
            <div className="space-y-3 font-mono text-xs">
              {actionItems.map((item) => (
                <div key={item.id} className="p-3 rounded-xl bg-[#070b14] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start sm:items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
                    <div>
                      <span className="text-slate-400 mr-2">[{item.id}]</span>
                      <span className="text-white font-sans">{item.item}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] shrink-0">
                    <span className="text-cyan-400">{item.owner}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-800/40">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

