# About Section Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the About Us section with a luxurious premium aesthetic featuring side-by-side layout, bold serif typography, and simplified elegant animations.

**Architecture:** Replace the current bento grid layout with a clean two-column design (text on left, image on right). Simplify animations to maintain premium feel. Restructure stat cards into a horizontal row at the bottom with icons.

**Tech Stack:** React, Framer Motion (minimal), Tailwind CSS, Lucide React icons

---

## File Structure

```
src/components/About.jsx          # Main component (rewrite)
src/components/About.module.css   # Optional: custom styles for serif fonts
src/index.css                     # May need serif font imports (Playfair Display, etc.)
```

---

## Chunk 1: Foundation & Layout

### Task 1: Update imports and add serif font

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Add serif font import at top of index.css**

Add this line to the top of `src/index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&display=swap');
```

- [ ] **Step 2: Commit font addition**

```bash
git add src/index.css
git commit -m "feat: add Playfair Display serif font for About section"
```

---

### Task 2: Rewrite About component structure

**Files:**
- Modify: `src/components/About.jsx`

- [ ] **Step 1: Replace component with new side-by-side layout structure**

```jsx
import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

function Counter({ value, suffix = '', inView }) {
  const [n, setN] = useState(0);
  const done = useRef(false);

  React.useEffect(() => {
    if (!inView || done.current) return;
    done.current = true;
    const t0 = performance.now();
    (function tick(now) {
      const p = Math.min((now - t0) / 1800, 1);
      setN(Math.round((1 - Math.pow(1 - p, 4)) * value));
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }, [inView, value]);

  return <>{n.toLocaleString()}{suffix}</>;
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-40px' });
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section id="about" ref={ref} className="relative bg-white overflow-hidden">
      {/* Main container */}
      <div className="px-6 md:px-12 lg:px-16 py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto">

          {/* Two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">

            {/* LEFT: Text content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex flex-col"
            >
              {/* Label */}
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-dragon mb-6">
                Welcome to Dragon City
              </p>

              {/* Serif Heading */}
              <h2 className="font-[Playfair Display] text-5xl md:text-6xl font-bold text-[#111] mb-6 leading-[1.1]">
                Its Time For Premium Shopping & <span className="text-dragon">Experiences</span>
              </h2>

              {/* Body text */}
              <p className="text-base md:text-lg text-black/60 mb-8 leading-relaxed max-w-lg">
                The Kingdom's largest wholesale & retail centre featuring 799+ stores, world-class dining, and Chinese-inspired architecture. Your ultimate destination for luxury shopping and unforgettable moments in the heart of Diyar Al Muharraq.
              </p>

              {/* CTA Button */}
              <div className="flex gap-4">
                <button className="px-8 py-4 bg-dragon text-white font-semibold rounded-lg hover:bg-dragon/90 transition-colors duration-300">
                  Explore Now
                </button>
                <button
                  onClick={() => setVideoOpen(true)}
                  className="px-8 py-4 border-2 border-dragon text-dragon font-semibold rounded-lg hover:bg-dragon/5 transition-colors duration-300 flex items-center gap-2"
                >
                  <Play className="w-4 h-4" fill="currentColor" />
                  Watch Video
                </button>
              </div>
            </motion.div>

            {/* RIGHT: Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative rounded-2xl overflow-hidden"
            >
              <div className="relative aspect-[4/5] md:aspect-square overflow-hidden">
                <img
                  src="/images/dragon-city-aerial.jpg"
                  alt="Dragon City Bahrain"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Badge */}
              <div className="absolute top-6 left-6 bg-dragon text-white px-4 py-2 rounded-full text-sm font-semibold">
                Since 2015
              </div>
            </motion.div>
          </div>

          {/* BOTTOM: Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { val: 799, suf: '+', lbl: 'Stores', sub: 'Retail & Wholesale' },
              { val: 55, suf: 'K', lbl: 'Sqm', sub: 'Total Area' },
              { val: 22600, suf: '+', lbl: 'Visitors', sub: 'Every Day' },
              { val: 2015, suf: '', lbl: 'Est.', sub: 'A Decade of Excellence' },
            ].map((s, i) => (
              <motion.div
                key={s.lbl}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                className="text-center md:text-left p-4 md:p-6 bg-[#f7f6f4] rounded-xl"
              >
                <p className="text-3xl md:text-4xl font-display font-bold text-dragon mb-2">
                  <Counter value={s.val} suffix={s.suf} inView={inView} />
                </p>
                <p className="text-sm font-semibold text-black/70 uppercase tracking-wide">{s.lbl}</p>
                <p className="text-xs text-black/40 mt-1">{s.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            onClick={() => setVideoOpen(false)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src="https://www.youtube.com/embed/4deGNOJtFqE?autoplay=1&rel=0"
                title="Dragon City Bahrain"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </motion.div>
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
```

