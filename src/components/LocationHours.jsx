import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Navigation, Clock, ExternalLink, Map } from 'lucide-react';

export default function LocationHours() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="location" className="relative py-32 px-6 md:px-12 lg:px-20" ref={ref}>
      <div className="max-w-[1400px] mx-auto">
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
            className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white"
          >
            Visit Us
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
              src="/images/hero-banner.jpg"
              alt="Dragon City entrance"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10" />

            <div className="relative h-full flex flex-col justify-end p-8 md:p-10">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-dragon" />
                <span className="text-sm font-semibold text-dragon tracking-wider uppercase">Find Us</span>
                <span className="font-chinese text-dragon/40 text-xs ml-1">找到我们</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                Dragon City, Building 4-45
              </h3>
              <p className="text-white/50 text-sm mb-6">
                Road 5617, Block 456<br />
                Diyar Al Muharraq, Bahrain
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href="https://maps.google.com/?q=Dragon+City+Bahrain"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white hover:text-black transition-all duration-300"
                >
                  <Navigation className="w-4 h-4" />
                  Directions
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
          </motion.div>

          {/* Opening Hours - takes 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2 relative rounded-3xl overflow-hidden bg-dragon min-h-[450px] flex flex-col"
          >
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-6 right-6 w-36 h-36 border border-white/10 rounded-full" />
              <div className="absolute top-14 right-14 w-20 h-20 border border-white/5 rounded-full" />
              <div className="absolute -bottom-12 -left-12 w-52 h-52 border border-white/5 rounded-full" />
              <div className="absolute bottom-8 right-8 font-chinese text-6xl text-white/[0.04] select-none">龙</div>
            </div>

            <div className="relative p-8 md:p-10 flex flex-col h-full">
              <div className="flex items-center gap-2 mb-8">
                <Clock className="w-5 h-5 text-white/80" />
                <span className="text-sm font-semibold text-white/80 tracking-wider uppercase">Opening Hours</span>
                <span className="font-chinese text-white/30 text-xs ml-1">营业时间</span>
              </div>

              <div className="flex-1 flex flex-col justify-center space-y-8">
                <div>
                  <p className="text-sm text-white/50 mb-2 tracking-wide">Saturday to Wednesday</p>
                  <p className="text-4xl md:text-5xl font-display font-bold text-white">
                    10 <span className="text-2xl font-light text-white/50">AM</span> — 10 <span className="text-2xl font-light text-white/50">PM</span>
                  </p>
                </div>

                <div className="w-full h-px bg-white/10" />

                <div>
                  <p className="text-sm text-white/50 mb-2 tracking-wide">Thursday to Friday</p>
                  <p className="text-4xl md:text-5xl font-display font-bold text-white">
                    10 <span className="text-2xl font-light text-white/50">AM</span> — 12 <span className="text-2xl font-light text-white/50">AM</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-8">
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
    </section>
  );
}
