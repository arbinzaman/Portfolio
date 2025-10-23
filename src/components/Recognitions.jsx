import React from "react";
import { motion } from "framer-motion";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";
import { recognitions } from "../constants";
import RecognitionCard from "./Recognitions/RecognitionsCard";
import { SectionWrapper } from "../hoc";

const Recognitions = () => {
  return (
    <section className="w-full px-4 sm:px-8 py-12">
      {/* Section Header */}
      <p className={styles.sectionSubText}>Milestones & Awards</p>
      <h2 className={styles.sectionHeadText}>Recognition</h2>

      {/* Cards Container */}
      <div className="mt-12 flex flex-col sm:flex-row sm:flex-wrap justify-center gap-6">
        {recognitions
          .slice()
          .reverse()
          .map((item, index) => (
            <RecognitionCard key={item.title} index={index} {...item} />
          ))}
      </div>
    </section>
  );
};

export default SectionWrapper(Recognitions, "recognition");