- [ ] **Step 2: Verify component structure looks complete**

Review the new component to ensure:
- Two-column layout with text on left, image on right
- Serif typography using Playfair Display
- Two CTA buttons (Explore Now + Watch Video)
- Stats in a 2x2 grid (responsive to 4 columns on desktop)
- Video modal still functional
- Animations are subtle and elegant

- [ ] **Step 3: Commit the rewritten component**

```bash
git add src/components/About.jsx
git commit -m "feat: redesign About section with luxurious premium layout"
```

---

## Chunk 2: Testing & Refinement

### Task 3: Verify responsive design and animations

**Files:**
- Modify: `src/components/About.jsx` (if tweaks needed)

- [ ] **Step 1: Test component in browser**

- Open the app at `http://localhost:3000`
- Navigate to About section
- Verify layout on desktop (side-by-side)
- Verify layout on mobile (single column, stacked)
- Check that images load properly
- Click "Watch Video" button - modal should appear

- [ ] **Step 2: Check animations**

- Scroll to About section
- Verify animations are smooth and subtle
- Check that counter animations work
- Ensure no jank or performance issues

- [ ] **Step 3: Test buttons**

- Click "Explore Now" button (currently no action)
- Click "Watch Video" button - should open modal
- Close modal with X or background click

- [ ] **Step 4: If tweaks needed, update and commit**

If any visual issues:
```bash
git add src/components/About.jsx
git commit -m "refactor: fine-tune About section styling and animations"
```

---

### Task 4: Verify all other pages still work

**Files:**
- No modifications

- [ ] **Step 1: Test full page navigation**

- Verify Navbar works
- Check Hero section loads
- Verify Categories section
- Check Events section
- Verify LocationHours section
- Check Gallery section
- Verify Footer section
- Test ScrollToTop button

- [ ] **Step 2: Check for console errors**

- Open browser DevTools console
- Scroll through entire page
- Verify no React warnings or errors
- Check that all images load

- [ ] **Step 3: If any issues, investigate and fix**

Fix any issues found and commit

---

## Testing Checklist

- [ ] Desktop layout (1024px+): side-by-side with proper spacing
- [ ] Tablet layout (768px): proper column adjustments
- [ ] Mobile layout (375px): single column, stacked properly
- [ ] Serif font (Playfair Display) loads and displays correctly
- [ ] Counter animations trigger on scroll
- [ ] Video modal opens and closes smoothly
- [ ] CTA buttons have proper hover states
- [ ] Stats cards display with correct icons and numbers
- [ ] No console errors or warnings
- [ ] All images load without issues
- [ ] Animations are smooth (60fps)

---

## Commit Strategy

Each step ends with a commit. This keeps work atomic and easy to review.

Total expected commits: ~3-4
- Font import
- Component rewrite
- Testing/refinement if needed

---

## Success Criteria

✅ About section displays with:
- Side-by-side layout (text left, image right)
- Bold serif heading (Playfair Display)
- Two CTA buttons
- 4 stat cards in responsive grid
- Subtle, premium animations
- Functional video modal
- Responsive design on all breakpoints
- No console errors
