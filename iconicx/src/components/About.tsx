import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 🎨 EXACT SITETRIP SOLID COLORS & REAL IMAGES (Public Folder)
const squad = [
  {
    id: "01",
    name: "ARYAN",
    title: "TECH",
    fullTitle: "TECH ARCHITECT",
    // 🚀 Update: Pointing to public/aryan.jpg
    image: "/Aryan.jpg", 
    tagColor: "bg-[#00e5ff] text-black", // Cyber Blue
    bgColor: "#EAF6F8", 
    desc: "Defines the architectural blueprints of our most complex builds, bridging creative vision with extreme technical performance. Focuses on WebGL optimization and backend scalability.",
    skills: ["System Architecture", "WebGL/Three.js", "Performance Optimization"]
  },
  {
    id: "02",
    name: "AYAZ",
    title: "DESIGN",
    fullTitle: "CREATIVE DIRECTOR",
    // 🚀 Update: Pointing to public/ayaz.jpg
    image: "/ayaz.png", 
    tagColor: "bg-[#D5C6FF] text-black", // Sitetrip Lilac
    bgColor: "#F3EEF8", 
    desc: "Shapes the visual identity and user experience. Translates abstract brand concepts into intuitive, high-converting digital interfaces with an obsessive attention to detail.",
    skills: ["UI/UX Design", "Brand Identity", "Prototyping"]
  },
  {
    id: "03",
    name: "DIVYANSH",
    title: "GROWTH",
    fullTitle: "HEAD OF GROWTH",
    // 🚀 Update: Pointing to public/div.jpg
    image: "/div.png", 
    tagColor: "bg-[#ccff00] text-black", // Sitetrip Acid Lime
    bgColor: "#F7FAE6", 
    desc: "Engineers buttery-smooth frontend experiences and drives product growth. Obsessed with micro-interactions, motion design, and keeping users engaged from the first scroll.",
    skills: ["Frontend Development", "Motion Design", "Growth Strategy"]
  },
  {
    id: "04",
    name: "AMAN",
    title: "SALES",
    fullTitle: "SALES & SYSTEMS",
    // 🚀 Update: Pointing to public/aman.jpg
    image: "/Aman.png", 
    tagColor: "bg-[#FFD1B3] text-black", // Premium Peach
    bgColor: "#FCF4F0", 
    desc: "The bridge between client needs and technical execution. Manages full-stack integrations and enterprise sales, ensuring every project aligns perfectly with business goals.",
    skills: ["Enterprise Sales", "Full-Stack Dev", "Client Relations"]
  }
];

