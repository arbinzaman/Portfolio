import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt
    tiltMaxAngleX={8}
    tiltMaxAngleY={8}
    scale={1}
    transitionSpeed={450}
    className="xs:w-[250px] w-full"
  >
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="portfolio-panel portfolio-panel-hover w-full overflow-hidden rounded-[20px] p-px sm:w-[250px]"
    >
      <div className="flex min-h-[250px] flex-col items-center justify-evenly rounded-[19px] bg-[#080a17]/75 px-8 py-6 backdrop-blur-xl">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.09] to-white/[0.02] shadow-[0_12px_35px_rgba(0,0,0,0.22)]">
          <img src={icon} alt={title} className="h-14 w-14 object-contain" />
        </div>

        <h3 className="text-center text-base font-semibold tracking-tight text-white sm:text-lg">
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="portfolio-panel relative mt-7 max-w-4xl overflow-hidden rounded-2xl px-6 py-6 text-[15px] leading-7 text-secondary sm:px-8 sm:py-7 sm:text-[16px] sm:leading-8"
      >
        <span className="absolute inset-y-6 left-0 w-px bg-gradient-to-b from-[#a78bfa] via-cyan-300/50 to-transparent" />
        <span className="pl-2">
          I am a Software Engineer with hands-on experience in both frontend and
          backend development, building and maintaining scalable ERP systems and
          web applications. Skilled in JavaScript, TypeScript, React, Node.js, and
          Three.js, I focus on performance optimization, responsive UI, and
          seamless API integration. I've worked with teams to deliver
          pixel-perfect designs and enhanced user experiences through
          collaborative development. Passionate about automation, I build custom
          scripts and tools to simplify workflows and increase efficiency.
          Alongside my engineering work, I am also an entrepreneur, collaborating
          with startups to develop smart, real-world solutions that improve
          day-to-day life. Let's work together to bring your ideas to life through
          clean, modern, and impactful digital products.
        </span>
      </motion.p>

      <div className="mt-10 flex flex-wrap gap-4 sm:mt-12 sm:gap-6">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
