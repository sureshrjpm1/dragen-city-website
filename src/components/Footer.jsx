import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, ArrowUpRight, MapPin, Clock } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Shops', href: '#shops' },
  { label: 'Events', href: '#events' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Location', href: '#location' },
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

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="relative bg-[#fafaf9] overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-black/8 to-transparent" />

      {/* Chinese watermark */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-[18rem] font-bold text-black/2 leading-none pointer-events-none select-none hidden lg:block">
        龙城
      </div>

      <div className="relative px-6 md:px-12 lg:px-16 max-w-350 mx-auto">

        {/* ── Newsletter CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="py-12 md:py-14 border-b border-black/8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-dragon" />
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-dragon">Newsletter</span>
              <span className="text-[11px] text-black/20">保持联系</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-[#1a1a1a] leading-tight">
              Don't miss what's<br />
              <span className="text-black/25">happening at Dragon City</span>
            </h3>
          </div>
          <div>
            <p className="text-sm text-black/45 mb-4 leading-relaxed">
              Subscribe for exclusive offers, new store openings, and upcoming events.
            </p>
            <form onSubmit={handleSubscribe}>
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-5 py-3.5 pr-14 border border-black/10 rounded-xl text-sm bg-white text-[#1a1a1a] placeholder-black/30 focus:outline-none focus:border-dragon/40 transition-all duration-300"
                />
                <button
                  type="submit"
                  className="absolute right-2 w-9 h-9 rounded-lg bg-dragon hover:bg-dragon/90 flex items-center justify-center transition-all duration-300 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
              {subscribed && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-green-600/70 mt-2.5 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Subscribed successfully
                </motion.p>
              )}
            </form>
          </div>
        </motion.div>

        {/* ── Main Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="py-12 md:py-14 border-b border-black/8 grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8"
        >
          {/* Logo + info */}
          <div className="col-span-2 md:col-span-4">
            <img
              src="/images/logo_v2_light.png"
              alt="Dragon City Bahrain"
              className="h-32 w-auto object-contain mb-4"
            />
            <div className="space-y-2.5 mb-6">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-dragon/50 mt-0.5 shrink-0" />
                <p className="text-xs text-black/45 leading-relaxed">
                  Building 4-45, Road 5617, Block 456<br />
                  Diyar Al Muharraq, Bahrain
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-dragon/50 mt-0.5 shrink-0" />
                <p className="text-xs text-black/45 leading-relaxed">
                  Sat – Wed: 10 AM – 10 PM<br />
                  Thu – Fri: 10 AM – 12 AM
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  className="w-8 h-8 rounded-lg bg-black/4 border border-black/8 text-black/35 flex items-center justify-center hover:border-dragon/30 hover:text-dragon hover:bg-dragon/5 transition-all duration-300"
                  title={s.name}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div className="col-span-1 md:col-span-2">
            <h6 className="text-[10px] font-semibold tracking-[0.3em] uppercase text-black/20 mb-4">Navigate</h6>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-1.5 text-sm text-black/50 hover:text-[#1a1a1a] transition-colors duration-300"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="col-span-1 md:col-span-2">
            <h6 className="text-[10px] font-semibold tracking-[0.3em] uppercase text-black/20 mb-4">Categories</h6>
            <ul className="space-y-2.5">
              {shopCategories.map((cat) => (
                <li key={cat}>
                  <a
                    href="#shops"
                    className="text-sm text-black/50 hover:text-[#1a1a1a] transition-colors duration-300"
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="col-span-2 md:col-span-4">
            <h6 className="text-[10px] font-semibold tracking-[0.3em] uppercase text-black/20 mb-4">Quick Links</h6>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
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
                  className="text-sm text-black/50 hover:text-[#1a1a1a] transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>


        {/* ── Bottom bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-3 py-5 text-[11px] text-black/25"
        >
          <span>&copy; 2026 Dragon City Bahrain. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-black/50 transition-colors">Privacy Policy</a>
            <span className="w-px h-3 bg-black/10" />
            <a href="#" className="hover:text-black/50 transition-colors">Terms of Use</a>
            <span className="w-px h-3 bg-black/10" />
            <a href="#" className="hover:text-black/50 transition-colors">Sitemap</a>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}
