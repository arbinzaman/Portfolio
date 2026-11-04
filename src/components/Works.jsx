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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/70 backdrop-blur-md transition hover:bg-[#915EFF]"
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur-md transition hover:bg-[#915EFF]"
                >
                  <ExternalLink size={18} />
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

          <div className="z-lift-sm mt-4 flex flex-wrap gap-2 pt-2">
            {tags.map((tag) => (
              <p
                key={`${name}-${tag.name}`}
                className={`text-[13px] font-medium ${tag.color}`}
              >
                #{tag.name}
              </p>
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
        <h2 className={`${styles.sectionHeadText} extrude-3d`}>Projects.</h2>
      </motion.div>

      <div className="flex w-full">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-4 max-w-3xl text-[15px] leading-7 text-secondary sm:text-[16px] sm:leading-8"
        >
          Following projects showcase my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos. It reflects my ability to
          solve complex problems, work with different technologies, and manage
          projects effectively.
        </motion.p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3 sm:mt-12">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
