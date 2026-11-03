import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
}) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className='portfolio-panel portfolio-panel-hover group w-full rounded-2xl p-7 sm:p-8 xs:w-[320px]'
  >
    <p className='text-[44px] font-semibold leading-none text-[#a78bfa]'>“</p>

    <div className='mt-1'>
      <p className='mt-3 text-[15px] leading-7 text-white/80'>{testimonial}</p>

      <div className='mt-7 flex justify-between items-center gap-1'>
        <div className='flex-1 flex flex-col'>
          <p className='text-[14px] font-semibold text-white'>
            {name}
          </p>
          <p className='mt-1 text-xs leading-5 text-secondary'>
            {designation} of {company}
          </p>
        </div>

        {/* <img
          src={image}
          alt={`feedback_by-${name}`}
          className='w-10 h-10 rounded-full object-cover'
        /> */}
      </div>
    </div>
  </motion.div>
);

const Feedbacks = () => {
  return (
    <div className={`mt-12`}>
      <div
        className={`portfolio-panel relative min-h-[260px] overflow-hidden rounded-3xl ${styles.padding} before:absolute before:-right-12 before:-top-24 before:h-64 before:w-64 before:rounded-full before:bg-[#915EFF]/10 before:blur-[80px]`}
      >
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>What others say</p>
          <h2 className={styles.sectionHeadText}>Testimonials.</h2>
        </motion.div>
      </div>
      <div className={`-mt-12 relative z-10 pb-14 ${styles.paddingX} flex flex-wrap gap-5 sm:gap-6`}>
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "feedback");
