import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);
  const [status, setStatus] = useState('');

  // The phrase we want to drop physics-style
  const phrase = "LET'S TALK";
  const letters = phrase.split("");

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. The Physics Drop Animation for "LET'S TALK"
      gsap.fromTo('.falling-letter', 
        { 
          y: -400, // Start way up in the air
          opacity: 0,
          rotate: () => gsap.utils.random(-60, 60) // Random spinning in the air
        },
        { 
          y: 0, 
          opacity: 1, 
          // Final resting rotation (like Sitetrip's messy letters)
          rotate: () => gsap.utils.random(-15, 15), 
          duration: 1.5, 
          stagger: 0.1, // Drop one by one
          ease: "bounce.out", // The heavy satisfying bounce when they hit the bottom
          scrollTrigger: {
            trigger: textContainerRef.current,
            start: "top 80%", // Triggers when the text area comes into view
          }
        }
      );

      // 2. Fade in the form elements
      gsap.fromTo(".fade-up",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: containerRef.current, start: "top 60%" }}
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('SENDING...');
    
    const formData = new FormData(e.target);
    // TERA PERSONAL WEB3FORMS ACCESS KEY (Pre-configured)
    formData.append("access_key", "314c7b0d-fb6e-4b58-aaa2-baf84958a117"); 

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      
      if (response.ok) {
        setStatus('MESSAGE DELIVERED.');
        e.target.reset();
        setTimeout(() => setStatus(''), 5000); // Clear success message after 5s
      } else {
        setStatus('ERROR. PLEASE TRY AGAIN.');
      }
    } catch (err) {
      setStatus('SYSTEM ERROR. TRY AGAIN.');
    }
  };

  return (
    // Background stays dark to match the site, padding at bottom for footer
    <section id="contact" ref={containerRef} className="relative w-full bg-[#050505] pt-24 pb-6 px-4 md:px-8">
      
      {/* THE MASSIVE ROUNDED PREMIUM CARD (Sitetrip Style Soft Lilac) */}
      <div className="relative w-full bg-[#E2D4F6] rounded-[40px] md:rounded-[60px] flex flex-col justify-between overflow-hidden shadow-[0_0_100px_rgba(226,212,246,0.1)]">
        
        {/* --- TOP SECTION: FORM & INFO --- */}
        <div className="w-full flex flex-col md:flex-row justify-between p-8 md:p-20 gap-16 md:gap-8 z-10">
          
          {/* Left: The Contact Form */}
          <div className="w-full md:w-1/2">
            <h3 className="fade-up text-sm font-black uppercase tracking-[0.2em] text-[#121212] mb-12">
              Initiate Project
            </h3>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              <div className="fade-up relative">
                <input type="text" name="name" required className="w-full bg-transparent border-b-2 border-[#121212]/20 pb-4 text-xl md:text-2xl text-[#121212] focus:outline-none focus:border-[#121212] transition-colors peer placeholder-transparent font-medium" placeholder="Name" />
                <label className="absolute left-0 top-0 text-sm font-bold text-[#121212]/50 uppercase transition-all duration-300 peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-[#121212] peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[10px] pointer-events-none">
                  What's your name?
                </label>
              </div>

              <div className="fade-up relative">
                <input type="email" name="email" required className="w-full bg-transparent border-b-2 border-[#121212]/20 pb-4 text-xl md:text-2xl text-[#121212] focus:outline-none focus:border-[#121212] transition-colors peer placeholder-transparent font-medium" placeholder="Email" />
                <label className="absolute left-0 top-0 text-sm font-bold text-[#121212]/50 uppercase transition-all duration-300 peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-[#121212] peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[10px] pointer-events-none">
                  Your Email Address
                </label>
              </div>

              <div className="fade-up relative">
                <textarea name="message" rows="1" required className="w-full bg-transparent border-b-2 border-[#121212]/20 pb-4 text-xl md:text-2xl text-[#121212] focus:outline-none focus:border-[#121212] transition-colors peer placeholder-transparent font-medium resize-none overflow-hidden" placeholder="Message" onInput={(e) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}></textarea>
                <label className="absolute left-0 top-0 text-sm font-bold text-[#121212]/50 uppercase transition-all duration-300 peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-[#121212] peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[10px] pointer-events-none">
                  Tell us about your project
                </label>
              </div>

              <div className="fade-up flex items-center gap-6 mt-4">
                <button type="submit" className="px-10 py-4 bg-[#121212] text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 transition-transform duration-300">
                  Submit Request
                </button>
                {status && <span className="text-[10px] font-bold tracking-widest text-[#121212] animate-pulse">{status}</span>}
              </div>
            </form>
          </div>

          {/* Right: Contact Details (Sitetrip Style) */}
          <div className="w-full md:w-1/3 flex flex-col items-start md:items-end gap-12 text-[#121212]">
            <div className="fade-up flex flex-col items-start md:items-end gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Email Us</span>
              {/* 🚀 REAL EMAIL ADDED HERE */}
              <a href="mailto:hello.iconicx03@gmail.com" className="text-xl md:text-2xl font-medium hover:opacity-60 transition-opacity">
                hello.iconicx03@gmail.com
              </a>
            </div>
            
            <div className="fade-up flex flex-col items-start md:items-end gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Call Us</span>
              {/* 🚀 REAL NUMBER ADDED HERE */}
              <a href="tel:+919537273574" className="text-2xl md:text-3xl font-medium hover:opacity-60 transition-opacity">
                +91 95372 73574
              </a>
            </div>

            <div className="fade-up flex items-center gap-4 mt-8">
               <a href="#" className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform shadow-sm">
                 <span className="font-bold text-sm">IG</span>
               </a>
               <a href="#" className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform shadow-sm">
                 <span className="font-bold text-sm">IN</span>
               </a>
            </div>
          </div>

        </div>

        {/* --- BOTTOM SECTION: THE PHYSICS FALLING TEXT --- */}
        <div ref={textContainerRef} className="w-full pt-16 md:pt-20 pb-10 flex justify-center items-end overflow-hidden">
          {/* 🚀 FIXED SIZE: Changed from [22vw]/[20vw] to [16vw]/[12vw] for a cleaner, slightly smaller look */}
          <h2 className="font-clash text-[16vw] md:text-[12vw] font-black leading-[0.7] text-[#121212] flex flex-wrap justify-center pointer-events-none">
            {letters.map((char, index) => (
              <span 
                key={index} 
                // "whitespace-pre" ensures the space character is respected
                className="falling-letter inline-block whitespace-pre origin-bottom" 
              >
                {char}
              </span>
            ))}
          </h2>
        </div>

      </div>

      {/* --- THE SNEAKY DARK FOOTER (Outside the card) --- */}
      <footer className="w-full pt-8 pb-4 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-mono tracking-widest text-white/40 uppercase px-4">
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Disclaimer</a>
        </div>
        <div>
          © {new Date().getFullYear()} ICONICX // ALL RIGHTS RESERVED.
        </div>
      </footer>

    </section>
  );
}