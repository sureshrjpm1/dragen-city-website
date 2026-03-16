import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
  {
    name: 'Electronics',
    chinese: '电子产品',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600&q=80',
  },
  {
    name: 'Fashion',
    chinese: '时尚',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&q=80',
  },
  {
    name: 'Furniture',
    chinese: '家具',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
  },
  {
    name: 'Food Court',
    chinese: '美食广场',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
  },
  {
    name: 'Cosmetics',
    chinese: '化妆品',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80',
  },
  {
    name: 'Textiles',
    chinese: '纺织品',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80',
  },
  {
    name: 'Jewelry',
    chinese: '珠宝',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
  },
  {
    name: 'Accessories',
    chinese: '配饰',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80',
  },
  {
    name: 'Sports',
    chinese: '运动',
    image: 'https://images.unsplash.com/photo-1580793241553-e9f1cce181af?w=600&q=80',
  },
  {
    name: 'Home Decor',
    chinese: '家居装饰',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80',
  },
];

export default function Categories() {
  const ref = useRef(null);
  const scrollRef = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-80px' });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('a')?.offsetWidth || 280;
    el.scrollBy({ left: dir * (cardWidth + 20) * 2, behavior: 'smooth' });
  };

  return (
    <section id="shops" className="relative py-10 md:py-14 overflow-hidden bg-white" ref={ref}>
      {/* Decorative top line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dragon/15 to-transparent origin-center"
      />

      {/* Chinese watermark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.02 } : { opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute top-1/2 right-10 -translate-y-1/2 text-[14rem] font-bold text-dragon leading-none pointer-events-none select-none hidden lg:block"
      >
        购物
      </motion.div>

      {/* Header */}
      <div className="px-6 md:px-12 lg:px-16 mb-8 md:mb-10">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-dragon" />
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-dragon">
                Categories
              </span>
              <span className="text-[11px] text-black/20">探索分类</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-display font-bold text-[#1a1a1a] leading-tight">
              Explore Our Categories
            </h2>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll(-1)}
                disabled={!canScrollLeft}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                  canScrollLeft
                    ? 'border-dragon/30 text-dragon hover:bg-dragon hover:text-white hover:border-dragon'
                    : 'border-black/10 text-black/20 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll(1)}
                disabled={!canScrollRight}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                  canScrollRight
                    ? 'border-dragon/30 text-dragon hover:bg-dragon hover:text-white hover:border-dragon'
                    : 'border-black/10 text-black/20 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <a
              href="#"
              className="group hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full bg-dragon text-white text-sm font-medium hover:bg-dragon/90 transition-all duration-300"
            >
              View all
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scrollable cards */}
      <div
        ref={scrollRef}
        className="flex gap-5 md:gap-6 overflow-x-auto scrollbar-hide px-6 md:px-12 lg:px-16 pb-2"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {/* Left spacer */}
        <div className="shrink-0 w-0 lg:w-[calc((100vw-1400px)/2-4rem)]" />

        {categories.map((cat, i) => (
          <motion.a
            key={cat.name}
            href="#"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
            className="group relative shrink-0 w-[240px] md:w-[270px] cursor-pointer"
            style={{ scrollSnapAlign: 'start' }}
          >
            {/* Image container */}
            <div className="relative h-48 md:h-56 overflow-hidden rounded-2xl mb-3">
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

              {/* Subtle bottom overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

              {/* Chinese character watermark */}
              <div className="absolute top-4 right-4 text-white/20 text-4xl font-light pointer-events-none group-hover:text-white/40 transition-colors duration-500">
                {cat.chinese}
              </div>

              {/* Arrow on hover */}
              <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                <ArrowRight className="w-4 h-4 text-dragon" />
              </div>

              {/* Text on image — glass effect */}
              <div
                className="absolute bottom-0 left-0 right-0 px-4 py-3 rounded-b-2xl"
                style={{
                  background: 'rgba(255,255,255,0.35)',
                  backdropFilter: 'blur(5px)',
                  WebkitBackdropFilter: 'blur(5px)',
                  borderTop: '1px solid rgba(255,255,255,0.4)',
                }}
              >
                <h3 className="text-base md:text-lg font-display font-bold text-black">
                  {cat.name}
                </h3>
              </div>
            </div>
          </motion.a>
        ))}

        {/* Right spacer */}
        <div className="shrink-0 w-6" />
      </div>
    </section>
  );
}
