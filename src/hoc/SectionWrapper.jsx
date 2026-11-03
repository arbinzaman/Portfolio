import { motion } from "framer-motion";

import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";

const StarWrapper = (Component, idName) =>
  function HOC() {
    return (
      <motion.section
        variants={staggerContainer()}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.25 }}
        className={`portfolio-section ${styles.padding} max-w-7xl mx-auto relative z-0 isolate before:pointer-events-none before:absolute before:inset-x-6 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent sm:before:inset-x-16`}
        data-portfolio-chapter={idName || undefined}
        data-chapter-active={idName === "intro" ? "true" : undefined}
      >
        <div aria-hidden="true" className="portfolio-section-glow" />
        <span className='hash-span' id={idName}>
          &nbsp;
        </span>

        <Component />
      </motion.section>
    );
  };

export default StarWrapper;
