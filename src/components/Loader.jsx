import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VIDEO_SRC = '/videos/hero-video.mp4';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  // Preload hero video
  useEffect(() => {
    const video = document.createElement('video');
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;

    const onReady = () => {
      video.oncanplaythrough = null;
      setVideoReady(true);
    };

    video.oncanplaythrough = onReady;
    video.onerror = onReady; // Don't block if video fails
    video.src = VIDEO_SRC;
    video.load();

    return () => {
      video.oncanplaythrough = null;
      video.onerror = null;
      video.src = '';
    };
  }, []);

  // Progress — simulates up to ~90%, holds until video is ready, then finishes
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Video loaded — race to 100
        if (videoReady && prev >= 80) {
          return Math.min(prev + 8, 100);
        }
        // Waiting for video — slow crawl
        if (prev >= 85 && !videoReady) {
          return Math.min(prev + 0.2, 96);
        }
        // Normal progress up to 85
        const increment = prev < 30 ? 6 : prev < 60 ? 3 : prev < 80 ? 4 : 2;
        return Math.min(prev + increment, 85);
      });
    }, 80);

    return () => clearInterval(interval);
  }, [videoReady]);

  // Completion — exit once progress hits 100
  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => onComplete?.(), 800);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#070707] overflow-hidden"
        >
          {/* Subtle radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(203,51,59,0.06)_0%,transparent_70%)]" />

          {/* Corner ornaments */}
          <div className="absolute top-6 left-6 w-16 h-16 pointer-events-none opacity-20">
            <div className="absolute top-0 left-0 w-8 h-px bg-dragon/80" />
            <div className="absolute top-0 left-0 w-px h-8 bg-dragon/80" />
          </div>
          <div className="absolute top-6 right-6 w-16 h-16 pointer-events-none opacity-20">
            <div className="absolute top-0 right-0 w-8 h-px bg-dragon/80" />
            <div className="absolute top-0 right-0 w-px h-8 bg-dragon/80" />
          </div>
          <div className="absolute bottom-6 left-6 w-16 h-16 pointer-events-none opacity-20">
            <div className="absolute bottom-0 left-0 w-8 h-px bg-dragon/80" />
            <div className="absolute bottom-0 left-0 w-px h-8 bg-dragon/80" />
          </div>
          <div className="absolute bottom-6 right-6 w-16 h-16 pointer-events-none opacity-20">
            <div className="absolute bottom-0 right-0 w-8 h-px bg-dragon/80" />
            <div className="absolute bottom-0 right-0 w-px h-8 bg-dragon/80" />
          </div>

          {/* Floating Chinese characters — background */}
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
            <span className="absolute top-[15%] left-[10%] font-chinese text-7xl text-white/[0.02] loader-float-1">龙</span>
            <span className="absolute top-[60%] right-[12%] font-chinese text-6xl text-white/[0.02] loader-float-2">城</span>
            <span className="absolute bottom-[20%] left-[20%] font-chinese text-5xl text-white/[0.02] loader-float-3">巴</span>
            <span className="absolute top-[35%] right-[25%] font-chinese text-8xl text-white/[0.015] loader-float-1">林</span>
          </div>

          {/* Center content */}
          <div className="relative flex flex-col items-center">
            {/* Logo with pulse */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative mb-10"
            >
              {/* Rotating ring behind logo */}
              <div className="absolute inset-0 -m-6 flex items-center justify-center">
                <div className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full border border-dragon/10 loader-spin-slow" />
              </div>
              <div className="absolute inset-0 -m-10 flex items-center justify-center">
                <div className="w-[220px] h-[220px] md:w-[260px] md:h-[260px] rounded-full border border-white/[0.03] loader-spin-reverse" />
              </div>

              {/* Dragon ornament dots on ring */}
              <div className="absolute inset-0 -m-6 flex items-center justify-center">
                <div className="relative w-[180px] h-[180px] md:w-[220px] md:h-[220px] loader-spin-slow">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-dragon/40" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gold/30" />
                  <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-dragon/30" />
                  <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gold/40" />
                </div>
              </div>

              <img
                src="/images/logo_v2_dark.png"
                alt="Dragon City"
                className="h-28 md:h-36 w-auto object-contain relative z-10 loader-logo-glow"
              />
            </motion.div>

            {/* Loading text below logo */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-[10px] tracking-[0.4em] uppercase text-white/15"
            >
              Dragon City Bahrain
            </motion.p>
          </div>

          {/* Bottom section — progress bar + percentage */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute bottom-0 left-0 right-0 flex flex-col items-center"
          >
            {/* Big percentage text */}
            <div className="relative mb-5 select-none">
              <span className="text-7xl md:text-8xl lg:text-[120px] font-display font-bold text-white/[0.07] tabular-nums tracking-tight leading-none">
                {Math.round(progress)}
              </span>
              <span className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white/[0.05] ml-1">%</span>
            </div>

            {/* Chinese flanks + progress bar row */}
            <div className="w-full flex items-center">
              <span className="font-chinese text-[10px] text-dragon/20 pl-6 hidden sm:block">龙城</span>
              <div className="flex-1 mx-0 sm:mx-4">
                {/* Progress bar */}
                <div className="w-full h-px bg-white/[0.05]">
                  <div
                    className="h-full bg-linear-to-r from-dragon via-dragon to-gold transition-all duration-150 ease-out relative"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-4 rounded-full bg-dragon/25 blur-lg" />
                  </div>
                </div>
              </div>
              <span className="font-chinese text-[10px] text-gold/15 pr-6 hidden sm:block">巴林</span>
            </div>

            {/* Subtle bottom padding */}
            <div className="h-5" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
