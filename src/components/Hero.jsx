import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import ComputersCanvas from "./canvas/Computers";

const Hero = () => {
  return (
    <section
      id="intro"
      data-portfolio-chapter="intro"
      className="relative mx-auto h-screen min-h-[720px] w-full overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_72%_45%,rgba(145,94,255,0.12),transparent_38%),linear-gradient(180deg,rgba(5,8,22,0.05)_0%,#050816_100%)]"
      />

      <div className="pointer-events-none absolute inset-x-0 top-20 z-10 mx-auto max-w-7xl px-6 sm:px-16">
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
              <h1 className={`${styles.heroHeadText} !mt-0 !leading-[1.05]`}>
                Hi, I&apos;m <span className="text-[#a78bfa]">Arbin</span>
              </h1>
              <h2 className="mt-2 text-[clamp(1.65rem,3vw,2.5rem)] font-semibold leading-tight tracking-[-0.05em] text-white/90">
                I build digital products that scale.
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-secondary sm:text-base sm:leading-8">
                Scalable applications and business tools, built with thoughtful
                interfaces, reliable systems, and modern web technology.
              </p>

              <div className="pointer-events-auto mt-2 flex flex-nowrap items-center gap-2">
                <a
                  href="#projects"
                  className="group inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-[#915EFF] px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[#a78bfa] hover:shadow-[0_0_32px_rgba(145,94,255,0.35)] sm:gap-3 sm:px-5 sm:py-3 sm:text-xs sm:tracking-[0.14em]"
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
                  className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-white/15 bg-white/[0.03] px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/80 transition hover:border-white/35 hover:bg-white/[0.08] hover:text-white sm:px-5 sm:py-3 sm:text-xs sm:tracking-[0.14em]"
                >
                  Get in touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute right-6 top-[34%] z-10 hidden w-52 rounded-2xl border border-white/10 bg-[#0b0d1b]/65 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur-xl xl:block">
        <div className="flex items-center justify-between">
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-secondary">
            Engineering stack
          </p>
          <span className="rounded-md border border-[#915EFF]/30 px-1.5 py-1 font-mono text-[9px] text-[#c4b5fd]">
            LIVE
          </span>
        </div>
        <p className="mt-3 text-sm font-medium text-white">Built for the web.</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {["React", "TypeScript", "Node.js"].map((technology) => (
            <span
              key={technology}
              className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-[9px] font-medium text-white/65"
            >
              {technology}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 z-[1]">
        <ComputersCanvas />
      </div>

      <div className="absolute bottom-7 z-20 flex w-full justify-center">
        <a
          href="#about"
          aria-label="Scroll to introduction"
          className="group flex h-12 w-7 items-start justify-center rounded-full border border-white/35 p-1.5 transition hover:border-[#a78bfa]"
        >
          <motion.span
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
            className="h-2 w-2 rounded-full bg-white/80 group-hover:bg-[#a78bfa]"
          />
        </a>
      </div>
    </section>
  );
};

export default Hero;
