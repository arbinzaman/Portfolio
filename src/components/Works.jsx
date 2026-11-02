import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import {ExternalLink} from "lucide-react";
import { github } from "../assets";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  live_link,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        tiltMaxAngleX={7}
        tiltMaxAngleY={7}
        scale={1}
        transitionSpeed={450}
        className="group w-full cursor-pointer rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-3 shadow-[0_24px_70px_rgba(0,0,0,0.2)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#a78bfa]/40 sm:w-[360px]"
      >
        <div className="relative h-[230px] w-full overflow-hidden rounded-xl border border-white/10">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />

          <div className="absolute inset-0 flex justify-end m-3 gap-2 card-img_hover">
            {/* GitHub Button */}
            <a
              href={source_code_link}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${name} source code`}
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/60 backdrop-blur-md transition hover:bg-[#915EFF]"
            >
              <img
                src={github}
                alt="github"
                className="w-1/2 h-1/2 object-contain"
              />
            </a>

            {/* Live Site Button */}
            <a
              href={live_link}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${name} live site`}
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-md transition hover:bg-[#915EFF]"
            >
              <ExternalLink size={20} />
            </a>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-[20px] font-semibold tracking-tight text-white">{name}</h3>
          <p className="mt-2 text-[14px] leading-6 text-secondary">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-6 max-w-3xl text-[16px] leading-8 text-secondary sm:text-[17px]"
        >
          Following projects showcase my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos. It reflects my ability to
          solve complex problems, work with different technologies, and manage
          projects effectively.
        </motion.p>
      </div>

      <div className="mt-12 flex flex-wrap gap-6 sm:mt-16 sm:gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
