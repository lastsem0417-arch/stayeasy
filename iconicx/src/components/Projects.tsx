import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 🎨 SITETRIP PREMIUM PASTEL/VIBRANT COLORS
const projects = [
  {
    id: "01",
    title: "BEATFLOW",
    tech: "MERN STACK // AUDIO COLLAB",
    creator: "ARYAN",
    bgColor: "#D5C6FF", // Sitetrip Soft Lilac/Purple
    image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1600&auto=format&fit=crop",
    overview: "A real-time audio collaboration engine built for modern musicians. BeatFlow allows multiple users to edit, mix, and share tracks seamlessly in the browser with zero latency.",
    stack: ["MongoDB", "Express", "React", "Node.js", "Web Audio API", "Socket.io"],
    github: "https://github.com/aryan/beatflow",
    live: "https://beatflow.studio"
  },
  {
    id: "02",
    title: "SMART GROCERY",
    tech: "MEAN STACK // FACE PAY",
    creator: "ARYAN",
    bgColor: "#FFD1B3", // Sitetrip Premium Peach
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1600&auto=format&fit=crop",
    overview: "The future of retail. A fully automated grocery checkout system integrating custom AI facial recognition for payment processing, built on a robust MEAN stack architecture.",
    stack: ["Angular", "Node.js", "Python (OpenCV)", "MongoDB", "Express"],
    github: "https://github.com/aryan/smart-grocery",
    live: "https://smartgrocery.ai"
  },
  {
    id: "03",
    title: "ALUMNI CONNECT",
    tech: "REACT // COMMUNITY",
    creator: "DIVYANSH",
    bgColor: "#BCE0FD", // Sitetrip Sky Blue
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1600&auto=format&fit=crop",
    overview: "A highly interactive networking portal designed to bridge the gap between current students and university alumni. Features include real-time chat, mentorship scheduling, and job boards.",
    stack: ["React", "Firebase", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/divyansh/alumni-connect",
    live: "#"
  },
  {
    id: "04",
    title: "CODE SYNC",
    tech: "NODE.JS // COLLAB EDITOR",
    creator: "DIVYANSH",
    bgColor: "#C4F4C7", // Sitetrip Mint Green
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop",
    overview: "A collaborative, browser-based code editor. Multiple developers can write, debug, and execute code in real-time within the same environment, powered by WebSockets.",
    stack: ["Node.js", "React", "Socket.io", "Monaco Editor"],
    github: "https://github.com/divyansh/code-sync",
    live: "#"
  },
  {
    id: "05",
    title: "SHOEFINITY",
    tech: "NEXT.JS // E-COMMERCE",
    creator: "AYAZ",
    bgColor: "#FDEB9D", // Sitetrip Soft Sun Yellow
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop",
    overview: "A brutalist, high-conversion e-commerce platform for limited-edition sneakers. Features 3D product viewing and seamless Stripe checkout integration.",
    stack: ["Next.js", "Three.js", "Stripe", "Tailwind", "Vercel"],
    github: "https://github.com/ayaz/shoefinity",
    live: "#"
  },
  {
    id: "06",
    title: "SMART ATTENDANCE",
    tech: "MEAN STACK // BIOMETRICS",
    creator: "AMAN",
    bgColor: "#FFC2D1", // Sitetrip Soft Rose
    image: "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?q=80&w=1600&auto=format&fit=crop",
    overview: "An enterprise-grade attendance tracking system. Replaces outdated ID cards with a fast, secure, and touchless biometric and facial recognition pipeline.",
    stack: ["MongoDB", "Express", "Angular", "Node.js", "AWS Rekognition"],
    github: "https://github.com/aman/smart-attendance",
    live: "#"
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null); 
  const containerRef = useRef(null);

  // 🪄 THE SITETRIP COLOR BLENDING ENGINE (Light/Premium Theme)
  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.project-card');

      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 60%", // Triggers slightly before the middle of the screen
          end: "bottom 60%",
          onEnter: () => gsap.to(containerRef.current, { backgroundColor: projects[i].bgColor, duration: 1.5, ease: "power2.out" }),
          onEnterBack: () => gsap.to(containerRef.current, { backgroundColor: projects[i].bgColor, duration: 1.5, ease: "power2.out" }),
        });
      });

      // Revert to Off-White base when scrolling back up to the Header
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "top 60%",
        onEnterBack: () => gsap.to(containerRef.current, { backgroundColor: '#F4F3EF', duration: 1.5, ease: "power2.out" }),
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Locks background scroll perfectly when Modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedProject]);

  return (
    // Base color is Sitetrip Off-White (#F4F3EF), text is Soft Black (#121212)
    <section id="archives" ref={containerRef} className="relative w-full bg-[#F4F3EF] text-[#121212] py-24 md:py-40 transition-colors duration-[1500ms]">
      
      <div className="max-w-[90rem] mx-auto px-6 md:px-12">
        
        {/* --- HEADER --- */}
        <div className="mb-24 md:mb-32 border-b border-[#121212]/10 pb-10">
          <span className="text-[10px] tracking-[0.5em] uppercase font-bold text-[#121212]/40 block mb-4">
            04 // Selected Works
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase text-[#121212]">
            The Archives
          </h2>
        </div>

        {/* --- THE SITETRIP MASSIVE CARDS LAYOUT --- */}
        <div className="flex flex-col w-full gap-32 md:gap-48">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className="project-card w-full flex flex-col items-center group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              
              {/* Card Meta (Title & Tags) - Dark text for premium light background */}
              <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 md:mb-12 px-2 md:px-4">
                
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-4 text-[#121212]/50 mb-2">
                    <span className="text-sm font-mono">{project.id}</span>
                    <div className="w-8 h-[1px] bg-[#121212]/30"></div>
                  </div>
                  <h3 className="font-clash text-5xl md:text-7xl lg:text-[7rem] font-black uppercase tracking-tighter leading-[0.85] text-[#121212] group-hover:opacity-70 transition-opacity duration-500">
                    {project.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-4 pb-2">
                  <span className="px-5 py-2 border border-[#121212]/20 rounded-full text-[10px] font-mono tracking-widest uppercase text-[#121212]/70 bg-white/20 backdrop-blur-sm">
                    Lead: {project.creator}
                  </span>
                  <span className="px-5 py-2 border border-[#121212]/20 rounded-full text-[10px] font-mono tracking-widest uppercase text-[#121212]/70 bg-white/20 backdrop-blur-sm">
                    {project.tech}
                  </span>
                </div>

              </div>

              {/* Massive Sitetrip Style Image Reveal */}
              <div className="w-full h-[50vh] md:h-[80vh] rounded-[24px] md:rounded-[40px] overflow-hidden relative shadow-[0_40px_100px_rgba(0,0,0,0.1)]">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  // Kept original colors but enhanced contrast for that premium studio look
                  className="w-full h-full object-cover filter contrast-[1.1] group-hover:scale-105 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                />

                {/* Hover Reveal "View Case Study" Button (Sitetrip Solid Dark Button) */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-700 ease-out backdrop-blur-[2px]">
                  <div className="bg-[#121212] text-white px-8 py-4 rounded-full font-bold tracking-[0.2em] uppercase text-xs transform translate-y-10 group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-2xl flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                    Explore Case
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 🚀 THE NATIVE-SCROLL CASE STUDY MODAL (LIGHT THEME MATCHING) */}
      {/* ========================================================= */}
      <div 
        className={`fixed top-0 left-0 w-screen h-[100dvh] z-[999] text-[#121212] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${selectedProject ? 'translate-y-0' : 'translate-y-[100%]'}`}
        style={{ backgroundColor: selectedProject ? selectedProject.bgColor : '#F4F3EF' }}
      >
        {selectedProject && (
          <div 
            className="w-full h-full overflow-y-auto overflow-x-hidden"
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <div className="relative w-full min-h-screen pb-48">
              
              {/* CLOSE BUTTON - Dark button for Light background */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="fixed top-6 right-6 md:top-12 md:right-12 z-[1000] px-6 py-3 bg-[#121212] text-white rounded-full text-xs font-mono uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl cursor-pointer"
              >
                Close [X]
              </button>

              {/* HERO IMAGE HEADER */}
              <div className="relative w-full h-[50vh] md:h-[60vh] shrink-0">
                <img src={selectedProject.image} alt={selectedProject.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              {/* CONTENT DETAILS - Adjusted for Dark Text on Light Premium Background */}
              <div className="w-full max-w-7xl mx-auto p-6 md:p-16 flex flex-col md:flex-row gap-16 md:gap-24 mt-8">
                
                {/* Left Column: Overview */}
                <div className="w-full md:w-2/3 flex flex-col gap-6">
                  <h3 className="text-sm font-mono tracking-widest text-[#121212]/50 uppercase flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#121212]"></div>
                    Project Overview
                  </h3>
                  <h2 className="font-clash text-5xl md:text-7xl font-black uppercase tracking-tighter text-[#121212] mb-4">
                    {selectedProject.title}
                  </h2>
                  <p className="text-xl md:text-3xl font-light leading-relaxed text-[#121212]/80">
                    {selectedProject.overview}
                  </p>
                </div>

                {/* Right Column: Tech & Links */}
                <div className="w-full md:w-1/3 flex flex-col gap-12 pt-4">
                  
                  <div>
                    <h3 className="text-sm font-mono tracking-widest text-[#121212]/50 uppercase mb-6 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#121212]/30"></div>
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.stack.map((item, i) => (
                        <span key={i} className="px-4 py-2 bg-white/40 backdrop-blur-md border border-[#121212]/10 rounded-full text-[10px] font-mono uppercase tracking-wider text-[#121212]">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-mono tracking-widest text-[#121212]/50 uppercase mb-6 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#121212]/30"></div>
                      Access Points
                    </h3>
                    <div className="flex flex-col gap-4">
                      <a href={selectedProject.live} target="_blank" rel="noreferrer" className="group flex items-center justify-between p-5 bg-white/40 backdrop-blur-md border border-[#121212]/10 rounded-xl hover:bg-[#121212] hover:text-white transition-all duration-300">
                        <span className="font-bold tracking-widest uppercase text-xs">Launch Live Site</span>
                        <span className="transform group-hover:translate-x-2 transition-transform">↗</span>
                      </a>
                      <a href={selectedProject.github} target="_blank" rel="noreferrer" className="group flex items-center justify-between p-5 bg-white/40 backdrop-blur-md border border-[#121212]/10 rounded-xl hover:bg-[#121212] hover:text-white transition-all duration-300">
                        <span className="font-bold tracking-widest uppercase text-xs">View Source Code</span>
                        <span className="transform group-hover:translate-x-2 transition-transform">↗</span>
                      </a>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}
      </div>

    </section>
  );
}