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
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const touchStartX = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "200px 0px", threshold: 0.01 },
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return undefined;

    const intervalId = window.setInterval(
      () => setActiveIndex((currentIndex) => (currentIndex + 1) % indiaVideos.length),
      4000,
    );

    return () => window.clearInterval(intervalId);
  }, [isVisible]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVisible) return;

    video.currentTime = 0;
    video.play().catch(() => {});
  }, [activeIndex, isVisible]);

  const selectDestination = (index) => {
    setActiveIndex(index);
  };

  const handlePointerDown = (event) => {
    touchStartX.current = event.clientX;
  };

  const handlePointerUp = (event) => {
    if (touchStartX.current === null) return;

    const distance = event.clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(distance) < 45) return;

    setActiveIndex((currentIndex) => {
      const direction = distance < 0 ? 1 : -1;
      return (currentIndex + direction + indiaVideos.length) % indiaVideos.length;
    });
  };

  return (
    <section
      ref={sectionRef}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className="relative flex min-h-[82vh] touch-pan-y items-end overflow-hidden bg-[#17231f] px-6 py-20 text-white sm:px-12 sm:py-28"
    >
      {isVisible && (
        <video
          key={indiaVideos[activeIndex].title}
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={indiaVideos[activeIndex].video}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      )}

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
            <button
              key={title}
              type="button"
              aria-label={`Show ${title}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => selectDestination(index)}
              className={`h-1 transition-all duration-500 ${
                index === activeIndex ? "w-12 bg-white" : "w-6 bg-white/40"
              }`}
            >
              <span className="sr-only">{title}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndiaVideosSection;
