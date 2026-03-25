import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const textWrapperRef = useRef(null);
  const bottomBarRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. The Deep Breath (4K Video Reveal)
      tl.fromTo(videoRef.current, 
        { scale: 1.02, opacity: 0, filter: "blur(10px)" }, 
        { scale: 1, opacity: 0.85, filter: "blur(0px)", duration: 2.5, ease: "power3.out" }
      );

      // 2. The Skew Mask Reveal
      tl.fromTo(".hero-char", 
        { y: "120%", skewY: 8 }, 
        { y: "0%", skewY: 0, duration: 1.2, stagger: 0.05, ease: "expo.out" },
        0.8 
      );

      // 3. Subtext Fade & Expand
      tl.fromTo(".hero-subtext",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 1.5, ease: "power3.out" },
        1.5
      );
      
      tl.fromTo(".hero-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: "expo.out" },
        1.5
      );

      // 4. Bottom Bar Slide Up
      tl.fromTo(bottomBarRef.current,
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.2, ease: "power4.out" },
        1.8
      );

      // 5. Scroll Parallax
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        yPercent: 15,
        filter: "blur(5px)",
        opacity: 0
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    if (!textWrapperRef.current) return;
    const { clientX, clientY } = e;
    
    const moveX = (clientX / window.innerWidth - 0.5) * 20; 
    const moveY = (clientY / window.innerHeight - 0.5) * 20;

    gsap.to(textWrapperRef.current, {
      x: moveX,
      y: moveY,
      duration: 1.5,
      ease: "power2.out"
    });
  };

  const title = "ICONICX".split("");

  return (
    <section 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen bg-[#F4F3EF] overflow-hidden flex flex-col justify-between select-none"
    >
      
      {/* --- 1. THE CINEMATIC 4K LAPTOP BACKGROUND --- */}
      <video 
        ref={videoRef}
        src="/hero-loop.mp4" 
        autoPlay loop muted playsInline 
        className="absolute inset-0 w-full h-full object-cover object-center z-0 pointer-events-none origin-center"
      />

      {/* Editorial Grain */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.04] mix-blend-multiply"
        style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png")', backgroundRepeat: 'repeat' }}
      ></div>
      
      {/* Soft Wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F4F3EF]/50 via-transparent to-[#F4F3EF]/90 z-0 pointer-events-none"></div>

      {/* --- 2. THE FLOATING MONOLITH TYPOGRAPHY --- */}
      <div className="relative z-10 flex-1 flex flex-col justify-center w-full max-w-[90rem] mx-auto px-6 md:px-12 lg:px-24 pointer-events-none">
        
        <div ref={textWrapperRef} className="flex flex-col items-center md:items-start w-full">
          
          <h1 className="font-clash text-[24vw] md:text-[14vw] lg:text-[13vw] font-black leading-[0.8] text-[#121212] tracking-tighter flex">
            {title.map((char, index) => (
              <div key={index} className="overflow-hidden pb-4 md:pb-8 -mb-4 md:-mb-8">
                <span className="hero-char inline-block drop-shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
                  {char}
                </span>
              </div>
            ))}
          </h1>

          <div className="hero-subtext mt-6 md:mt-10 flex items-center gap-4 md:gap-6 pl-1 md:pl-4">
            <span className="text-[10px] md:text-xs font-mono uppercase text-[#121212]/70 whitespace-nowrap tracking-[0.3em] md:tracking-[0.5em] flex items-center gap-3 font-bold">
              <div className="w-1.5 h-1.5 rounded-full bg-[#121212] animate-pulse"></div>
              Digital Architects
            </span>
            <div className="hero-line w-12 md:w-32 h-[1px] bg-[#121212]/20 origin-left hidden sm:block"></div>
          </div>

        </div>
      </div>

      {/* --- 3. THE SQUAD CONTROL PANEL (BIGGER FONTS FIX) --- */}
      <div 
        ref={bottomBarRef}
        className="relative z-20 w-full grid grid-cols-2 md:grid-cols-4 border-t border-[#121212]/10 font-mono uppercase tracking-[0.2em] bg-white/50 backdrop-blur-2xl font-bold"
      >
        {/* 🚀 ARYAN */}
        <div className="px-2 py-6 md:px-6 md:py-8 border-r border-b md:border-b-0 border-[#121212]/10 flex flex-col items-center md:items-start justify-center hover:bg-[#121212] transition-all duration-500 cursor-pointer group text-[#121212]/60">
          {/* 🚀 HIGHLIGHT: Fonts increased to text-[13px] on mobile, up to text-[16px] on desktop */}
          <span className="text-[#121212] group-hover:text-[#00e5ff] text-[13px] md:text-[15px] lg:text-[16px] font-black mb-1 md:mb-2 tracking-[0.25em] md:tracking-[0.3em] group-hover:tracking-[0.4em] transition-all duration-300">ARYAN</span>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-1 md:gap-1.5 group-hover:text-white/60 text-[8px] md:text-[9px] lg:text-[10px] transition-colors duration-300">
            <span className="whitespace-nowrap">Lead Architect</span>
            <span className="hidden md:block opacity-40">//</span>
            <span className="whitespace-nowrap opacity-60 md:opacity-100">WebGL</span>
          </div>
        </div>
        
        {/* 🚀 AYAZ */}
        <div className="px-2 py-6 md:px-6 md:py-8 border-b md:border-r md:border-b-0 border-[#121212]/10 flex flex-col items-center md:items-center justify-center hover:bg-[#121212] transition-all duration-500 cursor-pointer group text-[#121212]/60">
          <span className="text-[#121212] group-hover:text-[#D5C6FF] text-[13px] md:text-[15px] lg:text-[16px] font-black mb-1 md:mb-2 tracking-[0.25em] md:tracking-[0.3em] group-hover:tracking-[0.4em] transition-all duration-300">AYAZ</span>
          <div className="flex flex-col md:flex-row items-center md:items-center gap-1 md:gap-1.5 group-hover:text-white/60 text-[8px] md:text-[9px] lg:text-[10px] transition-colors duration-300">
            <span className="whitespace-nowrap">Creative Director</span>
            <span className="hidden md:block opacity-40">//</span>
            <span className="whitespace-nowrap opacity-60 md:opacity-100">UI-UX</span>
          </div>
        </div>
        
        {/* 🚀 DIVYANSH */}
        <div className="px-2 py-6 md:px-6 md:py-8 border-r border-[#121212]/10 flex flex-col items-center md:items-center justify-center hover:bg-[#121212] transition-all duration-500 cursor-pointer group text-[#121212]/60">
          <span className="text-[#121212] group-hover:text-[#ccff00] text-[13px] md:text-[15px] lg:text-[16px] font-black mb-1 md:mb-2 tracking-[0.25em] md:tracking-[0.3em] group-hover:tracking-[0.4em] transition-all duration-300">DIVYANSH</span>
          <div className="flex flex-col md:flex-row items-center md:items-center gap-1 md:gap-1.5 group-hover:text-white/60 text-[8px] md:text-[9px] lg:text-[10px] transition-colors duration-300">
            <span className="whitespace-nowrap">Head of Growth</span>
            <span className="hidden md:block opacity-40">//</span>
            <span className="whitespace-nowrap opacity-60 md:opacity-100">Frontend</span>
          </div>
        </div>

        {/* 🚀 AMAN */}
        <div className="px-2 py-6 md:px-6 md:py-8 flex flex-col items-center md:items-end justify-center hover:bg-[#121212] transition-all duration-500 cursor-pointer group text-[#121212]/60">
          <span className="text-[#121212] group-hover:text-[#FFD1B3] text-[13px] md:text-[15px] lg:text-[16px] font-black mb-1 md:mb-2 tracking-[0.25em] md:tracking-[0.3em] group-hover:tracking-[0.4em] transition-all duration-300">AMAN</span>
          <div className="flex flex-col md:flex-row items-center md:items-end gap-1 md:gap-1.5 group-hover:text-white/60 text-[8px] md:text-[9px] lg:text-[10px] transition-colors duration-300">
            <span className="whitespace-nowrap">Sales & Dev</span>
            <span className="hidden md:block opacity-40">//</span>
            <span className="whitespace-nowrap opacity-60 md:opacity-100">Full-Stack</span>
          </div>
        </div>
      </div>

    </section>
  );
}