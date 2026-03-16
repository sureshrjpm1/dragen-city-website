import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Play, X, ShoppingBag, Utensils, Sparkles, MapPin } from 'lucide-react';

const stats = [
  { value: 799, suffix: '+', label: 'Stores', icon: ShoppingBag },
  { value: 55, suffix: 'K', label: 'Sqm Area', icon: MapPin },
  { value: 22600, suffix: '+', label: 'Daily Visitors', icon: Sparkles },
  { value: 10, suffix: 'th', label: 'Year', icon: Utensils },
];

function AnimatedCounter({ value, suffix = '', isInView }) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const startTime = performance.now();
      const duration = 2000;
      const animate = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setCount(Math.round(eased * value));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-50px' });
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section id="about" className="relative bg-white overflow-hidden" ref={ref}>
      <div className="px-6 md:px-12 lg:px-16 py-14 md:py-20">
        <div className="max-w-[1400px] mx-auto">

        {/* Top row — headline left + video thumbnail right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 md:mb-16">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <p className="text-xs tracking-[0.2em] uppercase text-dragon/70 font-medium mb-4">About Dragon City</p>
            <h2 className="text-2xl md:text-3xl lg:text-[2.5rem] font-display font-bold text-[#1a1a1a] leading-tight mb-4">
              Bahrain's Largest Wholesale & Retail Destination
            </h2>
            <p className="text-sm md:text-base text-black/45 leading-relaxed max-w-xl">
              A world-class commercial center with 799+ stores featuring electronics, fashion, furniture, and more — elegantly infused with Chinese-inspired architecture in the heart of Diyar Al Muharraq.
            </p>
          </motion.div>

          {/* Right — compact video thumbnail */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div
              className="relative rounded-2xl overflow-hidden aspect-video cursor-pointer group"
              onClick={() => setVideoOpen(true)}
            >
              <img
                src="/images/dragon-city-aerial.jpg"
                alt="Dragon City Bahrain"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-5 h-5 text-dragon ml-0.5" fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-3 left-3">
                <span className="text-[10px] font-medium text-white/80 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full">Watch Video</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats row — clean cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
              className="group relative bg-[#f8f7f5] hover:bg-dragon rounded-xl p-5 md:p-6 transition-all duration-400 cursor-default"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <stat.icon className="w-4 h-4 text-dragon/50 group-hover:text-white/70 transition-colors duration-400" />
                <span className="text-[10px] tracking-wider uppercase text-black/30 group-hover:text-white/60 transition-colors duration-400">{stat.label}</span>
              </div>
              <p className="text-2xl md:text-3xl font-display font-bold text-[#1a1a1a] group-hover:text-white transition-colors duration-400">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} isInView={isInView} />
              </p>
            </motion.div>
          ))}
        </div>
        </div>
      </div>

      {/* Video Popup */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            onClick={() => setVideoOpen(false)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src="https://www.youtube.com/embed/4deGNOJtFqE?autoplay=1&rel=0"
                title="Dragon City Bahrain"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </motion.div>
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
