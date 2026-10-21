import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { galleryItems } from "./travelGalleryData";

const TravelPhotoPage = () => {
  const { pathname } = useLocation();
  const photoId = pathname.split("/").pop();
  const item = galleryItems.find((photo) => photo.id === photoId);

  useEffect(() => {
    document.title = item ? `${item.title} | Arbin Zaman` : "Photo not found | Arbin Zaman";
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
    <main className="min-h-screen bg-[#17231f] px-6 py-8 text-[#f5f2ea] sm:px-12 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/hobby/gallery"
          className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9bc6ad]"
        >
          ← Back to gallery
        </Link>
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_0.7fr]">
          <div className="overflow-hidden rounded-[2rem] bg-black/20">
            <img
              src={item.image}
              alt={item.alt}
              className="max-h-[75vh] w-full object-contain"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9bc6ad]">
              {item.category} · {item.region}
            </p>
            <h1 className="mt-6 text-5xl font-semibold tracking-[-0.07em] sm:text-7xl">
              {item.title}
            </h1>
            <p className="mt-6 max-w-md text-base leading-8 text-white/60">
              A moment from the road, preserved as part of Arbin Zaman&apos;s
              travel archive.
            </p>
            <p className="mt-8 border-l border-[#9bc6ad]/60 pl-4 text-sm text-[#9bc6ad]">
              Captured in {item.region}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TravelPhotoPage;
