import React from "react";

const visitedCountries = [
  {
    name: "Bangladesh",
    code: "BD",
    detail: "Home",
  },
  {
    name: "India",
    code: "IN",
    detail: "Explored",
  },
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
              Two countries so far. Every border crossed adds another
              perspective to the archive.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {visitedCountries.map((country) => (
              <div
                key={country.name}
                className="group rounded-[1.5rem] border border-[#17231f]/10 bg-[#fbfaf7] p-6 transition-colors hover:border-[#36745e]/50"
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#36745e]">
                    {country.code}
                  </span>
                  <span className="text-xs text-[#17231f]/40">
                    {country.detail}
                  </span>
                </div>
                <p className="mt-12 text-2xl font-semibold tracking-[-0.04em]">
                  {country.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelOverview;
