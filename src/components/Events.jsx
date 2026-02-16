import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const events = [
  {
    image: '/images/gallery/FB8A8436.JPG',
    title: 'Bahrain National Day Celebrations',
    desc: 'Join us for a spectacular celebration honoring Bahrain\'s heritage with traditional performances, cultural exhibitions, and special offers across all 799+ stores.',
    date: 'Dec 2025',
    category: 'Cultural',
    zh: '国庆',
  },
  {
    image: '/images/gallery/DC-NOV2025-4.jpg',
    title: 'Dragon City: Your No.1 Shopping Destination This Summer!',
    desc: 'Beat the heat with exclusive summer deals, family entertainment, and refreshing dining experiences throughout the season at Dragon City.',
    date: 'Summer 2025',
    category: 'Promotion',
    zh: '促销',
  },
  {
    image: '/images/gallery/DC-NOV2025-1.jpg',
    title: "Dragon City 'Scratch & Win' Grand Campaign",
    desc: 'Shop for BD 10 or more and get a chance to scratch and win exciting prizes including gold, electronics, vouchers, and more.',
    date: 'Jul — Aug 2025',
    category: 'Campaign',
    zh: '活动',
  },
  {
    image: '/images/gallery/DC-NOV2025-9.jpg',
    title: '10th Anniversary Mega Sale',
    desc: 'Celebrate a decade of Dragon City with our biggest sale ever — up to 70% off across electronics, fashion, furniture, and more. Special loyalty rewards for returning customers.',
    date: 'Mar 2025',
    category: 'Anniversary',
    zh: '十周年',
  },
];

const news = [
  {
    image: '/images/gallery/DC-NOV2025-9.jpg',
    title: 'Dragon City Bahrain Announces the Winner of its November Promotional Campaign',
    desc: 'The grand prize winner was revealed at a special ceremony held at the Center Court, receiving a brand-new car and gold prizes worth over BD 5,000.',
    date: 'Nov 2024',
    category: 'Announcement',
  },
  {
    image: '/images/gallery/DC-NOV2025-8.jpg',
    title: 'Dragon City Bahrain Launches Big Prizes Campaign to Reward its Visitors',
    desc: 'Visitors can win prizes including electronics, gold jewelry, and shopping vouchers with every BD 10 purchase during the month-long promotional campaign.',
    date: 'Oct 2024',
    category: 'Campaign',
  },
  {
    image: '/images/gallery/Center Court Upscaled.jpg',
    title: 'Dragon City Bahrain Launches "Scratch & Win" Campaign for Shoppers',
    desc: 'A new interactive shopping experience where every purchase gives you a chance to instantly win prizes — from discount vouchers to premium electronics.',
    date: 'Jul 2024',
    category: 'Promotion',
  },
];

