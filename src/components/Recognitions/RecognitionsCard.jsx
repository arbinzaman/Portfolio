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
      variants={fadeIn("up", "spring", index * 0.3, 0.75)}
      className="bg-gradient-to-br from-[#0a0a0a] to-[#111111] border border-cyan-500 shadow-[0_0_20px_#00ffff70] rounded-2xl overflow-hidden w-full sm:w-[48%] flex flex-col"
    >
      {/* Achievement Image */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-52 object-cover rounded-t-2xl"
        />
      )}

      {/* Content */}
      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          {/* Logo with white background and padding */}
          <div
            className="bg-white rounded-full p-1.5 flex justify-center items-center"
            style={{ width: 40, height: 40, minWidth: 40, minHeight: 40 }}
          >
            <img
              src={logo}
              alt={organization}
              className="max-w-[28px] max-h-[28px] object-contain"
            />
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold">{title}</h3>
            <p className="text-cyan-300 text-sm">
              {organization} • {date}
            </p>
          </div>
        </div>

        <p className="text-gray-300 text-sm leading-relaxed">{description}</p>

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
