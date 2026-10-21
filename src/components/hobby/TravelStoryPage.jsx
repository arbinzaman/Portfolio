import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { stories } from "./StoriesSection";

const TravelStoryPage = () => {
  const { pathname } = useLocation();
  const slug = pathname.split("/").pop();
  const story = stories.find((item) => item.slug === slug);

  useEffect(() => {
    document.title = story ? `${story.title} | Arbin Zaman` : "Story not found | Arbin Zaman";
  }, [story]);

  if (!story) {
    return (
      <main className="min-h-screen bg-[#fbfaf7] px-6 py-16 text-[#17231f] sm:px-12">
        <Link to="/hobby#stories" className="text-[#36745e]">
          ← Return to stories
        </Link>
        <h1 className="mt-12 text-4xl font-semibold">Story not found</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fbfaf7] px-6 py-8 text-[#17231f] sm:px-12 sm:py-12">
      <article className="mx-auto max-w-4xl">
        <Link
          to="/hobby#stories"
          className="text-xs font-semibold uppercase tracking-[0.2em] text-[#36745e]"
        >
          ← Back to stories
        </Link>
        <header className="mt-20 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#36745e]">
            {story.category} · {story.region} · {story.readTime}
          </p>
          <h1 className="mt-6 text-5xl font-semibold tracking-[-0.07em] sm:text-8xl">
            {story.title}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#17231f]/60">
            {story.excerpt}
          </p>
        </header>
        <div className="my-14 h-px bg-[#17231f]/10" />
        <div className="max-w-2xl text-lg leading-9 text-[#17231f]/75">
          <p>{story.content}</p>
          <p className="mt-8">
            This story is part of a growing collection of personal travel
            notes from Bangladesh, India, and the roads in between.
          </p>
        </div>
      </article>
    </main>
  );
};

export default TravelStoryPage;
