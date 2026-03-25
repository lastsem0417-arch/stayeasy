import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// 🚀 TARGET IDs FOR SMOOTH SCROLLING
const navLinks = [
  { name: 'Studio', id: 'home' }, // 'home' will just scroll to the very top
  { name: 'Services', id: 'services' },
  { name: 'Archives', id: 'archives' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🚀 THE SMOOTH SCROLL ENGINE
  const scrollToSection = (e, id) => {
    e.preventDefault();
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn(`Bhai, id="${id}" wala section nahi mila. Check kar section tag mein id add ki hai ya nahi.`);
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed top-0 left-0 w-full z-[100] px-6 py-6 md:px-12 flex justify-between items-center pointer-events-none"
    >
      {/* --- LEFT: Premium Editorial Logo --- */}
      <div 
        onClick={(e) => scrollToSection(e, 'home')}
        className="pointer-events-auto cursor-pointer flex items-center gap-3 group"
      >
        <div className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#121212] group-hover:scale-105 transition-transform duration-500 ease-out">
           <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#F4F3EF] rounded-full group-hover:scale-50 transition-transform duration-500"></div>
        </div>
        <span className="font-clash font-black tracking-[0.15em] text-[#121212] text-lg md:text-xl uppercase">
          Iconicx
        </span>
      </div>

      {/* --- CENTER: Floating Links (Ultra-Premium Liquid Glass) --- */}
      <div className={`
        pointer-events-auto hidden md:flex items-center gap-10 px-10 py-4 rounded-full border transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${scrolled 
          ? 'bg-[#F4F3EF]/70 backdrop-blur-2xl border-[#121212]/10 shadow-[0_20px_40px_rgba(0,0,0,0.05)] translate-y-0 scale-100' 
          : 'bg-transparent border-transparent -translate-y-2 scale-105'}
      `}>
        {navLinks.map((item) => (
          <button 
            key={item.name} 
            onClick={(e) => scrollToSection(e, item.id)} 
            className="text-[10px] uppercase tracking-[0.4em] text-[#121212]/50 hover:text-[#121212] transition-colors duration-300 font-bold relative group overflow-hidden"
          >
            {item.name}
            <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#121212]/30 -translate-x-[105%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"></span>
          </button>
        ))}
      </div>

      {/* --- RIGHT: Call to Action --- */}
      <div className="pointer-events-auto">
        <button 
          onClick={(e) => scrollToSection(e, 'contact')}
          className="group flex items-center gap-3 px-6 md:px-8 py-3 md:py-3.5 bg-[#121212] text-[#F4F3EF] rounded-full hover:bg-black hover:scale-105 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-95"
        >
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#ccff00] group-hover:shadow-[0_0_12px_#ccff00] transition-all duration-300"></div>
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em]">Let's Talk</span>
        </button>
      </div>
    </motion.nav>
  );
}