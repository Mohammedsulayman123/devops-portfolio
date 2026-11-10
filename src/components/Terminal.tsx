import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Maximize2, Minimize2, X, CornerDownLeft, Sparkles } from 'lucide-react';
import { MOCK_TERMINAL_PODS, PERSONAL_INFO, PROJECTS } from '../data/portfolioData';

interface TerminalProps {
  isModal?: boolean;
  onClose?: () => void;
}

export const Terminal: React.FC<TerminalProps> = ({ isModal = false, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ command: string; output: React.ReactNode }>>([
    {
      command: "welcome",
      output: (
        <div className="space-y-1 text-slate-300">
          <div className="text-cyan-400 font-bold">
            ⚡ Welcome to Sulayman's DevOps & SRE Interactive Shell (v2.4-k8s)
          </div>
          <div className="text-slate-400">
            Type <span className="text-cyan-300 font-semibold">help</span> to view available commands, or click any quick command chip below.
          </div>
        </div>
      )
    }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const executeCommand = (cmdStr: string) => {
    const rawCmd = cmdStr.trim();
    if (!rawCmd) return;

    setCommandHistory(prev => [...prev, rawCmd]);
    setHistoryIndex(-1);

    const cmd = rawCmd.toLowerCase();
    let response: React.ReactNode = null;

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else if (cmd === 'help') {
      response = (
        <div className="space-y-2 py-1 text-xs">
          <div className="text-cyan-400 font-semibold">&gt; Available SRE & DevOps Commands:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-slate-300">
            <div><span className="text-emerald-400 font-bold">kubectl get pods -A</span> : List all cluster pods</div>
            <div><span className="text-emerald-400 font-bold">kubectl get nodes</span> : Cluster node health</div>
            <div><span className="text-emerald-400 font-bold">kubectl get projects</span> : List portfolio projects</div>
            <div><span className="text-emerald-400 font-bold">cat skills.yaml</span> : View tech stack in YAML</div>
            <div><span className="text-emerald-400 font-bold">trivy scan wanderlust</span> : Run CVE vulnerability scan</div>
            <div><span className="text-emerald-400 font-bold">sonarqube status</span> : Check code quality gate</div>
            <div><span className="text-emerald-400 font-bold">curl /experience</span> : Ooredoo internship info</div>
            <div><span className="text-emerald-400 font-bold">curl /contact</span> : Contact details & email</div>
            <div><span className="text-emerald-400 font-bold">uptime</span> : Check system SLA & availability</div>
            <div><span className="text-emerald-400 font-bold">whoami</span> : Engineer identity & role</div>
            <div><span className="text-emerald-400 font-bold">clear</span> : Clear screen</div>
          </div>
        </div>
      );
    } else if (cmd.includes('kubectl get pods')) {
      response = (
        <div className="overflow-x-auto my-1">
          <div className="text-slate-400 text-[11px] mb-1">NAMESPACE      NAME                                     READY   STATUS      RESTARTS   AGE    IP</div>
          {MOCK_TERMINAL_PODS.map((pod, i) => (
            <div key={i} className="font-mono text-xs flex gap-4 text-slate-300 py-0.5">
              <span className="w-24 text-cyan-400 shrink-0">{pod.namespace}</span>
              <span className="w-48 sm:w-56 truncate text-white shrink-0">{pod.name}</span>
              <span className="w-12 text-slate-400 shrink-0">{pod.ready}</span>
              <span className={`w-20 font-semibold shrink-0 ${pod.status === 'Running' ? 'text-emerald-400' : 'text-blue-400'}`}>{pod.status}</span>
              <span className="w-12 text-slate-400 shrink-0">{pod.restarts}</span>
              <span className="w-10 text-slate-400 shrink-0">{pod.age}</span>
              <span className="text-slate-500">{pod.ip}</span>
            </div>
          ))}
          <div className="text-[11px] text-emerald-400 mt-1">✓ 9/9 Pods Healthy. 0 Evictions. 0 CrashLoopBackOffs.</div>
        </div>
      );
    } else if (cmd.includes('kubectl get nodes')) {
      response = (
        <div className="text-xs space-y-1 font-mono">
          <div className="text-slate-400">NAME                       STATUS   ROLES           AGE    VERSION   INTERNAL-IP</div>
          <div className="text-slate-200">k8s-control-plane-blr-01   Ready    control-plane   142d   v1.30.2   192.168.1.10</div>
          <div className="text-slate-200">k8s-worker-node-blr-02     Ready    worker          142d   v1.30.2   192.168.1.11</div>
          <div className="text-slate-200">k8s-worker-node-blr-03     Ready    worker          142d   v1.30.2   192.168.1.12</div>
          <div className="text-emerald-400 text-[11px] mt-1">✓ All 3 nodes Ready. Kubelet health: Normal.</div>
        </div>
      );
    } else if (cmd.includes('kubectl get projects') || cmd === 'projects') {
      response = (
        <div className="space-y-2 py-1 text-xs">
          <div className="text-cyan-400 font-semibold">&gt; Mohammed Sulayman's Flagship Projects:</div>
          {PROJECTS.map((p, idx) => (
            <div key={idx} className="bg-slate-900/80 p-2 rounded border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-emerald-400 font-bold">{p.title}</span>
                <span className="text-slate-400 text-[10px]">{p.category} | {p.date}</span>
              </div>
              <div className="text-slate-300 text-xs mt-1">{p.subtitle}</div>
              <div className="text-cyan-300 text-[11px] mt-1">Stack: {p.tags.join(', ')}</div>
            </div>
          ))}
        </div>
      );
    } else if (cmd.includes('cat skills') || cmd.includes('skills')) {
      response = (
        <pre className="text-cyan-300 text-xs font-mono bg-slate-950 p-3 rounded border border-slate-800 overflow-x-auto">
{`apiVersion: engineer/v1alpha1
kind: DevOpsEngineer
metadata:
  name: mohammed-sulayman
  location: "Bengaluru, India"
  education: "BMS College of Engineering (CGPA 8.2)"
spec:
  containers_orchestration:
    - kubernetes (Pods, Ingress, Helm, HPA, PVC)
    - docker (Multi-stage, Security)
    - minikube & kind
  ci_cd_devsecops:
    - jenkins (Declarative Pipelines)
    - sonarqube (SAST, Quality Gates)
    - trivy (Container CVE scans)
    - git & github
  observability_sre:
    - prometheus (PromQL, Exporters)
    - grafana (Dashboards, Alerts)
    - linux (Bash, Systemd, Networking)
  backend_systems:
    - python (FastAPI, Async Workers)
    - go (Gin Microservices)
    - java & c
  databases:
    - postgresql (JSONB)
    - mongodb & mysql
  ai_cloud:
    - google gemini api
    - openrouter llm integration`}
        </pre>
      );
    } else if (cmd.includes('trivy')) {
      response = (
        <div className="space-y-1 font-mono text-xs">
          <div className="text-cyan-400 font-bold">&gt; trivy image wanderlust:v2.4</div>
          <div className="text-slate-400">2026-11-10T19:00:00Z [INFO] Need to update DB</div>
          <div className="text-slate-400">2026-11-10T19:00:02Z [INFO] Vulnerability database updated</div>
          <div className="text-slate-300">wanderlust:v2.4 (alpine 3.19.1)</div>
          <div className="text-slate-400">==============================</div>
          <div className="text-slate-300">Total: 0 (UNKNOWN: 0, LOW: 0, MEDIUM: 0, HIGH: 0, CRITICAL: 0)</div>
          <div className="text-emerald-400 font-bold mt-1">✓ DEVSECOPS AUDIT PASSED: Zero critical or high vulnerabilities detected.</div>
        </div>
      );
    } else if (cmd.includes('sonarqube')) {
      response = (
        <div className="space-y-1 font-mono text-xs">
          <div className="text-cyan-400 font-bold">&gt; SonarQube Quality Gate Status</div>
          <div className="text-emerald-400 font-bold">STATUS: PASSED</div>
          <div className="text-slate-300">Coverage: 88.4% | Bugs: 0 | Vulnerabilities: 0 | Code Smells: 2 (Minor)</div>
          <div className="text-slate-400">Security Rating: A | Reliability Rating: A | Maintainability: A</div>
        </div>
      );
    } else if (cmd.includes('contact') || cmd.includes('curl /contact')) {
      response = (
        <div className="text-xs space-y-1 font-mono bg-slate-900 p-2.5 rounded border border-slate-800">
          <div className="text-cyan-400 font-bold">&gt; Mohammed Sulayman Contact Telemetry:</div>
          <div className="text-slate-200">Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-cyan-300 underline">{PERSONAL_INFO.email}</a></div>
          <div className="text-slate-200">Phone: {PERSONAL_INFO.phone}</div>
          <div className="text-slate-200">Location: {PERSONAL_INFO.location}</div>
          <div className="text-slate-200">LinkedIn: <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 underline">{PERSONAL_INFO.linkedin}</a></div>
          <div className="text-slate-200">GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-slate-300 underline">{PERSONAL_INFO.github}</a></div>
        </div>
      );
    } else if (cmd.includes('experience') || cmd.includes('ooredoo')) {
      response = (
        <div className="text-xs space-y-1 font-mono bg-slate-900 p-2.5 rounded border border-slate-800">
          <div className="text-emerald-400 font-bold">&gt; Ooredoo Qatar — DevOps Intern</div>
          <div className="text-slate-400">Period: Aug 2026 – Aug 2026 | Doha, Qatar</div>
          <div className="text-slate-200">• Built CI/CD pipelines in Jenkins, cutting time-to-market by 30%.</div>
          <div className="text-slate-200">• Implemented DevSecOps with Docker, SonarQube, and Trivy security scanners.</div>
          <div className="text-slate-200">• Managed K8s microservices, Helm charts, Ingress, and auto-scaling.</div>
          <div className="text-slate-200">• Maintained 99.9% uptime using Prometheus and Grafana alerts.</div>
        </div>
      );
    } else if (cmd === 'uptime') {
      response = (
        <div className="text-xs font-mono text-emerald-400">
          19:04:46 up 142 days, 18:22, 1 user, load average: 0.12, 0.08, 0.05 (Target SLA: 99.9% Achieved)
        </div>
      );
    } else if (cmd === 'whoami') {
      response = (
        <div className="text-xs font-mono text-cyan-300">
          Mohammed Sulayman | DevOps & Site Reliability Engineer | BMS College of Engineering (CGPA 8.2)
        </div>
      );
    } else {
      response = (
        <div className="text-xs font-mono text-rose-400">
          zsh: command not found: {rawCmd}. Type <span className="text-cyan-300 underline cursor-pointer" onClick={() => executeCommand('help')}>help</span> to view available commands.
        </div>
      );
    }

    setHistory(prev => [...prev, { command: rawCmd, output: response }]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInput(commandHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIndex(nextIdx);
          setInput(commandHistory[nextIdx]);
        } else {
          setHistoryIndex(-1);
          setInput('');
        }
      }
    }
  };

  const quickCommands = [
    "kubectl get pods -A",
    "kubectl get nodes",
    "cat skills.yaml",
    "trivy scan wanderlust",
    "sonarqube status",
    "curl /contact"
  ];

  return (
    <div className={`flex flex-col bg-[#050811] border border-cyan-950/80 rounded-xl overflow-hidden font-mono shadow-2xl shadow-cyan-950/40 ${
      isModal ? 'h-[80vh] w-full max-w-4xl' : 'h-[520px] w-full'
    }`}>
      {/* Terminal Titlebar */}
      <div className="bg-[#0b101e] px-4 py-2.5 border-b border-slate-800 flex items-center justify-between select-none shrink-0">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-rose-500 hover:opacity-80 cursor-pointer" onClick={onClose} />
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-xs text-slate-300 ml-2 font-mono flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>sulayman@k8s-prod: /home/sulayman</span>
          </span>
        </div>

        <div className="flex items-center space-x-3 text-xs text-slate-400">
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Online
          </span>
          {isModal && onClose && (
            <button onClick={onClose} className="hover:text-white p-0.5">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Quick Command Suggestions */}
      <div className="bg-[#080d1a] border-b border-slate-800/80 px-4 py-2 flex items-center gap-1.5 overflow-x-auto text-[11px] shrink-0">
        <span className="text-slate-500 flex items-center gap-1 mr-1">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          Quick:
        </span>
        {quickCommands.map((cmd, i) => (
          <button
            key={i}
            onClick={() => executeCommand(cmd)}
            className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700/80 text-cyan-300 hover:bg-cyan-950 hover:border-cyan-500 hover:text-cyan-200 transition-colors whitespace-nowrap"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Terminal Body */}
      <div 
        className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs select-text"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center space-x-2 text-slate-400">
              <span className="text-emerald-400 font-bold">sulayman@k8s-prod:~$</span>
              <span className="text-white font-semibold">{item.command}</span>
            </div>
            <div className="pl-3 border-l-2 border-slate-800/80">
              {item.output}
            </div>
          </div>
        ))}

        {/* Current Input Prompt */}
        <div className="flex items-center space-x-2 pt-1">
          <span className="text-emerald-400 font-bold shrink-0">sulayman@k8s-prod:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-cyan-300 outline-none border-none font-mono text-xs placeholder:text-slate-600"
            placeholder="Type 'help' or any command..."
            autoFocus
          />
          <button
            onClick={() => executeCommand(input)}
            className="text-slate-500 hover:text-cyan-400 p-1"
            title="Execute"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};

