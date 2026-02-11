import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1548764927-e22f4a02e806?w=800&q=80',
    title: 'Dragon Gate',
    subtitle: 'Chinese Architecture',
    tall: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80',
    title: 'Festive Season',
    subtitle: 'Cultural Celebrations',
    tall: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
    title: 'Heritage Temple',
    subtitle: 'Traditional Beauty',
    tall: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1470004914212-05527e49370b?w=800&q=80',
    title: 'Night Market',
    subtitle: 'Evening Experience',
    tall: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1474181006592-11f6fcfcce4c?w=800&q=80',
    title: 'Mall Interior',
    subtitle: 'Shopping Experience',
    tall: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&q=80',
    title: 'Dragon Statue',
    subtitle: 'Iconic Landmark',
    tall: true,
  },
];

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-32 overflow-hidden" id="media">
      <div className="absolute inset-0 bg-[#060606]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dragon/20 to-transparent" />

      {/* Chinese watermark */}
      <div className="absolute top-20 left-10 font-chinese text-[200px] text-white/[0.015] leading-none select-none pointer-events-none hidden lg:block">
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
                <div className="w-12 h-px bg-gradient-to-r from-dragon to-gold" />
                <span className="text-xs tracking-[0.3em] uppercase text-dragon font-medium">Gallery</span>
                <span className="font-chinese text-dragon/30 text-xs">画廊</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white"
              >
                Explore the{' '}
                <span className="text-white/25">Experience</span>
              </motion.h2>
            </div>

            <motion.a
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              href="#"
              className="group flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 text-white/60 text-sm font-medium hover:border-dragon/30 hover:text-white transition-all"
            >
              View all
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </div>

        {/* Masonry grid */}
        <div className="px-6 md:px-12 lg:px-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="masonry-grid">
              {galleryImages.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer ${
                    img.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Overlay content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-lg font-display font-bold text-white">{img.title}</p>
                    <p className="text-sm text-white/60">{img.subtitle}</p>
                  </div>

                  {/* Corner index */}
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-dragon/20 backdrop-blur-sm flex items-center justify-center border border-dragon/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs font-bold text-white">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
