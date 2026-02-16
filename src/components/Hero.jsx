import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from '../context/ThemeContext';

const slides = [
  {
    video: "/videos/hero-video.mp4",
    image: "https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?w=1920&q=80",
    title: "Dragon City",
    subtitle: "Bahrain",
    desc: "The largest wholesale and retail trading centre in the Kingdom of Bahrain, located in Diyar Al Muharraq.",
    zh: "龙城巴林",
    tag: "Bahrain's Premier Destination",
  },
  {
    image: "/images/hero-img4.png",
    title: "10th Year",
    subtitle: "Anniversary",
    desc: "Celebrating a decade of excellence as Bahrain's premier wholesale and retail destination at Dragon City.",
    zh: "十周年",
    tag: "10th Anniversary",
  },
  {
    image: "/images/hero-img2.jpg",
    title: "799+ Stores",
    subtitle: "To Explore",
    desc: "Discover an unparalleled selection of electronics, fashion, furniture, and authentic Chinese products.",
    zh: "购物天堂",
    tag: "Wholesale & Retail",
  },
  {
    image: "/images/hero-img3.jpg",
    title: "Cultural",
    subtitle: "Heritage",
    desc: "Experience the beauty of Chinese-inspired architecture and cultural celebrations throughout the year.",
    zh: "中华传承",
    tag: "Art & Architecture",
  },
];

const SLIDE_DURATION = 8000;
const SWIPE_THRESHOLD = 50;

