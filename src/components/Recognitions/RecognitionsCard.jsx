import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

const RecognitionCard = ({
  title,
  organization,
  date,
  description,
  tags,
  logo,
  imageUrl,
  isLastOdd = false,
}) => {
  return (
    <Tilt
      tiltMaxAngleX={isLastOdd ? 4 : 6}
      tiltMaxAngleY={isLastOdd ? 4 : 6}
      perspective={1250}
      scale={1.01}
      transitionSpeed={450}
      className={`plate-3d group h-full w-full ${
        isLastOdd ? "md:col-span-2" : ""
      }`}
    >
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        className={`plate-3d-face flex h-full w-full flex-col overflow-hidden ${
          isLastOdd ? "md:flex-row md:items-stretch" : ""
        }`}
      >
        {/* Achievement Image */}
        {imageUrl && (
          <div
            className={`z-lift-md relative m-3 overflow-hidden rounded-xl border border-white/15 bg-[#080a16] shadow-[0_6px_0_0_rgba(14,12,32,0.95),0_18px_40px_rgba(0,0,0,0.45)] ${
              isLastOdd
                ? "md:m-4 md:w-[46%] md:shrink-0"
                : ""
            }`}
          >
            <img
              src={imageUrl}
              alt={title}
              loading="lazy"
              decoding="async"
              className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${
                isLastOdd
                  ? "h-48 sm:h-56 md:h-full md:min-h-[250px]"
                  : "h-48 sm:h-56"
              }`}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050816]/65 via-transparent to-transparent" />
          </div>
        )}

        {/* Content */}
        <div
          className={`z-lift-sm flex flex-1 flex-col justify-between gap-4 p-6 pt-3 ${
            isLastOdd ? "md:justify-center md:p-8" : ""
          }`}
        >
          <div>
            <div className="flex items-center gap-4">
              {/* Logo */}
              {logo && (
                <div className="z-lift-lg flex h-12 min-h-[48px] w-12 min-w-[48px] items-center justify-center rounded-xl border border-white/15 bg-white/[0.08] p-2 shadow-[0_4px_0_0_rgba(145,94,255,0.35),0_10px_25px_rgba(0,0,0,0.4)]">
                  <img
                    src={logo}
                    alt={organization}
                    loading="lazy"
                    decoding="async"
                    className="max-h-[30px] max-w-[30px] object-contain"
                  />
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold leading-snug text-white sm:text-xl">
                  {title}
                </h3>
                <p className="mt-1 font-mono text-xs tracking-wide text-[#c4b5fd]">
                  {organization} · {date}
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-white/75 sm:text-[15px] sm:leading-7">
              {description}
            </p>
          </div>

          <div className="z-lift-md flex flex-wrap gap-2 border-t border-white/[0.08] pt-4">
            {tags.map((tag) => (
              <span key={tag} className="tag-3d !text-cyan-200/90">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Tilt>
  );
};

export default RecognitionCard;
