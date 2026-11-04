import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
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
    <motion.div
      variants={fadeIn("up", "spring", index * 0.25, 0.75)}
      className="h-full w-full"
    >
      <Tilt
        tiltMaxAngleX={7}
        tiltMaxAngleY={7}
        perspective={1200}
        scale={1.01}
        transitionSpeed={450}
        className="plate-3d group h-full w-full"
      >
        <article className="plate-3d-face flex h-full flex-col justify-between p-4 sm:p-5">
          <div>
            <div className="z-lift-md relative h-[220px] w-full overflow-hidden rounded-xl border border-white/15 bg-[#080a16] shadow-[0_6px_0_0_rgba(14,12,32,0.95),0_18px_40px_rgba(0,0,0,0.45)]">
              <img
                src={image}
                alt={name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />

              <div className="card-img_hover absolute inset-0 m-3 flex justify-end gap-2">
                <a
                  href={source_code_link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View ${name} source code`}
                  onClick={(e) => e.stopPropagation()}
                  className="key-3d key-3d--outline !h-10 !w-10 !rounded-xl !p-0"
                >
                  <img
                    src={github}
                    alt="github"
                    className="h-1/2 w-1/2 object-contain"
                  />
                </a>

                <a
                  href={live_link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View ${name} live site`}
                  onClick={(e) => e.stopPropagation()}
                  className="key-3d key-3d--primary !h-10 !w-10 !rounded-xl !p-0"
                >
                  <ExternalLink size={17} />
                </a>
              </div>
            </div>

            <div className="z-lift-sm mt-5">
              <h3 className="extrude-3d text-[20px] font-semibold tracking-tight text-white">
                {name}
              </h3>
              <p className="mt-2 text-[14px] leading-6 text-secondary">
                {description}
              </p>
            </div>
          </div>

          <div className="z-lift-md mt-4 flex flex-wrap gap-2 border-t border-white/[0.08] pt-3">
            {tags.map((tag) => (
              <span
                key={`${name}-${tag.name}`}
                className="tag-3d"
              >
                <span className={tag.color}>#{tag.name}</span>
              </span>
            ))}
          </div>
        </article>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={`${styles.sectionHeadText} extrude-3d`}>
          <span data-text="Projects." className="exploded-type-3d">
            Projects.
          </span>
        </h2>
      </motion.div>

      <Tilt
        tiltMaxAngleX={3.5}
        tiltMaxAngleY={3.5}
        perspective={1400}
        scale={1}
        transitionSpeed={550}
        className="mt-6 max-w-3xl"
      >
        <motion.div variants={fadeIn("", "", 0.1, 1)} className="plate-3d">
          <div className="plate-3d-face relative overflow-hidden px-6 py-5 text-[15px] leading-7 text-secondary sm:px-7 sm:py-6 sm:text-[16px] sm:leading-8">
            <span className="absolute inset-y-5 left-0 w-1 rounded-r-full bg-gradient-to-b from-[#a78bfa] via-cyan-300/70 to-transparent shadow-[0_0_16px_rgba(167,139,250,0.8)]" />
            <p className="z-lift-md pl-2">
              Following projects showcase my skills and experience through
              real-world examples of my work. Each project is briefly described
              with links to code repositories and live demos. It reflects my
              ability to solve complex problems, work with different
              technologies, and manage projects effectively.
            </p>
          </div>
        </motion.div>
      </Tilt>

      <div className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3 sm:mt-12">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
