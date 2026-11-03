import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";

const RecognitionCard = ({
  index,
  title,
  organization,
  date,
  description,
  tags,
  logo,
  imageUrl,
}) => {
  return (
    <motion.div
  initial={{ opacity: 1, y: 0 }}
  animate={{ opacity: 1, y: 0 }}
  className="portfolio-panel portfolio-panel-hover group flex w-full flex-col overflow-hidden rounded-2xl sm:w-[48%]"
>

      {/* Achievement Image */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] sm:h-56"
        />
      )}

      {/* Content */}
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center gap-4">
          {/* Logo */}
          {logo && (
            <div className="flex h-11 min-h-[44px] w-11 min-w-[44px] items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] p-1.5">
              <img
                src={logo}
                alt={organization}
                className="max-w-[28px] max-h-[28px] object-contain"
              />
            </div>
          )}

          <div>
            <h3 className="text-white text-lg font-semibold">{title}</h3>
            <p className="mt-1 text-xs tracking-wide text-[#c4b5fd]">
              {organization} · {date}
            </p>
          </div>
        </div>

        <p className="text-sm leading-6 text-white/70">{description}</p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-cyan-200/80"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default RecognitionCard;
