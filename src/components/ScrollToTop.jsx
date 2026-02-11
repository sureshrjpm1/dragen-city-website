import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the hero section (~100vh)
      setVisible(window.scrollY > window.innerHeight);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          whileHover={{ y: -4, scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-dragon/90 hover:bg-dragon text-white flex items-center justify-center shadow-2xl shadow-dragon/40 cursor-pointer transition-colors group overflow-hidden"
        >
          {/* Rotating Chinese ornament ring */}
          <div
            className="absolute inset-0 rounded-full border-2 border-dashed border-gold/30 group-hover:border-gold/50 transition-colors"
            style={{ animation: 'spin-slow 8s linear infinite' }}
          />

          {/* Inner glow pulse */}
          <div
            className="absolute inset-1 rounded-full bg-dragon/20"
            style={{ animation: 'glow-pulse 2.5s ease-in-out infinite' }}
          />

          {/* Arrow icon */}
          <svg className="w-5 h-5 relative z-10 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>

          {/* Chinese character watermark */}
          <span className="absolute -bottom-0.5 font-chinese text-[10px] text-white/30 group-hover:text-white/50 transition-colors select-none">
            顶
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
