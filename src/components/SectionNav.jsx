import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const SECTIONS = [
  { id: 'home', label: 'About' },
  { id: 'about', label: 'Why Us' },
  { id: 'why', label: 'Shops' },
  { id: 'shops', label: 'Experience' },
  { id: 'experience', label: 'Events' },
  { id: 'events', label: 'News' },
  { id: 'news', label: 'Location' },
  { id: 'location', label: 'Gallery' },
  { id: 'media', label: null },
];

export default function SectionNav() {
  const { isDark } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [atBottom, setAtBottom] = useState(false);

  const detectCurrentSection = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    const isAtBottom = scrollY + windowHeight >= document.documentElement.scrollHeight - 200;
    setAtBottom(isAtBottom);

    let best = 0;
    for (let i = 0; i < SECTIONS.length; i++) {
      const el = document.getElementById(SECTIONS[i].id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= windowHeight * 0.5) {
          best = i;
        }
      }
    }
    setCurrentIndex(best);
  }, []);

  useEffect(() => {
    detectCurrentSection();
    window.addEventListener('scroll', detectCurrentSection, { passive: true });
    return () => window.removeEventListener('scroll', detectCurrentSection);
  }, [detectCurrentSection]);

  const scrollToNext = useCallback(() => {
    const nextIndex = Math.min(currentIndex + 1, SECTIONS.length - 1);
    const el = document.getElementById(SECTIONS[nextIndex].id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentIndex]);

  const isLastSection = currentIndex >= SECTIONS.length - 1;
  const nextLabel = SECTIONS[currentIndex]?.label;

  if (atBottom || isLastSection || !nextLabel) return null;

  return (
    <AnimatePresence>
      <motion.button
        key="section-nav"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={scrollToNext}
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 cursor-pointer group px-5 py-2.5 rounded-full backdrop-blur-xl border transition-all duration-300 shadow-lg ${isDark ? 'bg-black/50 border-white/10 hover:border-dragon/30 hover:bg-black/60 shadow-black/30' : 'bg-white/70 border-black/10 hover:border-dragon/30 hover:bg-white/80 shadow-black/10'}`}
      >
        <span className={`text-[11px] font-medium tracking-wider capitalize transition-colors ${isDark ? 'text-white/60 group-hover:text-white/90' : 'text-black/50 group-hover:text-black/80'}`}>
          {nextLabel}
        </span>
        <motion.div
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className={`w-3.5 h-3.5 group-hover:text-dragon transition-colors ${isDark ? 'text-white/50' : 'text-black/40'}`} />
        </motion.div>
      </motion.button>
    </AnimatePresence>
  );
}
