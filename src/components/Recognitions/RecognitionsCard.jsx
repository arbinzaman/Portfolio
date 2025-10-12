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
  className="w-full sm:w-[48%] flex flex-col bg-gradient-to-br from-[#0a0a0a] to-[#111111] border border-cyan-500 shadow-lg shadow-cyan-500/50 rounded-2xl overflow-visible"
>

      {/* Achievement Image */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 sm:h-56 object-cover rounded-t-2xl"
        />
      )}

      {/* Content */}
      <div className="p-6 flex flex-col gap-4 bg-black/50">
        <div className="flex items-center gap-4">
          {/* Logo */}
          {logo && (
            <div className="bg-white rounded-full p-1.5 flex justify-center items-center w-10 h-10 min-w-[40px] min-h-[40px]">
              <img
                src={logo}
                alt={organization}
                className="max-w-[28px] max-h-[28px] object-contain"
              />
            </div>
          )}

          <div>
            <h3 className="text-white text-lg font-semibold">{title}</h3>
            <p className="text-cyan-400 text-sm">
              {organization} • {date}
            </p>
          </div>
        </div>

        <p className="text-gray-100 text-sm leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-[#004d4d] text-cyan-300 text-xs px-3 py-1 rounded-md font-mono"
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
