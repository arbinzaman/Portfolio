import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { CHAPTERS } from "../scrollExperienceConfig";

/**
 * Custom hook that tracks:
 * - Normalized scroll progress (0..1) and damped scroll velocity
 * - Active portfolio section chapter (`[data-portfolio-chapter]`)
 * - Normalized pointer & mobile touch coordinates (-1..1)
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

    let updateFrame = 0;
    const updateScrollInterface = () => {
      if (updateFrame) return;

      updateFrame = window.requestAnimationFrame(() => {
        updateFrame = 0;
        const scrollableHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress =
          scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        scrollMotion.current.progress = progress;

        const marker = window.innerHeight * 0.42;
        const currentChapter = CHAPTERS.map(({ id }) =>
          document.querySelector(`[data-portfolio-chapter="${id}"]`),
        )
          .filter(Boolean)
          .reduce((current, element) => {
            return element.getBoundingClientRect().top <= marker
              ? element.dataset.portfolioChapter
              : current;
          }, CHAPTERS[0].id);

        if (activeChapterRef.current !== currentChapter) {
          document
            .querySelectorAll("[data-portfolio-chapter][data-chapter-active]")
            .forEach((element) => {
              delete element.dataset.chapterActive;
            });
          document
            .querySelector(`[data-portfolio-chapter="${currentChapter}"]`)
            ?.setAttribute("data-chapter-active", "true");
          activeChapterRef.current = currentChapter;
          setActiveChapter(currentChapter);
        }
      });
    };

    updateScrollInterface();
    let previousScrollY = window.scrollY;

    const handleScroll = () => {
      const deltaY = window.scrollY - previousScrollY;
      previousScrollY = window.scrollY;
      scrollMotion.current.velocity = THREE.MathUtils.clamp(
        scrollMotion.current.velocity + deltaY / 150,
        -1.2,
        1.2,
      );
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
    window.addEventListener("resize", updateScrollInterface);
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("touchmove", updateTouch, { passive: true });
    window.addEventListener("touchstart", updateTouch, { passive: true });
    window.addEventListener("blur", clearPointer);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateScrollInterface);
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