export default function About() {
  const sectionRef = useRef(null);
  const textRevealRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardsRef = useRef([]);
  const [selectedMember, setSelectedMember] = useState(null); 

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      gsap.to(textRevealRef.current, { 
        clipPath: "inset(0% 0% 0% 0%)", 
        ease: "none",
        scrollTrigger: {
          trigger: textRevealRef.current,
          start: "top 80%", 
          end: "bottom 40%", 
          scrub: 1, 
        }
      });

      let mm = gsap.matchMedia();

      // --- DESKTOP ANIMATION ---
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: "top 75%",
            end: "+=500px", 
            scrub: 1,
          }
        });

        cardsRef.current.forEach((card, index) => {
          gsap.set(card, { xPercent: -50, yPercent: -50 });
          
          tl.to(card, {
            x: (index - 1.5) * 230, 
            y: index === 0 || index === 3 ? 20 : -20, 
            rotate: (index - 1.5) * 8, 
            ease: "power2.out" 
          }, 0); 
        });
      });

      // --- MOBILE ANIMATION (Fades in as they enter) ---
      mm.add("(max-width: 767px)", () => {
        cardsRef.current.forEach((card) => {
          gsap.set(card, { xPercent: 0, yPercent: 0 });

          gsap.fromTo(card, 
            { opacity: 0, y: 30 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.8, 
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%", 
              }
            }
          );
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#EFECF3] text-[#121212] pt-24 md:pt-32 pb-32 md:pb-48 px-6 flex flex-col items-center select-none border-b border-black/5">
      
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.04] mix-blend-multiply"
        style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png")', backgroundRepeat: 'repeat' }}
      ></div>

      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-6 md:gap-12 relative z-20 mb-16 md:mb-24 mt-4">
        
        <div className="w-24 shrink-0 pt-2 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#121212] animate-pulse"></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/40">
              ABOUT
            </span>
          </div>
        </div>

        <div className="relative flex-1 text-[24px] sm:text-3xl md:text-[36px] lg:text-[42px] font-bold leading-[1.1] tracking-tighter uppercase font-clash z-10">
          <p className="text-black/10 select-none">
            We are a human-centered studio. You work directly with the makers of your website, no middlemen involved. We build thoughtfully - functional, beautiful, and always pushing the boundaries.
          </p>
          <p 
            ref={textRevealRef}
            className="absolute top-0 left-0 w-full text-[#121212] select-none"
            style={{ clipPath: "inset(0% 100% 0% 0%)" }}
          >
            We are a human-centered studio. You work directly with the makers of your website, no middlemen involved. We build thoughtfully - functional, beautiful, and always pushing the boundaries.
          </p>
        </div>
      </div>

      <div 
        ref={cardsContainerRef}
        // 🚀 MOBILE ZIGZAG CONTAINER
        className="w-full max-w-[340px] sm:max-w-md md:max-w-none mx-auto relative flex flex-col justify-center md:block md:h-[500px] z-10"
      >
        {squad.map((member, i) => (
          <div 
            key={member.id}
            ref={el => cardsRef.current[i] = el}
            // 🚀 THE TRUE Z-SHAPE LOGIC
            className={`
              group cursor-pointer aspect-[4/5] rounded-[16px] md:rounded-[24px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-black/5
              
              w-[60vw] max-w-[220px] 
              relative 
              ${i === 0 ? 'self-start -rotate-3 mt-0' : ''} 
              ${i === 1 ? 'self-end rotate-3 -mt-16 sm:-mt-20' : ''} 
              ${i === 2 ? 'self-start -rotate-3 -mt-16 sm:-mt-20' : ''} 
              ${i === 3 ? 'self-end rotate-2 -mt-16 sm:-mt-20' : ''} 
              
              md:w-[260px] md:max-w-none 
              md:absolute md:top-1/2 md:left-1/2 md:m-0 md:translate-x-0 md:rotate-0 md:self-auto
            `}
            style={{ zIndex: i + 1 }} 
            onClick={() => setSelectedMember(member)} 
          >
            
            <div className="w-full h-full rounded-[inherit] overflow-hidden bg-white relative transition-transform duration-500 group-hover:scale-[1.02]">
               <img 
                 src={member.image} 
                 alt={member.name} 
                 className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 ease-out" 
               />
               <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
               
               {/* 🚀 PERFECT BOTTOM-CENTER TAGS: Locked inside the image, perfectly centered */}
               <div className="absolute z-30 top-[60%] left-1/2 -translate-x-1/2 transition-transform duration-300 w-max">
                 <div className={`px-4 py-2 rounded-lg shadow-xl flex items-center gap-2 ${member.tagColor}`}>
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-black/40"></div>
                    <span className="text-[10px] md:text-[11px] font-black tracking-wider leading-none uppercase whitespace-nowrap">
                      {member.name}
                    </span>
                 </div>
               </div>

            </div>
          </div>
        ))}
      </div>

      {/* ========================================================= */}
      {/* 🚀 THE CASE STUDY POPUP */}
      {/* ========================================================= */}
      <div 
        className={`fixed top-0 left-0 w-screen h-[100dvh] z-[9999] text-[#121212] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${selectedMember ? 'translate-y-0' : 'translate-y-[100%]'}`}
        style={{ backgroundColor: selectedMember ? selectedMember.bgColor : '#EFECF3' }} 
      >
        {selectedMember && (
          <div 
            className="w-full h-full overflow-y-auto overflow-x-hidden"
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()} 
            onTouchMove={(e) => e.stopPropagation()}
          >
            <div className="relative w-full min-h-screen pb-48">
              
              <button 
                onClick={() => setSelectedMember(null)}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 md:bottom-auto md:top-8 md:right-8 md:left-auto md:translate-x-0 z-[100000] px-6 py-3 bg-black/5 backdrop-blur-xl border border-black/10 text-[#121212] rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#121212] hover:text-white transition-colors shadow-xl flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                Close [X]
              </button>

              <div className="relative w-full h-[50vh] md:h-[60vh] shrink-0 border-b border-black/10">
                <img src={selectedMember.image} alt={selectedMember.name} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
                  <span className="text-black/50 font-mono text-[10px] md:text-xs tracking-widest uppercase mb-4 block">
                    Squad Member // Ahmedabad HQ
                  </span>
                  <h2 className="font-clash text-5xl md:text-8xl font-black uppercase tracking-tighter drop-shadow-md text-[#121212]">
                    {selectedMember.name}
                  </h2>
                </div>
              </div>

              <div className="w-full max-w-6xl mx-auto p-8 md:p-16 flex flex-col md:flex-row gap-12 md:gap-24 mt-4">
                
                <div className="w-full md:w-2/3 flex flex-col gap-6">
                  <h3 className="text-xs font-mono tracking-widest text-black/40 uppercase flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#121212]"></div>
                    Role & Vision
                  </h3>
                  <h3 className="font-clash text-3xl md:text-5xl font-black uppercase tracking-tighter text-[#121212]">
                    {selectedMember.fullTitle}
                  </h3>
                  <p className="text-lg md:text-2xl font-light leading-relaxed text-black/70">
                    {selectedMember.desc}
                  </p>
                </div>

                <div className="w-full md:w-1/3 flex flex-col gap-12">
                  <div>
                    <h3 className="text-xs font-mono tracking-widest text-black/40 uppercase mb-6 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-black/30"></div>
                      Core Expertise
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedMember.skills.map((tech, i) => (
                        <span key={i} className="px-4 py-2 bg-black/5 border border-black/10 rounded-full text-[10px] font-mono uppercase tracking-wider text-black/60">
                          {tech}
                        </span>
                      ))}
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