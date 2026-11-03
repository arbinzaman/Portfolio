import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
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
  const featured = index === 0;

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.18, 0.75)}
      className={featured ? "min-w-0 lg:col-span-2" : "min-w-0"}
    >
      <Tilt
        tiltMaxAngleX={featured ? 4 : 6}
        tiltMaxAngleY={featured ? 4 : 6}
        perspective={1300}
        tiltReverse
        scale={1}
        transitionSpeed={450}
        className="project-card-shell group w-full"
      >
        <article
          className={`project-card-face ${
            featured
              ? "project-card-featured lg:grid lg:grid-cols-[1.08fr_0.92fr]"
              : ""
          }`}
        >
          <div className={`project-card-media ${featured ? "project-card-media-featured" : ""}`}>
            <div className="project-window-bar">
              <span className="flex items-center gap-1.5" aria-hidden="true">
                <i className="h-2 w-2 rounded-full bg-white/25" />
                <i className="h-2 w-2 rounded-full bg-white/15" />
                <i className="h-2 w-2 rounded-full bg-white/10" />
              </span>
              <span className="truncate px-3 text-center font-mono text-[9px] tracking-wide text-white/40">
                {name}
              </span>
              <span aria-hidden="true" />
            </div>
            <div className={`project-preview-image ${featured ? "project-preview-image-featured" : ""}`}>
              <img src={image} alt={`${name} project preview`} />
              <div className="project-preview-shade" />
            </div>
          </div>

          <div className="project-card-details">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[#c4b5fd]/70">
                  Selected project
                </p>
                <h3 className="text-xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-2xl">
                  {name}
                </h3>
              </div>
              <ArrowUpRight
                size={20}
                className="mt-1 shrink-0 text-white/35 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#c4b5fd]"
              />
            </div>

            <p className="mt-3 text-[13px] leading-6 text-secondary sm:text-sm">
              {description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={`${name}-${tag.name}`}
                  className={`rounded-full border border-white/[0.09] bg-white/[0.035] px-2.5 py-1 font-mono text-[10px] ${tag.color}`}
                >
                  {tag.name}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2 border-t border-white/[0.08] pt-4">
              <a
                href={live_link}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${name} live website`}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-white/85 transition hover:border-[#a78bfa]/45 hover:bg-[#915EFF]/15"
              >
                View live project
                <ExternalLink size={14} />
              </a>
              <a
                href={source_code_link}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${name} source code on GitHub`}
                className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium text-white/50 transition hover:bg-white/[0.04] hover:text-white/85"
              >
                <img src={github} alt="" className="h-4 w-4 object-contain opacity-75" />
                Source
              </a>
            </div>
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
        <div className="flex flex-col gap-5 border-b border-white/[0.08] pb-6 sm:flex-row sm:items-end sm:justify-between sm:pb-8">
          <div>
            <p className={styles.sectionSubText}>My work</p>
            <h2 className={`${styles.sectionHeadText} mt-3`}>Selected projects.</h2>
          </div>
        </div>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-6 max-w-3xl text-[14px] leading-7 text-secondary sm:text-[15px] sm:leading-8"
        >
          Following projects showcase my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos. It reflects my ability to
          solve complex problems, work with different technologies, and manage
          projects effectively.
        </motion.p>
      </div>

      <div className="mt-9 grid grid-cols-1 gap-5 sm:mt-12 sm:gap-7 lg:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard
            key={`project-${index}`}
            index={index}
            {...project}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
