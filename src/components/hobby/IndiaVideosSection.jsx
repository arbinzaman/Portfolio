import React, { useEffect, useRef, useState } from "react";

import meghalayaVideo from "../../assets/videos/meghalaya.mp4";
import kolkataVideo from "../../assets/videos/kolkata.mp4";
import sikkimVideo from "../../assets/videos/Sikkim.mp4";
import tajmahalVideo from "../../assets/videos/tajmahal video.mp4";

const indiaVideos = [
  {
    video: tajmahalVideo,
    location: "India · Agra",
    title: "Taj Mahal.",
    description:
      "A journey through one of the world's most recognisable landmarks.",
  },
  {
    video: sikkimVideo,
    location: "India · Sikkim",
    title: "Sikkim.",
    description: "Mountain roads, changing skies, and a slower way of seeing.",
  },
  {
    video: meghalayaVideo,
    location: "India · Meghalaya",
    title: "Meghalaya.",
    description: "Green valleys, rain-filled landscapes, and the quiet energy of the hills.",
  },
  {
    video: kolkataVideo,
    location: "India · West Bengal",
    title: "Kolkata.",
    description: "A city of old streets, layered stories, and unmistakable character.",
  },
];

const IndiaVideosSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef([]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % indiaVideos.length);
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === activeIndex) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeIndex]);

  return (
    <section className="relative flex min-h-[82vh] items-end overflow-hidden bg-[#17231f] px-6 py-20 text-white sm:px-12 sm:py-28">
      {indiaVideos.map(({ video, title }, index) => (
        <video
          key={title}
          ref={(element) => {
            videoRefs.current[index] = element;
          }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
          src={video}
          muted
          loop
          playsInline
          preload={index === 0 ? "auto" : "metadata"}
          aria-hidden="true"
        />
      ))}

      <div className="absolute inset-0 bg-[#17231f]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#17231f]/90 via-[#17231f]/25 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/75">
          {indiaVideos[activeIndex].location}
        </p>
        <h2 className="mt-4 text-5xl font-semibold tracking-[-0.06em] sm:text-8xl">
          {indiaVideos[activeIndex].title}
        </h2>
        <p className="mt-6 max-w-md text-base leading-7 text-white/80 sm:text-lg">
          {indiaVideos[activeIndex].description}
        </p>

        <div className="mt-8 flex gap-2" aria-label="India destinations">
          {indiaVideos.map(({ title }, index) => (
            <span
              key={title}
              className={`h-1 transition-all duration-500 ${
                index === activeIndex ? "w-12 bg-white" : "w-6 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndiaVideosSection;
