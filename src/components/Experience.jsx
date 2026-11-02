import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background:
          "linear-gradient(145deg, rgba(20, 18, 42, 0.96), rgba(8, 11, 25, 0.92))",
        color: "#fff",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: "18px",
        boxShadow: "0 24px 70px rgba(0, 0, 0, 0.24)",
        backdropFilter: "blur(18px)",
      }}
      contentArrowStyle={{ borderRight: "7px solid rgba(20, 18, 42, 0.96)" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          <img
            src={experience.icon}
            alt={experience.company_name}
         className='object-contain rounded-full '

          />
        </div>
      }
    >
      <div>
        <h3 className='text-[22px] font-semibold tracking-tight text-white'>{experience.title}</h3>
        <p
          className='text-[#c4b5fd] text-[14px] font-medium'
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className='mt-5 ml-1 space-y-3'>
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='relative pl-5 text-[14px] leading-6 tracking-normal text-white/75 before:absolute before:left-0 before:top-[0.7em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#a78bfa]'
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Work Experience.
        </h2>
      </motion.div>

      <div className='mt-14 flex flex-col sm:mt-20'>
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
