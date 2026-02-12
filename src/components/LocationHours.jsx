import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Navigation, Clock, ExternalLink, Map } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function LocationHours() {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  return (
    <section id="location" className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden" ref={ref}>
      <div className={`absolute inset-0 ${isDark ? 'bg-[#070707]' : 'bg-[#f5f4f2]'}`} />
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-dragon/20 to-transparent" />

      {/* Chinese watermark */}
      <div className={`absolute top-20 left-10 font-chinese text-[180px] ${isDark ? 'text-white/[0.04]' : 'text-black/[0.04]'} leading-none select-none pointer-events-none hidden lg:block`}>
        访问
      </div>

      {/* Chinese ornament — animated */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={isInView ? { opacity: 0.12, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute -top-4 -right-6 md:-right-4 lg:right-0 w-40 md:w-56 h-40 md:h-56 pointer-events-none"
      >
        <motion.img
          src="/images/ornaments/pale-ornament.webp"
          alt=""
          className="w-full h-full object-contain"
          animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="max-w-[1400px] mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="w-12 h-px bg-linear-to-r from-transparent to-dragon" />
            <span className="text-xs tracking-[0.3em] uppercase text-dragon font-medium">Plan Your Visit</span>
            <span className="font-chinese text-dragon/30 text-xs">计划您的访问</span>
            <div className="w-12 h-px bg-linear-to-l from-transparent to-dragon" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className={`text-3xl md:text-4xl lg:text-5xl font-display font-bold ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}
          >
            Visit <span className="text-gradient-dragon">Us</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Find Us - takes 3 cols */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3 relative group rounded-3xl overflow-hidden min-h-[450px]"
          >
            <img
              src="/images/visit-us.jpg"
              alt="Dragon City entrance"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/60 to-black/20" />

            {/* Decorative corner accent */}
            <div className="absolute top-0 left-0 w-24 h-24 pointer-events-none">
              <div className="absolute top-4 left-4 w-8 h-px bg-dragon/60" />
              <div className="absolute top-4 left-4 w-px h-8 bg-dragon/60" />
            </div>

            <div className="relative h-full flex flex-col justify-end p-8 md:p-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-dragon/20 backdrop-blur-sm flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-dragon" />
                </div>
                <span className="text-sm font-semibold text-dragon tracking-wider uppercase">Find Us</span>
                <span className="font-chinese text-dragon/40 text-xs ml-1">找到我们</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                Dragon City, Building 4-45
              </h3>
              <p className="text-white/70 text-sm mb-8 leading-relaxed">
                Road 5617, Block 456<br />
                Diyar Al Muharraq, Bahrain
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href="https://maps.google.com/?q=Dragon+City+Bahrain"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
                >
                  <Navigation className="w-4 h-4" />
                  Get Directions
                  <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                </a>
                <button
                  onClick={() => document.dispatchEvent(new CustomEvent('open-mall-map'))}
                  className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-full bg-dragon text-white text-sm font-semibold hover:bg-dragon-light hover:shadow-lg hover:shadow-dragon/20 transition-all duration-300 cursor-pointer"
                >
                  <Map className="w-4 h-4" />
                  Mall Map
                </button>
              </div>
            </div>

            {/* Red accent line on hover */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-dragon via-dragon/60 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-out" />
          </motion.div>

          {/* Right column — stacked cards */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Opening Hours card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative rounded-3xl overflow-hidden bg-dragon flex-1 flex flex-col"
            >
              {/* Decorative elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-6 right-6 w-36 h-36 border border-white/10 rounded-full" />
                <div className="absolute top-14 right-14 w-20 h-20 border border-white/5 rounded-full" />
                <div className="absolute -bottom-12 -left-12 w-52 h-52 border border-white/5 rounded-full" />
                <div className="absolute bottom-6 right-6 font-chinese text-6xl text-white/[0.04] select-none">龙</div>
              </div>

              <div className="relative p-8 md:p-10 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <Clock className="w-4 h-4 text-white/80" />
                  </div>
                  <span className="text-sm font-semibold text-white/80 tracking-wider uppercase">Opening Hours</span>
                  <span className="font-chinese text-white/30 text-xs ml-1">营业时间</span>
                </div>

                <div className="flex-1 flex flex-col justify-center space-y-6">
                  <div>
                    <p className="text-xs text-white/40 mb-1.5 tracking-wide uppercase">Saturday — Wednesday</p>
                    <p className="text-3xl md:text-4xl font-display font-bold text-white">
                      10 <span className="text-xl font-light text-white/50">AM</span> — 10 <span className="text-xl font-light text-white/50">PM</span>
                    </p>
                  </div>

                  <div className="w-full h-px bg-linear-to-r from-white/15 via-white/5 to-transparent" />

                  <div>
                    <p className="text-xs text-white/40 mb-1.5 tracking-wide uppercase">Thursday — Friday</p>
                    <p className="text-3xl md:text-4xl font-display font-bold text-white">
                      10 <span className="text-xl font-light text-white/50">AM</span> — 12 <span className="text-xl font-light text-white/50">AM</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-6">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
                  </span>
                  <span className="text-sm text-white/70 font-medium">Currently Open</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
