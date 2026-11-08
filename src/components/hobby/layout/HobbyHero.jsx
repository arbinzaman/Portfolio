import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import promoVideo from "../../../assets/videos/promo video.mp4";
import { HobbyThemeToggle } from "../context/HobbyThemeContext";

const HobbyHero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let frameId;
    const handleScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => setScrollY(window.scrollY));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav className="absolute left-0 right-0 top-0 z-20 border-b border-white/20 bg-black/15 px-6 py-4 text-white backdrop-blur-md sm:px-12 sm:py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link to="/" className="text-sm font-semibold uppercase tracking-[0.16em]">
            Arbin Zaman
          </Link>
          <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.12em] text-white/80 sm:gap-5">
            <a href="#journeys" className="hidden hover:text-white md:inline">
              Journeys
            </a>
            <a href="#gallery" className="hidden hover:text-white md:inline">
              Gallery
            </a>
            <a href="#films" className="hidden hover:text-white md:inline">
              Films
            </a>
            <a href="#stories" className="hidden hover:text-white md:inline">
              Stories
            </a>
            <a href="#contact" className="hidden hover:text-white md:inline">
              Contact
            </a>
            <Link to="/" className="hover:text-white">
              Coding portfolio
            </Link>
            <HobbyThemeToggle variant="glass" />
          </div>
        </div>
      </nav>

      <section className="relative flex min-h-[88vh] items-end overflow-hidden bg-[#17231f] px-6 pb-16 pt-32 text-white sm:px-12 sm:pb-24">
        <video
          className="absolute inset-0 h-[120%] w-full object-cover will-change-transform"
          style={{ transform: `translateY(${scrollY * 0.12 - 80}px)` }}
          src={promoVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[#17231f]/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#17231f]/90 via-[#17231f]/20 to-[#17231f]/35" />
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="mt-12 max-w-2xl border-t border-white/25 pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b9dfc8]">
              Notes from the road
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
              Bangladesh
              <span className="block">and beyond.</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
              An avid traveller from Bangladesh, sharing the destinations,
              landscapes, and moments I have captured along the way.
            </p>
            <a
              href="#journeys"
              className="mt-6 inline-flex items-center border-b border-[#b9dfc8]/70 pb-1 text-sm font-semibold text-[#d9f3e2] transition-colors hover:border-white hover:text-white"
            >
              Explore the journeys
              <span className="ml-2" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default HobbyHero;
