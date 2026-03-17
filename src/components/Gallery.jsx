import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const posts = [
  {
    src: '/images/gallery/Center Court Upscaled.jpg',
    caption: 'Center Court',
    tag: '#DragonCityBahrain',
    span: 'col-span-2 row-span-2',
  },
  {
    src: '/images/gallery/DC-NOV2025-8.jpg',
    caption: 'Shopping Experience',
    tag: '#Shopping',
    span: '',
  },
  {
    src: '/images/gallery/FB8A8436.JPG',
    caption: 'Cultural Celebrations',
    tag: '#Culture',
    span: '',
  },
  {
    src: '/images/gallery/DC-NOV2025-4.jpg',
    caption: 'Fashion & Style',
    tag: '#Fashion',
    span: '',
  },
  {
    src: '/images/gallery/DC-NOV2025-1.jpg',
    caption: 'Grand Entrance',
    tag: '#DCB',
    span: '',
  },
  {
    src: '/images/gallery/DC-NOV2025-9.jpg',
    caption: 'Food Court',
    tag: '#FoodCourt',
    span: '',
  },
];

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-80px' });

  return (
    <section className="relative py-14 md:py-20 overflow-hidden bg-white" id="media" ref={ref}>
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-black/8 to-transparent" />

      {/* Chinese watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-bold text-black/[0.015] leading-none pointer-events-none select-none hidden lg:block">
        影
      </div>

      <div className="px-6 md:px-12 lg:px-16 relative">
        <div className="max-w-350 mx-auto">

          {/* Header */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-4"
              >
                <div className="w-8 h-px bg-dragon" />
                <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-dragon">Gallery</span>
                <span className="text-[11px] text-black/20">画廊</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#1a1a1a]"
              >
                Explore the{' '}
                <span className="text-black/25">Experience</span>
              </motion.h2>
            </div>

            <motion.a
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              href="#"
              className="group hidden sm:flex items-center gap-2 text-sm font-medium text-black/45 hover:text-dragon transition-colors duration-300"
            >
              View all
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>

          {/* Mosaic Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-1.5 h-96 md:h-110 rounded-2xl overflow-hidden">

            {/* Large featured image — spans 2 cols & 2 rows */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7 }}
              className="col-span-2 row-span-2 relative overflow-hidden group cursor-pointer"
            >
              <img
                src={posts[0].src}
                alt={posts[0].caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-5 left-5 translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                <p className="text-white font-display font-bold text-lg">{posts[0].caption}</p>
                <p className="text-white/60 text-xs mt-0.5">{posts[0].tag}</p>
              </div>
              {/* Dragon red bottom line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-dragon scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            </motion.div>

            {/* Remaining 4 images — each 1 col x 1 row */}
            {posts.slice(1, 5).map((post, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                className="relative overflow-hidden group cursor-pointer"
              >
                <img
                  src={post.src}
                  alt={post.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="absolute bottom-3 left-3 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <p className="text-white font-semibold text-xs leading-snug">{post.caption}</p>
                  <p className="text-white/55 text-[10px] mt-0.5">{post.tag}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-dragon scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              </motion.div>
            ))}

          </div>

          {/* Bottom Instagram handle */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center justify-center gap-3 mt-8"
          >
            <div className="h-px bg-black/8 flex-1" />
            <a href="#" className="flex items-center gap-2 text-sm text-black/40 hover:text-dragon transition-colors font-medium">
              <span>@dragoncitybahrain</span>
              <span className="text-black/20">·</span>
              <span className="text-[11px]">Follow us on Instagram</span>
            </a>
            <div className="h-px bg-black/8 flex-1" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
