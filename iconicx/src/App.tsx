import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects'; 
import Contact from './components/Contact';
import CustomCursor from './components/ui/CustomCursor';

function App() {

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000); 
    
    window.addEventListener('resize', () => ScrollTrigger.refresh());

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', () => ScrollTrigger.refresh());
    }
  }, []);

  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />

      {/* 🚀 FIX: Removed bg-[#050505] aur overflow-hidden. 
          Ab har page apna asil color (Dark ya Off-White) dikha payega bina kisi restriction ke! */}
      <main className="w-full min-h-screen flex flex-col">
        
        <Hero />
        <About />
        <Services />
        
        {/* THE NEW PORTFOLIO ARCHIVES */}
        <Projects />
        
        <Contact />

      </main>
    </SmoothScroll>
  );
}

export default App;