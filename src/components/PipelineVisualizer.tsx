import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  GitBranch, 
  ShieldCheck, 
  Box, 
  FileCode, 
  Terminal as TerminalIcon,
  Server,
  Activity
} from 'lucide-react';
import { PIPELINE_STEPS } from '../data/portfolioData';
import confetti from 'canvas-confetti';

export const PipelineVisualizer: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [selectedStep, setSelectedStep] = useState<number>(0);
  const [logLines, setLogLines] = useState<string[]>([]);
  const logTerminalRef = useRef<HTMLDivElement>(null);

  // Initialize with step 0 selected
  useEffect(() => {
    setSelectedStep(0);
    setLogLines(PIPELINE_STEPS[0].logs);
  }, []);

  // Handle pipeline execution simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning && activeStep < PIPELINE_STEPS.length) {
      // Simulate step duration
      timer = setTimeout(() => {
        setCompletedSteps(prev => [...prev, activeStep]);
        setSelectedStep(activeStep);
        setLogLines(prev => [...prev, `[STAGE COMPLETE] Stage: ${PIPELINE_STEPS[activeStep].name} finished in ${PIPELINE_STEPS[activeStep].duration}`, ...PIPELINE_STEPS[activeStep].logs]);
        
        if (activeStep + 1 < PIPELINE_STEPS.length) {
          setActiveStep(prev => prev + 1);
        } else {
          setIsRunning(false);
          // Trigger confetti on pipeline success!
          try {
            confetti({
              particleCount: 60,
              spread: 70,
              origin: { y: 0.6 }
            });
          } catch (e) {
            // ignore if canvas not supported
          }
        }
      }, 1400);
    }

    return () => clearTimeout(timer);
  }, [isRunning, activeStep]);

  // Scroll to bottom of terminal log
  useEffect(() => {
    if (logTerminalRef.current) {
      logTerminalRef.current.scrollTop = logTerminalRef.current.scrollHeight;
    }
  }, [logLines]);

  const handleStartPipeline = () => {
    setCompletedSteps([]);
    setActiveStep(0);
    setSelectedStep(0);
    setLogLines([
      "[JENKINS WORKFLOW INITIALIZED]",
      `[PIPELINE] Project: wanderlust-production-cd`,
      `[TRIGGER] Push event detected on main branch (Sulayman)`,
      `[INFO] Allocating dynamic Kubernetes build agent... Ready!`,
      "------------------------------------------------------------------"
    ]);
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setActiveStep(0);
    setCompletedSteps([0, 1, 2, 3, 4, 5]); // default all green for static review
    setSelectedStep(0);
    setLogLines(PIPELINE_STEPS[0].logs);
  };

  const getStageIcon = (id: number) => {
    switch (id) {
      case 1: return <GitBranch className="w-5 h-5" />;
      case 2: return <ShieldCheck className="w-5 h-5" />;
      case 3: return <Box className="w-5 h-5" />;
      case 4: return <AlertCircle className="w-5 h-5" />;
      case 5: return <Server className="w-5 h-5" />;
      case 6: return <Activity className="w-5 h-5" />;
      default: return <FileCode className="w-5 h-5" />;
    }
  };

  return (
    <section id="pipeline" className="py-20 bg-[#080c16] relative border-t border-b border-cyan-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-wider uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Automated DevSecOps Workflow
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Interactive CI/CD Pipeline Visualizer
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Modeled after the Jenkins & DevSecOps pipelines Mohammed Sulayman engineered at Ooredoo Qatar & Wanderlust. 
              Run the live simulation to trace security scans, automated builds, and zero-downtime Kubernetes deployments.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleStartPipeline}
              disabled={isRunning}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-xs sm:text-sm font-semibold transition-all ${
                isRunning
                  ? 'bg-cyan-950 text-cyan-400 border border-cyan-800 cursor-wait'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/25'
              }`}
            >
              <Play className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />
              <span>{isRunning ? 'Executing Pipeline...' : 'Run Pipeline Simulation'}</span>
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 font-mono text-xs transition-colors"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Pipeline Diagram Bar */}
        <div className="bg-[#0b101d] rounded-2xl border border-slate-800 p-6 shadow-xl mb-6">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800/80 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-slate-200 font-semibold">PIPELINE:</span>
              <span className="text-cyan-400">wanderlust-production-v2</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">Jenkinsfile</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Duration: <strong className="text-slate-200">1m 29s</strong></span>
              <span>Result: <strong className="text-emerald-400">SUCCESS</strong></span>
            </div>
          </div>

          {/* Pipeline Stage Nodes */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {PIPELINE_STEPS.map((step, idx) => {
              const isCompleted = completedSteps.includes(idx) || (completedSteps.length === 0 && !isRunning);
              const isCurrent = isRunning && activeStep === idx;
              const isSelected = selectedStep === idx;

              return (
                <div
                  key={step.id}
                  onClick={() => {
                    setSelectedStep(idx);
                    setLogLines(step.logs);
                  }}
                  className={`relative cursor-pointer rounded-xl p-3.5 border transition-all duration-200 ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-400 ring-2 ring-cyan-500/20 shadow-lg'
                      : isCurrent
                      ? 'bg-blue-950/30 border-blue-400 animate-pulse'
                      : isCompleted
                      ? 'bg-[#0f172a] border-emerald-900/60 hover:border-emerald-500/40'
                      : 'bg-slate-900/40 border-slate-800 opacity-60'
                  }`}
                >
                  {/* Step status icon */}
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-1.5 rounded-lg ${
                      isCurrent
                        ? 'bg-blue-500/20 text-blue-400'
                        : isCompleted
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {getStageIcon(step.id)}
                    </div>

                    <div className="text-[10px] font-mono">
                      {isCurrent ? (
                        <span className="text-blue-400 flex items-center gap-1 font-semibold">
                          <Clock className="w-3 h-3 animate-spin" /> RUNNING
                        </span>
                      ) : isCompleted ? (
                        <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                          <CheckCircle2 className="w-3 h-3" /> PASS
                        </span>
                      ) : (
                        <span className="text-slate-500">PENDING</span>
                      )}
                    </div>
                  </div>

                  {/* Stage title & tool */}
                  <div className="space-y-0.5">
                    <div className="text-xs font-mono font-bold text-slate-200">
                      {step.name}
                    </div>
                    <div className="text-[11px] font-mono text-cyan-400">
                      {step.tool}
                    </div>
                  </div>

                  {/* Duration footer */}
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>Stage {step.id}</span>
                    <span>{step.duration}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Terminal & Stage Inspector Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Stage Details Card */}
          <div className="lg:col-span-5 bg-[#0b101d] rounded-2xl border border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-mono font-bold text-white">
                  Stage Details: {PIPELINE_STEPS[selectedStep].name}
                </h3>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/50">
                {PIPELINE_STEPS[selectedStep].tool}
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <label className="text-slate-400 text-[11px] uppercase tracking-wider block mb-1">
                  Automated Shell Execution:
                </label>
                <div className="p-2.5 rounded-lg bg-[#060a12] border border-slate-800 text-cyan-300 overflow-x-auto select-all">
                  $ {PIPELINE_STEPS[selectedStep].command}
                </div>
              </div>

              <div>
                <label className="text-slate-400 text-[11px] uppercase tracking-wider block mb-1">
                  DevSecOps Value & Impact:
                </label>
                <p className="text-slate-300 font-sans text-xs sm:text-sm leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                  {selectedStep === 0 && "Webhook-driven trigger instantly kicks off automated validation upon git push, eliminating human handoffs."}
                  {selectedStep === 1 && "SonarQube enforces strict quality gates on every PR, preventing tech debt, code smells, and security bugs before packaging."}
                  {selectedStep === 2 && "Docker multi-stage builds prune dev dependencies, shrinking container image sizes to under 50MB for rapid node pulls."}
                  {selectedStep === 3 && "Trivy scans container layers for known OS & library CVEs, failing the build automatically if critical vulnerabilities exist."}
                  {selectedStep === 4 && "Immutable SHA tags pushed to registry, preventing container tag overwrites and ensuring rollback reproducibility."}
                  {selectedStep === 5 && "Helm declarative deployment executes zero-downtime rolling restart on Kubernetes, verified with synthetic Prometheus probes."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px]">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-slate-400">Duration:</div>
                  <div className="text-emerald-400 font-bold">{PIPELINE_STEPS[selectedStep].duration}</div>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-slate-400">Exit Status:</div>
                  <div className="text-cyan-400 font-bold">Code 0 (OK)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Streaming Console Output */}
          <div className="lg:col-span-7 bg-[#050811] rounded-2xl border border-slate-800 p-5 flex flex-col h-[320px]">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <TerminalIcon className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono text-slate-300 font-bold">
                  Jenkins Build Console Output
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                STDOUT / STDERR
              </span>
            </div>

            <div 
              ref={logTerminalRef}
              className="flex-1 overflow-y-auto font-mono text-xs space-y-1.5 text-slate-300 pr-2 select-text"
            >
              {logLines.map((line, i) => (
                <div 
                  key={i} 
                  className={`leading-relaxed ${
                    line.includes('[SUCCESS]') || line.includes('PASSED') || line.includes('PASS')
                      ? 'text-emerald-400 font-semibold'
                      : line.includes('[QUALITY GATE]') || line.includes('[SECURITY CHECK]')
                      ? 'text-cyan-300'
                      : line.includes('[STAGE COMPLETE]')
                      ? 'text-yellow-300'
                      : 'text-slate-300'
                  }`}
                >
                  {line}
                </div>
              ))}
              {isRunning && (
                <div className="flex items-center gap-2 text-cyan-400 pt-1">
                  <span className="animate-pulse">▶</span>
                  <span>Streaming pipeline logs...</span>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

