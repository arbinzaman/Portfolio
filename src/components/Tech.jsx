import React from "react";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  return (
    <div className='flex flex-row flex-wrap justify-center gap-4 sm:gap-6'>
      {technologies.map((technology) => (
        <div
          className='portfolio-panel portfolio-panel-hover group w-[104px] rounded-2xl p-2 sm:w-28'
          key={technology.name}
        >
          <div className='h-24 w-full sm:h-28'>
            <BallCanvas icon={technology.icon} />
          </div>
          <p className='pb-2 text-center text-[10px] font-medium tracking-wide text-white/50 transition-colors group-hover:text-white/85 sm:text-xs'>
            {technology.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "stack");
