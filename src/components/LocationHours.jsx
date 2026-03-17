import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Navigation, Map } from 'lucide-react';

export default function LocationHours() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-80px' });

  return (
    <section id="location" ref={ref} className="relative overflow-hidden bg-[#fafaf9]">

      {/* Subtle texture strip — top-right decorative */}
      <div className="absolute top-0 right-0 w-72 h-full bg-linear-to-l from-dragon/4 to-transparent pointer-events-none" />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-dragon/30 to-transparent" />

      {/* Faint Chinese watermark */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 text-[11rem] font-black text-dragon/5 leading-none pointer-events-none select-none hidden xl:block">
        龙
      </div>

      <div className="relative px-6 md:px-12 lg:px-20 py-10 md:py-12">
        <div className="max-w-6xl mx-auto">

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-6 h-px bg-dragon" />
            <span className="text-[10px] font-semibold tracking-[0.28em] uppercase text-dragon">Plan Your Visit</span>
            <span className="text-[10px] text-black/30 tracking-wider">参观我们</span>
          </motion.div>

          {/* Main row */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-0 items-stretch">

            {/* Col 1 — Address */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:pr-12 md:border-r md:border-black/10 flex flex-col justify-center gap-3"
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[#111] leading-none">
                Visit <span className="text-dragon">Us</span>
              </h2>
              <div className="flex gap-2.5 items-start">
                <MapPin className="w-4 h-4 text-dragon shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-[#111]">Dragon City, Building 4-45</p>
                  <p className="text-sm text-[#555] leading-snug mt-0.5">Road 5617, Block 456 · Diyar Al Muharraq, Bahrain</p>
                </div>
              </div>
            </motion.div>

            {/* Col 2 — Hours */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:px-12 md:border-r md:border-black/10 flex flex-col justify-center gap-3 mt-6 md:mt-0"
            >
              <div className="flex items-center gap-2">
                <div className="w-1 h-3.5 bg-dragon rounded-full" />
                <span className="text-[10px] tracking-[0.22em] uppercase text-[#666] font-bold">Opening Hours</span>
              </div>

              <div className="flex gap-6">
                {/* Sat-Wed */}
                <div>
                  <p className="text-[10px] font-semibold tracking-wider uppercase text-[#888] mb-1">Sat — Wed</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-[#111] font-display tracking-tight leading-none">10</span>
                    <span className="text-xs font-bold text-[#666] leading-none">AM</span>
                    <span className="text-lg text-[#bbb] mx-1.5">–</span>
                    <span className="text-4xl font-extrabold text-[#111] font-display tracking-tight leading-none">10</span>
                    <span className="text-xs font-bold text-[#666] leading-none">PM</span>
                  </div>
                </div>

                <div className="w-px bg-black/10 self-stretch" />

                {/* Thu-Fri */}
                <div>
                  <p className="text-[10px] font-semibold tracking-wider uppercase text-[#888] mb-1">Thu — Fri</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-[#111] font-display tracking-tight leading-none">10</span>
                    <span className="text-xs font-bold text-[#666] leading-none">AM</span>
                    <span className="text-lg text-[#bbb] mx-1.5">–</span>
                    <span className="text-4xl font-extrabold text-[#111] font-display tracking-tight leading-none">12</span>
                    <span className="text-xs font-bold text-[#666] leading-none">AM</span>
                  </div>
                </div>
              </div>

              {/* Currently open */}
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                <span className="text-xs font-semibold text-green-700">Currently Open</span>
              </div>
            </motion.div>

            {/* Col 3 — CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="md:pl-12 flex flex-col justify-center gap-2.5 mt-6 md:mt-0 md:min-w-45"
            >
              <a
                href="https://maps.google.com/?q=Dragon+City+Bahrain"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-black/20 text-sm font-semibold text-[#111] hover:border-dragon hover:text-dragon transition-all duration-300 whitespace-nowrap"
              >
                <Navigation className="w-3.5 h-3.5" />
                Get Directions
              </a>
              <button
                onClick={() => document.dispatchEvent(new CustomEvent('open-mall-map'))}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-dragon text-white text-sm font-semibold hover:bg-dragon/90 hover:shadow-lg hover:shadow-dragon/20 transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                <Map className="w-3.5 h-3.5" />
                Mall Map
              </button>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-black/10 to-transparent" />
    </section>
  );
}
