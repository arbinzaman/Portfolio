import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { CHAPTERS } from "../scrollExperienceConfig";

/**
 * Custom hook that tracks:
 * - Normalized scroll progress (0..1) and damped scroll velocity
 * - Active portfolio section chapter (`[data-portfolio-chapter]`) using cached offsets
 *   so fast mobile scrolling never triggers synchronous DOM reflows
 * - Normalized pointer coordinates (-1..1)
 * - `prefers-reduced-motion` accessibility preference
 */
export const useScrollAndPointerTracker = () => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeChapter, setActiveChapter] = useState(CHAPTERS[0].id);
  const pointer = useRef({ x: 0, y: 0 });
  const scrollMotion = useRef({ velocity: 0, progress: 0 });
  const activeChapterRef = useRef(CHAPTERS[0].id);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    let cachedSections = [];
    let maxScrollHeight = 1;
    let chapterCommitTimeout = 0;

    // Measure section offsets only on load/resize, never inside the scroll loop
    const measureSectionOffsets = () => {
      const scrollY = window.scrollY;
      maxScrollHeight = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      cachedSections = CHAPTERS.map(({ id }) => {
        const element = document.querySelector(
          `[data-portfolio-chapter="${id}"]`,
        );
        if (!element) return null;
        return {
          id,
          element,
          top: element.getBoundingClientRect().top + scrollY,
        };
      }).filter(Boolean);
    };

    measureSectionOffsets();
    // Re-measure once after lazy images/components settle
    const initialRemeasureTimer = window.setTimeout(measureSectionOffsets, 1200);

    let updateFrame = 0;
    const updateScrollInterface = () => {
      if (updateFrame) return;

      updateFrame = window.requestAnimationFrame(() => {
        updateFrame = 0;
        const scrollY = window.scrollY;
        const progress = THREE.MathUtils.clamp(scrollY / maxScrollHeight, 0, 1);
        scrollMotion.current.progress = progress;

        const marker = scrollY + window.innerHeight * 0.42;
        let currentChapter = CHAPTERS[0].id;
        for (let i = 0; i < cachedSections.length; i += 1) {
          if (cachedSections[i].top <= marker) {
            currentChapter = cachedSections[i].id;
          } else {
            break;
          }
        }

        if (activeChapterRef.current !== currentChapter) {
          activeChapterRef.current = currentChapter;
          if (chapterCommitTimeout) {
            window.clearTimeout(chapterCommitTimeout);
          }
          // Debounce React state commit slightly so fast mobile flick-scrolls don't thrash WebGL
          chapterCommitTimeout = window.setTimeout(() => {
            cachedSections.forEach(({ id, element }) => {
              if (id === activeChapterRef.current) {
                element.setAttribute("data-chapter-active", "true");
              } else {
                delete element.dataset.chapterActive;
              }
            });
            setActiveChapter(activeChapterRef.current);
          }, 90);
        }
      });
    };

    updateScrollInterface();
    let previousScrollY = window.scrollY;

    const handleScroll = () => {
      const deltaY = window.scrollY - previousScrollY;
      previousScrollY = window.scrollY;
      scrollMotion.current.velocity = THREE.MathUtils.clamp(
        scrollMotion.current.velocity + deltaY / 180,
        -1.0,
        1.0,
      );
      updateScrollInterface();
    };

    const handleResize = () => {
      measureSectionOffsets();
      updateScrollInterface();
    };

    const updatePointer = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = 1 - (event.clientY / window.innerHeight) * 2;
    };

    const updateTouch = (event) => {
      const touch = event.touches?.[0];
      if (!touch) return;
      pointer.current.x = (touch.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = 1 - (touch.clientY / window.innerHeight) * 2;
    };

    const clearPointer = () => {
      pointer.current.x = 0;
      pointer.current.y = 0;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("touchmove", updateTouch, { passive: true });
    window.addEventListener("touchstart", updateTouch, { passive: true });
    window.addEventListener("blur", clearPointer);

    return () => {
      window.clearTimeout(initialRemeasureTimer);
      if (chapterCommitTimeout) window.clearTimeout(chapterCommitTimeout);
      mediaQuery.removeEventListener("change", updateMotionPreference);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("touchmove", updateTouch);
      window.removeEventListener("touchstart", updateTouch);
      window.removeEventListener("blur", clearPointer);
      if (updateFrame) window.cancelAnimationFrame(updateFrame);
    };
  }, []);

  return {
    reducedMotion,
    activeChapter,
    pointer,
    scrollMotion,
  };
};
