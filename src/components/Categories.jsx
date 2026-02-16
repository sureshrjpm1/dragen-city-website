import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const categories = [
  {
    name: 'Electronics',
    zh: '电子产品',
    desc: 'Latest gadgets, mobile phones, and tech accessories',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&q=80',
    span: 'col-span-2 row-span-2',
  },
  {
    name: 'Fashion',
    zh: '时尚',
    desc: 'Trendy clothing and accessories',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80',
    span: 'col-span-1',
  },
  {
    name: 'Furniture',
    zh: '家具',
    desc: 'Quality home furnishings',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    span: 'col-span-1',
  },
  {
    name: 'Food Court',
    zh: '美食广场',
    desc: 'International and Chinese cuisine',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    span: 'col-span-1',
  },
  {
    name: 'Cosmetics',
    zh: '化妆品',
    desc: 'Beauty and skincare products',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
    span: 'col-span-1',
  },
  {
    name: 'Textiles',
    zh: '纺织品',
    desc: 'Fabrics and home textiles',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80',
    span: 'col-span-1',
  },
  {
    name: 'Jewelry',
    zh: '珠宝',
    desc: 'Fine jewelry and watches',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
    span: 'col-span-1',
  },
  {
    name: 'Accessories',
    zh: '配饰',
    desc: 'Bags, watches, and more',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80',
    span: 'col-span-2',
  },
];

export default function Categories() {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  return (
    <section id="shops" className="relative py-32 overflow-hidden" ref={ref}>
      <div className={`absolute inset-0 ${isDark ? 'bg-[#080808]' : 'bg-[#f5f4f2]'}`} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dragon/20 to-transparent" />

      <div className="relative px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          {/* Section header - left aligned, modern */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-14">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-12 h-px bg-gradient-to-r from-dragon to-gold" />
                <span className="text-xs tracking-[0.3em] uppercase text-dragon font-medium">Directory</span>
                <span className="font-chinese text-dragon/30 text-xs">商店目录</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 }}
                className={`text-3xl md:text-4xl lg:text-5xl font-display font-bold ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}
              >
                Explore Our{' '}
                <span className={isDark ? 'text-white/30' : 'text-black/25'}>Categories</span>
              </motion.h2>
            </div>

            <motion.a
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              href="#"
              className={`group flex items-center gap-3 px-6 py-3 rounded-full border ${isDark ? 'border-white/10 text-white/60 hover:text-white' : 'border-black/10 text-black/55 hover:text-[#1a1a1a]'} text-sm font-medium hover:border-dragon/30 transition-all`}
            >
              View all stores
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>
          </div>

          {/* Bento grid */}
          <div className="bento-grid">
            {categories.map((cat, i) => (
              <motion.a
                key={cat.name}
                href="#"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.07 }}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer ${cat.span}`}
              >
                {/* Background image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/10 group-hover:from-black/95 group-hover:via-black/55 transition-all duration-500" />

                {/* Chinese watermark */}
                <span className="absolute top-4 right-4 font-chinese text-2xl md:text-3xl text-white/[0.08] group-hover:text-white/[0.15] transition-colors duration-500">
                  {cat.zh}
                </span>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-lg md:text-xl font-display font-bold text-white mb-1 group-hover:text-dragon-light transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-white/40 group-hover:text-white/60 transition-colors line-clamp-2">
                        {cat.desc}
                      </p>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex-shrink-0 ml-3">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Top-left index */}
                <div className="absolute top-4 left-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-6 h-6 rounded-full bg-dragon/80 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
