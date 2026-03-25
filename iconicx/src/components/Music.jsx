import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Music() {
  const [isRawMode, setIsRawMode] = useState(false);
  const sectionRef = useRef(null);
  // Using a heavy, raw hip-hop/trap beat placeholder
  const audioRef = useRef(new Audio('https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-738.mp3'));

  useEffect(() => {
    // Normal entrance animation
    gsap.fromTo(".music-reveal", 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );
  }, []);

  const toggleRawMode = () => {
    if (!isRawMode) {
      // Turn ON Raw Mode
      document.body.classList.add('raw-mode');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.8; // Loud and impactful
      audioRef.current.play();
    } else {
      // Turn OFF Raw Mode
      document.body.classList.remove('raw-mode');
      audioRef.current.pause();
    }
    setIsRawMode(!isRawMode);
  };

  return (
    <section ref={sectionRef} className="relative w-full py-32 px-8 md:px-24 flex flex-col items-center justify-center border-t border-primary/10">
      
      <div className="music-reveal text-center max-w-2xl mb-16">
        <span className="text-xs tracking-[0.5em] uppercase font-bold text-primary/40 mb-4 block">
          04 // The Alter-Ego
        </span>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none mb-6">
          CODE IS <span className="italic font-light">LOGIC.</span><br/>
          MUSIC IS <span className="italic font-light">EMOTION.</span>
        </h2>
        <p className="text-sm md:text-base font-light text-primary/60">
          I don't just build architectures. I produce the frequencies that drive them. 
          Step out of the editorial studio and into the raw engine room.
        </p>
      </div>

      {/* The "Do Not Press" Style Button */}
      <button 
        onClick={toggleRawMode}
        className={`music-reveal hover-target relative px-12 py-6 border transition-all duration-300 overflow-hidden group ${
          isRawMode ? 'border-[#ff003c] text-[#ff003c] bg-black/50' : 'border-primary text-primary hover:bg-primary hover:text-background'
        }`}
      >
        <span className="relative z-10 text-xs tracking-[0.4em] font-bold uppercase">
          {isRawMode ? 'TERMINATE_SYS // STOP' : 'INITIATE RAW_MODE'}
        </span>
        
        {/* Hover fill effect */}
        {!isRawMode && (
          <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
        )}
      </button>

      {/* Hidden Audio Visualizer that only shows in Raw Mode */}
      {isRawMode && (
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center opacity-20 z-0">
          <span className="text-[15vw] font-black tracking-tighter text-[#ff003c] opacity-50 select-none animate-pulse">
            TAKE A BREAK
          </span>
          <span className="text-2xl tracking-[1em] mt-4">PROD. BY ARYAN</span>
        </div>
      )}

    </section>
  );
}