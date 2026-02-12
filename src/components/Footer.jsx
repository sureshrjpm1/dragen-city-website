import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, ArrowUpRight, MapPin, Clock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Shops', href: '#shops' },
  { label: 'Events', href: '#events' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Location', href: '#location' },
  { label: 'Contact', href: '#contact' },
];

const shopCategories = [
  'Electronics', 'Fashion', 'Furniture', 'Food Court',
  'Textiles', 'Cosmetics', 'Jewelry', 'Sports & Leisure',
];

const socials = [
  {
    name: 'Facebook',
    url: '#',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    url: '#',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    url: '#',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: 'X',
    url: '#',
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-50px' });
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { isDark } = useTheme();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="relative overflow-hidden" ref={ref}>
      <div
        className="relative"
        style={{
          background: isDark
            ? 'linear-gradient(to bottom, #050505 0%, #0a0406 15%, #120508 40%, #1a060a 65%, #22070c 85%, #2a080e 100%)'
            : 'linear-gradient(to bottom, #f5f4f2 0%, #ede8e4 15%, #e8e0da 40%, #e2d8d0 65%, #ddd0c8 85%, #d8c8be 100%)',
        }}
      >
        {/* Subtle pattern bg */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/chinese-pattern-bg.jpg)' }}
        />

        {/* Radial red glow from bottom */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-96 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center bottom, rgba(203,51,59,0.08) 0%, transparent 70%)' }}
        />

        <div className="relative px-6 md:px-12 lg:px-20">
          <div className="max-w-350 mx-auto">

            {/* ─── Top CTA Section ─── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className={`pt-24 md:pt-32 pb-16 md:pb-20 border-b ${isDark ? 'border-white/6' : 'border-black/8'}`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end">
                {/* Left: Big heading */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-px bg-linear-to-r from-dragon to-gold" />
                    <span className="text-[10px] tracking-[0.4em] uppercase text-dragon/60 font-medium">Stay Connected</span>
                    <span className={`font-chinese text-xs ${isDark ? 'text-dragon/25' : 'text-dragon/25'}`}>保持联系</span>
                  </div>
                  <h2 className={`text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                    Don't miss out on<br />
                    <span className={isDark ? 'text-white/30' : 'text-black/25'}>{`what's happening`}</span>
                  </h2>
                </div>

                {/* Right: Newsletter */}
                <div className="lg:max-w-md lg:ml-auto">
                  <p className={`text-sm mb-5 leading-relaxed ${isDark ? 'text-white/40' : 'text-black/50'}`}>
                    Subscribe to our newsletter for exclusive offers, new store openings, and upcoming events at Dragon City Bahrain.
                  </p>
                  <form onSubmit={handleSubscribe}>
                    <div className="relative flex items-center">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className={`w-full px-5 py-4 pr-14 border rounded-xl text-sm focus:outline-none focus:border-dragon/40 transition-all duration-300 ${
                          isDark
                            ? 'bg-white/4 border-white/10 text-white placeholder-white/30 focus:bg-white/6'
                            : 'bg-black/4 border-black/10 text-[#1a1a1a] placeholder-black/30 focus:bg-black/6'
                        }`}
                      />
                      <button
                        type="submit"
                        className="absolute right-2 w-10 h-10 rounded-lg bg-dragon hover:bg-dragon-light flex items-center justify-center transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-dragon/20"
                      >
                        <Send className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    {subscribed && (
                      <motion.p
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-green-400/70 mt-3 flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        Subscribed successfully
                      </motion.p>
                    )}
                  </form>
                </div>
              </div>
            </motion.div>

            {/* ─── Main Footer Grid ─── */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className={`py-14 md:py-16 border-b ${isDark ? 'border-white/6' : 'border-black/8'}`}
            >
              <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">
                {/* Logo + Info */}
                <div className="col-span-2 md:col-span-4">
                  <img
                    src="/images/logo_v2_dark.png"
                    alt="Dragon City Bahrain"
                    className="h-[118px] md:h-[134px] w-auto object-contain mb-2"
                  />
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-3.5 h-3.5 text-dragon/60 mt-0.5 shrink-0" />
                      <p className={`text-xs leading-relaxed ${isDark ? 'text-white/40' : 'text-black/50'}`}>
                        Building 4-45, Road 5617, Block 456<br />
                        Diyar Al Muharraq, Bahrain
                      </p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Clock className="w-3.5 h-3.5 text-dragon/60 mt-0.5 shrink-0" />
                      <p className={`text-xs leading-relaxed ${isDark ? 'text-white/40' : 'text-black/50'}`}>
                        Sat – Wed: 10 AM – 10 PM<br />
                        Thu – Fri: 10 AM – 12 AM
                      </p>
                    </div>
                  </div>

                  {/* Social icons */}
                  <div className="flex items-center gap-2">
                    {socials.map((s) => (
                      <a
                        key={s.name}
                        href={s.url}
                        className={`w-9 h-9 rounded-lg flex items-center justify-center hover:border-dragon/30 hover:bg-dragon/10 transition-all duration-300 ${
                          isDark
                            ? 'bg-white/4 border border-white/6 text-white/40 hover:text-white'
                            : 'bg-black/4 border border-black/8 text-black/40 hover:text-black'
                        }`}
                        title={s.name}
                      >
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className="col-span-1 md:col-span-2">
                  <h6 className={`text-[10px] font-semibold tracking-[0.3em] uppercase mb-5 ${isDark ? 'text-white/25' : 'text-black/20'}`}>
                    Navigate
                  </h6>
                  <ul className="space-y-3">
                    {navLinks.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className={`group flex items-center gap-2 text-sm transition-colors duration-300 ${
                            isDark ? 'text-white/50 hover:text-white' : 'text-black/55 hover:text-black'
                          }`}
                        >
                          {link.label}
                          <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-50 group-hover:translate-x-0 transition-all duration-300" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Categories */}
                <div className="col-span-1 md:col-span-2">
                  <h6 className={`text-[10px] font-semibold tracking-[0.3em] uppercase mb-5 ${isDark ? 'text-white/25' : 'text-black/20'}`}>
                    Categories
                  </h6>
                  <ul className="space-y-3">
                    {shopCategories.map((cat) => (
                      <li key={cat}>
                        <a
                          href="#shops"
                          className={`group flex items-center gap-2 text-sm transition-colors duration-300 ${
                            isDark ? 'text-white/50 hover:text-white' : 'text-black/55 hover:text-black'
                          }`}
                        >
                          {cat}
                          <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-50 group-hover:translate-x-0 transition-all duration-300" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Links */}
                <div className="col-span-2 md:col-span-4">
                  <h6 className={`text-[10px] font-semibold tracking-[0.3em] uppercase mb-5 ${isDark ? 'text-white/25' : 'text-black/20'}`}>
                    Quick Links
                  </h6>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                    {[
                      { label: 'Mall Map', href: '#' },
                      { label: 'Careers', href: '#' },
                      { label: 'Events', href: '#events' },
                      { label: 'Feedback', href: '#contact' },
                      { label: 'Latest News', href: '#' },
                      { label: 'Parking Info', href: '#location' },
                      { label: 'Opening Hours', href: '#location' },
                      { label: 'Directions', href: '#location' },
                    ].map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className={`text-sm transition-colors duration-300 ${
                          isDark ? 'text-white/50 hover:text-white' : 'text-black/55 hover:text-black'
                        }`}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ─── Giant Brand Wordmark ─── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`py-10 md:py-12 border-b overflow-hidden ${isDark ? 'border-white/6' : 'border-black/8'}`}
            >
              <div className="flex items-center justify-center gap-6">
                <div className="hidden md:block w-16 h-px bg-linear-to-r from-transparent to-dragon/20" />
                <h3
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-brush font-bold tracking-tighter text-center select-none whitespace-nowrap"
                  style={{
                    color: 'transparent',
                    WebkitTextStroke: isDark ? '1px rgba(255,255,255,0.06)' : '1px rgba(0,0,0,0.08)',
                  }}
                >
                  DRAGON CITY
                </h3>
                <div className="hidden md:block w-16 h-px bg-linear-to-l from-transparent to-dragon/20" />
              </div>
              <p className={`text-center font-chinese text-lg mt-2 select-none ${isDark ? 'text-dragon/15' : 'text-dragon/25'}`}>龙城巴林</p>
            </motion.div>

            {/* ─── Bottom bar ─── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`flex flex-col sm:flex-row items-center justify-between gap-4 py-6 text-[11px] ${isDark ? 'text-white/25' : 'text-black/25'}`}
            >
              <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
                <span>&copy; 2026 Dragon City Bahrain. All rights reserved.</span>
              </div>
              <div className="flex items-center gap-4">
                <a href="#" className={`transition-colors ${isDark ? 'hover:text-white/60' : 'hover:text-black/60'}`}>Privacy Policy</a>
                <span className={`w-px h-3 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
                <a href="#" className={`transition-colors ${isDark ? 'hover:text-white/60' : 'hover:text-black/60'}`}>Terms of Use</a>
                <span className={`w-px h-3 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
                <a href="#" className={`transition-colors ${isDark ? 'hover:text-white/60' : 'hover:text-black/60'}`}>Sitemap</a>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </footer>
  );
}
