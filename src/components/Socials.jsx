import {
  Github,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";

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
    <section className="relative z-10 px-6 py-10 text-white sm:px-12 sm:py-12">
      <div className="mx-auto max-w-7xl border-t border-white/[0.08] pt-7 sm:pt-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#c4b5fd]/75">
              Around the web
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-white sm:text-2xl">
              Find me online.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-secondary sm:text-right">
            Follow my work, projects, and ideas across these platforms.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5">
          {socialLinks.map(({ name, url, handle, Icon }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit Arbin on ${name} (${handle})`}
              className="group flex min-w-0 items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] px-3 py-3 transition-colors duration-200 hover:border-[#a78bfa]/35 hover:bg-white/[0.045] sm:px-4"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.035] text-white/65 transition-colors group-hover:border-[#a78bfa]/30 group-hover:text-[#d9d4ff]">
                <Icon size={17} strokeWidth={1.8} />
              </span>
              <span className="min-w-0 flex-1 text-left">
                <span className="block text-xs font-medium text-white/80">
                  {name}
                </span>
                <span className="mt-0.5 block truncate text-[10px] text-white/40">
                  {handle}
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Socials;
