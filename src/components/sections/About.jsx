import React from "react";
import { motion } from "framer-motion";
import ResponsiveTilt from "../common/ResponsiveTilt";

import { styles } from "../../styles";
import { services } from "../../constants";
import { SectionWrapper } from "../../hoc";
import { fadeIn, textVariant } from "../../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <ResponsiveTilt
    tiltMaxAngleX={11}
    tiltMaxAngleY={11}
    perspective={1100}
    scale={1.02}
    transitionSpeed={450}
    className="xs:w-[250px] w-full"
  >
    <motion.div
      variants={fadeIn("right", "spring", index * 0.4, 0.75)}
      className="plate-3d group w-full sm:w-[250px]"
    >
      <div className="plate-3d-face flex min-h-[250px] flex-col items-center justify-evenly px-7 py-6">
        <div className="z-lift-lg my-2 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/15 bg-gradient-to-br from-[#915EFF]/20 via-white/[0.08] to-cyan-400/10 shadow-[0_6px_0_0_rgba(24,18,54,0.95),0_18px_38px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:scale-105">
          <img
            src={icon}
            alt={title}
            className="h-14 w-14 object-contain drop-shadow-[0_8px_16px_rgba(145,94,255,0.35)]"
          />
        </div>

        <div className="z-lift-md w-full border-t border-white/[0.08] pt-3.5 text-center">
          <h3 className="text-base font-semibold tracking-tight text-white sm:text-lg">
            {title}
          </h3>
        </div>
      </div>
    </motion.div>
  </ResponsiveTilt>
);

const About = () => {
  return (
    <>
      <motion.div
        variants={textVariant()}
        className="border-b border-white/[0.08] pb-6"
      >
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={`${styles.sectionHeadText} extrude-3d`}>
          <span data-text="Overview." className="exploded-type-3d">
            Overview.
          </span>
        </h2>
      </motion.div>

      <ResponsiveTilt
        tiltMaxAngleX={3.5}
        tiltMaxAngleY={3.5}
        perspective={1400}
        scale={1}
        transitionSpeed={550}
        className="mt-8 max-w-4xl"
      >
        <motion.div variants={fadeIn("", "", 0.1, 1)} className="plate-3d">
          <div className="plate-3d-face relative overflow-hidden px-6 py-6 text-[15px] leading-7 text-secondary sm:px-8 sm:py-7 sm:text-[16px] sm:leading-8">
            <span className="absolute inset-y-6 left-0 w-1 rounded-r-full bg-gradient-to-b from-[#a78bfa] via-cyan-300/70 to-transparent shadow-[0_0_16px_rgba(167,139,250,0.8)]" />
            <p className="z-lift-md pl-2">
              I am a Software Engineer with hands-on experience in both frontend
              and backend development, building and maintaining scalable ERP
              systems and web applications. Skilled in JavaScript, TypeScript,
              React, Node.js, and Three.js, I focus on performance optimization,
              responsive UI, and seamless API integration. I&apos;ve worked with
              teams to deliver pixel-perfect designs and enhanced user
              experiences through collaborative development. Passionate about
              automation, I build custom scripts and tools to simplify workflows
              and increase efficiency. Alongside my engineering work, I am also
              an entrepreneur, collaborating with startups to develop smart,
              real-world solutions that improve day-to-day life. Let&apos;s work
              together to bring your ideas to life through clean, modern, and
              impactful digital products.
            </p>
          </div>
        </motion.div>
      </ResponsiveTilt>

      <div className="mt-12 flex flex-wrap gap-6 sm:mt-14 sm:gap-8">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
