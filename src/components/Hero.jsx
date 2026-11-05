import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import ComputersCanvas from "./canvas/Computers";

const Hero = () => {
  return (
    <section
      id="intro"
      data-portfolio-chapter="intro"
      className="relative mx-auto h-[100svh] min-h-[580px] w-full overflow-hidden sm:h-screen sm:min-h-[720px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_72%_45%,rgba(145,94,255,0.12),transparent_42%),linear-gradient(180deg,rgba(5,8,22,0.04)_0%,rgba(5,8,22,0.38)_100%)]"
      />

      <div aria-hidden="true" className="perspective-floor z-[2] h-40 opacity-65">
        <div className="perspective-floor__plane" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-16 z-10 mx-auto max-w-7xl px-6 sm:top-20 sm:px-16">
        <div className="max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-secondary backdrop-blur-md sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#915EFF] shadow-[0_0_12px_rgba(145,94,255,0.9)]" />
            Software engineer · Full-stack development
          </div>

          <div className="flex items-start gap-4 sm:gap-6">
            <div className="mt-2 flex shrink-0 flex-col items-center">
              <span className="h-3 w-3 rounded-full bg-[#915EFF] shadow-[0_0_18px_rgba(145,94,255,0.7)]" />
              <span className="mt-2 h-28 w-px bg-gradient-to-b from-[#915EFF]/80 to-transparent sm:h-36" />
            </div>

            <div className="max-w-2xl">
              <h1 className={`${styles.heroHeadText} !mt-0 !leading-[1.05] extrude-3d`}>
                Hi, I&apos;m{" "}
                <span
                  data-text="Arbin"
                  className="exploded-type-3d text-[#a78bfa]"
                >
                  Arbin
                </span>
              </h1>
              <h2 className="mt-2 text-[clamp(1.65rem,3vw,2.5rem)] font-semibold leading-tight tracking-[-0.05em] text-white/90">
                I build digital products that scale.
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-secondary sm:text-base sm:leading-8">
                Scalable applications and business tools, built with thoughtful
                interfaces, reliable systems, and modern web technology.
              </p>

              <div className="pointer-events-auto mt-4 flex flex-nowrap items-center gap-3">
                <a
                  href="#projects"
                  className="key-3d key-3d--primary group shrink-0 px-4 py-3 text-[10px] uppercase tracking-[0.12em] sm:px-5 sm:py-3.5 sm:text-xs sm:tracking-[0.14em]"
                >
                  Explore my work
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    ↗
                  </span>
                </a>
                <a
                  href="#contact"
                  className="key-3d key-3d--outline shrink-0 px-4 py-3 text-[10px] uppercase tracking-[0.12em] sm:px-5 sm:py-3.5 sm:text-xs sm:tracking-[0.14em]"
                >
                  Get in touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-auto absolute right-6 top-[32%] z-10 hidden w-56 xl:block">
        <Tilt
          tiltMaxAngleX={10}
          tiltMaxAngleY={10}
          perspective={1100}
          scale={1.02}
          transitionSpeed={450}
          className="plate-3d"
        >
          <div className="plate-3d-face p-4">
            <div className="z-lift-md flex items-center justify-between">
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-secondary">
                Engineering stack
              </p>
              <span className="rounded-md border border-[#915EFF]/40 bg-[#915EFF]/15 px-1.5 py-0.5 font-mono text-[9px] text-[#c4b5fd] shadow-[0_2px_0_0_rgba(145,94,255,0.35)]">
                LIVE
              </span>
            </div>
            <p className="z-lift-sm mt-3 text-sm font-semibold text-white">
              Built for the web.
            </p>
            <div className="z-lift-lg mt-3 flex flex-wrap gap-1.5">
              {["React", "TypeScript", "Node.js"].map((technology) => (
                <span key={technology} className="tag-3d !px-2 !py-0.5 !text-[9px]">
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </Tilt>
      </div>

      <div className="absolute inset-0 z-[1]">
        <ComputersCanvas />
      </div>

      <div className="pointer-events-none absolute bottom-5 inset-x-0 z-30 flex w-full justify-center sm:bottom-7">
        <a
          href="#about"
          aria-label="Scroll to introduction"
          className="pointer-events-auto group flex h-11 w-7 items-start justify-center rounded-full border-2 border-[#a78bfa]/75 bg-[#080a17]/85 p-1.5 shadow-[0_4px_0_0_rgba(167,139,250,0.45),0_0_20px_rgba(145,94,255,0.45)] backdrop-blur-md transition hover:-translate-y-0.5 hover:border-[#a78bfa] sm:h-12 sm:w-7"
        >
          <motion.span
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
            className="h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_8px_#a78bfa] group-hover:bg-[#a78bfa]"
          />
        </a>
      </div>
    </section>
  );
};

export default Hero;
