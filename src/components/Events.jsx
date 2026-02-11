import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Calendar } from 'lucide-react';

const events = [
  {
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
    title: 'Bahrain National Day Celebrations',
    date: 'December 2025',
    category: 'Cultural',
  },
  {
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
    title: 'Dragon City: Your No.1 Shopping Destination This Summer!',
    date: 'Summer 2025',
    category: 'Promotion',
  },
  {
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80',
    title: "Dragon City 'Scratch & Win' Grand Campaign",
    date: 'July - August 2025',
    category: 'Campaign',
  },
];

const news = [
  {
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&q=80',
    title: 'Dragon City Bahrain Announces the Winner of its November Promotional Campaign',
    date: 'Nov 2024',
  },
  {
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&q=80',
    title: 'Dragon City Bahrain Launches Big Prizes Campaign to Reward its Visitors',
    date: 'Oct 2024',
  },
  {
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80',
    title: 'Dragon City Bahrain Launches "Scratch & Win" Campaign for Shoppers',
    date: 'Jul 2024',
  },
];

export default function Events() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-[#070707]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dragon/20 to-transparent" />

      {/* Chinese watermark */}
      <div className="absolute bottom-20 right-10 font-chinese text-[180px] text-white/[0.015] leading-none select-none pointer-events-none hidden lg:block">
        活动
      </div>

      <div className="max-w-[1400px] mx-auto relative">
        {/* Events Section */}
        <div className="mb-28">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-12 h-px bg-gradient-to-r from-dragon to-gold" />
                <span className="text-xs tracking-[0.3em] uppercase text-dragon font-medium">Events & Promotions</span>
                <span className="font-chinese text-dragon/30 text-xs">活动与促销</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white"
              >
                What's <span className="text-gradient-dragon">Happening</span>
              </motion.h2>
            </div>

            <motion.a
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              href="#"
              className="group flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 text-white/60 text-sm font-medium hover:border-dragon/30 hover:text-white transition-all"
            >
              View all events
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>
          </div>

          {/* Editorial events grid - featured large + 2 smaller */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Featured event - spans full left side */}
            <motion.a
              href="#"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group relative rounded-3xl overflow-hidden md:row-span-2 min-h-[400px] md:min-h-0 cursor-pointer"
            >
              <img
                src={events[0].image}
                alt={events[0].title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              <div className="absolute top-5 left-5">
                <span className="px-4 py-1.5 rounded-full bg-dragon/80 backdrop-blur-sm text-white text-[11px] font-semibold tracking-wider uppercase">
                  {events[0].category}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-dragon" />
                  <span className="text-xs text-white/50">{events[0].date}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white group-hover:text-dragon-light transition-colors">
                  {events[0].title}
                </h3>
              </div>
            </motion.a>

            {/* Two smaller events stacked on the right */}
            {events.slice(1).map((event, i) => (
              <motion.a
                key={event.title}
                href="#"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group relative rounded-3xl overflow-hidden min-h-[250px] cursor-pointer"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-dragon/80 backdrop-blur-sm text-white text-[10px] font-semibold tracking-wider uppercase">
                    {event.category}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-dragon" />
                    <span className="text-xs text-white/50">{event.date}</span>
                  </div>
                  <h3 className="text-lg font-display font-bold text-white group-hover:text-dragon-light transition-colors line-clamp-2">
                    {event.title}
                  </h3>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Latest News */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="w-12 h-px bg-gold/30" />
            <span className="text-xs tracking-[0.3em] uppercase text-gold/60 font-medium">Latest News</span>
            <span className="font-chinese text-gold/20 text-xs">最新消息</span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {news.map((item, i) => (
              <motion.a
                key={item.title}
                href="#"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
                className="group flex gap-4 p-4 rounded-2xl border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300"
              >
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-white/30 mb-2">{item.date}</p>
                  <h4 className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors line-clamp-3 leading-snug">
                    {item.title}
                  </h4>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/10 group-hover:text-dragon flex-shrink-0 mt-1 transition-colors" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
