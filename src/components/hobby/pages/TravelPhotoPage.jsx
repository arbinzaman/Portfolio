import React, { useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

import { galleryItems } from "../data/travelGalleryData";
import { HobbyThemeToggle } from "../context/HobbyThemeContext";

const TravelPhotoPage = () => {
  const { pathname } = useLocation();
  const photoId = pathname.split("/").pop();
  const currentIndex = galleryItems.findIndex((photo) => photo.id === photoId);
  const item = currentIndex >= 0 ? galleryItems[currentIndex] : null;

  const prevItem =
    currentIndex >= 0
      ? galleryItems[
          (currentIndex - 1 + galleryItems.length) % galleryItems.length
        ]
      : null;
  const nextItem =
    currentIndex >= 0
      ? galleryItems[(currentIndex + 1) % galleryItems.length]
      : null;

  const relatedItems = useMemo(() => {
    if (!item) return [];
    return galleryItems
      .filter(
        (photo) =>
          photo.id !== item.id &&
          (photo.region === item.region || photo.category === item.category),
      )
      .slice(0, 4);
  }, [item]);

  useEffect(() => {
    document.title = item
      ? `${item.title} | Arbin Zaman`
      : "Photo not found | Arbin Zaman";
  }, [item]);

  if (!item) {
    return (
      <main className="min-h-screen bg-[#fbfaf7] px-6 py-16 text-[#17231f] sm:px-12">
        <Link to="/hobby/gallery" className="text-[#36745e]">
          ← Return to the gallery
        </Link>
        <h1 className="mt-12 text-4xl font-semibold">Photo not found</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fbfaf7] px-6 py-8 text-[#17231f] sm:px-12 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/hobby/gallery"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-[#36745e] hover:opacity-80"
          >
            ← Back to gallery
          </Link>
          <div className="flex flex-wrap items-center gap-2.5">
            <HobbyThemeToggle />
            {prevItem && (
              <Link
                to={`/hobby/gallery/${prevItem.id}`}
                className="rounded-full border border-[#17231f]/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#17231f]/80 transition hover:border-[#36745e] hover:text-[#36745e]"
              >
                ← Prev
              </Link>
            )}
            {nextItem && (
              <Link
                to={`/hobby/gallery/${nextItem.id}`}
                className="rounded-full border border-[#17231f]/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#17231f]/80 transition hover:border-[#36745e] hover:text-[#36745e]"
              >
                Next →
              </Link>
            )}
          </div>
        </div>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="overflow-hidden rounded-[2rem] border border-[#17231f]/12 bg-[#f3f0e8]">
            <img
              src={item.image}
              alt={item.alt}
              className="max-h-[75vh] w-full object-contain"
            />
          </div>
          <div>
            <span className="inline-block rounded-full border border-[#36745e]/30 bg-[#36745e]/15 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#36745e]">
              {item.theme}
            </span>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#36745e]">
              {item.category} · {item.region}
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] sm:text-6xl">
              {item.title}
            </h1>
            <p className="mt-6 max-w-md text-base leading-8 text-[#17231f]/65">
              A moment from the road, preserved as part of Arbin Zaman&apos;s
              travel archive in {item.region}, {item.category}.
            </p>
            <p className="mt-8 border-l border-[#36745e]/60 pl-4 text-sm text-[#36745e]">
              Captured in {item.region} · Frame {currentIndex + 1} of{" "}
              {galleryItems.length}
            </p>
          </div>
        </div>

        {relatedItems.length > 0 && (
          <section className="mt-16 border-t border-[#17231f]/12 pt-10">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#36745e]">
              More from {item.region} &amp; {item.category}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {relatedItems.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/hobby/gallery/${rel.id}`}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#e9e6dd]"
                >
                  <img
                    src={rel.image}
                    alt={rel.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-xs font-medium text-white">
                    {rel.title}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default TravelPhotoPage;
