import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1533669955142-6a73332af4db?w=1600&q=90&fit=crop',
    title: 'Dragon Gate',
    subtitle: 'Chinese Architecture',
  },
  {
    src: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=1600&q=90&fit=crop',
    title: 'Festive Season',
    subtitle: 'Cultural Celebrations',
  },
  {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=90&fit=crop',
    title: 'Heritage Temple',
    subtitle: 'Traditional Beauty',
  },
  {
    src: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1600&q=90&fit=crop',
    title: 'Mall Experience',
    subtitle: 'Shopping & Lifestyle',
  },
  {
    src: 'https://images.unsplash.com/photo-1513623935135-c896b59073c1?w=1600&q=90&fit=crop',
    title: 'Dragon City',
    subtitle: 'Iconic Landmark',
  },
  {
    src: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=1600&q=90&fit=crop',
    title: 'Lantern Festival',
    subtitle: 'Annual Celebrations',
  },
];

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { isDark } = useTheme();

  return (
    <section className="relative py-32 overflow-hidden" id="media">
      <div className={`absolute inset-0 ${isDark ? 'bg-[#060606]' : 'bg-[#f8f7f5]'}`} />
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-dragon/20 to-transparent" />

      {/* Chinese watermark */}
      <div className={`absolute top-20 left-10 font-chinese text-[200px] ${isDark ? 'text-white/[0.015]' : 'text-black/[0.04]'} leading-none select-none pointer-events-none hidden lg:block`}>
        画廊
      </div>

      <div ref={ref} className="relative">
        {/* Section header */}
        <div className="px-6 md:px-12 lg:px-20 mb-16">
          <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-12 h-px bg-linear-to-r from-dragon to-gold" />
                <span className="text-xs tracking-[0.3em] uppercase text-dragon font-medium">Gallery</span>
                <span className="font-chinese text-dragon/30 text-xs">画廊</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 }}
                className={`text-4xl md:text-5xl lg:text-7xl font-display font-bold ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}
              >
                Explore the{' '}
                <span className={isDark ? 'text-white/25' : 'text-black/25'}>Experience</span>
              </motion.h2>
            </div>

            <motion.a
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              href="#"
              className={`group flex items-center gap-3 px-6 py-3 rounded-full border ${isDark ? 'border-white/10 text-white/60 hover:text-white' : 'border-black/10 text-black/55 hover:text-[#1a1a1a]'} text-sm font-medium hover:border-dragon/30 transition-all`}
            >
              View all
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </div>

        {/* Bento grid — 4 cols, 2 rows, fully filled */}
        <div className="px-6 md:px-12 lg:px-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-[250px_250px] md:grid-rows-[280px_280px] lg:grid-rows-[320px_320px] gap-3 md:gap-4">
              {/* 1 — Large hero (2 cols, 2 rows) */}
              <GalleryCard img={galleryImages[0]} i={0} isInView={isInView} className="col-span-2 row-span-2" />
              {/* 2 — Top right small */}
              <GalleryCard img={galleryImages[1]} i={1} isInView={isInView} className="col-span-1 row-span-1" />
              {/* 3 — Top far right */}
              <GalleryCard img={galleryImages[2]} i={2} isInView={isInView} className="col-span-1 row-span-1" />
              {/* 4 — Bottom right small */}
              <GalleryCard img={galleryImages[3]} i={3} isInView={isInView} className="col-span-1 row-span-1" />
              {/* 5 — Bottom far right */}
              <GalleryCard img={galleryImages[4]} i={4} isInView={isInView} className="col-span-1 row-span-1" />
            </div>

            {/* Second row — 3 equal columns */}
            <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-[220px] md:grid-rows-[260px] lg:grid-rows-[300px] gap-3 md:gap-4 mt-3 md:mt-4">
              <GalleryCard img={galleryImages[5]} i={5} isInView={isInView} className="col-span-1" />
              <GalleryCard
                img={{ src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=90&fit=crop', title: 'Grand Interior', subtitle: 'Architecture & Design' }}
                i={6}
                isInView={isInView}
                className="col-span-2 md:col-span-1"
              />
              <GalleryCard
                img={{ src: 'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=1600&q=90&fit=crop', title: 'Night Market', subtitle: 'Evening Vibes' }}
                i={7}
                isInView={isInView}
                className="col-span-2 md:col-span-1"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleryCard({ img, i, isInView, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer ${className}`}
    >
      <img
        src={img.src}
        alt={img.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
      />

      {/* Always-visible subtle gradient */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
        <div className="flex items-end justify-between gap-3">
          <div className="translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
            <p className="text-sm md:text-base font-display font-bold text-white leading-tight">{img.title}</p>
            <p className="text-xs text-white/50 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{img.subtitle}</p>
          </div>

          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center shrink-0 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500">
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
      </div>

      {/* Corner index */}
      <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-[10px] font-mono text-white/40 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
          {String(i + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Red accent line on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-dragon via-dragon/60 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-out" />
    </motion.div>
  );
}
