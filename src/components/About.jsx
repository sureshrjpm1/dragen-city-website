import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Play, X, ArrowRight } from 'lucide-react';

const stats = [
  { value: 799, suffix: '+', label: 'Retail & Wholesale Shops' },
  { value: 55000, suffix: '+', label: 'Square Meters Area' },
  { value: 22600, suffix: '+', label: 'Daily Visitors' },
  { value: 10000, suffix: '+', label: 'Solar Panels Installed' },
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
    <section id="about" className="relative overflow-hidden" ref={ref}>

      {/* ── Full-width background image ── */}
      <div className="absolute inset-0">
        <img
          src="/images/dragon-city-aerial.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        {/* White overlay — stronger on left for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(to right, white 25%, rgba(255,255,255,0.92) 40%, rgba(255,255,255,0.7) 55%, rgba(255,255,255,0.3) 75%, transparent 100%),
              linear-gradient(to bottom, rgba(255,255,255,0.6) 0%, transparent 15%, transparent 75%, rgba(255,255,255,0.95) 100%)
            `,
          }}
        />
        {/* Top edge blend */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent" />
        {/* Bottom edge blend */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 px-6 md:px-12 lg:px-16 py-16 md:py-24">
        <div className="max-w-350 mx-auto">

          {/* Text content — left side */}
          <div className="lg:max-w-[50%]">

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
              <span className="text-[11px] text-black/25 font-medium">
                关于我们
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#1a1a1a] leading-[1.15] mb-6"
            >
              The Largest Trading Centre in the Kingdom
            </motion.h2>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-4 mb-8"
            >
              <p className="text-[15px] text-black/55 leading-[1.8]">
                Dragon City Bahrain (DCB) is a large-scale commercial center encapsulating wholesale and retail of Chinese products. Elegantly infused with Chinese inspired architecture, Dragon City serves as a major trading hub for Bahrain and the surrounding regions.
              </p>
              <p className="text-[15px] text-black/55 leading-[1.8]">
                With a diverse range of products catering to both individual consumers and wholesale businessmen, Dragon City is the largest wholesale and retail trading centre in the Kingdom.
              </p>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-5"
            >
              <a
                href="#shops"
                className="group inline-flex items-center gap-2.5 text-sm font-semibold text-dragon hover:text-dragon-dark transition-colors duration-300"
              >
                Explore our stores
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>

              <button
                onClick={() => setVideoOpen(true)}
                className="flex items-center gap-2.5 group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-dragon/10 flex items-center justify-center group-hover:bg-dragon/20 transition-colors">
                  <Play className="w-3.5 h-3.5 text-dragon ml-0.5" fill="currentColor" />
                </div>
                <span className="text-sm font-medium text-black/50">Play Video</span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div className="relative z-10 px-6 md:px-12 lg:px-16 pb-12 md:pb-16">
        <div className="max-w-350 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="pt-6 border-t border-black/8"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.45 + i * 0.08 }}
                >
                  <p className="text-3xl md:text-4xl font-display font-bold text-[#1a1a1a] mb-1">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} isInView={isInView} />
                  </p>
                  <p className="text-xs text-black/40 font-medium">{stat.label}</p>
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
