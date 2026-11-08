import React from "react";
import { Award, ExternalLink, Film, Sparkles, Users } from "lucide-react";

const FEATURED_AWARD_VIDEO = {
  embedSrc: "https://www.youtube.com/embed/SxExkBBE0fs",
  directUrl: "https://www.youtube.com/watch?v=SxExkBBE0fs",
  badge: "1st Place Winner · UITS Videography Contest",
  event: "ZeroOne Fest 5",
  audience: "Showcased live on monitor among 500+ people",
  title: "Untold Story of Security Guard",
  description:
    "Awarded 1st Place in the UITS Videography Contest at ZeroOne Fest 5 and screened live on the main monitor in front of an audience of over 500 attendees.",
};

const TRAVEL_REELS = [
  {
    id: "reel-01",
    title: "Moments in Motion",
    embedSrc:
      "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F954504206836168%2F&show_text=false&width=267&t=0",
    directUrl: "https://www.facebook.com/reel/954504206836168/",
  },
  {
    id: "reel-02",
    title: "Frames on the Road",
    embedSrc:
      "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F999352644948298%2F&show_text=false&width=267&t=0",
    directUrl: "https://www.facebook.com/reel/999352644948298/",
  },
  {
    id: "reel-03",
    title: "Beyond the Horizon",
    embedSrc:
      "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1076170051323759%2F&show_text=false&width=267&t=0",
    directUrl: "https://www.facebook.com/reel/1076170051323759/",
  },
  {
    id: "reel-04",
    title: "Notes from the Journey",
    embedSrc:
      "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1180262096259180%2F&show_text=false&width=267&t=0",
    directUrl: "https://www.facebook.com/reel/1180262096259180/",
  },
];

const FeaturedFilmsSection = () => {
  return (
    <section
      id="films"
      className="mx-auto max-w-7xl px-6 py-20 sm:px-12 sm:py-28"
    >
      {/* Section Header */}
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#36745e]">
            Videography &amp; Reels · Featured Screenings
          </p>
          <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
            Stories in motion.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#17231f]/65">
            From award-winning festival screenings to vertical stories captured
            across the road.
          </p>
        </div>
        <a
          href="https://www.facebook.com/zamanarbin/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 self-start rounded-full border border-[#17231f]/15 bg-[#f3f0e8] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#17231f] transition hover:border-[#36745e] hover:bg-[#36745e] hover:text-white sm:self-auto"
        >
          <span>Watch more on Facebook</span>
          <ExternalLink size={13} />
        </a>
      </div>

      {/* 1. Award-Winning Widescreen Film Spotlight Card */}
      <div className="mt-10 overflow-hidden rounded-[2rem] border border-[#17231f]/10 bg-[#f3f0e8] p-5 shadow-[0_12px_0_0_#ded9cc,0_24px_48px_-15px_rgba(23,35,31,0.14)] sm:p-8">
        <div className="grid items-center gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          {/* Responsive 16:9 YouTube Cinema Frame */}
          <div className="overflow-hidden rounded-[1.5rem] border border-[#17231f]/15 bg-black shadow-lg">
            <div className="relative aspect-video w-full">
              <iframe
                width="1330"
                height="748"
                src={FEATURED_AWARD_VIDEO.embedSrc}
                title={FEATURED_AWARD_VIDEO.title}
                className="absolute inset-0 h-full w-full border-0"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>

          {/* Award Story & Context */}
          <div>
            <div className="inline-flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#36745e] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-sm">
                <Award size={14} />
                <span>{FEATURED_AWARD_VIDEO.badge}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#17231f]/15 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#17231f]">
                <Sparkles size={12} className="text-[#36745e]" />
                <span>{FEATURED_AWARD_VIDEO.event}</span>
              </span>
            </div>

            <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-[#17231f] sm:text-3xl">
              {FEATURED_AWARD_VIDEO.title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-[#17231f]/70 sm:text-base">
              {FEATURED_AWARD_VIDEO.description}
            </p>

            <div className="mt-5 flex items-center gap-2.5 rounded-2xl border border-[#17231f]/10 bg-white/70 px-4 py-3 text-xs font-medium text-[#17231f]/80">
              <Users size={16} className="shrink-0 text-[#36745e]" />
              <span>{FEATURED_AWARD_VIDEO.audience}</span>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={FEATURED_AWARD_VIDEO.directUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#17231f]/15 bg-white px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#17231f] transition hover:border-[#36745e] hover:text-[#36745e]"
              >
                <span>Watch on YouTube</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Vertical 9:16 Reels Showcase Grid */}
      <div className="mt-14">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2">
            <Film size={16} className="text-[#36745e]" />
            <h3 className="text-lg font-semibold tracking-[-0.02em] text-[#17231f] sm:text-xl">
              Featured Travel Reels
            </h3>
          </div>
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#17231f]/55">
            4 Vertical Stories · 9:16 Format
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TRAVEL_REELS.map((reel) => (
            <div
              key={reel.id}
              className="flex flex-col items-center rounded-[1.75rem] border border-[#17231f]/10 bg-[#f3f0e8] p-3.5 transition hover:border-[#36745e]/45"
            >
              {/* Exact 267×476 Aspect Ratio Frame */}
              <div className="mx-auto flex w-full max-w-[267px] items-center justify-center overflow-hidden rounded-[1.25rem] border border-[#17231f]/12 bg-black shadow-md">
                <iframe
                  src={reel.embedSrc}
                  title={reel.title}
                  width="267"
                  height="476"
                  style={{ border: "none", overflow: "hidden" }}
                  className="h-[476px] w-[267px] border-0"
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedFilmsSection;
