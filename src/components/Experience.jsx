import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import ResponsiveTilt from "./ResponsiveTilt";
import OptimizedImage from "./OptimizedImage";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "transparent",
        color: "#fff",
        border: "none",
        boxShadow: "none",
        padding: 0,
      }}
      contentArrowStyle={{
        borderRight: "8px solid rgba(167, 139, 250, 0.45)",
      }}
      date={experience.date}
      iconStyle={{
        background: experience.iconBg,
        boxShadow:
          "0 0 0 4px rgba(167, 139, 250, 0.35), 0 6px 0 0 rgba(18, 14, 38, 0.95), 0 14px 30px rgba(0, 0, 0, 0.5)",
      }}
      icon={
        <div className="flex h-full w-full items-center justify-center">
          <OptimizedImage
            src={experience.icon}
            alt={experience.company_name}
            maxMobileDim={256}
            className="rounded-full object-contain"
          />
        </div>
      }
    >
      <ResponsiveTilt
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        perspective={1200}
        scale={1.01}
        transitionSpeed={450}
        className="plate-3d w-full"
      >
        <div className="plate-3d-face p-6 sm:p-7">
          <div className="z-lift-md border-b border-white/[0.08] pb-4">
            <h3 className="text-[21px] font-semibold tracking-tight text-white sm:text-[23px]">
              {experience.title}
            </h3>
            <p
              className="mt-1 text-[14px] font-medium text-[#c4b5fd]"
              style={{ margin: 0 }}
            >
              {experience.company_name}
            </p>
          </div>

          <ul className="z-lift-sm mt-5 ml-1 space-y-3">
            {experience.points.map((point, pointIdx) => (
              <li
                key={`experience-point-${pointIdx}`}
                className="relative pl-5 text-[14px] leading-6 tracking-normal text-white/80 before:absolute before:left-0 before:top-[0.65em] before:h-2 before:w-2 before:rounded-sm before:border before:border-[#c4b5fd] before:bg-[#915EFF] before:shadow-[0_2px_0_0_rgba(145,94,255,0.5)]"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
      </ResponsiveTilt>
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
        <h2 className={`${styles.sectionHeadText} extrude-3d text-center`}>
          <span data-text="Work Experience." className="exploded-type-3d">
            Work Experience.
          </span>
        </h2>
      </motion.div>

      <div className="mt-14 flex flex-col sm:mt-20">
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
