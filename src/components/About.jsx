import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Play, X, ArrowRight } from 'lucide-react';

const stats = [
  { value: 799, suffix: '+', label: 'Retail & Wholesale Shops', zh: '商店' },
  { value: 55000, suffix: '+', label: 'Square Meters Area', zh: '面积' },
  { value: 22600, suffix: '+', label: 'Daily Visitors', zh: '访客' },
  { value: 10000, suffix: '+', label: 'Solar Panels Installed', zh: '太阳能' },
];

function AnimatedCounter({ value, suffix = '', isInView }) {
  const [count, setCount] = useState(0);
  const animatingRef = useRef(false);

  useEffect(() => {
    if (isInView && !animatingRef.current) {
      animatingRef.current = true;
      setCount(0);
      const startTime = performance.now();
      const duration = 2000;
      const animate = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setCount(Math.round(eased * value));
        if (progress < 1) requestAnimationFrame(animate);
        else animatingRef.current = false;
      };
      requestAnimationFrame(animate);
    }
    if (!isInView) {
      setCount(0);
      animatingRef.current = false;
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

      {/* Chinese watermark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.025 } : { opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18rem] md:text-[25rem] font-bold text-dragon leading-none pointer-events-none select-none"
      >
        龙城
      </motion.div>

      {/* Decorative top line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dragon/15 to-transparent origin-center"
      />

      <div className="px-6 md:px-12 lg:px-16 py-16 md:py-24">
        <div className="max-w-350 mx-auto">

          {/* ── Top: Text left + Image right ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — Text */}
            <div>
              {/* Label */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4 mb-6"
              >
                <div className="w-8 h-px bg-dragon" />
                <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-dragon">
                  About Us
                </span>
                <span className="text-[11px] text-black/20">关于我们</span>
              </motion.div>

              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.15] mb-6"
              >
                <span className="text-[#1a1a1a]">The </span>
                <span className="text-dragon text-4xl md:text-5xl lg:text-[3.25rem] uppercase">Largest</span>
                <span className="text-[#1a1a1a]"> Trading Centre in the Kingdom</span>
              </motion.h2>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="space-y-4 mb-8"
              >
                <p className="text-[15px] text-black/50 leading-[1.8]">
                  Dragon City Bahrain (DCB) is a large-scale commercial center encapsulating wholesale and retail of Chinese products. Elegantly infused with Chinese inspired architecture, Dragon City serves as a major trading hub for Bahrain and the surrounding regions.
                </p>
                <p className="text-[15px] text-black/50 leading-[1.8]">
                  With a diverse range of products catering to both individual consumers and wholesale businessmen, Dragon City is the largest wholesale and retail trading centre in the Kingdom.
                </p>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center gap-5"
              >
                <a
                  href="#shops"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-dragon text-white text-sm font-semibold rounded-full hover:bg-dragon/90 transition-colors duration-300"
                >
                  Explore stores
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </a>

                <button
                  onClick={() => setVideoOpen(true)}
                  className="flex items-center gap-2.5 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full border-2 border-dragon/20 flex items-center justify-center group-hover:border-dragon/40 group-hover:bg-dragon/5 transition-all duration-300">
                    <Play className="w-3.5 h-3.5 text-dragon ml-0.5" fill="currentColor" />
                  </div>
                  <span className="text-sm font-medium text-black/45 group-hover:text-black/65 transition-colors">Watch Video</span>
                </button>
              </motion.div>
            </div>

            {/* Right — Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Decorative curved border behind image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.4 }}
                className="absolute -top-4 -right-4 -bottom-4 -left-4 pointer-events-none"
              >
                {/* Top-right arc */}
                <svg className="absolute -top-2 -right-2 w-28 h-28 text-dragon/15" viewBox="0 0 100 100" fill="none">
                  <path d="M100 0 C100 55, 55 100, 0 100" stroke="currentColor" strokeWidth="2" />
                </svg>
                {/* Bottom-left arc */}
                <svg className="absolute -bottom-2 -left-2 w-28 h-28 text-dragon/15" viewBox="0 0 100 100" fill="none">
                  <path d="M0 100 C0 45, 45 0, 100 0" stroke="currentColor" strokeWidth="2" />
                </svg>
                {/* Dashed circle decoration */}
                <svg className="absolute -top-6 -left-6 w-16 h-16 text-dragon/10 animate-[spin_20s_linear_infinite]" viewBox="0 0 60 60" fill="none">
                  <circle cx="30" cy="30" r="28" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                </svg>
              </motion.div>

              {/* Dot pattern behind */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #c53030 1.5px, transparent 1.5px)',
                  backgroundSize: '10px 10px',
                }}
              />

              <div
                className="relative overflow-hidden cursor-pointer group"
                onClick={() => setVideoOpen(true)}
                style={{ borderRadius: '2rem 0.75rem 2rem 0.75rem' }}
              >
                <img
                  src="/images/dragon-city-aerial.jpg"
                  alt="Dragon City Bahrain aerial view"
                  className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                {/* Play button centered */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" style={{ animationDuration: '2.5s' }} />
                    <div className="relative w-14 h-14 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-5 h-5 text-dragon ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>

                {/* Badge */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-lg">
                  <p className="text-[10px] text-black/40 uppercase tracking-wider">Diyar Al Muharraq</p>
                  <p className="text-lg font-display font-bold text-[#1a1a1a]">Since 2015</p>
                </div>

                {/* Chinese stamp */}
                <div className="absolute top-4 right-4 w-12 h-12 border-2 border-dragon/25 rounded-sm flex items-center justify-center rotate-[-8deg] opacity-60 group-hover:opacity-90 transition-opacity duration-500">
                  <span className="text-dragon/40 text-lg font-bold">龙城</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Stats ── */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-12 md:mt-14"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.45 + i * 0.08 }}
                  className="relative group bg-[#fafaf9] rounded-2xl p-5 md:p-6 overflow-hidden hover:shadow-md transition-all duration-500"
                >
                  {/* Chinese character watermark */}
                  <span className="absolute top-2 right-3 text-3xl text-dragon/[0.06] font-bold pointer-events-none group-hover:text-dragon/[0.12] transition-colors duration-500">
                    {stat.zh}
                  </span>

                  {/* Left accent line */}
                  <div className="absolute top-4 bottom-4 left-0 w-[3px] bg-dragon/0 group-hover:bg-dragon rounded-full transition-all duration-500" />

                  <p className="text-2xl md:text-3xl font-display font-bold text-[#1a1a1a] mb-1 relative">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} isInView={isInView} />
                  </p>
                  <p className="text-[11px] text-black/35 font-medium tracking-wide relative">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Video Modal ── */}
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
