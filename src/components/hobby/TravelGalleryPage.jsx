import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { stories } from "./StoriesSection";
import { galleryItems } from "./travelGalleryData";

const filters = ["All", "Bangladesh", "India"];

const groupItems = (items) =>
  items.reduce((groups, item) => {
    if (!groups[item.region]) groups[item.region] = [];
    groups[item.region].push(item);
    return groups;
  }, {});

const TravelGalleryPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    document.title = "Travel Gallery | Arbin Zaman";
  }, []);

  const visibleItems = useMemo(
    () =>
      activeFilter === "All"
        ? galleryItems
        : galleryItems.filter((item) => item.category === activeFilter),
    [activeFilter],
  );
  const groupedItems = groupItems(visibleItems);

  return (
    <main className="min-h-screen bg-[#fbfaf7] px-6 py-8 text-[#17231f] sm:px-12 sm:py-12">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/hobby"
          className="text-xs font-semibold uppercase tracking-[0.2em] text-[#36745e]"
        >
          ← Back to journeys
        </Link>
        <header className="mt-16 flex flex-col justify-between gap-8 border-b border-[#17231f]/10 pb-10 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#36745e]">
              Arbin Zaman · Travel archive
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.07em] sm:text-8xl">
              Frames from the road.
            </h1>
          </div>
          <p className="max-w-xs text-sm leading-7 text-[#17231f]/60">
            Browse every photograph by country, state, or district.
          </p>
        </header>

        <nav
          className="sticky top-0 z-10 -mx-6 mt-8 flex gap-2 overflow-x-auto bg-[#fbfaf7]/95 px-6 py-4 backdrop-blur sm:mx-0 sm:px-0"
          aria-label="Gallery filters"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`whitespace-nowrap rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                activeFilter === filter
                  ? "border-[#17231f] bg-[#17231f] text-white"
                  : "border-[#17231f]/15 text-[#17231f]/60 hover:border-[#36745e] hover:text-[#36745e]"
              }`}
            >
              {filter}
              <span className="ml-2 opacity-50">
                {filter === "All"
                  ? galleryItems.length
                  : galleryItems.filter((item) => item.category === filter)
                      .length}
              </span>
            </button>
          ))}
        </nav>

        <div className="mt-8 space-y-16">
          {Object.entries(groupedItems).map(([region, items]) => (
            <section key={region} aria-labelledby={`region-${region}`}>
              <div className="mb-6 flex items-end justify-between border-b border-[#17231f]/10 pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#36745e]">
                    {items[0].category}
                  </p>
                  <h2
                    id={`region-${region}`}
                    className="mt-2 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl"
                  >
                    {region}
                  </h2>
                </div>
                <span className="text-xs text-[#17231f]/45">
                  {items.length} {items.length === 1 ? "photo" : "photos"}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
                {items.map((item, index) => (
                  <Link
                    key={item.id}
                    to={`/hobby/gallery/${item.id}`}
                    className="group relative overflow-hidden rounded-[1.5rem] bg-[#e9e6dd]"
                  >
                    <div className="aspect-[4/5]">
                      <img
                        src={item.image}
                        alt={item.alt}
                        loading={index < 2 ? "eager" : "lazy"}
                        decoding="async"
                        fetchpriority={index < 2 ? "high" : "low"}
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-5 pb-5 pt-16 text-white">
                      <h3 className="text-sm font-medium">{item.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-24 border-t border-[#17231f]/10 pt-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#36745e]">
            Stories by region
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {stories.map((story) => (
              <Link
                key={story.slug}
                to={`/hobby/stories/${story.slug}`}
                className="rounded-[1.5rem] border border-[#17231f]/10 p-6 transition hover:border-[#36745e] hover:bg-white"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#36745e]">
                  {story.category} · {story.region}
                </p>
                <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">
                  {story.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#17231f]/60">
                  {story.excerpt}
                </p>
                <span className="mt-6 inline-block text-xs font-semibold uppercase tracking-[0.16em] text-[#36745e]">
                  Read story ↗
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default TravelGalleryPage;
