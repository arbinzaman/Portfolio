import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";

const FeedbackCard = ({ index, testimonial, name, designation, company }) => (
  <Tilt
    tiltMaxAngleX={8}
    tiltMaxAngleY={8}
    perspective={1150}
    scale={1.02}
    transitionSpeed={450}
    className="h-full w-full"
  >
    <motion.div
      variants={fadeIn("", "spring", index * 0.35, 0.75)}
      className="plate-3d group h-full w-full"
    >
      <div className="plate-3d-face flex h-full flex-col justify-between p-6 sm:p-7">
        <div>
          <div className="z-lift-lg flex items-center justify-between">
            <span className="extrude-3d text-[44px] font-black leading-none text-[#a78bfa]">
              “
            </span>
          </div>

          <p className="z-lift-sm mt-2 text-[15px] leading-7 text-white/85">
            {testimonial}
          </p>
        </div>

        <div className="z-lift-md mt-7 flex items-center justify-between gap-2 border-t border-white/[0.08] pt-4">
          <div className="flex flex-1 flex-col gap-1.5">
            <p className="text-[14px] font-semibold text-white">
              <span className="mr-1 font-mono text-[#a78bfa]">@</span>
              {name}
            </p>
            <span className="tag-3d w-fit !text-[10px]">
              {designation} of {company}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  </Tilt>
);

const Feedbacks = () => {
  return (
    <div className="mt-8">
      <Tilt
        tiltMaxAngleX={3}
        tiltMaxAngleY={3}
        perspective={1400}
        scale={1}
        transitionSpeed={500}
        className="plate-3d"
      >
        <div
          className={`plate-3d-face relative min-h-[240px] overflow-hidden ${styles.padding} before:absolute before:-right-12 before:-top-24 before:h-64 before:w-64 before:rounded-full before:bg-[#915EFF]/15 before:blur-[80px]`}
        >
          <motion.div variants={textVariant()} className="z-lift-md">
            <p className={styles.sectionSubText}>What others say</p>
            <h2 className={`${styles.sectionHeadText} extrude-3d`}>
              <span data-text="Testimonials." className="exploded-type-3d">
                Testimonials.
              </span>
            </h2>
          </motion.div>
        </div>
      </Tilt>
      <div
        className={`relative z-10 -mt-12 grid grid-cols-1 gap-6 pb-14 ${styles.paddingX} md:grid-cols-2 lg:grid-cols-3`}
      >
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "feedback");
