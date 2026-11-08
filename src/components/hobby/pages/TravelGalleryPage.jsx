import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { stories } from "../sections/StoriesSection";
import { galleryItems } from "../data/travelGalleryData";
import { HobbyThemeToggle } from "../context/HobbyThemeContext";
import HobbyFooter from "../layout/HobbyFooter";

const filters = [
  "All",
  "Bangladesh",
  "India",
  "Haors, Rivers & Coast",
  "Hills, Forests & Falls",
  "Heritage & Cities",
];

const groupItemsByRegion = (items) => {
  const map = new Map();
  items.forEach((item) => {
    if (!map.has(item.region)) {
      map.set(item.region, []);
    }
    map.get(item.region).push(item);
  });
  return Array.from(map.entries()).sort(
    (a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]),
  );
};

const TravelGalleryPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeRegion, setActiveRegion] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "Travel Gallery | Arbin Zaman";
  }, []);

  const filteredByCategory = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return galleryItems.filter((item) => {
      const matchesFilter =
        activeFilter === "All"
          ? true
          : activeFilter === "Bangladesh" || activeFilter === "India"
            ? item.category === activeFilter
            : item.theme === activeFilter;

      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.region.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.theme.toLowerCase().includes(q);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const regionGroups = useMemo(
    () => groupItemsByRegion(filteredByCategory),
    [filteredByCategory],
  );

  const visibleRegionGroups = useMemo(() => {
    if (activeRegion === "All") return regionGroups;
    return regionGroups.filter(([region]) => region === activeRegion);
  }, [regionGroups, activeRegion]);

  return (
    <main className="min-h-screen bg-[#fbfaf7] px-6 py-8 text-[#17231f] sm:px-12 sm:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/hobby"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-[#36745e]"
          >
            ← Back to journeys
          </Link>
          <HobbyThemeToggle />
        </div>
        <header className="mt-12 flex flex-col justify-between gap-8 border-b border-[#17231f]/10 pb-10 sm:mt-16 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#36745e]">
              Arbin Zaman · Travel archive ({galleryItems.length} Photographs)
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.07em] sm:text-8xl">
              Frames from the road.
            </h1>
          </div>
          <p className="max-w-xs text-sm leading-7 text-[#17231f]/60">
            Browse every photograph organized by country, landscape theme,
            state, or district.
          </p>
        </header>

        {/* Sticky Filter & Search Bar (Wrapped cleanly — NO horizontal scrollbar) */}
        <nav
          className="sticky top-0 z-10 -mx-6 mt-6 flex flex-col gap-3 border-b border-[#17231f]/10 bg-[#fbfaf7]/95 px-6 py-4 backdrop-blur sm:mx-0 sm:px-0 lg:flex-row lg:items-center lg:justify-between"
          aria-label="Gallery filters"
        >
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => {
              const count =
                filter === "All"
                  ? galleryItems.length
                  : filter === "Bangladesh" || filter === "India"
                    ? galleryItems.filter((item) => item.category === filter)
                        .length
                    : galleryItems.filter((item) => item.theme === filter)
                        .length;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => {
                    setActiveFilter(filter);
                    setActiveRegion("All");
                  }}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                    activeFilter === filter
                      ? "border-[#17231f] bg-[#17231f] text-white"
                      : "border-[#17231f]/15 text-[#17231f]/65 hover:border-[#36745e] hover:text-[#36745e]"
                  }`}
                >
                  {filter}
                  <span className="ml-2 opacity-55">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Search Field + Region Select Dropdown (Replaces ugly horizontal scrollbar) */}
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search region, district, or photo..."
              className="w-full rounded-full border border-[#17231f]/15 bg-white px-4 py-2 text-xs text-[#17231f] outline-none transition placeholder:text-[#17231f]/40 focus:border-[#36745e] sm:w-60"
            />
            <select
              value={activeRegion}
              onChange={(e) => setActiveRegion(e.target.value)}
              aria-label="Select region or district"
              className="rounded-full border border-[#17231f]/15 bg-[#f3f0e8] px-4 py-2 text-xs font-medium text-[#17231f] outline-none transition focus:border-[#36745e]"
            >
              <option value="All">
                All Regions ({filteredByCategory.length} photos)
              </option>
              {regionGroups.map(([region, items]) => (
                <option key={region} value={region}>
                  {region} ({items.length})
                </option>
              ))}
            </select>
          </div>
        </nav>

        <div className="mt-8 space-y-16">
          {visibleRegionGroups.length === 0 ? (
            <div className="rounded-3xl border border-[#17231f]/10 bg-[#f3f0e8]/60 p-10 text-center">
              <p className="text-sm font-medium text-[#17231f]/70">
                No photographs matched &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveRegion("All");
                  setActiveFilter("All");
                }}
                className="mt-3 rounded-full bg-[#36745e] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white"
              >
                Reset filters
              </button>
            </div>
          ) : (
            visibleRegionGroups.map(([region, items]) => (
              <section key={region} aria-labelledby={`region-${region}`}>
                <div className="mb-6 flex items-end justify-between border-b border-[#17231f]/10 pb-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#36745e]">
                      {items[0].category} · {items[0].theme}
                    </p>
                    <h2
                      id={`region-${region}`}
                      className="mt-2 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl"
                    >
                      {region}
                    </h2>
                  </div>
                  <span className="rounded-full bg-[#f3f0e8] px-3.5 py-1 text-xs font-medium text-[#17231f]/65">
                    {items.length} {items.length === 1 ? "photo" : "photos"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
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
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent px-5 pb-4 pt-16 text-white">
                        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#b9dfc8]">
                          {item.region}
                        </p>
                        <h3 className="mt-0.5 text-sm font-semibold">
                          {item.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))
          )}
        </div>

        <section className="mt-24 border-t border-[#17231f]/10 pt-12 pb-16">
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
      <HobbyFooter />
    </main>
  );
};

export default TravelGalleryPage;
