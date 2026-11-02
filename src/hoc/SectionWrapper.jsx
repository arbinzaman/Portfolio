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
        className={`${styles.padding} max-w-7xl mx-auto relative z-0 isolate before:pointer-events-none before:absolute before:inset-x-16 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent`}
        data-portfolio-chapter={idName || undefined}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 right-[8%] -z-10 h-64 w-64 rounded-full bg-[#915EFF]/[0.07] blur-[100px]"
        />
        <span className='hash-span' id={idName}>
          &nbsp;
        </span>

        <Component />
      </motion.section>
    );
  };

export default StarWrapper;
