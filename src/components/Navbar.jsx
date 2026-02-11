import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, MapPin, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Shops', href: '#shops' },
  { label: 'Media', href: '#media' },
  { label: 'Location', href: '#location' },
  { label: 'Contact', href: '#contact' },
];

const socials = [
  { name: 'Facebook', url: '#' },
  { name: 'Instagram', url: '#' },
  { name: 'YouTube', url: '#' },
  { name: 'X', url: '#' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Lock body scroll when menu or search is open
  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, searchOpen]);

  return (
    <>
      {/* Main navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/70 backdrop-blur-2xl shadow-2xl shadow-black/30'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left: Logo */}
            <a href="#home" className="relative z-10 flex items-center flex-shrink-0">
              <img
                src="/images/header-logo.png"
                alt="Dragon City"
                className="h-10 sm:h-12 md:h-14 w-auto object-contain"
              />
            </a>

            {/* Center: Desktop nav links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative px-4 py-2 text-[13px] font-medium text-white/60 hover:text-white transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-dragon group-hover:w-1/2 transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search button */}
              <button
                onClick={() => { setSearchOpen(true); setMenuOpen(false); }}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.06] transition-all duration-300 cursor-pointer"
                title="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Language */}
              <button className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-white/70 text-xs font-medium hover:text-white hover:bg-white/[0.06] transition-all duration-300 cursor-pointer border border-white/[0.08]">
                EN
                <span className="text-white/30">|</span>
                <span className="font-chinese text-[11px] text-white/50">中文</span>
              </button>

              {/* Mall Map - desktop only */}
              <a
                href="#location"
                className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full bg-dragon text-white text-xs font-semibold hover:bg-dragon-light transition-all duration-300 hover:shadow-lg hover:shadow-dragon/25"
              >
                <MapPin className="w-3.5 h-3.5" />
                Visit Us
              </a>

              {/* Hamburger / Close */}
              <button
                onClick={() => { setMenuOpen(!menuOpen); setSearchOpen(false); }}
                className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white hover:bg-white/[0.06] transition-all duration-300 cursor-pointer lg:hidden"
                aria-label="Toggle menu"
              >
                <div className="w-5 flex flex-col items-end gap-[5px]">
                  <motion.span
                    animate={menuOpen ? { rotate: 45, y: 7, width: 20 } : { rotate: 0, y: 0, width: 20 }}
                    className="block h-[2px] bg-white rounded-full origin-center"
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    animate={menuOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
                    className="block h-[2px] w-3.5 bg-white/60 rounded-full"
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    animate={menuOpen ? { rotate: -45, y: -7, width: 20 } : { rotate: 0, y: 0, width: 14 }}
                    className="block h-[2px] bg-white rounded-full origin-center"
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </button>

              {/* Desktop menu toggle (for fullscreen nav experience) */}
              <button
                onClick={() => { setMenuOpen(!menuOpen); setSearchOpen(false); }}
                className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-full text-white/60 text-xs font-medium hover:text-white hover:bg-white/[0.06] transition-all duration-300 cursor-pointer"
              >
                <div className="w-4 flex flex-col items-end gap-[4px]">
                  <motion.span
                    animate={menuOpen ? { rotate: 45, y: 6, width: 16 } : { rotate: 0, y: 0, width: 16 }}
                    className="block h-[1.5px] bg-current rounded-full origin-center"
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="block h-[1.5px] w-3 bg-current rounded-full"
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    animate={menuOpen ? { rotate: -45, y: -6, width: 16 } : { rotate: 0, y: 0, width: 10 }}
                    className="block h-[1.5px] bg-current rounded-full origin-center"
                    transition={{ duration: 0.3 }}
                  />
                </div>
                Menu
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Full-screen menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl"
          >
            {/* Decorative background */}
            <div className="absolute inset-0 chinese-pattern opacity-30" />
            <div className="absolute bottom-10 right-10 font-chinese text-[200px] text-white/[0.02] leading-none select-none pointer-events-none hidden md:block">
              龙城
            </div>

            {/* Menu content */}
            <div className="relative h-full flex flex-col pt-20 sm:pt-24 px-6 sm:px-10 md:px-16 lg:px-24 pb-8 overflow-y-auto">
              <div className="flex-1 flex flex-col lg:flex-row gap-12 lg:gap-24 max-w-[1400px] mx-auto w-full">
                {/* Nav links - large */}
                <div className="flex-1 flex flex-col justify-center">
                  <nav className="space-y-1 sm:space-y-2">
                    {navLinks.map((link, i) => (
                      <motion.div
                        key={link.label}
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, delay: 0.05 + i * 0.06 }}
                      >
                        <a
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className="group flex items-center gap-4 py-3 sm:py-4"
                        >
                          <span className="text-xs text-white/15 font-mono w-6 hidden sm:inline">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white/80 group-hover:text-white transition-colors duration-300">
                            {link.label}
                          </span>
                          <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-dragon opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                          <span className="flex-1 h-px bg-white/[0.04] group-hover:bg-dragon/20 transition-colors duration-500 hidden sm:block" />
                        </a>
                      </motion.div>
                    ))}
                  </nav>
                </div>

                {/* Right sidebar info */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="lg:w-72 flex flex-col justify-end gap-8 pb-4"
                >
                  {/* Location */}
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-dragon/60 mb-3">Location</p>
                    <p className="text-sm text-white/60 leading-relaxed">
                      Dragon City, Building 4-45<br />
                      Road 5617, Block 456<br />
                      Diyar Al Muharraq, Bahrain
                    </p>
                  </div>

                  {/* Hours */}
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-dragon/60 mb-3">Hours</p>
                    <p className="text-sm text-white/60">
                      Sat – Wed: 10 AM – 10 PM<br />
                      Thu – Fri: 10 AM – 12 AM
                    </p>
                  </div>

                  {/* Socials */}
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-dragon/60 mb-3">Follow</p>
                    <div className="flex flex-wrap gap-3">
                      {socials.map((s) => (
                        <a
                          key={s.name}
                          href={s.url}
                          className="text-xs text-white/40 hover:text-white transition-colors"
                        >
                          {s.name}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Chinese accent */}
                  <p className="font-chinese text-lg text-dragon/20">龙城巴林</p>
                </motion.div>
              </div>

              {/* Bottom bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-white/[0.04] max-w-[1400px] mx-auto w-full"
              >
                <p className="text-[10px] text-white/20">
                  &copy; 2026 Dragon City Bahrain
                </p>
                <a
                  href="#location"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-dragon text-white text-xs font-semibold hover:bg-dragon-light transition-all hover:shadow-lg hover:shadow-dragon/25"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Get Directions
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col"
            onClick={() => setSearchOpen(false)}
          >
            {/* Close button */}
            <div className="flex justify-end p-4 sm:p-6">
              <button
                onClick={() => setSearchOpen(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.06] transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search content */}
            <div
              className="flex-1 flex items-start justify-center pt-[10vh] sm:pt-[15vh] px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ delay: 0.1, type: 'spring', damping: 20 }}
                className="w-full max-w-2xl"
              >
                <p className="text-xs sm:text-sm text-dragon/50 mb-4 tracking-[0.3em] uppercase">
                  <span className="font-chinese mr-2">搜索</span>
                  Search Dragon City
                </p>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search stores, categories..."
                    autoFocus
                    className="w-full bg-transparent border-b-2 border-white/15 focus:border-dragon text-white text-2xl sm:text-3xl md:text-5xl font-display font-light py-3 sm:py-4 outline-none placeholder-white/10 transition-colors"
                  />
                  <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 text-white/15" />
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:gap-6 mt-6">
                  <p className="text-[10px] sm:text-xs text-white/20">Popular:</p>
                  <div className="flex flex-wrap gap-2">
                    {['Electronics', 'Fashion', 'Food Court', 'Furniture'].map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full bg-white/[0.04] text-[10px] sm:text-xs text-white/30 border border-white/[0.06] hover:border-dragon/30 hover:text-white/50 cursor-pointer transition-all"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-[10px] text-white/15 mt-4">Press ESC to close</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
