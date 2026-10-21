import React from "react";
import { Link } from "react-router-dom";

import { featuredGalleryItems } from "./travelGalleryData";

const TravelGallery = () => (
  <section
    className="mx-auto max-w-7xl px-6 py-20 sm:px-12 sm:py-28"
  >
    <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#36745e]">
          Photo gallery
        </p>
        <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
          Frames from the road.
        </h2>
      </div>
      <Link
        to="/hobby/gallery"
        className="text-xs font-semibold uppercase tracking-[0.18em] text-[#36745e] transition hover:text-[#17231f]"
      >
        Explore all photos ↗
      </Link>
    </div>

    <div className="mt-10 grid auto-rows-[14rem] grid-cols-2 gap-3 sm:auto-rows-[18rem] sm:grid-cols-4 sm:gap-5">
      {featuredGalleryItems.map((item, index) => (
        <Link
          key={item.id}
          to={`/hobby/gallery/${item.id}`}
          className="group relative overflow-hidden rounded-[1.5rem]"
        >
          <img
            src={item.image}
            alt={item.alt}
            loading={index < 2 ? "eager" : "lazy"}
            decoding="async"
            fetchpriority={index < 2 ? "high" : "low"}
            sizes="(min-width: 640px) 25vw, 50vw"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-5 pb-5 pt-14 text-xs font-semibold uppercase tracking-[0.16em] text-white">
            {item.title}
          </span>
        </Link>
      ))}
    </div>
  </section>
);

export default TravelGallery;
