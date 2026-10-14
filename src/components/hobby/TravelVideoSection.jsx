import React from "react";

const TravelVideoSection = ({ video, location, title, description }) => {
  return (
    <section className="relative flex min-h-[82vh] items-end overflow-hidden bg-[#17231f] px-6 py-20 text-white sm:px-12 sm:py-28">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={video}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[#17231f]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#17231f]/90 via-[#17231f]/25 to-transparent" />
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/75">
          {location}
        </p>
        <h2 className="mt-4 text-5xl font-semibold tracking-[-0.06em] sm:text-8xl">
          {title}
        </h2>
        <p className="mt-6 max-w-md text-base leading-7 text-white/80 sm:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
};

export default TravelVideoSection;
