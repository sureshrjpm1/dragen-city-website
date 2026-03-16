import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    video: "https://fast.wistia.net/embed/medias/ek89bnx20o.jsonp",
    videoEmbed: "https://fast.wistia.net/embed/iframe/ek89bnx20o?endVideoBehavior=loop&playbar=false&qualityControl=false&muted=true&autoPlay=true&controlsVisibleOnLoad=false&playButton=false",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920&q=80",
    title: "Dragon City",
    subtitle: "Bahrain",
    desc: "The largest wholesale and retail trading centre in the Kingdom of Bahrain.",
    tag: "Bahrain's Premier Destination",
  },
  {
    image: "https://cdn.dubaihillsmall.ae/wp-content/uploads/2023/04/dhm-home-slide.jpg",
    title: "799+ Stores",
    subtitle: "To Explore",
    desc: "Electronics, fashion, furniture, and more — all under one roof.",
    tag: "Wholesale & Retail",
  },
  {
    image: "https://emaarmallsae.azureedge.net/wp-content/uploads/2026/01/DM27243-2-scaled.jpg",
    title: "Shop, Dine",
    subtitle: "& Explore",
    desc: "A world of shopping, dining, and entertainment awaits you.",
    tag: "Your Destination",
  },
];

const marqueeWords = [
  { en: 'Electronics', zh: '电子产品' },
  { en: 'Fashion', zh: '时尚' },
  { en: 'Furniture', zh: '家具' },
  { en: 'Food Court', zh: '美食广场' },
  { en: 'Wholesale', zh: '批发' },
  { en: 'Retail', zh: '零售' },
  { en: 'Toys', zh: '玩具' },
  { en: 'Sports', zh: '运动' },
  { en: 'Home Decor', zh: '家居装饰' },
  { en: 'Lighting', zh: '照明' },
];

const SLIDE_DURATION = 8000;
const SWIPE_THRESHOLD = 50;

export default function Hero({ loading }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
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
        if (deltaX < 0) nextSlide();
        else prevSlide();
      }
      dragStartX.current = null;
    },
    [nextSlide, prevSlide],
  );

  const handlePointerCancel = useCallback(() => {
    isDragging.current = false;
    dragStartX.current = null;
  }, []);

  useEffect(() => {
    if (!loading && slides[current].video && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setVideoPlaying(true);
      setIsPaused(false);
    }
  }, [loading]);

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
  const isVideoSlide = !!slide.video && !slide.videoEmbed;
  const isEmbedSlide = !!slide.videoEmbed;

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
      {/* Background media */}
      <AnimatePresence mode="sync" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          {slide.videoEmbed ? (
            <iframe
              src={slide.videoEmbed}
              allow="autoplay; fullscreen"
              className="absolute inset-0 w-full h-full border-0 pointer-events-none"
              style={{ transform: 'scale(1.5)', transformOrigin: 'center center' }}
            />
          ) : slide.video ? (
            <video
              ref={videoRef}
              src={slide.video}
              muted
              loop
              playsInline
              onLoadedMetadata={(e) => { e.target.currentTime = 0; }}
              className="w-full h-full object-cover"
            />
          ) : (
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Subtle bottom gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      {/* Bottom-left content area — soft radial blend */}
      <div
        className="absolute bottom-0 left-0 w-[70%] h-[55%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom left, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 25%, rgba(0,0,0,0.18) 45%, rgba(0,0,0,0.06) 65%, transparent 85%)' }}
      />

      {/* Main content — bottom left, above marquee */}
      <motion.div style={{ opacity }} className="absolute bottom-0 left-0 right-0 z-10 pb-20 md:pb-24">
        <div className="w-full px-6 md:px-12 lg:px-16">
          <div className="max-w-350 mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${current}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className=""
              >
                {/* Tag */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-px bg-white/40" />
                  <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-white/90 font-medium">
                    {slide.tag}
                  </span>
                </div>

                {/* Title */}
                <div className="mb-3">
                  <h1
                    className="font-display font-bold leading-[0.95] tracking-tight text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
                    style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
                  >
                    {slide.title}
                  </h1>
                  <h1
                    className="font-display font-bold leading-[0.95] tracking-tight text-white/60 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
                    style={{ textShadow: '0 2px 20px rgba(0,0,0,0.2)' }}
                  >
                    {slide.subtitle}
                  </h1>
                </div>

                {/* Description */}
                <p className="text-sm md:text-base text-white/75 max-w-md leading-relaxed mb-5">
                  {slide.desc}
                </p>

                {/* CTA */}
                <a
                  href="#about"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1a1a1a] text-sm font-semibold rounded-full transition-all duration-300 hover:bg-dragon hover:text-white hover:shadow-lg hover:shadow-dragon/25"
                >
                  Explore
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Video play/pause */}
      {isVideoSlide && (
        <div className="absolute bottom-20 md:bottom-24 left-6 md:left-12 lg:left-16 z-10" onPointerDown={(e) => e.stopPropagation()}>
          <button
            onClick={toggleVideo}
            className={`group w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
              videoPlaying
                ? "border-white/30 bg-white/15 hover:bg-white/25"
                : "border-white/20 bg-white/10 hover:bg-white/20"
            }`}
            title={videoPlaying ? "Pause video" : "Play video"}
          >
            {videoPlaying ? (
              <Pause className="w-3.5 h-3.5 text-white/80" />
            ) : (
              <Play className="w-3.5 h-3.5 text-white/80 ml-0.5" />
            )}
          </button>
        </div>
      )}

      {/* Bottom controls — arrows + dots */}
      <div className="absolute bottom-20 md:bottom-24 right-6 md:right-12 lg:right-16 z-10 flex items-center gap-3" onPointerDown={(e) => e.stopPropagation()}>
        <div className="hidden sm:flex items-center gap-1.5">
          <button
            onClick={prevSlide}
            className="group/arrow w-10 h-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white hover:border-white hover:text-[#1a1a1a] transition-all duration-300"
          >
            <ChevronLeft className="w-4 h-4 text-white/70 group-hover/arrow:text-[#1a1a1a] transition-colors" />
          </button>
          <button
            onClick={nextSlide}
            className="group/arrow w-10 h-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white hover:border-white hover:text-[#1a1a1a] transition-all duration-300"
          >
            <ChevronRight className="w-4 h-4 text-white/70 group-hover/arrow:text-[#1a1a1a] transition-colors" />
          </button>
        </div>

        <div className="hidden sm:block w-px h-5 bg-white/15" />

        {/* Slide dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goToSlide(i)} className="relative cursor-pointer">
              <div className={`h-1 rounded-full transition-all duration-500 ${
                i === current ? "w-8 sm:w-10 bg-white/40" : "w-3 sm:w-4 bg-white/15 hover:bg-white/25"
              }`} />
              {i === current && (
                <div
                  key={`progress-${current}`}
                  className="absolute top-0 left-0 h-1 rounded-full bg-white origin-left"
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

      {/* Marquee — pinned to bottom of hero */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-dragon/90 backdrop-blur-sm">
        <div className="flex whitespace-nowrap py-3" style={{ animation: 'marquee 35s linear infinite' }}>
          {[...marqueeWords, ...marqueeWords, ...marqueeWords].map((word, i) => (
            <span key={i} className="mx-6 text-[13px] font-medium text-white/90 tracking-wider uppercase flex items-center gap-2.5">
              {word.en}
              <span className="font-chinese text-white/40 text-xs normal-case">{word.zh}</span>
              <span className="w-1 h-1 rounded-full bg-white/30 ml-4" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
