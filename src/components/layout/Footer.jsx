import React from "react";
import { Link } from "react-router-dom";
import { ArrowUp, ArrowUpRight, Compass, MapPin, Sparkles } from "lucide-react";
import { logo } from "../../assets";

const footerNavLinks = [
  { label: "Overview", href: "#about" },
  { label: "Experience", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Recognition", href: "#recognition" },
  { label: "Testimonials", href: "#feedback" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.1] bg-gradient-to-b from-transparent via-[#060816]/90 to-[#03050e] pt-12 pb-10 sm:pt-16 sm:pb-12">
      {/* 3D Perspective Horizon Grid Floor */}
      <div aria-hidden="true" className="perspective-floor h-60 opacity-60">
        <div className="perspective-floor__plane" />
      </div>

      {/* Ambient Cosmic Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-56 w-[38rem] -translate-x-1/2 rounded-full bg-[#915EFF]/12 blur-[110px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-12">
        {/* 3D CTA Deck */}
        <div className="plate-3d mb-10 sm:mb-12">
          <div className="plate-3d-face flex flex-col items-start justify-between gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:p-10">
            <div className="max-w-2xl">
              <div className="z-lift-sm mb-3 inline-flex flex-wrap items-center gap-2.5">
                <span className="tag-3d !border-emerald-400/35 !text-emerald-300">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                  AVAILABLE FOR NEW OPPORTUNITIES
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[11px] text-white/50">
                  <MapPin size={12} className="text-[#a78bfa]" />
                  Dhaka, Bangladesh
                </span>
              </div>
              <h3 className="z-lift-md extrude-3d text-2xl font-bold tracking-[-0.04em] text-white sm:text-3xl lg:text-4xl">
                Have a project or idea in mind?
              </h3>
              <p className="z-lift-sm mt-2 text-sm leading-6 text-secondary sm:text-base">
                Let&apos;s collaborate to build scalable web applications, ERP
                systems, and interactive digital products.
              </p>
            </div>

            <div className="z-lift-lg flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="key-3d key-3d--primary px-5 py-3.5 text-xs uppercase tracking-[0.12em]"
              >
                <Sparkles size={14} />
                Let&apos;s talk
                <ArrowUpRight size={15} />
              </a>
              <Link
                to="/hobby"
                className="key-3d key-3d--outline px-5 py-3.5 text-xs uppercase tracking-[0.12em]"
              >
                <Compass size={14} className="text-[#a78bfa]" />
                Travel journal
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 3-Column Architectural Footer Grid */}
        <div className="grid grid-cols-1 gap-8 border-t border-white/[0.08] py-8 md:grid-cols-12 md:items-center">
          {/* Brand Column */}
          <div className="flex flex-col gap-3 md:col-span-5">
            <a
              href="#intro"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="group inline-flex w-fit items-center gap-3"
              aria-label="Back to Arbin Zaman introduction"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.05] shadow-[0_3px_0_0_rgba(145,94,255,0.35)]">
                <img
                  src={logo}
                  alt="Arbin Zaman logo"
                  className="h-6 w-6 object-contain"
                />
              </span>
              <div>
                <span className="block text-base font-bold tracking-tight text-white transition-colors group-hover:text-[#c4b5fd]">
                  Arbin Zaman
                </span>
              </div>
            </a>
          </div>

          {/* Navigation Pills Column */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-2 md:col-span-5 md:justify-center"
          >
            {footerNavLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="tag-3d !text-[11px] !text-white/75 hover:!text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Back to Top Keycap Column */}
          <div className="flex md:col-span-2 md:justify-end">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top of page"
              className="key-3d key-3d--outline group w-fit shrink-0 px-4 py-2.5 font-mono text-xs"
            >
              <span>Back to top</span>
              <ArrowUp
                size={14}
                className="transition-transform group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>

        {/* Bottom Signature Bar */}
        <div className="flex items-center justify-center border-t border-white/[0.06] pt-6 text-xs text-white/40 sm:justify-start">
          <p>© {new Date().getFullYear()} Arbin Zaman · All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

