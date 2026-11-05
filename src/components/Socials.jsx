import React from "react";
import {
  Github,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  ArrowUpRight,
} from "lucide-react";
import ResponsiveTilt from "./ResponsiveTilt";

export const socialLinks = [
  {
    name: "GitHub",
    Icon: Github,
    url: "https://github.com/arbinzaman",
    handle: "arbinzaman",
  },
  {
    name: "Facebook",
    Icon: Facebook,
    url: "https://www.facebook.com/arbin.zaman.90/",
    handle: "arbin.zaman",
  },
  {
    name: "Instagram",
    Icon: Instagram,
    url: "https://www.instagram.com/zamanarbin/",
    handle: "@zamanarbin",
  },
  {
    name: "LinkedIn",
    Icon: Linkedin,
    url: "https://www.linkedin.com/in/zamanarbin/",
    handle: "in/zamanarbin",
  },
  {
    name: "Twitter",
    Icon: Twitter,
    url: "https://twitter.com/ArbinZaman",
    handle: "@ArbinZaman",
  },
];

const Socials = () => {
  return (
    <section className="relative z-10 px-6 py-12 text-white sm:px-12 sm:py-16">
      <div className="mx-auto max-w-7xl border-t border-white/[0.08] pt-8 sm:pt-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#c4b5fd]/75">
              Around the web
            </p>
            <h2 className="extrude-3d mt-2 text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
              <span data-text="Find me online." className="exploded-type-3d">
                Find me online.
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-secondary sm:text-right">
            Follow my work, open-source repositories, and ideas across these
            platforms.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {socialLinks.map(({ name, url, handle, Icon }) => (
            <ResponsiveTilt
              key={name}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={950}
              scale={1.03}
              transitionSpeed={400}
              className="plate-3d group"
            >
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit Arbin on ${name} (${handle})`}
                className="plate-3d-face flex min-w-0 items-center justify-between gap-3 px-4 py-4"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="z-lift-lg flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-white/80 shadow-[0_4px_0_0_rgba(145,94,255,0.35)] transition-colors group-hover:border-[#a78bfa]/60 group-hover:text-[#c4b5fd]">
                    <Icon size={18} strokeWidth={1.8} />
                  </span>
                  <span className="z-lift-sm min-w-0 flex-1 text-left">
                    <span className="block text-xs font-semibold text-white">
                      {name}
                    </span>
                    <span className="mt-0.5 block truncate font-mono text-[10px] text-white/50">
                      {handle}
                    </span>
                  </span>
                </div>
                <ArrowUpRight
                  size={15}
                  className="z-lift-md shrink-0 text-white/35 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#c4b5fd]"
                />
              </a>
            </ResponsiveTilt>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Socials;
