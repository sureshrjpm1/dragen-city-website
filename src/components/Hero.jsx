import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Play, Pause } from 'lucide-react';
import bgVideo from '../assets/bg_video.mp4';

const slides = [
  {
    video: bgVideo,
    image: 'https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?w=1920&q=80',
    title: 'Dragon City',
    subtitle: 'Bahrain',
    desc: 'The largest wholesale and retail trading centre in the Kingdom of Bahrain, located in Diyar Al Muharraq.',
    zh: '龙城巴林',
    tag: "Bahrain's Premier Destination",
  },
  {
    image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=1920&q=80',
    title: '799+ Stores',
    subtitle: 'To Explore',
    desc: 'Discover an unparalleled selection of electronics, fashion, furniture, and authentic Chinese products.',
    zh: '购物天堂',
    tag: 'Wholesale & Retail',
  },
  {
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1920&q=80',
    title: 'Cultural',
    subtitle: 'Heritage',
    desc: 'Experience the beauty of Chinese-inspired architecture and cultural celebrations throughout the year.',
    zh: '中华传承',
    tag: 'Art & Architecture',
  },
  {
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=1920&q=80',
    title: 'Year-Round',
    subtitle: 'Events',
    desc: 'Join us for exciting cultural events, seasonal promotions, and festive celebrations at Dragon City.',
    zh: '精彩活动',
    tag: 'Events & Festivals',
  },
];

const SLIDE_DURATION = 6000;
const SWIPE_THRESHOLD = 50;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isPaused, setIsPaused] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const dragStartX = useRef(null);
  const isDragging = useRef(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = useCallback((index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  // Swipe / drag handlers
  const handlePointerDown = useCallback((e) => {
    dragStartX.current = e.clientX;
    isDragging.current = true;
  }, []);

  const handlePointerUp = useCallback((e) => {
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
  }, [nextSlide, prevSlide]);

  const handlePointerCancel = useCallback(() => {
    isDragging.current = false;
    dragStartX.current = null;
  }, []);

  // Reset video state when returning to video slide
  useEffect(() => {
    if (slides[current].video) {
      setVideoPlaying(true);
      setIsPaused(false);
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [current]);

  useEffect(() => {
    if (isPaused) return;
    const duration = slides[current].video ? 180000 : SLIDE_DURATION; // 3 min for video, 6s for images
    const timer = setInterval(nextSlide, duration);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide, current]);

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
      className="relative h-screen overflow-hidden cursor-grab active:cursor-grabbing select-none"
      id="home"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerCancel}
      onPointerCancel={handlePointerCancel}
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
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-[120%] object-cover"
            />
          ) : (
            <motion.img
              style={{ y }}
              src={slide.image}
              alt={slide.title}
              className="w-full h-[120%] object-cover"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

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
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Vertical Chinese text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute right-6 md:right-16 top-1/2 -translate-y-1/2 font-chinese text-5xl md:text-7xl text-white/25 hidden md:block"
        style={{ writingMode: 'vertical-rl' }}
      >
        龙城巴林
      </motion.div>

      {/* Slide counter - top right */}
      <motion.div
        style={{ opacity }}
        className="absolute top-32 right-6 md:right-16 z-10 hidden md:flex flex-col items-end gap-1"
      >
        <span className="text-6xl font-display font-bold text-white/10">
          {String(current + 1).padStart(2, '0')}
        </span>
        <span className="text-xs text-white/30 tracking-widest">
          / {String(slides.length).padStart(2, '0')}
        </span>
      </motion.div>

      {/* Main content - bottom area */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-0 left-0 right-0 z-10"
      >
        <div className="px-6 md:px-12 lg:px-20 pb-12 md:pb-16">
          <div className="max-w-[1400px] mx-auto">
            {/* Tag */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`tag-${current}`}
                initial={{ opacity: 0, x: direction * 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -20 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4 mb-4 md:mb-6"
              >
                <div className="w-8 md:w-12 h-px bg-gradient-to-r from-dragon to-gold" />
                <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-dragon font-medium">
                  {slide.tag}
                </span>
                <span className="font-chinese text-dragon/40 text-xs md:text-sm hidden sm:inline">{slide.zh}</span>
              </motion.div>
            </AnimatePresence>

            {/* Title */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`title-${current}`}
                initial={{ opacity: 0, x: direction * 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -50 }}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                className="mb-4 md:mb-6"
              >
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[120px] font-display font-bold leading-[0.9] tracking-tight text-white">
                  {slide.title}
                </h1>
                <h1
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[120px] font-display font-bold leading-[0.9] tracking-tight"
                  style={{
                    color: 'transparent',
                    WebkitTextStroke: '1.5px rgba(255,255,255,0.25)',
                  }}
                >
                  {slide.subtitle}
                </h1>
              </motion.div>
            </AnimatePresence>

            {/* Bottom row: description + CTA + slide navigation */}
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 md:gap-8">
              {/* Description */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.p
                  key={`desc-${current}`}
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xs sm:text-sm md:text-base text-white/50 max-w-lg leading-relaxed"
                >
                  {slide.desc}
                </motion.p>
              </AnimatePresence>

              {/* CTA + Play/Pause + Nav */}
              <div className="flex items-center gap-3 sm:gap-6 flex-wrap" onPointerDown={(e) => e.stopPropagation()}>
                <a
                  href="#about"
                  className="group flex items-center gap-2 sm:gap-3 px-5 sm:px-7 py-3 sm:py-3.5 bg-dragon hover:bg-dragon-light text-white text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-dragon/30"
                >
                  Explore
                  <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-y-0.5 transition-transform" />
                </a>

                {/* Play / Pause button - only visible on video slides */}
                {isVideoSlide && (
                  <button
                    onClick={toggleVideo}
                    className={`group w-10 h-10 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                      videoPlaying
                        ? 'border-dragon/50 bg-dragon/10 hover:bg-dragon/20'
                        : 'border-white/30 bg-white/5 hover:border-dragon/50 hover:bg-dragon/10'
                    }`}
                    title={videoPlaying ? 'Pause video' : 'Play video'}
                  >
                    {videoPlaying ? (
                      <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-dragon transition-colors" />
                    ) : (
                      <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/70 group-hover:text-dragon ml-0.5 transition-colors" />
                    )}
                  </button>
                )}

                {/* Slide dots */}
                <div className="flex items-center gap-2 ml-1 sm:ml-4">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToSlide(i)}
                      className="relative cursor-pointer group/dot"
                    >
                      <div
                        className={`h-1 rounded-full transition-all duration-500 ${
                          i === current
                            ? 'w-8 sm:w-12 bg-white/30'
                            : 'w-4 sm:w-6 bg-white/10 hover:bg-white/20'
                        }`}
                      />
                      {i === current && (
                        <div
                          key={`progress-${current}`}
                          className="absolute top-0 left-0 h-1 rounded-full bg-dragon origin-left"
                          style={{
                            animation: isPaused ? 'none' : `slide-progress ${slides[current].video ? 180000 : SLIDE_DURATION}ms linear`,
                            animationFillMode: 'forwards',
                          }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator - hidden on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-dragon/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
