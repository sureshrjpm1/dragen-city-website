import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { UtensilsCrossed, ShoppingBag, Sparkles, ParkingCircle, Wifi, Shield, Sun, Baby } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const experiences = [
  {
    icon: UtensilsCrossed,
    title: 'Dine',
    zh: '餐饮',
    desc: 'Enjoy a world of flavors with Chinese, Asian, and international cuisines at our vibrant food court and specialty restaurants.',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1600&q=90&fit=crop',
    color: 'from-orange-500 to-red-600',
  },
  {
    icon: ShoppingBag,
    title: 'Shop',
    zh: '购物',
    desc: 'Browse 799+ retail and wholesale stores offering electronics, fashion, furniture, and authentic Chinese products at competitive prices.',
    image: 'https://images.unsplash.com/photo-1481437156560-3205f6a55735?w=1600&q=90&fit=crop',
    color: 'from-dragon to-dragon-dark',
  },
  {
    icon: Sparkles,
    title: 'Explore',
    zh: '探索',
    desc: 'Immerse yourself in Chinese inspired architecture, cultural celebrations, and seasonal festivals throughout the year.',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1600&q=90&fit=crop',
    color: 'from-gold to-gold-dark',
  },
];

const amenities = [
  { icon: ParkingCircle, label: 'Free Parking', desc: 'Ample parking space', zh: '停车' },
  { icon: Wifi, label: 'Free WiFi', desc: 'High-speed connection', zh: '无线' },
  { icon: Shield, label: '24/7 Security', desc: 'CCTV monitored', zh: '安全' },
  { icon: Sun, label: 'Solar Powered', desc: '10,000+ solar panels', zh: '太阳能' },
  { icon: Baby, label: 'Family Friendly', desc: 'Play areas for kids', zh: '家庭' },
  { icon: UtensilsCrossed, label: 'Food Court', desc: 'International cuisines', zh: '美食' },
];

export default function Experience() {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 chinese-pattern" />
      <div className={`absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent ${isDark ? 'via-white/10' : 'via-black/10'} to-transparent`} />

      {/* Large Chinese watermark */}
      <div className={`absolute -top-10 -right-20 font-chinese text-[350px] ${isDark ? 'text-white/[0.012]' : 'text-black/[0.04]'} leading-none select-none pointer-events-none hidden lg:block`}>
        体验
      </div>

      <div className="max-w-[1400px] mx-auto relative">
        {/* Section header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-12 h-px bg-linear-to-r from-dragon to-gold" />
              <span className="text-xs tracking-[0.3em] uppercase text-dragon font-medium">Experience</span>
              <span className="font-chinese text-dragon/30 text-xs">体验龙城</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className={`text-4xl md:text-5xl lg:text-7xl font-display font-bold ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}
            >
              Shop. Dine.{' '}
              <span className={isDark ? 'text-white/25' : 'text-black/25'}>Explore.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`${isDark ? 'text-white/40' : 'text-black/45'} max-w-md text-sm md:text-base leading-relaxed`}
          >
            More than a shopping destination — Dragon City is a cultural experience where
            East meets West in the heart of Bahrain.
          </motion.p>
        </div>

        {/* Three experience cards - tall aspect ratio */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-24">
          {experiences.map((exp, i) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.15 }}
                whileHover={{ y: -10, transition: { duration: 0.4 } }}
                className="group relative rounded-3xl overflow-hidden min-h-[500px] md:min-h-[550px] cursor-pointer"
              >
                {/* Background image */}
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-black/10 group-hover:from-black/95 transition-all duration-500" />

                {/* Chinese character bg */}
                <span className="absolute top-8 right-8 font-chinese text-7xl text-white/[0.05] group-hover:text-white/[0.1] transition-colors duration-700">
                  {exp.zh}
                </span>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-8 md:p-10">
                  <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${exp.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <div className="flex items-baseline gap-3 mb-3">
                    <h3 className="text-3xl font-display font-bold text-white">{exp.title}</h3>
                    <span className="font-chinese text-white/15 text-lg">{exp.zh}</span>
                  </div>

                  <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/60 transition-colors mb-5">
                    {exp.desc}
                  </p>

                  {/* Discover more */}
                  <div className="flex items-center gap-2 text-dragon opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-400">
                    <span className="text-sm font-semibold">Discover more</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Amenities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-px bg-gold/30" />
            <span className="text-xs tracking-[0.3em] uppercase text-gold/60 font-medium">Amenities & Services</span>
            <span className="font-chinese text-gold/20 text-xs">设施服务</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {amenities.map((a, i) => {
              const Icon = a.icon;
              return (
                <motion.div
                  key={a.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 + i * 0.05 }}
                  className={`group flex flex-col items-center text-center p-5 rounded-2xl border ${isDark ? 'border-white/5' : 'border-black/5'} hover:border-gold/20 hover:bg-gold/[0.03] transition-all duration-500`}
                >
                  <Icon className="w-6 h-6 text-gold/40 group-hover:text-gold mb-3 transition-colors" />
                  <p className={`text-xs font-semibold ${isDark ? 'text-white/70' : 'text-black/65'} mb-0.5`}>{a.label}</p>
                  <p className={`text-[10px] ${isDark ? 'text-white/25' : 'text-black/25'}`}>{a.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
