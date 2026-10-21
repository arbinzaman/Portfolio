import React, { useEffect, useRef, useState } from "react";

import meghalayaVideo from "../../assets/videos/meghalaya.mp4";
import kolkataVideo from "../../assets/videos/kolkata.mp4";
import sikkimVideo from "../../assets/videos/Sikkim.mp4";
import tajmahalVideo from "../../assets/videos/tajmahal video.mp4";

export const stories = [
  {
    number: "01",
    slug: "the-road-keeps-opening",
    category: "Bangladesh",
    region: "Sunamganj District",
    title: "The road keeps opening.",
    excerpt:
      "Every journey starts with a small decision to leave the familiar behind. This is where the route, the people, and the moment that made the trip unforgettable belong.",
    content:
      "Every journey starts with a small decision to leave the familiar behind. Write the full account of this journey here: the route you took, the places that surprised you, the people you met, and the moment that made the trip unforgettable. This is your space to turn a destination into a memory.",
    readTime: "4 min read",
  },
  {
    number: "02",
    slug: "a-different-horizon",
    category: "India",
    region: "West Bengal State",
    title: "A different horizon.",
    excerpt:
      "The sounds, food, and landscapes of a new place can stay with you long after the journey ends.",
    content:
      "The sounds, food, and landscapes of a new place can stay with you long after the journey ends. Add the full story of your India trip here, from the first sight of the horizon to the small local details that made the experience feel completely new.",
    readTime: "3 min read",
  },
  {
    number: "03",
    slug: "what-travel-leaves-behind",
    category: "Field notes",
    region: "Across Bangladesh & India",
    title: "What travel leaves behind.",
    excerpt:
      "A reflection on how travelling changes the way we see home, work, people, and distance.",
    content:
      "A journey does not end when you return home. Use this story to reflect on how travelling has changed the way you see home, work, people, and the distance between one place and another. Add the details that still stay with you.",
    readTime: "5 min read",
  },
];

const travelVideos = [
  { source: tajmahalVideo, label: "Agra, India" },
  { source: sikkimVideo, label: "Sikkim, India" },
  { source: meghalayaVideo, label: "Meghalaya, India" },
  { source: kolkataVideo, label: "Kolkata, India" },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/zamanarbin/" },
  { label: "YouTube", href: "https://www.youtube.com/@zamanarbin" },
  { label: "Facebook", href: "https://www.facebook.com/zamanarbin/" },
];

const StoriesSection = () => {
  const [activeVideo, setActiveVideo] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveVideo((current) => (current + 1) % travelVideos.length);
    }, 9000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, [activeVideo]);

  return (
    <section className="relative isolate min-h-[80vh] overflow-hidden bg-[#17231f] px-6 py-24 text-white sm:px-12 sm:py-32">
      <video
        key={travelVideos[activeVideo].source}
        ref={videoRef}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        src={travelVideos[activeVideo].source}
        autoPlay
        muted
        loop
        playsInline
        preload={activeVideo === 0 ? "metadata" : "none"}
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-[#07110d]/65" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#07110d] via-[#07110d]/45 to-[#07110d]/35" />

      <div className="mx-auto flex min-h-[55vh] max-w-7xl flex-col justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b9dfc8]">
            Follow the journey
          </p>
          <h2 className="mt-6 text-5xl font-semibold leading-[0.95] tracking-[-0.07em] sm:text-8xl">
            Watch the world
            <br />
            unfold.
          </h2>
          <p className="mt-8 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
            Cinematic notes from the road. Follow along for new films,
            photographs, and places worth finding.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/25 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 transition hover:border-white hover:bg-white hover:text-[#17231f]"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col justify-between gap-6 border-t border-white/20 pt-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/50">
              Now showing
            </p>
            <p className="mt-2 text-sm font-medium">{travelVideos[activeVideo].label}</p>
          </div>
          <div className="flex gap-2">
            {travelVideos.map((video, index) => (
              <button
                key={video.label}
                type="button"
                aria-label={`Show ${video.label}`}
                onClick={() => setActiveVideo(index)}
                className={`h-1 transition-all ${
                  activeVideo === index ? "w-12 bg-white" : "w-6 bg-white/35"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoriesSection;
