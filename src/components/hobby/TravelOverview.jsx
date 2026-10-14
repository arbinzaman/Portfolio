import React from "react";

const destinations = [
  { name: "Agra", region: "Uttar Pradesh", country: "India" },
  { name: "Delhi", region: "National Capital Territory", country: "India" },
  { name: "Meghalaya", region: "Meghalaya", country: "India" },
  { name: "Siliguri", region: "West Bengal", country: "India" },
  { name: "Darjeeling", region: "West Bengal", country: "India" },
  { name: "Shillong", region: "Meghalaya", country: "India" },
  { name: "Kolkata", region: "West Bengal", country: "India" },
  { name: "Sikkim", region: "Sikkim", country: "India" },
];

const TravelOverview = () => {
  return (
    <section className="border-y border-[#17231f]/10 bg-white px-6 py-16 sm:px-12 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#36745e]">
              The map so far
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
              A growing collection of places.
            </h2>
            <p className="mt-6 max-w-md leading-7 text-[#17231f]/65">
              From Bangladesh to the landscapes and cities of India, every
              journey adds another perspective to the archive.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border border-[#17231f]/10 bg-[#17231f]/10 sm:grid-cols-4">
            <div className="bg-[#fbfaf7] p-5 sm:p-6">
              <p className="text-4xl font-semibold tracking-[-0.06em]">2</p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-[#17231f]/50">
                Countries
              </p>
            </div>
            <div className="bg-[#fbfaf7] p-5 sm:p-6">
              <p className="text-4xl font-semibold tracking-[-0.06em]">4</p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-[#17231f]/50">
                Indian states
              </p>
            </div>
            <div className="bg-[#fbfaf7] p-5 sm:p-6">
              <p className="text-4xl font-semibold tracking-[-0.06em]">1</p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-[#17231f]/50">
                Capital territory
              </p>
            </div>
            <div className="bg-[#fbfaf7] p-5 sm:p-6">
              <p className="text-4xl font-semibold tracking-[-0.06em]">8</p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-[#17231f]/50">
                Indian places
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          {destinations.map(({ name, region }) => (
            <div
              key={name}
              className="rounded-full border border-[#17231f]/15 px-4 py-3 text-sm text-[#17231f]/70"
              title={region}
            >
              <span className="font-medium text-[#17231f]">{name}</span>
              <span className="ml-2 text-xs text-[#17231f]/45">{region}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelOverview;
