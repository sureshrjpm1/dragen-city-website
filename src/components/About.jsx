import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const stats = [
  { value: 799, suffix: '+', label: 'Retail & Wholesale Shops', zh: '商店' },
  { value: 55000, suffix: '+', label: 'Square Meters Area', zh: '平方米' },
  { value: 22600, suffix: '+', label: 'Daily Visitors', zh: '每日访客' },
  { value: 10000, suffix: '+', label: 'Solar Panels Installed', zh: '太阳能板' },
];

function AnimatedCounter({ value, suffix = '', isInView }) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const startTime = performance.now();
      const duration = 2500;

      const animate = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setCount(Math.round(eased * value));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  const formatted = count.toLocaleString();

  return (
    <span>
      {formatted}
      {suffix}
    </span>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-50px' });

  return (
    <section id="about" className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="absolute inset-0 chinese-pattern" />

      {/* Decorative Chinese character */}
      <div className="absolute top-20 right-10 font-chinese text-[280px] text-white/[0.015] leading-none select-none pointer-events-none hidden lg:block">
        龙
      </div>

      <div ref={ref} className="max-w-[1400px] mx-auto relative">
        {/* Section eyebrow - full width */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-12 h-px bg-gradient-to-r from-dragon to-gold" />
          <span className="text-xs tracking-[0.3em] uppercase text-dragon font-medium">About Us</span>
          <span className="font-chinese text-dragon/30 text-xs">关于我们</span>
        </motion.div>

        {/* Large heading - full width */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-white leading-[1] mb-16 max-w-4xl"
        >
          The Largest Trading Centre{' '}
          <span className="text-gradient-dragon">in the Kingdom</span>
        </motion.h2>

        {/* Asymmetric content: text left (narrow) + image right (wide) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 mb-20">
          {/* Text - 5 cols */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <p className="text-base md:text-lg text-white/50 leading-relaxed mb-6">
              Dragon City Bahrain (DCB) is a large-scale commercial center encapsulating
              wholesale and retail of Chinese products. Elegantly infused with Chinese
              inspired architecture, Dragon City serves as a major trading hub for
              Bahrain and the surrounding regions.
            </p>

            <p className="text-base md:text-lg text-white/50 leading-relaxed mb-8">
              With a diverse range of products catering to both individual consumers
              and wholesale businessmen, Dragon City is the largest wholesale and retail
              trading centre in the Kingdom.
            </p>

            <a
              href="#shops"
              className="group inline-flex items-center gap-3 text-dragon hover:text-dragon-light text-sm font-semibold transition-colors w-fit"
            >
              Explore our stores
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Image - 7 cols */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-7 relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[16/10]">
              <img
                src="https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=1200&q=80"
                alt="Dragon City Bahrain"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Floating accent card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute -bottom-8 -left-6 md:-left-10 bg-dragon p-5 md:p-6 rounded-2xl shadow-2xl shadow-dragon/30 z-10"
            >
              <p className="font-chinese text-xl text-white/60 mb-0.5">龙城</p>
              <p className="text-3xl md:text-4xl font-display font-bold text-white">Since 2015</p>
              <p className="text-xs text-white/50 mt-1">Diyar Al Muharraq</p>
            </motion.div>

            {/* Decorative corners */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border border-dragon/15 rounded-2xl" />
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-10 -right-10 w-28 h-28 opacity-15 hidden lg:block"
            >
              <img src="/images/ornaments/red-ornament.webp" alt="" className="w-full h-full object-contain" />
            </motion.div>
          </motion.div>
        </div>

        {/* Stats row - full width with animated counters */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 40 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-dragon/20 hover:bg-white/[0.04] transition-all duration-500"
            >
              {/* Chinese label */}
              <span className="absolute top-3 right-4 font-chinese text-base text-dragon/10 group-hover:text-dragon/25 transition-colors duration-500">
                {stat.zh}
              </span>

              {/* Counter */}
              <p className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-2 group-hover:text-dragon transition-colors duration-500">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  isInView={statsInView}
                />
              </p>

              {/* Label */}
              <p className="text-xs md:text-sm text-white/40 tracking-wide">{stat.label}</p>

              {/* Hover gradient */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-dragon/5 to-transparent pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
