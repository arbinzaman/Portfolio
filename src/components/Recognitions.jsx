// Recognitions.jsx
import React from "react";
import { motion } from "framer-motion";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";
import { recognitions } from "../constants";
import RecognitionCard from "./Recognitions/RecognitionsCard";
import { SectionWrapper } from "../hoc";

const Recognitions = () => {
  return (
    <section className="w-full">
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Milestones & Awards</p>
        <h2 className={styles.sectionHeadText}>Recognition</h2>
      </motion.div>

      <div className="mt-12 flex flex-wrap gap-6 justify-between">
        {recognitions.map((item, index) => (
          <RecognitionCard key={item.title} index={index} {...item} />
        ))}
      </div>
    </section>
  );
};

export default SectionWrapper(Recognitions, "recognition");
