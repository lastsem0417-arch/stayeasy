import { useState, useRef } from 'react';
import { motion } from 'framer-motion'; // Yeh missing tha!

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  // Reliable high-end ambient loop link
  const audioRef = useRef(new Audio('https://assets.mixkit.co/music/preview/mixkit-mysterious-low-hum-610.mp3')); 

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.1;
      audioRef.current.play().catch(err => console.log("User must interact first."));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button 
      onClick={toggleAudio}
      className="fixed bottom-12 right-8 z-[9999] flex items-center gap-3 bg-white/80 backdrop-blur-md px-5 py-3 rounded-full border border-black/5 hover:scale-105 transition-all active:scale-95 shadow-sm"
    >
      <div className="flex gap-[3px] items-end h-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div 
            key={i} 
            animate={{ 
              height: isPlaying ? [4, 12, 8, 14, 4] : 4 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 0.6, 
              delay: i * 0.1,
              ease: "easeInOut"
            }}
            className="w-[2px] bg-black"
          />
        ))}
      </div>
      <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-black select-none">
        {isPlaying ? 'Mute' : 'Atmosphere'}
      </span>
    </button>
  );
}