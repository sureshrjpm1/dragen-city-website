import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Calendar, Clock } from 'lucide-react';

const upcomingEvents = [
  {
    image: '/images/gallery/FB8A8436.JPG',
    title: 'Bahrain National Day Celebrations',
    desc: 'Join us for a spectacular celebration honoring Bahrain\'s heritage with traditional performances, cultural exhibitions, and special offers across all 799+ stores.',
    date: 'Dec 2025',
    category: 'Cultural',
    featured: true,
  },
  {
    image: '/images/gallery/DC-NOV2025-4.jpg',
    title: 'Summer Shopping Festival',
    desc: 'Beat the heat with exclusive summer deals, family entertainment, and refreshing dining experiences throughout the season.',
    date: 'Summer 2025',
    category: 'Promotion',
  },
  {
    image: '/images/gallery/DC-NOV2025-1.jpg',
    title: "Scratch & Win Grand Campaign",
    desc: 'Shop for BD 10 or more and get a chance to scratch and win exciting prizes including gold, electronics, and vouchers.',
    date: 'Jul — Aug 2025',
    category: 'Campaign',
  },
];

const pastEvents = [
  {
    image: '/images/gallery/DC-NOV2025-9.jpg',
    title: '10th Anniversary Mega Sale',
    desc: 'Celebrating a decade of Dragon City with up to 70% off across electronics, fashion, furniture, and more.',
    date: 'Mar 2025',
    category: 'Anniversary',
    featured: true,
  },
  {
    image: '/images/gallery/DC-NOV2025-9.jpg',
    title: 'November Campaign Winner Announcement',
    desc: 'The grand prize winner was revealed at a special ceremony — receiving a brand-new car and gold prizes worth over BD 5,000.',
    date: 'Nov 2024',
    category: 'Announcement',
  },
  {
    image: '/images/gallery/DC-NOV2025-8.jpg',
    title: 'Big Prizes Campaign',
    desc: 'Visitors won prizes including electronics, gold jewelry, and shopping vouchers with every BD 10 purchase.',
    date: 'Oct 2024',
    category: 'Campaign',
  },
  {
    image: '/images/gallery/Center Court Upscaled.jpg',
    title: 'Scratch & Win Summer Edition',
    desc: 'An interactive shopping experience where every purchase gave shoppers a chance to instantly win prizes.',
    date: 'Jul 2024',
    category: 'Promotion',
  },
];

export default function Events() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-80px' });
  const [activeTab, setActiveTab] = useState('upcoming');

  const items = activeTab === 'upcoming' ? upcomingEvents : pastEvents;
  const featured = items.find((e) => e.featured);
  const rest = items.filter((e) => !e.featured);

  return (
    <section id="events" className="relative py-14 md:py-20 px-6 md:px-12 lg:px-16 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-[#fafaf9]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/8 to-transparent" />
      {/* Chinese watermark */}
      <div className="absolute top-8 right-12 text-[11rem] font-bold text-dragon/3 leading-none pointer-events-none select-none hidden lg:block">
        活动
      </div>

      <div className="max-w-350 mx-auto relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="w-10 h-px bg-dragon" />
              <span className="text-xs tracking-[0.25em] uppercase text-dragon/70 font-medium">Events & News</span>
              <span className="text-xs text-black/25">活动与新闻</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#1a1a1a]"
            >
              What's Happening
            </motion.h2>
          </div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center bg-black/[0.04] rounded-full p-1"
          >
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeTab === 'upcoming'
                  ? 'bg-white text-[#1a1a1a] shadow-sm'
                  : 'text-black/40 hover:text-black/60'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeTab === 'past'
                  ? 'bg-white text-[#1a1a1a] shadow-sm'
                  : 'text-black/40 hover:text-black/60'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              Past Events
            </button>
          </motion.div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {/* Featured Event — large hero card */}
            {featured && (
              <a href="#" className="group block mb-5">
                <div className="relative rounded-2xl overflow-hidden aspect-video md:aspect-21/8">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-5 left-5 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-dragon text-white text-[11px] font-semibold tracking-wider uppercase">
                      {activeTab === 'upcoming' ? 'Featured' : 'Highlight'}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white text-[11px] font-medium">
                      {featured.category}
                    </span>
                  </div>

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <p className="text-xs text-white/50 font-medium mb-2">{featured.date}</p>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-white mb-2 max-w-2xl group-hover:text-white/90 transition-colors">
                      {featured.title}
                    </h3>
                    <p className="text-sm text-white/60 max-w-xl leading-relaxed hidden md:block">
                      {featured.desc}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center group-hover:bg-white group-hover:text-[#1a1a1a] transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-white group-hover:text-[#1a1a1a] transition-colors" />
                  </div>
                </div>
              </a>
            )}

            {/* Event Grid — remaining items */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {rest.map((event, i) => (
                <motion.a
                  key={event.title}
                  href="#"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                  className="group rounded-2xl overflow-hidden bg-white border border-black/6 hover:border-dragon/15 hover:shadow-lg hover:shadow-black/5 transition-all duration-400 hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-3.5 left-3.5">
                      <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#1a1a1a] text-[10px] font-semibold tracking-wider uppercase">
                        {event.category}
                      </span>
                    </div>
                    <span className="absolute bottom-3.5 left-4 text-xs font-medium text-white/70">
                      {event.date}
                    </span>
                  </div>

                  {/* Text */}
                  <div className="p-5">
                    <h3 className="text-base font-display font-bold text-[#1a1a1a] group-hover:text-dragon transition-colors duration-300 leading-snug mb-2 line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-black/40 leading-relaxed line-clamp-2 mb-4">
                      {event.desc}
                    </p>
                    <div className="flex items-center gap-1.5 text-dragon text-xs font-semibold opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                      Read more
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* View All link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-8"
        >
          <a
            href="#"
            className="group flex items-center gap-2 px-6 py-3 rounded-full border border-black/10 text-black/50 hover:text-[#1a1a1a] hover:border-dragon/25 text-sm font-medium transition-all duration-300"
          >
            View all events
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
