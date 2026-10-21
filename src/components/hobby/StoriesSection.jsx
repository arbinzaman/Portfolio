import React from "react";
import { Link } from "react-router-dom";

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
    featured: true,
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

const StoriesSection = () => {
  const [featuredStory, ...otherStories] = stories;
  return (
    <section
      className="bg-[#17231f] px-6 py-20 text-[#f5f2ea] sm:px-12 sm:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 border-b border-white/15 pb-10 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#9bc6ad]">
              <span className="h-px w-8 bg-[#9bc6ad]" />
              Stories from the road
            </div>
            <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.06em] sm:text-7xl">
              Places become memories.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-7 text-white/55">
            Personal notes, honest detours, and the small moments that make a
            journey worth remembering.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
          <article className="group relative flex min-h-[30rem] flex-col justify-between overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#36745e] via-[#265b4a] to-[#12231d] p-7 sm:p-10">
            <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[2rem] border-white/10 transition duration-700 group-hover:scale-110" />
            <div className="absolute bottom-10 right-10 h-28 w-28 rounded-full border border-white/20" />
            <div className="relative flex items-start justify-between">
              <span className="text-7xl font-light tracking-[-0.08em] text-white/25">
                {featuredStory.number}
              </span>
              <span className="rounded-full border border-white/25 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75">
                {featuredStory.category}
              </span>
            </div>
            <div className="relative max-w-xl">
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-[#b9dfc8]">
                Featured story · {featuredStory.readTime}
              </p>
              <h3 className="max-w-lg text-4xl font-semibold tracking-[-0.06em] sm:text-6xl">
                {featuredStory.title}
              </h3>
              <p className="mt-5 max-w-lg text-sm leading-7 text-white/70">
                {featuredStory.excerpt}
              </p>
              <Link
              to={`/hobby/stories/${featuredStory.slug}`}
              className="mt-8 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-white"
              >
              Read full story
              <span className="text-lg transition group-hover:translate-x-1">
                ↗
              </span>
              </Link>
            </div>
          </article>

          <div className="grid gap-4">
            {otherStories.map((story) => (
              <article
                key={story.title}
                className="group flex min-h-[14rem] flex-col justify-between rounded-[2rem] border border-white/15 bg-white/[0.04] p-7 transition duration-300 hover:border-[#9bc6ad]/60 hover:bg-white/[0.08] sm:p-8"
              >
                <div className="flex items-start justify-between gap-5">
                  <span className="text-4xl font-light tracking-[-0.08em] text-[#9bc6ad]/50">
                    {story.number}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                    {story.category}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.04em]">
                    {story.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-6 text-white/55">
                    {story.excerpt}
                  </p>
                  <Link
                    to={`/hobby/stories/${story.slug}`}
                    className="mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9bc6ad]"
                  >
                    Read full story{" "}
                    <span className="ml-2 text-white/40">↗</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default StoriesSection;
