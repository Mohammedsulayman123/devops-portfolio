import React, { useState } from 'react';
import { 
  Server, 
  Cpu, 
  Layers, 
  Activity, 
  ShieldCheck, 
  RefreshCw, 
  Flame, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  Terminal as TerminalIcon,
  HardDrive
} from 'lucide-react';

interface PodNode {
  id: string;
  name: string;
  namespace: string;
  node: string;
  image: string;
  cpu: string;
  memory: string;
  status: 'Running' | 'CrashLoopBackOff' | 'ContainerCreating' | 'Terminating';
  restarts: number;
  ip: string;
  ports: number[];
  yaml: string;
}

export const ClusterTopology: React.FC = () => {
  const [pods, setPods] = useState<PodNode[]>([
    {
      id: "pod-1",
      name: "wanderlust-api-5d76bf6774-8h2kz",
      namespace: "production",
      node: "worker-node-01",
      image: "sulayman/wanderlust:v2.4",
      cpu: "120m",
      memory: "168Mi",
      status: "Running",
      restarts: 0,
      ip: "10.244.1.24",
      ports: [8080],
      yaml: `apiVersion: v1
kind: Pod
metadata:
  name: wanderlust-api-5d76bf6774-8h2kz
  namespace: production
  labels:
    app: wanderlust
    tier: backend
spec:
  containers:
  - name: api
    image: sulayman/wanderlust:v2.4
    resources:
      limits:
        cpu: "500m"
        memory: "512Mi"
      requests:
        cpu: "100m"
        memory: "128Mi"
    livenessProbe:
      httpGet:
        path: /healthz
        port: 8080
      initialDelaySeconds: 5`
    },
    {
      id: "pod-2",
      name: "chat-backend-67f94bbcd-w8mnv",
      namespace: "production",
      node: "worker-node-01",
      image: "sulayman/three-tier-chat:api-v1.2",
      cpu: "85m",
      memory: "142Mi",
      status: "Running",
      restarts: 0,
      ip: "10.244.1.25",
      ports: [5000],
      yaml: `apiVersion: v1
kind: Pod
metadata:
  name: chat-backend-67f94bbcd-w8mnv
  namespace: production
spec:
  containers:
  - name: chat-api
    image: sulayman/three-tier-chat:api-v1.2
    ports:
    - containerPort: 5000
    env:
    - name: MONGO_URI
      valueFrom:
        secretKeyRef:
          name: mongo-secret
          key: uri`
    },
    {
      id: "pod-3",
      name: "trivy-scanner-cron-8kdf2",
      namespace: "security",
      node: "worker-node-01",
      image: "aquasec/trivy:0.49.1",
      cpu: "40m",
      memory: "95Mi",
      status: "Running",
      restarts: 0,
      ip: "10.244.1.26",
      ports: [4954],
      yaml: `apiVersion: batch/v1
kind: Job
metadata:
  name: trivy-scanner-cron-8kdf2
  namespace: security
spec:
  template:
    spec:
      containers:
      - name: scanner
        image: aquasec/trivy:0.49.1
        args: ["image", "--severity", "HIGH,CRITICAL", "all"]`
    },
    {
      id: "pod-4",
      name: "chat-frontend-7f8976b97-l9kxp",
      namespace: "production",
      node: "worker-node-02",
      image: "sulayman/chat-ui:v1.2",
      cpu: "35m",
      memory: "68Mi",
      status: "Running",
      restarts: 0,
      ip: "10.244.2.14",
      ports: [80],
      yaml: `apiVersion: v1
kind: Pod
metadata:
  name: chat-frontend-7f8976b97-l9kxp
  namespace: production
spec:
  containers:
  - name: nginx-frontend
    image: sulayman/chat-ui:v1.2
    resources:
      limits:
        memory: "256Mi"`
    },
    {
      id: "pod-5",
      name: "mongodb-statefulset-0",
      namespace: "production",
      node: "worker-node-02",
      image: "mongo:6.0",
      cpu: "190m",
      memory: "380Mi",
      status: "Running",
      restarts: 0,
      ip: "10.244.2.15",
      ports: [27017],
      yaml: `apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mongodb-statefulset-0
  namespace: production
spec:
  serviceName: "mongo-headless"
  replicas: 1
  volumeClaimTemplates:
  - metadata:
      name: data-volume
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 20Gi`
    },
    {
      id: "pod-6",
      name: "prometheus-k8s-0",
      namespace: "monitoring",
      node: "worker-node-02",
      image: "prom/prometheus:v2.50.0",
      cpu: "210m",
      memory: "410Mi",
      status: "Running",
      restarts: 0,
      ip: "10.244.2.16",
      ports: [9090],
      yaml: `apiVersion: v1
kind: Pod
metadata:
  name: prometheus-k8s-0
  namespace: monitoring
spec:
  containers:
  - name: prometheus
    image: prom/prometheus:v2.50.0
    ports:
    - containerPort: 9090`
    },
    {
      id: "pod-7",
      name: "k8s-ai-agent-68cb88fc7-r4jtw",
      namespace: "ai-ops",
      node: "worker-node-02",
      image: "sulayman/ai-k8s-agent:latest",
      cpu: "110m",
      memory: "190Mi",
      status: "Running",
      restarts: 0,
      ip: "10.244.2.17",
      ports: [8000],
      yaml: `apiVersion: v1
kind: Pod
metadata:
  name: k8s-ai-agent-68cb88fc7-r4jtw
  namespace: ai-ops
spec:
  containers:
  - name: agent
    image: sulayman/ai-k8s-agent:latest
    env:
    - name: OPENROUTER_MODEL
      value: "deepseek/deepseek-r1"`
    }
  ]);

  const [selectedPod, setSelectedPod] = useState<PodNode | null>(null);
  const [chaosLog, setChaosLog] = useState<string | null>(null);

  // Chaos Engineering Simulation: Crash a pod and watch K8s self-heal
  const handleSimulateCrash = (podId: string) => {
    const targetPod = pods.find(p => p.id === podId);
    if (!targetPod) return;

    setChaosLog(`[CHAOS SIMULATION] SIGKILL dispatched to ${targetPod.name}. Node detecting failure...`);
    
    // Step 1: Change to CrashLoopBackOff
    setPods(prev => prev.map(p => p.id === podId ? { ...p, status: 'CrashLoopBackOff', restarts: p.restarts + 1 } : p));

    // Step 2: 1.2s later, Kubelet schedules replacement pod
    setTimeout(() => {
      setChaosLog(`[KUBELET SELF-HEAL] Pod terminated. ReplicaSet triggering ContainerCreating on ${targetPod.node}...`);
      setPods(prev => prev.map(p => p.id === podId ? { ...p, status: 'ContainerCreating' } : p));
    }, 1300);

    // Step 3: 2.8s later, Healthy & Running
    setTimeout(() => {
      setChaosLog(`[RECOVERY COMPLETE] Readiness Probe passed (HTTP 200 OK). Traffic restored. Zero downtime.`);
      setPods(prev => prev.map(p => p.id === podId ? { ...p, status: 'Running' } : p));
      setTimeout(() => setChaosLog(null), 4000);
    }, 2800);
  };

  const nodes = [
    {
      id: "control-plane",
      name: "k8s-control-plane-blr-01",
      role: "Control Plane / Master",
      ip: "192.168.1.10",
      os: "Ubuntu 22.04 LTS (Kernel 5.15)",
      components: ["kube-apiserver", "etcd-cluster", "kube-controller", "kube-scheduler", "coredns"]
    },
    {
      id: "worker-node-01",
      name: "k8s-worker-node-blr-02",
      role: "Worker Node 01",
      ip: "192.168.1.11",
      os: "Containerd 1.7 / Kubelet v1.30",
      components: ["kube-proxy", "flannel-cni", "node-exporter"]
    },
    {
      id: "worker-node-02",
      name: "k8s-worker-node-blr-03",
      role: "Worker Node 02",
      ip: "192.168.1.12",
      os: "Containerd 1.7 / Kubelet v1.30",
      components: ["kube-proxy", "flannel-cni", "node-exporter"]
    }
  ];

  return (
    <section id="cluster-topology" className="py-20 bg-[#070b14] relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-wider uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Live Cluster Infrastructure
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Kubernetes Cluster Topology & Self-Healing
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Inspect live worker nodes, view real pod manifests, or test SRE resilience by triggering a 
              <strong> Chaos Crash</strong> to watch Kubernetes automatically heal the workload.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>3 Nodes Ready (100%)</span>
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-cyan-950/80 border border-cyan-800 text-cyan-400">
              CNI: Flannel
            </span>
          </div>
        </div>

        {/* Chaos Alert Banner if active */}
        {chaosLog && (
          <div className="mb-6 p-3.5 rounded-xl bg-amber-950/40 border border-amber-600/50 text-amber-300 font-mono text-xs flex items-center gap-3 animate-pulse">
            <Flame className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="flex-1">{chaosLog}</div>
          </div>
        )}

        {/* Node & Pod Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Node 1: Control Plane */}
          <div className="bg-[#0b101e] rounded-2xl border border-slate-800 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Server className="w-5 h-5 text-purple-400" />
                  <div>
                    <h3 className="text-sm font-mono font-bold text-white">control-plane-01</h3>
                    <div className="text-[10px] font-mono text-slate-400">192.168.1.10</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800/40 text-[10px] font-mono font-bold">
                  MASTER
                </span>
              </div>

              <div className="text-xs font-mono text-slate-400 space-y-2 mb-4">
                <div className="text-[11px] text-cyan-400 uppercase tracking-wider">Core Daemon Services:</div>
                <div className="space-y-1.5">
                  {nodes[0].components.map((c, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded bg-[#060a12] border border-slate-800/80 text-[11px]">
                      <span className="text-slate-300">{c}</span>
                      <span className="text-emerald-400 font-bold">Active</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Etcd Quorum:</span>
              <span className="text-emerald-400 font-bold">3/3 Replicas Synced</span>
            </div>
          </div>

          {/* Node 2: Worker Node 01 */}
          <div className="bg-[#0b101e] rounded-2xl border border-slate-800 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                  <div>
                    <h3 className="text-sm font-mono font-bold text-white">worker-node-01</h3>
                    <div className="text-[10px] font-mono text-slate-400">192.168.1.11</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40 text-[10px] font-mono font-bold">
                  READY
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">Scheduled Workload Pods:</div>
                
                {pods.filter(p => p.node === 'worker-node-01').map(pod => (
                  <div
                    key={pod.id}
                    onClick={() => setSelectedPod(pod)}
                    className="p-3 rounded-xl bg-[#060a12] border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-white truncate max-w-[170px] group-hover:text-cyan-300">
                        {pod.name.split('-')[0]}
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        pod.status === 'Running' 
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40' 
                          : pod.status === 'ContainerCreating'
                          ? 'bg-blue-950 text-blue-400 animate-pulse'
                          : 'bg-rose-950 text-rose-400 border border-rose-800/40'
                      }`}>
                        {pod.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>CPU: {pod.cpu} | MEM: {pod.memory}</span>
                      <span className="text-cyan-400">Restarts: {pod.restarts}</span>
                    </div>

                    <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-500">Click to view YAML</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSimulateCrash(pod.id);
                        }}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800/50 flex items-center gap-1 transition-colors"
                        title="Chaos Engineering: Kill Pod"
                      >
                        <Flame className="w-3 h-3 text-rose-400" />
                        <span>Crash</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Pods Allocated:</span>
              <span className="text-cyan-400 font-bold">3 / 110 Cap</span>
            </div>
          </div>

          {/* Node 3: Worker Node 02 */}
          <div className="bg-[#0b101e] rounded-2xl border border-slate-800 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                  <div>
                    <h3 className="text-sm font-mono font-bold text-white">worker-node-02</h3>
                    <div className="text-[10px] font-mono text-slate-400">192.168.1.12</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40 text-[10px] font-mono font-bold">
                  READY
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">Scheduled Workload Pods:</div>
                
                {pods.filter(p => p.node === 'worker-node-02').map(pod => (
                  <div
                    key={pod.id}
                    onClick={() => setSelectedPod(pod)}
                    className="p-3 rounded-xl bg-[#060a12] border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-white truncate max-w-[170px] group-hover:text-cyan-300">
                        {pod.name.split('-')[0]}
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        pod.status === 'Running' 
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40' 
                          : pod.status === 'ContainerCreating'
                          ? 'bg-blue-950 text-blue-400 animate-pulse'
                          : 'bg-rose-950 text-rose-400 border border-rose-800/40'
                      }`}>
                        {pod.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>CPU: {pod.cpu} | MEM: {pod.memory}</span>
                      <span className="text-cyan-400">Restarts: {pod.restarts}</span>
                    </div>

                    <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-500">Click to view YAML</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSimulateCrash(pod.id);
                        }}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800/50 flex items-center gap-1 transition-colors"
                        title="Chaos Engineering: Kill Pod"
                      >
                        <Flame className="w-3 h-3 text-rose-400" />
                        <span>Crash</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Pods Allocated:</span>
              <span className="text-cyan-400 font-bold">4 / 110 Cap</span>
            </div>
          </div>

        </div>

        {/* Selected Pod YAML & Inspection Modal */}
        {selectedPod && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-[#0b101f] border border-cyan-500/40 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl shadow-cyan-950/80 max-h-[90vh] flex flex-col">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
                <div className="flex items-center gap-2">
                  <TerminalIcon className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-mono font-bold text-white">
                    kubectl get pod {selectedPod.name} -o yaml
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedPod(null)}
                  className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px] shrink-0">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-slate-400">Namespace:</div>
                  <div className="text-cyan-400 font-bold">{selectedPod.namespace}</div>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-slate-400">Node:</div>
                  <div className="text-slate-200 font-bold">{selectedPod.node}</div>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-slate-400">Pod IP:</div>
                  <div className="text-emerald-400 font-bold">{selectedPod.ip}</div>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-slate-400">Status:</div>
                  <div className="text-emerald-400 font-bold">{selectedPod.status}</div>
                </div>
              </div>

              {/* YAML Code Container */}
              <pre className="flex-1 overflow-y-auto bg-[#050811] border border-slate-800 rounded-xl p-4 font-mono text-xs text-cyan-300 leading-relaxed select-all">
                {selectedPod.yaml}
              </pre>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between shrink-0">
                <button
                  onClick={() => {
                    handleSimulateCrash(selectedPod.id);
                    setSelectedPod(null);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950 text-rose-300 border border-rose-800/60 font-mono text-xs hover:bg-rose-900"
                >
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                  <span>Crash This Pod (Test Self-Healing)</span>
                </button>

                <button
                  onClick={() => setSelectedPod(null)}
                  className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

