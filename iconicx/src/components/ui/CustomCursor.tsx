import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Smart detection: Check if we are hovering over our massive text or buttons
      const target = e.target;
      if (target.classList.contains('hover-target') || target.closest('.hover-target')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 bg-primary rounded-full pointer-events-none z-[99999] flex items-center justify-center overflow-hidden"
      style={{ mixBlendMode: 'difference' }} // This creates the magic inversion effect
      animate={{ 
        x: mousePosition.x - (isHovering ? 60 : 10), // Offset by half width
        y: mousePosition.y - (isHovering ? 60 : 10), 
        width: isHovering ? 120 : 20,
        height: isHovering ? 120 : 20,
        backgroundColor: isHovering ? '#F4F3EF' : '#121212', // Inverts color for difference mode
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 28, 
        mass: 0.5 
      }}
    >
      {/* Optional: Text inside cursor when hovering */}
      <span className={`text-[10px] tracking-widest uppercase font-bold text-primary transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
        View
      </span>
    </motion.div>
  );
}