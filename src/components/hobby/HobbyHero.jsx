import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import promoVideo from "../../assets/videos/promo video.mp4";

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
      <nav className="absolute left-0 right-0 top-0 z-20 border-b border-white/20 bg-black/10 px-6 py-5 text-white backdrop-blur-md sm:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/" className="text-sm font-semibold uppercase tracking-[0.16em]">
            Arbin Zaman
          </Link>
          <div className="flex items-center gap-5 text-xs font-medium uppercase tracking-[0.12em] text-white/75">
            <a href="#journeys" className="hidden hover:text-white sm:inline">
              Journeys
            </a>
            <a href="#stories" className="hidden hover:text-white sm:inline">
              Stories
            </a>
            <Link to="/" className="hover:text-white">
              Coding portfolio
            </Link>
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
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[#17231f]/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#17231f]/90 via-[#17231f]/20 to-[#17231f]/35" />
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-white/75">
            Notes from the road
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.06em] text-white sm:text-8xl">
            Bangladesh
            <br />
            and beyond.
          </h1>
          <p className="mt-8 max-w-lg text-base leading-7 text-white/80 sm:text-lg">
            A visual journal of places I have travelled, stories I have seen,
            and moments I have captured along the way.
          </p>
          <a
            href="#journeys"
            className="mt-10 inline-flex border-b border-white pb-2 text-sm font-semibold uppercase tracking-[0.16em]"
          >
            Explore the journeys
          </a>
        </div>
      </section>
    </>
  );
};

export default HobbyHero;
