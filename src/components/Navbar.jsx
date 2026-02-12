import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowUpRight, Map, X, ZoomIn, ZoomOut, Download, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { label: 'Home', href: '#home', zh: '首页', img: 'https://images.unsplash.com/photo-1533669955142-6a73332af4db?w=1600&q=90&fit=crop' },
  { label: 'About', href: '#about', zh: '关于', img: 'https://images.unsplash.com/photo-1513623935135-c896b59073c1?w=1600&q=90&fit=crop' },
  { label: 'Shops', href: '#shops', zh: '商店', img: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1600&q=90&fit=crop' },
  { label: 'Media', href: '#media', zh: '媒体', img: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=1600&q=90&fit=crop' },
  { label: 'Location', href: '#location', zh: '位置', img: 'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=1600&q=90&fit=crop' },
  { label: 'Contact', href: '#contact', zh: '联系', img: 'https://images.unsplash.com/photo-1599707367812-042e4c84a396?w=1600&q=90&fit=crop' },
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
  const { isDark, toggle: toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
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

  const handleLinkHover = useCallback((i) => {
    setHoveredLink(i);
    setActiveImage(i);
  }, []);

  return (
    <>
      {/* ─── The Red Thread Navbar ─── */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Scrolled: frosted bar with red accent bottom */}
        <motion.div
          animate={{
            backgroundColor: scrolled ? (isDark ? 'rgba(10,10,10,0.55)' : 'rgba(250,249,247,0.65)') : 'rgba(0,0,0,0)',
            backdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'blur(0px) saturate(1)',
            borderBottom: scrolled ? (isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.08)') : '1px solid rgba(255,255,255,0)',
          }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative"
        >
          <div className="px-6 md:px-12 lg:px-20">
            <div className={`max-w-350 mx-auto flex items-center justify-between transition-all duration-500 ${
              scrolled ? 'h-16' : 'h-20 md:h-24'
            }`}>
              {/* Left: Logo */}
              <motion.a
                href="#home"
                className="relative z-10 flex items-center"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <img
                  src="/images/header-logo.png"
                  alt="Dragon City"
                  className={`w-auto object-contain transition-all duration-500 ${
                    scrolled ? 'h-10 sm:h-11' : 'h-12 sm:h-14 md:h-16'
                  }`}
                />
              </motion.a>

              {/* Center: The Red Thread — animated connecting line */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex-1 mx-6 md:mx-10 lg:mx-16 relative hidden sm:block origin-left"
              >
                {/* The thread */}
                <div className="h-px w-full bg-linear-to-r from-dragon/40 via-dragon/15 to-dragon/40 relative">
                  {/* Animated pulse traveling along the thread */}
                  <div className="absolute top-0 left-0 h-px w-16 bg-linear-to-r from-transparent via-dragon/60 to-transparent animate-thread-pulse" />
                </div>

                {/* Center ornament on the thread */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className={`relative transition-all duration-500 ${scrolled ? 'scale-75' : 'scale-100'}`}>
                    <div className="w-5 h-5 rotate-45 border border-dragon/30 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-dragon/50 rotate-0" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right: Actions */}
              <motion.div
                className="flex items-center gap-2 sm:gap-3"
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {/* Mall Map CTA — desktop */}
                <button
                  onClick={() => setMapOpen(true)}
                  className={`hidden lg:flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-500 cursor-pointer ${
                    scrolled
                      ? 'bg-dragon text-white hover:bg-dragon-light hover:shadow-lg hover:shadow-dragon/20'
                      : 'bg-white/10 text-white hover:bg-white/15 border border-white/10'
                  }`}
                >
                  <Map className="w-3.5 h-3.5" />
                  Mall Map
                </button>

                {/* Theme toggle */}
                <button
                  onClick={toggleTheme}
                  className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                    scrolled
                      ? isDark ? 'bg-white/10 hover:bg-white/15 text-white/70 hover:text-white' : 'bg-black/5 hover:bg-black/10 text-black/50 hover:text-black'
                      : 'bg-white/10 hover:bg-white/15 text-white/70 hover:text-white'
                  }`}
                  aria-label="Toggle theme"
                >
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>

                {/* Language toggle */}
                <button
                  onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                  className="group flex items-center gap-1.5 cursor-pointer transition-all duration-300"
                  aria-label="Toggle language"
                >
                  <span className={`text-sm font-semibold tracking-wide transition-colors duration-300 ${
                    lang === 'en'
                      ? scrolled && !isDark ? 'text-black' : 'text-white'
                      : scrolled && !isDark ? 'text-black/30 hover:text-black/50' : 'text-white/30 hover:text-white/50'
                  }`}>
                    EN
                  </span>
                  <span className={`text-xs select-none ${scrolled && !isDark ? 'text-black/15' : 'text-white/15'}`}>/</span>
                  <span className={`text-sm font-semibold transition-colors duration-300 ${
                    lang === 'ar'
                      ? scrolled && !isDark ? 'text-black' : 'text-white'
                      : scrolled && !isDark ? 'text-black/30 hover:text-black/50' : 'text-white/30 hover:text-white/50'
                  }`}>
                    عربي
                  </span>
                </button>

                {/* Menu trigger */}
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className={`group flex items-center gap-3 pl-4 pr-5 py-3 rounded-full transition-all duration-300 cursor-pointer ${
                    scrolled && !isDark
                      ? 'text-black hover:text-black hover:bg-black/5'
                      : 'text-white hover:text-white hover:bg-white/8'
                  }`}
                  aria-label="Toggle menu"
                >
                  <div className="w-5.5 h-4.5 flex flex-col justify-center gap-1.5 relative">
                    <motion.span
                      animate={menuOpen
                        ? { rotate: 45, y: 4, width: 20 }
                        : { rotate: 0, y: 0, width: 20 }
                      }
                      className="block h-[1.5px] bg-current rounded-full origin-center"
                      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                    <motion.span
                      animate={menuOpen
                        ? { rotate: -45, y: -4, width: 20 }
                        : { rotate: 0, y: 0, width: 13 }
                      }
                      className="block h-[1.5px] bg-current rounded-full origin-center"
                      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                  </div>
                  <span className="text-sm font-medium tracking-wider hidden sm:inline uppercase">
                    {menuOpen ? 'Close' : 'Menu'}
                  </span>
                </button>
              </motion.div>
            </div>
          </div>

{/* Red accent bottom border removed */}
        </motion.div>
      </motion.nav>

      {/* ─── Cinematic Fullscreen Menu ─── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-40"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className={`absolute inset-0 backdrop-blur-3xl ${isDark ? 'bg-[#050505]/97' : 'bg-[#faf9f7]/97'}`}
            />

            {/* Grain texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', animation: 'grain 8s steps(10) infinite' }} />

            {/* Red thread accent — top */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
              className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-dragon/40 to-transparent origin-left"
            />

            {/* ─── Vertical Split Layout ─── */}
            <div className="relative h-full flex flex-col lg:flex-row pt-24 sm:pt-28 overflow-hidden">

              {/* LEFT PANEL: Navigation (60%) */}
              <div className="w-full lg:w-[60%] lg:shrink-0 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 pb-8 lg:pb-0 overflow-y-auto scrollbar-hide">
                <div className="max-w-175">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="text-[10px] tracking-[0.4em] uppercase text-dragon/50 mb-8 sm:mb-10"
                  >
                    Navigation — 导航
                  </motion.p>

                  <nav className="space-y-0">
                    {navLinks.map((link, i) => (
                      <motion.div
                        key={link.label}
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{
                          duration: 0.6,
                          delay: 0.15 + i * 0.07,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                        onMouseEnter={() => handleLinkHover(i)}
                        onMouseLeave={() => setHoveredLink(null)}
                        className="border-b border-white/4 first:border-t"
                      >
                        <a
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className="group flex items-center gap-4 sm:gap-6 py-4 sm:py-5 lg:py-6 relative overflow-hidden"
                        >
                          {/* Link label */}
                          <span className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[56px] font-display font-bold tracking-tight transition-all duration-700 ease-out ${
                            hoveredLink !== null && hoveredLink !== i
                              ? isDark ? 'text-white/10 translate-x-0' : 'text-black/10 translate-x-0'
                              : isDark ? 'text-white/90 group-hover:text-white group-hover:translate-x-3' : 'text-black/85 group-hover:text-black group-hover:translate-x-3'
                          }`}>
                            {link.label}
                          </span>

                          {/* Chinese character — floats in on hover */}
                          <span className={`font-chinese text-base sm:text-lg transition-all duration-700 ease-out absolute right-12 sm:right-16 top-1/2 -translate-y-1/2 ${
                            hoveredLink === i
                              ? 'text-dragon/40 opacity-100 translate-x-0'
                              : 'text-dragon/0 opacity-0 translate-x-4'
                          }`}>
                            {link.zh}
                          </span>

                          {/* Arrow */}
                          <span className={`ml-auto shrink-0 transition-all duration-500 ease-out ${
                            hoveredLink === i ? 'opacity-100 translate-x-0 rotate-0' : 'opacity-0 -translate-x-3 -rotate-45'
                          }`}>
                            <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-dragon" />
                          </span>

                          {/* Brush-stroke underline */}
                          <span className={`absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-dragon via-dragon/60 to-transparent origin-left transition-transform duration-700 ease-out ${
                            hoveredLink === i ? 'scale-x-100' : 'scale-x-0'
                          }`} />

                          {/* Soft red glow */}
                          <span className={`absolute left-8 top-1/2 -translate-y-1/2 w-32 h-16 rounded-full blur-3xl transition-opacity duration-700 pointer-events-none ${
                            hoveredLink === i ? 'bg-dragon/6 opacity-100' : 'opacity-0'
                          }`} />
                        </a>
                      </motion.div>
                    ))}
                  </nav>

                  {/* Bottom info — below nav */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 mt-4"
                  >
                    <div className="flex items-center gap-3">
                      <p className={`text-[10px] ${isDark ? 'text-white/15' : 'text-black/20'}`}>
                        &copy; 2026 Dragon City Bahrain
                      </p>
                      <span className="font-chinese text-xs text-dragon/15">龙城巴林</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {socials.map((s) => (
                        <a
                          key={s.name}
                          href={s.url}
                          className={`w-9 h-9 rounded-full flex items-center justify-center hover:bg-dragon/15 hover:border-dragon/30 transition-all duration-300 ${
                            isDark ? 'bg-white/8 border border-white/10 text-white/80 hover:text-white' : 'bg-black/5 border border-black/10 text-black/60 hover:text-black'
                          }`}
                          title={s.name}
                        >
                          {s.icon}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* RIGHT PANEL: Gallery + Info (40%) — desktop only */}
              <motion.div
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="hidden lg:flex lg:w-[40%] lg:shrink-0 relative flex-col overflow-hidden"
              >
                {/* Vertical divider thread */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-dragon/20 to-transparent" />

                {/* Gallery image — changes on hover */}
                <div className="flex-1 relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImage}
                      src={navLinks[activeImage].img}
                      alt={navLinks[activeImage].label}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  {/* Overlays */}
                  <div className={`absolute inset-0 bg-linear-to-l from-transparent via-transparent ${isDark ? 'to-[#050505]/80' : 'to-[#faf9f7]/80'}`} />
                  <div className={`absolute inset-0 bg-linear-to-t ${isDark ? 'from-[#050505] via-[#050505]/30' : 'from-[#faf9f7] via-[#faf9f7]/30'} to-transparent`} />
                  <div className={`absolute inset-0 bg-linear-to-b ${isDark ? 'from-[#050505]/60' : 'from-[#faf9f7]/60'} via-transparent to-transparent`} />

                  {/* Chinese pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none bg-cover bg-center"
                    style={{ backgroundImage: 'url(/images/chinese-pattern-bg.jpg)', mixBlendMode: 'screen' }}
                  />

                  {/* Image label */}
                  <motion.div
                    key={`label-${activeImage}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="absolute top-28 right-8"
                  >
                    <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-mono">
                      {String(activeImage + 1).padStart(2, '0')} / {String(navLinks.length).padStart(2, '0')}
                    </span>
                  </motion.div>

                  {/* Bottom info panel */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 space-y-6">
                    {/* Location */}
                    <div>
                      <p className="text-[10px] tracking-[0.4em] uppercase text-dragon/40 mb-2">Location</p>
                      <p className="text-sm text-white/50 leading-relaxed">
                        Diyar Al Muharraq<br />
                        Kingdom of Bahrain
                      </p>
                    </div>

                    {/* Hours */}
                    <div>
                      <p className="text-[10px] tracking-[0.4em] uppercase text-dragon/40 mb-2">Hours</p>
                      <p className="text-sm text-white/50">
                        Sat – Wed: 10 AM – 10 PM<br />
                        Thu – Fri: 10 AM – 12 AM
                      </p>
                    </div>

                    {/* CTAs */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => { setMenuOpen(false); setMapOpen(true); }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-dragon/90 hover:bg-dragon text-white text-xs font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-dragon/20 cursor-pointer"
                      >
                        <Map className="w-3.5 h-3.5" />
                        Mall Map
                      </button>
                      <a
                        href="#location"
                        onClick={() => setMenuOpen(false)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 hover:bg-white/10 text-white/70 hover:text-white text-xs font-semibold transition-all duration-300"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        Directions
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Large decorative text */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="absolute bottom-8 left-8 font-chinese text-[180px] xl:text-[240px] text-white/1.5 leading-none select-none pointer-events-none hidden lg:block"
            >
              龙城
            </motion.div>
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
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-60 flex items-center justify-center"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#050505]/95 backdrop-blur-2xl"
              onClick={() => setMapOpen(false)}
            />

            {/* Map container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative w-[95vw] max-w-350 h-[85vh] rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/8"
            >
              {/* Top bar */}
              <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4 bg-linear-to-b from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-dragon/15 flex items-center justify-center">
                    <Map className="w-4.5 h-4.5 text-dragon" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Mall Map</h3>
                    <p className="text-[10px] text-white/30">Dragon City Bahrain — Interactive Directory</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="/images/mall-map.jpg"
                    download
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white text-xs transition-all duration-300"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Download</span>
                  </a>
                  <button
                    onClick={() => setMapOpen(false)}
                    className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    <X className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>

              {/* Map content — placeholder */}
              <div className="h-full flex flex-col items-center justify-center p-8 pt-20">
                <div className="relative mb-8">
                  <div className="w-24 h-24 rounded-3xl bg-dragon/10 flex items-center justify-center">
                    <Map className="w-10 h-10 text-dragon/60" />
                  </div>
                  <div className="absolute -inset-4 rounded-4xl border border-dragon/10 animate-pulse" />
                </div>
                <p className="text-lg font-display font-semibold text-white/80 mb-2">Mall Map Coming Soon</p>
                <p className="text-sm text-white/30 text-center max-w-sm">
                  An interactive directory of Dragon City's 799+ stores will be available here.
                  Explore our categories in the meantime.
                </p>
                <a
                  href="#shops"
                  onClick={() => setMapOpen(false)}
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-dragon/90 hover:bg-dragon text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-dragon/20"
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
