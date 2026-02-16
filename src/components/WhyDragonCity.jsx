import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe, TrendingUp, ShieldCheck, Truck, Award, Users } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const reasons = [
  {
    icon: Globe,
    title: 'Gateway to the Gulf',
    desc: 'Strategically located in Diyar Al Muharraq, Dragon City connects Chinese manufacturers directly with Gulf markets — making it the premier trade hub for Bahrain, Saudi Arabia, and beyond.',
    zh: '海湾门户',
  },
  {
    icon: TrendingUp,
    title: 'Unbeatable Wholesale Prices',
    desc: 'Direct sourcing from Chinese suppliers means wholesale and retail prices that are significantly lower than traditional markets — ideal for businesses and savvy shoppers alike.',
    zh: '批发优势',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted for a Decade',
    desc: 'Celebrating 10 years of excellence, Dragon City has built a reputation for reliability, quality products, and exceptional customer service across the Kingdom.',
    zh: '十年信赖',
  },
  {
    icon: Truck,
    title: 'One-Stop Sourcing',
    desc: 'From electronics and fashion to furniture and textiles — 799+ stores under one roof eliminates the need for multiple supplier visits, saving time and logistics costs.',
    zh: '一站采购',
  },
  {
    icon: Award,
    title: 'Award-Winning Sustainability',
    desc: 'With over 10,000 solar panels generating clean energy, Dragon City leads the way in sustainable commercial development in the region.',
    zh: '绿色发展',
  },
  {
    icon: Users,
    title: '22,600+ Daily Visitors',
    desc: 'A thriving community of shoppers, traders, and families visit Dragon City every day — creating unmatched foot traffic and business opportunities for tenants.',
    zh: '日流万人',
  },
];

export default function WhyDragonCity() {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  return (
    <section id="why" className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className={`absolute inset-0 ${isDark ? 'bg-[#070707]' : 'bg-[#f5f4f2]'}`} />
      <div className={`absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent ${isDark ? 'via-white/10' : 'via-black/10'} to-transparent`} />

      {/* Chinese watermark */}
      <div className={`absolute top-16 right-10 font-chinese text-[220px] ${isDark ? 'text-white/4' : 'text-black/4'} leading-none select-none pointer-events-none hidden lg:block`}>
        优势
      </div>

      <div ref={ref} className="max-w-350 mx-auto relative">
        {/* Section header */}
        <div className="max-w-2xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-12 h-px bg-linear-to-r from-dragon to-gold" />
            <span className="text-xs tracking-[0.3em] uppercase text-dragon font-medium">Why Dragon City</span>
            <span className="font-chinese text-dragon/30 text-xs">为什么选择龙城</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className={`text-3xl md:text-4xl lg:text-5xl font-display font-bold ${isDark ? 'text-white' : 'text-[#1a1a1a]'} leading-tight mb-6`}
          >
            The Region's Most{' '}
            <span className="text-gradient-dragon">Trusted</span> Trading Hub
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`text-base md:text-lg ${isDark ? 'text-white/45' : 'text-black/50'} leading-relaxed`}
          >
            For over a decade, Dragon City Bahrain has served as the vital link between
            Chinese manufacturing excellence and the Gulf's dynamic consumer markets.
            Here's what makes us the preferred choice for over 22,000 daily visitors.
          </motion.p>
        </div>

        {/* Reasons grid — 3 cols, text-focused */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.08 }}
                className={`group relative p-7 md:p-8 rounded-2xl border ${isDark ? 'border-white/6 hover:border-dragon/20 bg-white/2' : 'border-black/6 hover:border-dragon/20 bg-black/2'} hover:bg-dragon/4 transition-all duration-500`}
              >
                {/* Chinese label */}
                <span className={`absolute top-5 right-5 font-chinese text-sm ${isDark ? 'text-white/8' : 'text-black/8'} group-hover:text-dragon/15 transition-colors duration-500`}>
                  {reason.zh}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-dragon/8 group-hover:bg-dragon/15 flex items-center justify-center mb-5 transition-colors duration-500">
                  <Icon className="w-5.5 h-5.5 text-dragon/70 group-hover:text-dragon transition-colors duration-500" />
                </div>

                {/* Title */}
                <h3 className={`text-lg font-display font-bold ${isDark ? 'text-white/90' : 'text-[#1a1a1a]'} mb-3 group-hover:text-dragon transition-colors duration-500`}>
                  {reason.title}
                </h3>

                {/* Description */}
                <p className={`text-sm ${isDark ? 'text-white/40' : 'text-black/45'} leading-relaxed group-hover:${isDark ? 'text-white/55' : 'text-black/55'} transition-colors duration-500`}>
                  {reason.desc}
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-6 right-6 h-px bg-linear-to-r from-transparent via-dragon/0 to-transparent group-hover:via-dragon/20 transition-all duration-700" />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className={`text-sm ${isDark ? 'text-white/30' : 'text-black/30'} mb-4`}>
            Join the thousands of businesses and families who choose Dragon City every day.
          </p>
          <a
            href="#location"
            className="inline-flex items-center gap-2 text-dragon hover:text-dragon-light text-sm font-semibold transition-colors"
          >
            Plan your visit
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
