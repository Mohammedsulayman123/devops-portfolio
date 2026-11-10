import React, { useState } from 'react';
import { 
  FileCode, 
  Copy, 
  Check, 
  Sliders, 
  ShieldCheck, 
  Cpu, 
  Globe, 
  Activity,
  Layers
} from 'lucide-react';

export const ManifestGenerator: React.FC = () => {
  const [appName, setAppName] = useState('wanderlust-api');
  const [replicas, setReplicas] = useState(3);
  const [enableIngress, setEnableIngress] = useState(true);
  const [enableHpa, setEnableHpa] = useState(true);
  const [enableSecurityContext, setEnableSecurityContext] = useState(true);
  const [enablePrometheus, setEnablePrometheus] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatedYaml = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${appName}
  namespace: production
  labels:
    app.kubernetes.io/name: ${appName}
    app.kubernetes.io/managed-by: helm
spec:
  replicas: ${replicas}
  selector:
    matchLabels:
      app: ${appName}
  template:
    metadata:
      labels:
        app: ${appName}
${enablePrometheus ? `      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "8080"
        prometheus.io/path: "/metrics"` : ''}
    spec:
${enableSecurityContext ? `      securityContext:
        runAsNonRoot: true
        runAsUser: 10001
        fsGroup: 10001` : ''}
      containers:
      - name: ${appName}
        image: sulayman/${appName}:v2.4
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 8080
          name: http
        resources:
          limits:
            cpu: 500m
            memory: 512Mi
          requests:
            cpu: 100m
            memory: 128Mi
        livenessProbe:
          httpGet:
            path: /healthz
            port: 8080
          initialDelaySeconds: 10
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
${enableIngress ? `---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ${appName}-ingress
  namespace: production
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  rules:
  - host: ${appName}.prod.sulayman.dev
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: ${appName}-svc
            port:
              number: 8080` : ''}
${enableHpa ? `---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: ${appName}-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: ${appName}
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70` : ''}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedYaml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="manifest-generator" className="py-20 bg-[#070b14] relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-wider uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              DevOps Infrastructure as Code (IaC)
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Interactive Kubernetes Manifest Generator
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Toggle production-grade SRE requirements—such as non-root security contexts, Ingress routing, 
              HPA autoscaling, and Prometheus scraping—to generate production-ready Kubernetes YAML.
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-semibold shadow-lg shadow-cyan-900/30 transition-all shrink-0"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy K8s Manifest'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Controls Panel (5 Cols) */}
          <div className="lg:col-span-5 bg-[#0b101e] border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-xs font-mono font-bold text-white">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Manifest Configuration Options</span>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div>
                <label className="text-slate-400 uppercase tracking-wider text-[11px] block mb-1.5">
                  Deployment / Workload Name
                </label>
                <input
                  type="text"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  className="w-full bg-[#060a12] border border-slate-800 rounded-lg px-3 py-2 text-cyan-300 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-slate-400 uppercase tracking-wider text-[11px]">Static Replicas: {replicas}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={replicas}
                  onChange={(e) => setReplicas(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              {/* Toggles */}
              <div className="space-y-3 pt-2">
                <label className="flex items-center justify-between p-3 rounded-lg bg-[#060a12] border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="text-white text-xs font-bold">Hardened Security Context</div>
                      <div className="text-[10px] text-slate-400 font-sans">Run as non-root (UID 10001)</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={enableSecurityContext}
                    onChange={(e) => setEnableSecurityContext(e.target.checked)}
                    className="accent-cyan-500 w-4 h-4"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-lg bg-[#060a12] border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    <div>
                      <div className="text-white text-xs font-bold">Prometheus Annotations</div>
                      <div className="text-[10px] text-slate-400 font-sans">Automated metric scraping</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={enablePrometheus}
                    onChange={(e) => setEnablePrometheus(e.target.checked)}
                    className="accent-cyan-500 w-4 h-4"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-lg bg-[#060a12] border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-blue-400" />
                    <div>
                      <div className="text-white text-xs font-bold">NGINX Ingress Routing</div>
                      <div className="text-[10px] text-slate-400 font-sans">TLS cert-manager annotations</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={enableIngress}
                    onChange={(e) => setEnableIngress(e.target.checked)}
                    className="accent-cyan-500 w-4 h-4"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-lg bg-[#060a12] border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <Cpu className="w-4 h-4 text-purple-400" />
                    <div>
                      <div className="text-white text-xs font-bold">Horizontal Pod Autoscaler (HPA)</div>
                      <div className="text-[10px] text-slate-400 font-sans">Autoscales from 2 to 10 pods</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={enableHpa}
                    onChange={(e) => setEnableHpa(e.target.checked)}
                    className="accent-cyan-500 w-4 h-4"
                  />
                </label>
              </div>

            </div>
          </div>

          {/* Generated YAML Viewer (7 Cols) */}
          <div className="lg:col-span-7 bg-[#050811] border border-slate-800 rounded-2xl p-5 flex flex-col h-[520px]">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-300">
                <FileCode className="w-4 h-4 text-cyan-400" />
                <span className="font-bold">{appName}-deployment.yaml</span>
              </div>
              <span className="text-[11px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/40">
                kubectl-apply-ready
              </span>
            </div>

            <pre className="flex-1 overflow-y-auto font-mono text-xs text-cyan-300 leading-relaxed pr-2 select-all">
              {generatedYaml}
            </pre>
          </div>

        </div>

      </div>
    </section>
  );
};

