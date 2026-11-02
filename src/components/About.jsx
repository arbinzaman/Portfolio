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
      className="w-full rounded-[20px] border border-white/10 bg-gradient-to-br from-white/15 via-white/[0.04] to-[#915EFF]/25 p-px shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition duration-300 hover:-translate-y-1 hover:border-[#a78bfa]/40"
    >
      <div className="flex min-h-[280px] flex-col items-center justify-evenly rounded-[19px] bg-[#0b0d1b]/90 px-10 py-6 backdrop-blur-xl">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <img src={icon} alt={title} className="h-14 w-14 object-contain" />
        </div>

        <h3 className="text-center text-lg font-semibold tracking-tight text-white">
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
        className="mt-6 max-w-3xl border-l border-[#a78bfa]/45 pl-5 text-[16px] leading-8 text-secondary sm:text-[17px]"
      >
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
      </motion.p>

      <div className="mt-14 flex flex-wrap gap-6 sm:mt-16 sm:gap-8">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
