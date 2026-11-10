import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PipelineVisualizer } from './components/PipelineVisualizer';
import { ClusterTopology } from './components/ClusterTopology';
import { Projects } from './components/Projects';
import { ObservabilitySkills } from './components/ObservabilitySkills';
import { Experience } from './components/Experience';
import { TerminalSection } from './components/TerminalSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Terminal } from './components/Terminal';
import { ResumeModal } from './components/ResumeModal';

export const App: React.FC = () => {
  const [isTerminalModalOpen, setIsTerminalModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // Global hotkey: press `~` to toggle terminal modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setIsTerminalModalOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setIsTerminalModalOpen(false);
        setIsResumeModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans">
      {/* Top Fixed Telemetry & Navigation */}
      <Header
        onOpenTerminal={() => setIsTerminalModalOpen(true)}
        onOpenResume={() => setIsResumeModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onOpenTerminal={() => setIsTerminalModalOpen(true)}
          onOpenResume={() => setIsResumeModalOpen(true)}
        />
        <PipelineVisualizer />
        <ClusterTopology />
        <Projects />
        <ObservabilitySkills />
        <Experience />
        <TerminalSection />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating CLI Terminal Modal */}
      {isTerminalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <Terminal isModal={true} onClose={() => setIsTerminalModalOpen(false)} />
        </div>
      )}

      {/* Resume PDF / Print Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
};

export default App;

