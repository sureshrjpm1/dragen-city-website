import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
  {
    name: 'Electronics',
    desc: 'Gadgets, phones & tech',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600&q=80',
  },
  {
    name: 'Fashion',
    desc: 'Clothing & accessories',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&q=80',
  },
  {
    name: 'Furniture',
    desc: 'Home furnishings',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
  },
  {
    name: 'Food Court',
    desc: 'International cuisine',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
  },
  {
    name: 'Cosmetics',
    desc: 'Beauty & skincare',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80',
  },
  {
    name: 'Textiles',
    desc: 'Fabrics & home textiles',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80',
  },
  {
    name: 'Jewelry',
    desc: 'Fine jewelry & watches',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
  },
  {
    name: 'Accessories',
    desc: 'Bags, watches & more',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80',
  },
  {
    name: 'Sports',
    desc: 'Sportswear & equipment',
    image: 'https://images.unsplash.com/photo-1580793241553-e9f1cce181af?w=600&q=80',
  },
  {
    name: 'Home Decor',
    desc: 'Lighting & décor',
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
    <section id="shops" className="relative py-14 md:py-20 overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/6 to-transparent" />

      {/* Header */}
      <div className="px-6 md:px-12 lg:px-16 mb-8">
        <div className="max-w-350 mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-px bg-dragon" />
              <span className="text-xs tracking-[0.25em] uppercase text-dragon/70 font-medium">Directory</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-[#1a1a1a]"
            >
              Explore Our Categories
            </motion.h2>
          </div>

          {/* Scroll arrows + View all */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scroll(-1)}
                disabled={!canScrollLeft}
                className={`w-9 h-9 rounded-full border flex items-center justify-center cursor-pointer transition-all duration-300 ${
                  canScrollLeft
                    ? 'border-black/15 text-black/50 hover:border-dragon/30 hover:text-dragon hover:bg-dragon/5'
                    : 'border-black/8 text-black/15 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll(1)}
                disabled={!canScrollRight}
                className={`w-9 h-9 rounded-full border flex items-center justify-center cursor-pointer transition-all duration-300 ${
                  canScrollRight
                    ? 'border-black/15 text-black/50 hover:border-dragon/30 hover:text-dragon hover:bg-dragon/5'
                    : 'border-black/8 text-black/15 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <a
              href="#"
              className="group hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/10 text-black/50 hover:text-[#1a1a1a] hover:border-dragon/25 text-sm font-medium transition-all duration-300"
            >
              View all
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Horizontal scrollable cards */}
      <div
        ref={scrollRef}
        className="flex gap-4 md:gap-5 overflow-x-auto scrollbar-hide px-6 md:px-12 lg:px-16 pb-4"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {/* Left spacer for max-w alignment */}
        <div className="shrink-0 w-0 lg:w-[calc((100vw-1400px)/2-4rem)]" />

        {categories.map((cat, i) => (
          <motion.a
            key={cat.name}
            href="#"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
            className="group relative shrink-0 w-[260px] md:w-[280px] rounded-2xl overflow-hidden cursor-pointer"
            style={{ scrollSnapAlign: 'start' }}
          >
            {/* Image */}
            <div className="relative h-[320px] md:h-[360px] overflow-hidden rounded-2xl">
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/85 transition-all duration-500" />

              {/* Content at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-lg font-display font-bold text-white mb-0.5 group-hover:text-dragon-light transition-colors duration-300">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-white/45 group-hover:text-white/65 transition-colors">
                      {cat.desc}
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center shrink-0 ml-3 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </motion.a>
        ))}

        {/* Right spacer */}
        <div className="shrink-0 w-4" />
      </div>
    </section>
  );
}
