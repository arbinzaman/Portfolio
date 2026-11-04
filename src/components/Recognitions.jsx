import React from "react";
import { styles } from "../styles";
import { recognitions } from "../constants";
import RecognitionCard from "./Recognitions/RecognitionsCard";
import { SectionWrapper } from "../hoc";

const Recognitions = () => {
  const orderedRecognitions = recognitions.slice().reverse();

  return (
    <div className="w-full py-4">
      {/* Section Header */}
      <div className="border-b border-white/[0.08] pb-6">
        <p className={styles.sectionSubText}>Milestones &amp; Awards</p>
        <h2 className={`${styles.sectionHeadText} extrude-3d`}>
          Recognition.
        </h2>
      </div>

      {/* Cards Container */}
      <div className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2 sm:mt-12 sm:gap-9">
        {orderedRecognitions.map((item, index) => {
          const isLastOdd =
            orderedRecognitions.length % 2 !== 0 &&
            index === orderedRecognitions.length - 1;

          return (
            <RecognitionCard
              key={item.title}
              index={index}
              isLastOdd={isLastOdd}
              {...item}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SectionWrapper(Recognitions, "recognition");
