import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";

const StarWrapper = (Component, idName) =>
  function HOC() {
    const isTechSection = idName === "stack";
    const [isMobileView, setIsMobileView] = useState(() => {
      if (typeof window === "undefined") return false;
      return (
        window.matchMedia("(max-width: 768px)").matches ||
        /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
      );
    });

    useEffect(() => {
      const mediaQuery = window.matchMedia("(max-width: 768px)");
      const handleMediaChange = (e) => {
        setIsMobileView(
          e.matches || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent),
        );
      };
      mediaQuery.addEventListener("change", handleMediaChange);
      return () => mediaQuery.removeEventListener("change", handleMediaChange);
    }, []);

    return (
      <motion.section
        variants={staggerContainer()}
        initial={isMobileView ? "show" : "hidden"}
        animate={isMobileView ? "show" : undefined}
        whileInView={isMobileView ? undefined : "show"}
        viewport={{ once: true, amount: 0.02 }}
        className={`portfolio-section ${styles.padding} max-w-7xl mx-auto relative z-0 isolate`}
        data-portfolio-chapter={idName || undefined}
        data-chapter-active={idName === "intro" ? "true" : undefined}
      >
        <div aria-hidden="true" className="portfolio-section-glow" />
        {!isTechSection && (
          <div aria-hidden="true" className="perspective-floor h-28 opacity-45">
            <div className="perspective-floor__plane" />
          </div>
        )}
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>

        <Component />
      </motion.section>
    );
  };

export default StarWrapper;
