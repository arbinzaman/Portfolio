import React, { useMemo, useState } from "react";
import districtPaths from "./bangladeshDistrictPaths.json";

const districts = [
  ["Panchagarh", "path1"],
  ["Thakurgaon", "path2"],
  ["Dinajpur", "path4"],
  ["Nilphamari", "path0"],
  ["Lalmonirhat", "path3"],
  ["Kurigram", "path6"],
  ["Rangpur", "path5"],
  ["Gaibandha", "path7"],
  ["Joypurhat", "path16"],
  ["Bogra", "path11"],
  ["Naogaon", "path15"],
  ["Natore", "path12"],
  ["Chapainawabganj", "path10"],
  ["Pabna", "path9"],
  ["Rajshahi", "path13"],
  ["Sirajganj", "path14"],
  ["Jamalpur", "path66"],
  ["Mymensingh", "path67"],
  ["Netrokona", "path68"],
  ["Sherpur", "path66a"],
  ["Habiganj", "path64"],
  ["Moulvibazar", "path65"],
  ["Sunamganj", "path62"],
  ["Sylhet", "path63"],
  ["Dhaka", "path73"],
  ["Faridpur", "path70"],
  ["Gazipur", "path76"],
  ["Gopalganj", "path71"],
  ["Kishoreganj", "path83"],
  ["Madaripur", "path75"],
  ["Manikganj", "path72"],
  ["Munshiganj", "path79"],
  ["Narayanganj", "path78"],
  ["Narsingdi", "path77"],
  ["Rajbari", "path69"],
  ["Shariatpur", "path74"],
  ["Tangail", "path84"],
  ["Jashore", "path19"],
  ["Jhenaidah", "path17"],
  ["Khulna", "path22"],
  ["Kushtia", "path23"],
  ["Magura", "path18"],
  ["Meherpur", "path24"],
  ["Narail", "path20"],
  ["Satkhira", "path21"],
  ["Bagerhat", "path26"],
  ["Chuadanga", "path25"],
  ["Barguna", "path32"],
  ["Barishal", "path31"],
  ["Bhola", "path37"],
  ["Jhalokati", "path30"],
  ["Patuakhali", "path33"],
  ["Pirojpur", "path29"],
  ["Chattogram", "path54"],
  ["Bandarban", "path56"],
  ["Brahmanbaria", "path41"],
  ["Chandpur", "path44"],
  ["Cumilla", "path43"],
  ["Cox's Bazar", "path59"],
  ["Feni", "path51"],
  ["Khagrachhari", "path55"],
  ["Lakshmipur", "path45"],
  ["Noakhali", "path46"],
  ["Rangamati", "path57"],
];

const visitedDistricts = new Set([
  "Bandarban",
  "Brahmanbaria",
  "Chandpur",
  "Chattogram",
  "Cumilla",
  "Cox's Bazar",
  "Chapainawabganj",
  "Dhaka",
  "Faridpur",
  "Gazipur",
  "Habiganj",
  "Khagrachhari",
  "Kishoreganj",
  "Lakshmipur",
  "Manikganj",
  "Moulvibazar",
  "Munshiganj",
  "Mymensingh",
  "Narayanganj",
  "Narsingdi",
  "Netrokona",
  "Noakhali",
  "Rajshahi",
  "Rangamati",
  "Sunamganj",
  "Sylhet",
  "Tangail",
]);

const totalDistricts = districts.length;
const myCoverage = (visitedDistricts.size / totalDistricts) * 100;

const escapeXml = (value) =>
  value.replace(
    /[<>&'"]/g,
    (character) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '"': "&quot;",
      })[character],
  );

