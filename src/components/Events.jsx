import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Calendar, Clock } from 'lucide-react';

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
    title: 'Scratch & Win Grand Campaign',
    desc: 'Shop for BD 10 or more and get a chance to scratch and win exciting prizes including gold, electronics, and vouchers.',
    date: 'Jul — Aug 2025',
    category: 'Campaign',
  },
  {
    image: '/images/gallery/Center Court Upscaled.jpg',
    title: 'Grand Center Court Experience',
    desc: 'Discover the iconic center court — a hub of culture, entertainment and shopping at Dragon City Bahrain.',
    date: 'Ongoing',
    category: 'Experience',
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
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-black/8 to-transparent" />

      {/* Chinese watermark */}
      <div className="absolute top-8 right-12 text-[11rem] font-bold text-dragon/3 leading-none pointer-events-none select-none hidden lg:block">
        活动
      </div>

      <div className="max-w-350 mx-auto relative">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10">
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
              What's <span className="text-black/25">Happening</span>
            </motion.h2>
          </div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center bg-black/4 rounded-full p-1"
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

        {/* News Layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col lg:flex-row gap-5"
          >
            {/* Left — Featured large card */}
            {featured && (
              <motion.a
                href="#"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="group relative lg:w-[60%] shrink-0 rounded-3xl overflow-hidden cursor-pointer h-72 lg:h-auto"
              >
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/10" />

                {/* Content at bottom left */}
                <div className="absolute inset-0 flex flex-col justify-end p-7">
                  <h3 className="text-xl md:text-2xl font-display font-bold text-white leading-snug mb-2.5 pr-14">
                    {featured.title}
                  </h3>
                  <p className="text-sm text-white/55 leading-relaxed mb-5 line-clamp-2 pr-10">
                    {featured.desc}
                  </p>
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-dragon flex items-center justify-center text-white text-[9px] font-bold shrink-0">龙</div>
                    <span className="text-xs text-white/65 font-medium">Dragon City Bahrain</span>
                    <span className="text-white/25 text-xs">·</span>
                    <span className="text-xs text-white/45">{featured.date}</span>
                  </div>
                </div>

                {/* Arrow — rounded square like reference */}
                <div className="absolute bottom-7 right-7 w-11 h-11 rounded-2xl bg-dragon flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-dragon/30">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </motion.a>
            )}

            {/* Right — Stacked news rows */}
            <div className="flex-1 flex flex-col min-w-0 divide-y divide-black/6">
              {rest.map((event, i) => (
                <motion.a
                  key={event.title}
                  href="#"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.15 + i * 0.1 }}
                  className="group flex gap-4 py-4 cursor-pointer first:pt-0 last:pb-0"
                >
                  {/* Thumbnail with arrow overlaid */}
                  <div className="relative w-32 h-28 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Arrow button on image bottom-right */}
                    <div className="absolute bottom-2 right-2 w-8 h-8 rounded-xl bg-dragon flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                      <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base md:text-lg font-display font-bold text-[#1a1a1a] leading-snug mb-1.5 line-clamp-2 group-hover:text-dragon transition-colors duration-300">
                        {event.title}
                      </h4>
                      <p className="text-xs text-black/40 leading-relaxed line-clamp-2">
                        {event.desc}
                      </p>
                    </div>
                    {/* Author row */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-5 h-5 rounded-full bg-dragon flex items-center justify-center text-white text-[8px] font-bold shrink-0">龙</div>
                      <span className="text-[11px] text-black/40 font-medium">Dragon City · {event.date}</span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-10"
        >
          <a
            href="#"
            className="group flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-black/12 text-sm font-semibold text-[#1a1a1a] hover:bg-dragon hover:text-white hover:border-dragon transition-all duration-300"
          >
            View More News
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