export default function Events() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const newsRef = useRef(null);
  const newsInView = useInView(newsRef, { once: false, margin: '-100px' });
  const { isDark } = useTheme();

  return (
    <section id="events" className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden" ref={ref}>
      <div className={`absolute inset-0 ${isDark ? 'bg-[#070707]' : 'bg-[#f5f4f2]'}`} />
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-dragon/20 to-transparent" />

      {/* Chinese watermark */}
      <div className={`absolute bottom-20 right-10 font-chinese text-[180px] ${isDark ? 'text-white/4' : 'text-black/4'} leading-none select-none pointer-events-none hidden lg:block`}>
        活动
      </div>

      <div className="max-w-350 mx-auto relative">
        {/* ─── Events & Offers ─── */}
        <div className="mb-28">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-12 h-px bg-linear-to-r from-dragon to-gold" />
                <span className="text-xs tracking-[0.3em] uppercase text-dragon font-medium">Events & Offers</span>
                <span className="font-chinese text-dragon/30 text-xs">活动与优惠</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 }}
                className={`text-3xl md:text-4xl lg:text-5xl font-display font-bold ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}
              >
                What's <span className="text-gradient-dragon">Happening</span>
              </motion.h2>
            </div>

            <motion.a
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              href="#"
              className={`group flex items-center gap-3 px-6 py-3 rounded-full border ${isDark ? 'border-white/10 text-white/60 hover:text-white' : 'border-black/10 text-black/55 hover:text-[#1a1a1a]'} text-sm font-medium hover:border-dragon/30 transition-all`}
            >
              View all events
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>
          </div>

          {/* Events timeline rows with thumbnail */}
          {events.map((event, i) => (
            <motion.a
              key={event.title}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className={`group block border-t ${isDark ? 'border-white/6' : 'border-black/8'} hover:border-dragon/20 transition-colors duration-500`}
            >
              <div className="flex gap-5 md:gap-8 py-7 md:py-9 items-center">
                {/* Date + Category */}
                <div className="hidden md:flex flex-col gap-1.5 w-28 shrink-0">
                  <span className={`text-sm font-display font-semibold ${isDark ? 'text-white/70' : 'text-black/60'}`}>
                    {event.date}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-dragon/10 text-dragon text-[10px] font-semibold tracking-wider uppercase w-fit">
                    {event.category}
                  </span>
                </div>

                {/* Thumbnail */}
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden shrink-0">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Title + Description */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 md:hidden mb-1">
                    <span className={`text-xs ${isDark ? 'text-white/40' : 'text-black/35'}`}>{event.date}</span>
                    <span className="px-2 py-px rounded-full bg-dragon/10 text-dragon text-[9px] font-semibold tracking-wider uppercase">
                      {event.category}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-3 mb-1.5">
                    <h3 className={`text-lg md:text-xl lg:text-2xl font-display font-bold ${isDark ? 'text-white/90' : 'text-[#1a1a1a]'} group-hover:text-dragon transition-colors duration-300 leading-snug`}>
                      {event.title}
                    </h3>
                    <span className="font-chinese text-dragon/10 text-base hidden lg:inline group-hover:text-dragon/25 transition-colors duration-500">
                      {event.zh}
                    </span>
                  </div>
                  <p className={`text-sm ${isDark ? 'text-white/40' : 'text-black/40'} leading-relaxed max-w-2xl line-clamp-2`}>
                    {event.desc}
                  </p>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex shrink-0">
                  <div className={`w-10 h-10 rounded-full border ${isDark ? 'border-white/8' : 'border-black/8'} group-hover:border-dragon/30 group-hover:bg-dragon/8 flex items-center justify-center transition-all duration-300`}>
                    <ArrowRight className={`w-4 h-4 ${isDark ? 'text-white/20' : 'text-black/20'} group-hover:text-dragon group-hover:translate-x-0.5 transition-all duration-300`} />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
          <div className={`border-t ${isDark ? 'border-white/6' : 'border-black/8'}`} />
        </div>

        {/* ─── Latest News ─── */}
        <div id="news" ref={newsRef}>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={newsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-12 h-px bg-linear-to-r from-gold to-gold-dark" />
                <span className="text-xs tracking-[0.3em] uppercase text-gold font-medium">Latest News</span>
                <span className="font-chinese text-gold/30 text-xs">最新消息</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={newsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 }}
                className={`text-3xl md:text-4xl lg:text-5xl font-display font-bold ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}
              >
                In the <span className={isDark ? 'text-white/25' : 'text-black/25'}>Spotlight</span>
              </motion.h2>
            </div>

            <motion.a
              initial={{ opacity: 0 }}
              animate={newsInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              href="#"
              className={`group flex items-center gap-3 px-6 py-3 rounded-full border ${isDark ? 'border-white/10 text-white/60 hover:text-white' : 'border-black/10 text-black/55 hover:text-[#1a1a1a]'} text-sm font-medium hover:border-gold/30 transition-all`}
            >
              All news
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>
          </div>

          {/* News cards with images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {news.map((item, i) => (
              <motion.a
                key={item.title}
                href="#"
                initial={{ opacity: 0, y: 30 }}
                animate={newsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
                className={`group rounded-2xl overflow-hidden border ${isDark ? 'border-white/6 hover:border-gold/20' : 'border-black/6 hover:border-gold/20'} transition-all duration-500 hover:-translate-y-1`}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-gold/80 backdrop-blur-sm text-white text-[10px] font-semibold tracking-wider uppercase">
                      {item.category}
                    </span>
                  </div>
                  <span className={`absolute bottom-4 left-5 text-xs font-medium text-white/60`}>
                    {item.date}
                  </span>
                </div>

                {/* Text */}
                <div className={`p-5 md:p-6 backdrop-blur-md ${isDark ? 'bg-white/3' : 'bg-black/3'}`}>
                  <h3 className={`text-base md:text-lg font-display font-bold ${isDark ? 'text-white/85' : 'text-[#1a1a1a]'} group-hover:text-gold transition-colors duration-300 leading-snug mb-3 line-clamp-2`}>
                    {item.title}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-white/40' : 'text-black/40'} leading-relaxed line-clamp-3 mb-4`}>
                    {item.desc}
                  </p>
                  <div className="flex items-center gap-2 text-gold text-xs font-semibold opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    Read more
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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
