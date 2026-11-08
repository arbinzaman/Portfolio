import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { featuredGalleryItems, galleryItems } from "../data/travelGalleryData";

const GALLERY_TABS = [
  { id: "Highlights", label: "Curated Highlights" },
  { id: "Bangladesh", label: "Bangladesh" },
  { id: "India", label: "India" },
  { id: "Haors, Rivers & Coast", label: "Haors & Coast" },
  { id: "Hills, Forests & Falls", label: "Hills & Waterfalls" },
  { id: "Heritage & Cities", label: "Heritage & Cities" },
];

const TravelGallery = () => {
  const [activeTab, setActiveTab] = useState("Highlights");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Compute available regions cleanly
  const availableRegions = useMemo(() => {
    const counts = new Map();
    const pool =
      activeTab === "Bangladesh" || activeTab === "India"
        ? galleryItems.filter((item) => item.category === activeTab)
        : galleryItems;

    pool.forEach((item) => {
      counts.set(item.region, (counts.get(item.region) || 0) + 1);
    });
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([region, count]) => ({ region, count }));
  }, [activeTab]);

  const displayedItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    if (q || selectedRegion !== "All") {
      return galleryItems
        .filter((item) => {
          const matchesTab =
            activeTab === "Highlights"
              ? true
              : activeTab === "Bangladesh" || activeTab === "India"
                ? item.category === activeTab
                : item.theme === activeTab;
          const matchesRegion =
            selectedRegion === "All" || item.region === selectedRegion;
          const matchesSearch =
            !q ||
            item.title.toLowerCase().includes(q) ||
            item.region.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q) ||
            item.theme.toLowerCase().includes(q);
          return matchesTab && matchesRegion && matchesSearch;
        })
        .slice(0, 12);
    }

    if (activeTab === "Highlights") {
      return featuredGalleryItems;
    }
    if (activeTab === "Bangladesh" || activeTab === "India") {
      return galleryItems
        .filter((item) => item.category === activeTab)
        .slice(0, 12);
    }
    return galleryItems
      .filter((item) => item.theme === activeTab)
      .slice(0, 12);
  }, [activeTab, selectedRegion, searchQuery]);

  const isBentoMode =
    activeTab === "Highlights" &&
    selectedRegion === "All" &&
    !searchQuery.trim();

  const getBentoSpanClass = (index) => {
    if (!isBentoMode) {
      return "col-span-1 row-span-1";
    }
    if (index === 0) return "col-span-2 row-span-2";
    if (index === 5) return "col-span-2 row-span-1";
    if (index === 8) return "col-span-2 row-span-1";
    return "col-span-1 row-span-1";
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-12 sm:py-28">
      {/* Header */}
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#36745e]">
            Photo gallery · {galleryItems.length} frames archived
          </p>
          <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
            Frames from the road.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#17231f]/65">
            Organized by country, landscape, and district across Bangladesh and
            India.
          </p>
        </div>
        <Link
          to="/hobby/gallery"
          className="inline-flex items-center gap-2 self-start rounded-full border border-[#17231f]/15 bg-[#f3f0e8] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#17231f] transition hover:border-[#36745e] hover:bg-[#36745e] hover:text-white sm:self-auto"
        >
          <span>Explore full archive ({galleryItems.length})</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>

      {/* Category Tabs + Search & Region Selector (No Horizontal Scrollbar) */}
      <div className="mt-8 flex flex-col gap-4 border-b border-[#17231f]/10 pb-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {GALLERY_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const count =
              tab.id === "Highlights"
                ? featuredGalleryItems.length
                : tab.id === "Bangladesh" || tab.id === "India"
                  ? galleryItems.filter((i) => i.category === tab.id).length
                  : galleryItems.filter((i) => i.theme === tab.id).length;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedRegion("All");
                }}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                  isActive
                    ? "bg-[#36745e] text-white"
                    : "border border-[#17231f]/12 bg-[#f3f0e8]/70 text-[#17231f]/70 hover:border-[#36745e] hover:text-[#17231f]"
                }`}
              >
                {tab.label}
                <span
                  className={`ml-1.5 font-mono text-[10px] ${
                    isActive ? "text-white/80" : "text-[#17231f]/45"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input + Region Select Dropdown */}
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search region or place..."
            className="w-full rounded-full border border-[#17231f]/15 bg-white px-4 py-2 text-xs text-[#17231f] outline-none transition placeholder:text-[#17231f]/40 focus:border-[#36745e] sm:w-52"
          />
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            aria-label="Filter by region or district"
            className="rounded-full border border-[#17231f]/15 bg-[#f3f0e8] px-4 py-2 text-xs font-medium text-[#17231f] outline-none transition focus:border-[#36745e]"
          >
            <option value="All">All Regions ({availableRegions.length})</option>
            {availableRegions.map(({ region, count }) => (
              <option key={region} value={region}>
                {region} ({count})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Organized Editorial Photo Grid */}
      {displayedItems.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-[#17231f]/10 bg-[#f3f0e8]/60 p-10 text-center">
          <p className="text-sm font-medium text-[#17231f]/70">
            No photographs matched &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedRegion("All");
              setActiveTab("Highlights");
            }}
            className="mt-3 rounded-full bg-[#36745e] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="mt-8 grid auto-rows-[13.5rem] grid-cols-2 gap-3.5 sm:auto-rows-[16.5rem] sm:grid-cols-4 sm:gap-5">
          {displayedItems.map((item, index) => (
            <Link
              key={item.id}
              to={`/hobby/gallery/${item.id}`}
              className={`group relative overflow-hidden rounded-[1.5rem] bg-[#e9e6dd] ${getBentoSpanClass(
                index,
              )}`}
            >
              <img
                src={item.image}
                alt={item.alt}
                loading={index < 4 ? "eager" : "lazy"}
                decoding="async"
                fetchpriority={index < 2 ? "high" : "low"}
                sizes="(min-width: 640px) 33vw, 50vw"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />

              {/* Top Region Tag */}
              <div className="absolute left-4 top-4">
                <span className="inline-block rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur-md">
                  {item.region} · {item.category}
                </span>
              </div>

              {/* Bottom Caption */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 px-5 pb-4 pt-12 text-white">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#b9dfc8]">
                    {item.theme}
                  </p>
                  <h3 className="mt-0.5 text-sm font-semibold tracking-[-0.01em] sm:text-base">
                    {item.title}
                  </h3>
                </div>
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15 text-xs text-white backdrop-blur-sm transition group-hover:bg-[#36745e]"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default TravelGallery;
