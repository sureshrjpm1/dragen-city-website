import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowUpRight, Map, X, Download, Menu as MenuIcon } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Shops', href: '#shops' },
  { label: 'Events', href: '#events' },
  { label: 'Gallery', href: '#media' },
  { label: 'Location', href: '#location' },
  { label: 'Contact', href: '#contact' },
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


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState('en');
  const [mapOpen, setMapOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') { setMenuOpen(false); setMapOpen(false); }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    const openMap = () => setMapOpen(true);
    document.addEventListener('open-mall-map', openMap);
    return () => document.removeEventListener('open-mall-map', openMap);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (menuOpen || mapOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, mapOpen]);

  return (
    <>
      {/* ─── Clean Minimal Navbar ─── */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <motion.div
          animate={{
            backgroundColor: scrolled ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.5)',
            backdropFilter: 'blur(10px) saturate(1.2)',
            boxShadow: scrolled ? '0 1px 3px rgba(0,0,0,0.06)' : '0 1px 0 rgba(0,0,0,0.03)',
          }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative"
        >
          <div className="px-6 md:px-12 lg:px-16">
            <div className={`max-w-[1400px] mx-auto flex items-center justify-between transition-all duration-400 ${
              scrolled ? 'h-16' : 'h-20 md:h-22'
            }`}>
              {/* Left: Logo */}
              <a href="#home" className="relative z-10 flex items-center shrink-0">
                <img
                  src="/images/footer-logo.png"
                  alt="Dragon City"
                  className={`w-auto object-contain transition-all duration-400 ${
                    scrolled ? 'h-10 sm:h-11' : 'h-10 sm:h-11 md:h-12'
                  }`}
                />
              </a>

              {/* Center: Inline Navigation Links — desktop only */}
              <div className="hidden lg:flex items-center gap-0.5">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="relative px-4 py-2 text-sm font-bold transition-colors duration-300 text-black/70 hover:text-dragon group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-dragon scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </a>
                ))}
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Mall Map CTA — desktop */}
                <button
                  onClick={() => setMapOpen(true)}
                  className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-300 cursor-pointer bg-dragon text-white hover:bg-dragon-light hover:shadow-md hover:shadow-dragon/15"
                >
                  <Map className="w-3.5 h-3.5" />
                  Mall Map
                </button>

                {/* Language toggle */}
                <button
                  onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full cursor-pointer transition-all duration-300 hover:bg-black/5"
                  aria-label="Toggle language"
                >
                  <span className={`text-[13px] font-semibold transition-colors duration-300 ${
                    lang === 'en' ? 'text-black/80' : 'text-black/30'
                  }`}>EN</span>
                  <span className="text-xs select-none text-black/15">/</span>
                  <span className={`text-[14px] font-semibold transition-colors duration-300 ${
                    lang === 'ar' ? 'text-black/80' : 'text-black/30'
                  }`}>عربي</span>
                </button>

                {/* Mobile menu trigger */}
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2.5 rounded-full transition-all duration-300 cursor-pointer text-black/70 hover:bg-black/5"
                  aria-label="Toggle menu"
                >
                  <div className="w-5 h-4 flex flex-col justify-center gap-1.5 relative">
                    <motion.span
                      animate={menuOpen
                        ? { rotate: 45, y: 3.5, width: 18 }
                        : { rotate: 0, y: 0, width: 18 }
                      }
                      className="block h-[1.5px] bg-current rounded-full origin-center"
                      transition={{ duration: 0.3 }}
                    />
                    <motion.span
                      animate={menuOpen
                        ? { rotate: -45, y: -3.5, width: 18 }
                        : { rotate: 0, y: 0, width: 12 }
                      }
                      className="block h-[1.5px] bg-current rounded-full origin-center"
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* ─── Mobile Menu ─── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/98 backdrop-blur-2xl"
            />

            <div className="relative h-full flex flex-col pt-24 px-6 sm:px-10 overflow-y-auto">
              <nav className="space-y-1 flex-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                    className="flex items-center justify-between py-4 border-b border-black/6 text-xl font-display font-semibold text-black/80 hover:text-dragon transition-colors"
                  >
                    {link.label}
                    <ArrowUpRight className="w-4 h-4 text-black/20" />
                  </motion.a>
                ))}
              </nav>

              {/* Bottom info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="py-8 space-y-5"
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => { setMenuOpen(false); setMapOpen(true); }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-dragon text-white text-sm font-semibold cursor-pointer"
                  >
                    <Map className="w-3.5 h-3.5" />
                    Mall Map
                  </button>
                  <a
                    href="#location"
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/15 text-black/60 text-sm font-semibold"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    Directions
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.url}
                      className="w-9 h-9 rounded-full flex items-center justify-center bg-black/5 border border-black/8 text-black/50 hover:text-dragon hover:border-dragon/30 transition-all duration-300"
                      title={s.name}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>

                <p className="text-[11px] text-black/25">
                  &copy; 2026 Dragon City Bahrain
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Mall Map Modal ─── */}
      <AnimatePresence>
        {mapOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-60 flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-xl"
              onClick={() => setMapOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 10 }}
              transition={{ duration: 0.4 }}
              className="relative w-[92vw] max-w-4xl h-[80vh] rounded-2xl overflow-hidden bg-white shadow-2xl shadow-black/10"
            >
              {/* Top bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-black/8">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-dragon/10 flex items-center justify-center">
                    <Map className="w-4.5 h-4.5 text-dragon" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#1a1a1a]">Mall Map</h3>
                    <p className="text-[11px] text-black/40">Dragon City Bahrain</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="/images/mall-map.jpg"
                    download
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-black/5 hover:bg-black/10 text-black/50 hover:text-black text-xs transition-all duration-300"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Download</span>
                  </a>
                  <button
                    onClick={() => setMapOpen(false)}
                    className="w-9 h-9 rounded-xl bg-black/5 hover:bg-black/10 flex items-center justify-center text-black/50 hover:text-black transition-all duration-300 cursor-pointer"
                  >
                    <X className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>

              {/* Map content */}
              <div className="h-full flex flex-col items-center justify-center p-8 pb-20">
                <div className="w-20 h-20 rounded-2xl bg-dragon/8 flex items-center justify-center mb-6">
                  <Map className="w-9 h-9 text-dragon/50" />
                </div>
                <p className="text-lg font-display font-semibold text-[#1a1a1a] mb-2">Mall Map Coming Soon</p>
                <p className="text-sm text-black/40 text-center max-w-sm">
                  An interactive directory of Dragon City's 799+ stores will be available here.
                </p>
                <a
                  href="#shops"
                  onClick={() => setMapOpen(false)}
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-dragon hover:bg-dragon-light text-white text-sm font-semibold transition-all duration-300"
                >
                  Browse Categories
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