const BangladeshSection = () => {
  const [activeDistrict, setActiveDistrict] = useState(null);
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [selectedDistricts, setSelectedDistricts] = useState(new Set());
  const [visitorName, setVisitorName] = useState("");
  const pathById = useMemo(
    () => new Map(districtPaths.map((district) => [district.id, district.d])),
    [],
  );
  const selectedCount = selectedDistricts.size;
  const selectedCoverage = (selectedCount / totalDistricts) * 100;

  const toggleDistrict = (name) => {
    if (!calculatorOpen) return;

    setSelectedDistricts((current) => {
      const next = new Set(current);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  const downloadMap = () => {
    const exportVisited = calculatorOpen ? selectedDistricts : visitedDistricts;
    const exportPaths = districts
      .map(([name, pathId]) => {
        const path = pathById.get(pathId);
        const fill = exportVisited.has(name) ? "#36745e" : "#d8d4c8";
        return `<path d="${path}" fill="${fill}" stroke="#f3f0e8" stroke-width="4"/>`;
      })
      .join("");
    const exportCount = exportVisited.size;
    const exportPercentage = ((exportCount / totalDistricts) * 100).toFixed(1);
    const exportName = escapeXml(
      (calculatorOpen ? visitorName.trim() : "Arbin Zaman") || "Your",
    );
    const progressWidth = 880 * (exportCount / totalDistricts);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
      <rect width="100%" height="100%" fill="#f3f0e8"/>
      <text x="100" y="90" font-family="Arial, sans-serif" font-size="20" font-weight="700" letter-spacing="4" fill="#36745e">BANGLADESH JOURNEY MAP</text>
      <text x="100" y="180" font-family="Arial, sans-serif" font-size="58" font-weight="700" fill="#17231f">${exportName}'s Bangladesh</text>
      <text x="980" y="165" text-anchor="end" font-family="Arial, sans-serif" font-size="92" font-weight="700" fill="#36745e">${exportCount}<tspan font-size="40" fill="#68706a"> / ${totalDistricts}</tspan></text>
      <text x="980" y="205" text-anchor="end" font-family="Arial, sans-serif" font-size="20" fill="#68706a">${exportPercentage}% explored</text>
      <g transform="translate(65 265) scale(.54)">${exportPaths}</g>
      <rect x="100" y="1450" width="880" height="18" rx="9" fill="#d8d4c8"/>
      <rect x="100" y="1450" width="${progressWidth}" height="18" rx="9" fill="#36745e"/>
      <text x="100" y="1530" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="#17231f">${exportCount}/${totalDistricts} districts explored</text>
      <text x="980" y="1530" text-anchor="end" font-family="Arial, sans-serif" font-size="22" fill="#68706a">${exportPercentage}% of Bangladesh</text>
      <line x1="100" y1="1570" x2="980" y2="1570" stroke="#d8d4c8" stroke-width="2"/>
      <text x="540" y="1660" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#68706a">© 2026 Arbin Zaman · Bangladesh travel calculator made by Arbin Zaman</text>
      <text x="540" y="1705" text-anchor="middle" font-family="Arial, sans-serif" font-size="19" font-weight="700" fill="#36745e">arbin.vercel.app</text>
    </svg>`;
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1080;
      canvas.height = 1920;
      const context = canvas.getContext("2d");

      if (!context) {
        console.error("Unable to create a canvas for the Bangladesh map download.");
        return;
      }

      context.drawImage(image, 0, 0);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/jpeg", 0.94);
      link.download = `bangladesh-journey-${exportCount}-of-${totalDistricts}.jpg`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    };
    image.onerror = () => {
      console.error("Unable to prepare the Bangladesh map download.");
    };
    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  };

  return (
    <section
      id="journeys"
      className="mx-auto max-w-7xl px-6 py-20 sm:px-12 sm:py-28"
    >
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#36745e]">
            Bangladesh
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
            Journeys, not checklists.
          </h2>
          <p className="mt-6 leading-7 text-[#17231f]/65">
            A personal record of the places, people, and quiet moments I have
            discovered across Bangladesh.
          </p>
          <div className="mt-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#36745e]">
              Districts covered
            </p>
            <p className="mt-3 text-6xl font-semibold tracking-[-0.06em] text-[#17231f] sm:text-8xl">
              {visitedDistricts.size}
              <span className="text-3xl text-[#17231f]/50 sm:text-5xl">/64</span>
            </p>
            <p className="mt-2 text-sm font-medium text-[#36745e]">
              {myCoverage.toFixed(1)}% of Bangladesh explored
            </p>
            <p className="mt-3 max-w-md text-sm leading-6 text-[#17231f]/65">
              Every place adds a new frame to the story.
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] bg-[#f3f0e8] p-6 sm:p-10">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-[#36745e]/10" />
          <div className="absolute -bottom-32 -left-16 h-72 w-72 rounded-full border border-[#36745e]/10" />
          <div className="relative">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#36745e]">
                  Bangladesh journey atlas
                </p>
                <p className="mt-2 text-sm text-[#17231f]/55">
                  {calculatorOpen
                    ? "Tap districts to build your own travel map"
                    : "Hover a district to see its name"}
                </p>
              </div>
              <div className="text-right">
                <span className="block text-xs font-medium uppercase tracking-[0.16em] text-[#17231f]/45">
                  {calculatorOpen ? selectedCount : visitedDistricts.size} / {totalDistricts}
                </span>
                {calculatorOpen && (
                  <span className="mt-1 block text-xs font-medium text-[#36745e]">
                    {selectedCoverage.toFixed(1)}%
                  </span>
                )}
              </div>
            </div>

            <div className="mx-auto mt-8 max-w-[28rem]">
              <svg
                viewBox="0 0 1550.242 2149.604"
                className="h-auto w-full overflow-visible"
                role="img"
                aria-label="Map of Bangladesh showing visited districts in green"
              >
                {districts.map(([name, pathId]) => {
                  const visited = visitedDistricts.has(name);
                  const selected = selectedDistricts.has(name);
                  const active = activeDistrict === name;
                  const path = pathById.get(pathId);

                  if (!path) return null;

                  return (
                    <path
                      key={name}
                      d={path}
                      tabIndex="0"
                      role="button"
                      aria-label={`${name}${calculatorOpen ? selected ? ", selected" : ", not selected" : visited ? ", visited" : ", not visited"}`}
                      className="cursor-pointer outline-none transition-[fill,stroke,filter] duration-200 focus:stroke-[#17231f] focus:stroke-[5px]"
                      fill={
                        active
                          ? "#245741"
                          : calculatorOpen
                            ? selected
                              ? "#36745e"
                              : "#d8d4c8"
                            : visited
                              ? "#36745e"
                              : "#d8d4c8"
                      }
                      stroke={active ? "#17231f" : "#f3f0e8"}
                      strokeWidth={active ? "7" : "4"}
                      onMouseEnter={() => setActiveDistrict(name)}
                      onMouseLeave={() => setActiveDistrict(null)}
                      onFocus={() => setActiveDistrict(name)}
                      onBlur={() => setActiveDistrict(null)}
                      onClick={() => {
                        setActiveDistrict(name);
                        toggleDistrict(name);
                      }}
                    >
                      <title>
                        {name} ·{" "}
                        {calculatorOpen
                          ? selected
                            ? "Selected"
                            : "Not selected"
                          : visited
                            ? "Visited"
                            : "Not visited"}
                      </title>
                    </path>
                  );
                })}
              </svg>
            </div>

            <div className="mt-5 flex items-center justify-between gap-4 border-t border-[#17231f]/10 pt-4 text-[10px] font-medium uppercase tracking-[0.16em] text-[#17231f]/55">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#36745e]" />
                Visited
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#d8d4c8]" />
                Still to explore
              </span>
              <span className="hidden text-right sm:block">
                {activeDistrict || "64 districts"}
              </span>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  setCalculatorOpen((open) => !open);
                  setSelectedDistricts(new Set());
                  setActiveDistrict(null);
                }}
                className={`rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                  calculatorOpen
                    ? "bg-[#17231f] text-white"
                    : "bg-[#36745e] text-white hover:bg-[#245741]"
                }`}
              >
                {calculatorOpen ? "Close calculator" : "Calculate yours"}
              </button>
              <button
                type="button"
                onClick={downloadMap}
                className="rounded-full border border-[#17231f]/15 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#17231f] transition hover:border-[#36745e] hover:text-[#36745e]"
              >
                Download map
              </button>
            </div>

            {calculatorOpen && (
              <div className="mt-5 rounded-2xl border border-[#36745e]/20 bg-white/50 p-4">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#36745e]">
                      Your Bangladesh
                    </p>
                    <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#17231f]">
                      {selectedCount}
                      <span className="text-base text-[#17231f]/50">
                        {" "}
                        / {totalDistricts} districts
                      </span>
                    </p>
                  </div>
                  <p className="text-2xl font-semibold text-[#36745e]">
                    {selectedCoverage.toFixed(1)}%
                  </p>
                </div>
                <p className="mt-2 text-xs leading-5 text-[#17231f]/60">
                  Select the districts you have visited. Your map will update
                  as you go.
                </p>
                <label className="mt-4 block">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#17231f]/55">
                    Name for your map
                  </span>
                  <input
                    type="text"
                    value={visitorName}
                    onChange={(event) => setVisitorName(event.target.value)}
                    placeholder="Enter your name"
                    maxLength={40}
                    className="mt-2 w-full rounded-xl border border-[#17231f]/15 bg-white/70 px-4 py-3 text-sm text-[#17231f] outline-none transition placeholder:text-[#17231f]/35 focus:border-[#36745e]"
                  />
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BangladeshSection;
