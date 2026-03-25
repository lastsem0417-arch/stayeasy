import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 🎨 LUXURY EDITORIAL TONES & AWWWARDS-LEVEL COPY
const services = [  
  {
    id: "01",
    title: "CREATIVE ENGINEERING & WEBGL",
    subtitle: "ARYAN // LEAD ARCHITECT",
    desc: "We don't just build websites; we engineer immersive digital environments. By leveraging WebGL, Three.js, and advanced creative coding, we transform static pages into interactive cinematic journeys that captivate users and elevate brand perception.",
    tags: ["WebGL & 3D", "Creative Coding", "Immersive Experiences"],
    color: "#EAECEF", // Premium Silver Grey
    accent: "#0044FF" // Electric Cobalt
  },
  {
    id: "02",
    title: "STRATEGIC UI/UX & BRAND IDENTITY",
    subtitle: "AYAZ // CREATIVE DIRECTOR",
    desc: "Design is invisible when it's perfect. We craft pixel-perfect, conversion-optimized interfaces that feel intuitive and luxurious. From typography selection to micro-interactions, every detail is meticulously designed to build trust and drive user action.",
    tags: ["User Experience", "Interface Design", "Design Systems"],
    color: "#F4EFEA", // Warm Luxury Stone/Cream
    accent: "#D94A38" // Deep Vermillion/Terracotta
  },
  {
    id: "03",
    title: "FLUID MOTION & FRONTEND ARCHITECTURE",
    subtitle: "DIVYANSH // HEAD OF GROWTH",
    desc: "Performance meets poetry. We engineer buttery-smooth frontend experiences with complex scroll animations and zero-latency transitions. Our code is optimized for maximum speed, ensuring your digital presence feels incredibly responsive across all devices.",
    tags: ["Fluid Animations", "Performance", "Frontend Architecture"],
    color: "#EBF2ED", // Muted Sage/Pistachio
    accent: "#1A8F4C" // Emerald Forest
  },
  {
    id: "04",
    title: "SCALABLE BACKEND & CLOUD SYSTEMS",
    subtitle: "AMAN // SALES & FULL-STACK",
    desc: "A beautiful frontend requires a bulletproof foundation. We architect secure, highly scalable databases and custom CMS solutions. We streamline your business operations with powerful integrations, ensuring your platform grows seamlessly with your user base.",
    tags: ["Cloud Architecture", "Custom CMS", "Secure API Integrations"],
    color: "#EFEDF4", // Soft Lavender/Lilac Grey
    accent: "#6B38FB" // Deep Electric Violet
  }
];

export default function Services() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.service-item');

      // Check to ensure elements exist before triggering
      if(items.length > 0) {
        items.forEach((item, i) => {
          ScrollTrigger.create({
            trigger: item,
            start: "top 55%", 
            end: "bottom 55%",
            onEnter: () => {
              setActiveIndex(i);
              gsap.to(containerRef.current, { backgroundColor: services[i].color, duration: 1.2, ease: "power2.out", overwrite: "auto" });
            },
            onEnterBack: () => {
              setActiveIndex(i);
              gsap.to(containerRef.current, { backgroundColor: services[i].color, duration: 1.2, ease: "power2.out", overwrite: "auto" });
            },
          });
        });

        // 🚀 Revert to base PREMIUM OFF-WHITE color when scrolling out of the section
        ScrollTrigger.create({
          trigger: items[0],
          start: "top bottom",
          end: "top 55%",
          onEnterBack: () => {
            gsap.to(containerRef.current, { backgroundColor: '#F4F3EF', duration: 1.2, ease: "power2.out", overwrite: "auto" });
          }
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    // 🚀 FIXED: Added id="services" so Navbar can find it!
    <section id="services" ref={containerRef} className="relative w-full bg-[#F4F3EF] text-[#111111] py-32 md:py-48 transition-colors duration-1000 select-none border-b border-black/5">
      
      {/* Subtle Noise Texture for that magazine paper feel */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-multiply"
        style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png")', backgroundRepeat: 'repeat' }}
      ></div>

      <div className="max-w-[90rem] mx-auto px-6 md:px-12 mb-24 md:mb-32 relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-[#111111] animate-pulse"></div>
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/40">
            03 // CAPABILITIES
          </span>
        </div>
        <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter uppercase text-[#111111] font-clash leading-[0.9]">
          The Arsenal
        </h2>
      </div>

      <div className="max-w-[90rem] mx-auto px-6 md:px-12 flex flex-col gap-32 md:gap-48 relative z-10">
        
        {services.map((service, index) => {
          const isActive = activeIndex === index;

          return (
            <div 
              key={service.id} 
              className="service-item w-full flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center min-h-[50vh]"
            >
              
              {/* LEFT SIDE: HOLLOW TO SOLID TYPOGRAPHY */}
              <div className="w-full md:w-1/2 flex flex-col gap-6 relative z-10">
                <div className="flex items-center gap-4 transition-all duration-700" style={{ opacity: isActive ? 1 : 0.3, transform: isActive ? 'translateX(0)' : 'translateX(-10px)' }}>
                  <div 
                    className={`w-2 h-2 rounded-full ${isActive ? 'animate-pulse' : ''}`}
                    style={{ backgroundColor: service.accent, boxShadow: isActive ? `0 0 20px ${service.accent}` : 'none' }}
                  ></div>
                  <span 
                    className="text-[9px] md:text-[10px] font-mono tracking-[0.3em] uppercase transition-colors duration-700 font-bold whitespace-nowrap" 
                    style={{ color: isActive ? service.accent : 'rgba(17, 17, 17, 0.5)' }}
                  >
                    {service.subtitle}
                  </span>
                </div>
                
                <h3 
                  className="font-clash text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black uppercase tracking-tighter leading-[0.85] transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    WebkitTextStroke: isActive ? '0px' : '1px rgba(17, 17, 17, 0.2)',
                    color: isActive ? '#111111' : 'transparent',
                    transform: isActive ? 'translateX(0px) scale(1)' : 'translateX(-20px) scale(0.98)',
                    filter: isActive ? 'blur(0px)' : 'blur(2px)'
                  }}
                >
                  {service.title}
                </h3>
              </div>

              {/* RIGHT SIDE: DESCRIPTION & TAGS */}
              <div 
                className="w-full md:w-1/2 flex flex-col gap-8 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateY(0px)' : 'translateY(40px)',
                  filter: isActive ? 'blur(0px)' : 'blur(10px)',
                  pointerEvents: isActive ? 'auto' : 'none'
                }}
              >
                <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-[#111111]/80">
                  {service.desc}
                </p>
                
                <div className="flex flex-wrap gap-3 mt-4">
                  {service.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="px-5 py-2.5 border rounded-full text-[9px] md:text-[10px] font-mono tracking-widest uppercase transition-all duration-500 cursor-default font-bold shadow-sm"
                      style={{
                        borderColor: isActive ? `${service.accent}40` : 'rgba(0,0,0,0.1)',
                        color: isActive ? service.accent : 'rgba(0,0,0,0.4)',
                        backgroundColor: isActive ? `${service.accent}15` : 'transparent',
                        transform: isActive ? 'translateY(0px)' : 'translateY(10px)',
                        transitionDelay: isActive ? `${i * 100}ms` : '0ms' 
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          );
        })}

      </div>  

    </section>
  );
}