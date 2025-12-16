import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectSummary from './components/ProjectSummary';
import FitrahDefinition from './components/FitrahDefinition';
import Vision from './components/Vision';
import MissionVision from './components/MissionVision';
import Goals from './components/Goals';
import Lifestyle from './components/Lifestyle';
import Education from './components/Education';
import Family from './components/Family';
import AmbassadorIntro from './components/AmbassadorIntro';
import Ambassadors from './components/Ambassadors';
import AmbassadorTasks from './components/AmbassadorTasks';
import ProgramComponents from './components/ProgramComponents';
import FAQ from './components/FAQ';
import Contact from './components/Contact';

function App() {
  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen font-sans text-right" dir="rtl">
      <Header />
      <main>
        <Hero />
        <ProjectSummary />
        <FitrahDefinition />
        <Vision />
        <MissionVision />
        <Education />
        <Family />
        <Lifestyle />
        <Goals />
        <ProgramComponents />
        <AmbassadorIntro />
        <AmbassadorTasks />
        <Ambassadors />
        <FAQ />
        <Contact />
      </main>
    </div>
  );
}

export default App;