export default function Hero({ loading }) {
  const { isDark } = useTheme();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const dragStartX = useRef(null);
  const isDragging = useRef(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = useCallback(
    (index) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current],
  );

  // Swipe / drag handlers
  const handlePointerDown = useCallback((e) => {
    dragStartX.current = e.clientX;
    isDragging.current = true;
  }, []);

  const handlePointerUp = useCallback(
    (e) => {
      if (!isDragging.current || dragStartX.current === null) return;
      isDragging.current = false;
      const deltaX = e.clientX - dragStartX.current;
      if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
        if (deltaX < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      dragStartX.current = null;
    },
    [nextSlide, prevSlide],
  );

  const handlePointerCancel = useCallback(() => {
    isDragging.current = false;
    dragStartX.current = null;
  }, []);

  // Start video playback after loader finishes
  useEffect(() => {
    if (!loading && slides[current].video && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setVideoPlaying(true);
      setIsPaused(false);
    }
  }, [loading]);

  // Reset video state when returning to video slide
  useEffect(() => {
    if (loading) return;
    if (slides[current].video) {
      setVideoPlaying(true);
      setIsPaused(false);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    }
  }, [current, loading]);

  useEffect(() => {
    if (loading || isPaused || isHovered) return;
    const timer = setInterval(nextSlide, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [loading, isPaused, isHovered, nextSlide, current]);

  const toggleVideo = useCallback(() => {
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.pause();
        setIsPaused(true);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPaused(false);
      }
    }
    setVideoPlaying((prev) => !prev);
  }, [videoPlaying]);

  const slide = slides[current];
  const isVideoSlide = !!slide.video;

  return (
    <section
      ref={containerRef}
      className="group/hero relative h-screen overflow-hidden cursor-grab active:cursor-grabbing select-none"
      id="home"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={(e) => { handlePointerCancel(e); setIsHovered(false); }}
      onPointerCancel={handlePointerCancel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background media with crossfade */}
      <AnimatePresence mode="sync" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          initial={{ opacity: 0, x: direction * 60, scale: 1.05 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: direction * -60 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          {slide.video ? (
            <video
              ref={videoRef}
              src={slide.video}
              muted
              loop
              playsInline
              onLoadedMetadata={(e) => {
                e.target.currentTime = 0;
              }}
              className="w-full h-full object-cover"
            />
          ) : (
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/25 to-black/5" />
      {/* Top vignette — blends navbar area into the image */}
      <div
        className="absolute inset-x-0 top-0 h-105 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.55) 15%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.05) 75%, transparent 100%)',
        }}
      />

      {/* Chinese ornament */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 0.15, scale: 1, rotate: 0 }}
        transition={{ duration: 2, delay: 1 }}
        className="absolute top-12 -left-6 md:-left-4 lg:left-0 w-40 md:w-56 h-40 md:h-56 pointer-events-none"
      >
        <motion.img
          src="/images/ornaments/pale-ornament.webp"
          alt=""
          className="w-full h-full object-contain"
          animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Vertical branding — Chinese + 龍 diamond */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute right-6 md:right-16 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-5 pointer-events-none"
      >
        {/* Vertical Chinese text */}
        <div
          className="font-chinese text-4xl lg:text-5xl text-white/20 leading-tight"
          style={{ writingMode: "vertical-rl" }}
        >
          龙城巴林
        </div>

        {/* Red diamond with 龍 character */}
        <div className="relative w-12 h-12 lg:w-14 lg:h-14">
          <div className="absolute inset-0 bg-linear-to-br from-dragon to-dragon-dark rotate-45 rounded-sm shadow-lg shadow-dragon/20" />
          <span className="absolute inset-0 flex items-center justify-center font-chinese text-gold text-xl lg:text-2xl font-bold">
            龍
          </span>
        </div>
      </motion.div>

      {/* Slide counter - top right */}
      <motion.div style={{ opacity }} className="absolute top-32 right-6 md:right-16 z-10 hidden md:flex flex-col items-end gap-1">
        <span className="text-6xl font-display font-bold text-white/10">{String(current + 1).padStart(2, "0")}</span>
        <span className="text-xs text-white/30 tracking-widest">/ {String(slides.length).padStart(2, "0")}</span>
      </motion.div>

      {/* Full-screen black scrim behind content */}
      <div className="absolute inset-0 bg-black/15 z-5" />

      {/* Main content - positioned at bottom */}
      <motion.div style={{ opacity }} className="absolute bottom-0 left-0 right-0 z-10 pb-10 md:pb-14">
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-350 mx-auto relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`content-${current}`}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                className={isVideoSlide ? 'text-center flex flex-col items-center' : ''}
              >
                {/* Tag */}
                <div className={`flex items-center gap-4 mb-4 md:mb-6 ${isVideoSlide ? 'justify-center' : ''}`}>
                  <div className="w-8 md:w-12 h-px bg-linear-to-r from-dragon to-gold" />
                  <span
                    className="text-xs md:text-sm tracking-[0.3em] uppercase text-dragon font-semibold"
                    style={{ textShadow: '0 0 12px rgba(203,51,59,0.5), 0 1px 4px rgba(0,0,0,0.6)' }}
                  >
                    {slide.tag}
                  </span>
                  <span className="font-chinese text-dragon/50 text-sm md:text-base hidden sm:inline" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>{slide.zh}</span>
                </div>

                {/* Title */}
                <div className="mb-3 md:mb-4">
                  <h1
                    className={`font-brush font-bold leading-[0.9] tracking-tight text-white ${isVideoSlide ? 'text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[90px]' : 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl'}`}
                    style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5), 0 4px 40px rgba(0,0,0,0.3)' }}
                  >{slide.title}</h1>
                  <h1
                    className={`font-brush font-bold leading-[0.9] tracking-tight ${isVideoSlide ? 'text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[90px]' : 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl'}`}
                    style={{
                      color: "transparent",
                      WebkitTextStroke: "1.5px rgba(255,255,255,0.5)",
                      filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4))",
                    }}
                  >
                    {slide.subtitle}
                  </h1>
                </div>

                {/* Description */}
                <p
                  className={`text-xs sm:text-sm md:text-base text-white/80 max-w-lg leading-relaxed mb-4 md:mb-5 ${isVideoSlide ? 'mx-auto' : ''}`}
                  style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5), 0 2px 16px rgba(0,0,0,0.3)' }}
                >
                  {slide.desc}
                </p>

                {/* CTA */}
                {!isVideoSlide && (
                  <a
                    href="#about"
                    className="group inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-7 py-3 sm:py-3.5 bg-dragon hover:bg-dragon-light text-white text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-dragon/30"
                  >
                    Explore
                    <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-y-0.5 transition-transform" />
                  </a>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Video play/pause — bottom-left */}
      {isVideoSlide && (
        <div className="absolute bottom-10 md:bottom-14 left-6 md:left-12 lg:left-20 z-10" onPointerDown={(e) => e.stopPropagation()}>
          <button
            onClick={toggleVideo}
            className={`group w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
              videoPlaying ? "border-dragon/50 bg-dragon/10 hover:bg-dragon/20" : "border-white/30 bg-white/5 hover:border-dragon/50 hover:bg-dragon/10"
            }`}
            title={videoPlaying ? "Pause video" : "Play video"}
          >
            {videoPlaying ? (
              <Pause className="w-3.5 h-3.5 text-dragon transition-colors" />
            ) : (
              <Play className="w-3.5 h-3.5 text-white/70 group-hover:text-dragon ml-0.5 transition-colors" />
            )}
          </button>
        </div>
      )}

      {/* Bottom controls — arrows + dots — bottom-right */}
      <div className="absolute bottom-10 md:bottom-14 right-6 md:right-12 lg:right-20 z-10 flex items-center gap-3" onPointerDown={(e) => e.stopPropagation()}>
        {/* Arrow buttons */}
        <div className="hidden sm:flex items-center gap-1.5">
          <button
            onClick={prevSlide}
            className="group/arrow w-10 h-10 rounded-full border border-white/15 bg-white/5 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-dragon hover:border-dragon transition-all duration-300 hover:shadow-lg hover:shadow-dragon/25"
          >
            <ChevronLeft className="w-4 h-4 text-white/60 group-hover/arrow:text-white transition-colors" />
          </button>
          <button
            onClick={nextSlide}
            className="group/arrow w-10 h-10 rounded-full border border-white/15 bg-white/5 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-dragon hover:border-dragon transition-all duration-300 hover:shadow-lg hover:shadow-dragon/25"
          >
            <ChevronRight className="w-4 h-4 text-white/60 group-hover/arrow:text-white transition-colors" />
          </button>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-6 bg-white/10" />

        {/* Slide dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goToSlide(i)} className="relative cursor-pointer group/dot">
              <div className={`h-1 rounded-full transition-all duration-500 ${i === current ? "w-8 sm:w-12 bg-white/30" : "w-4 sm:w-6 bg-white/10 hover:bg-white/20"}`} />
              {i === current && (
                <div
                  key={`progress-${current}`}
                  className="absolute top-0 left-0 h-1 rounded-full bg-dragon origin-left"
                  style={{
                    animationName: (isPaused || isHovered) ? "none" : "slide-progress",
                    animationDuration: `${SLIDE_DURATION}ms`,
                    animationTimingFunction: "linear",
                    animationFillMode: "forwards",
                    animationPlayState: isHovered ? "paused" : "running",
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

    </section>
  );
}
