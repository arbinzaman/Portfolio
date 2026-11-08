import React, { useMemo, useRef, useState } from "react";
import districtPaths from "../data/bangladeshDistrictPaths.json";
import worldCountryPaths from "../data/worldCountryPaths.json";
import { useHobbyTheme } from "../context/HobbyThemeContext";

const districts = [
  ["Panchagarh", "path1", "Rangpur"],
  ["Thakurgaon", "path2", "Rangpur"],
  ["Dinajpur", "path4", "Rangpur"],
  ["Nilphamari", "path0", "Rangpur"],
  ["Lalmonirhat", "path3", "Rangpur"],
  ["Kurigram", "path6", "Rangpur"],
  ["Rangpur", "path5", "Rangpur"],
  ["Gaibandha", "path7", "Rangpur"],
  ["Joypurhat", "path16", "Rajshahi"],
  ["Bogra", "path11", "Rajshahi"],
  ["Naogaon", "path15", "Rajshahi"],
  ["Natore", "path12", "Rajshahi"],
  ["Chapainawabganj", "path10", "Rajshahi"],
  ["Pabna", "path9", "Rajshahi"],
  ["Rajshahi", "path13", "Rajshahi"],
  ["Sirajganj", "path14", "Rajshahi"],
  ["Jamalpur", "path66", "Mymensingh"],
  ["Mymensingh", "path67", "Mymensingh"],
  ["Netrokona", "path68", "Mymensingh"],
  ["Sherpur", "path66a", "Mymensingh"],
  ["Habiganj", "path64", "Sylhet"],
  ["Moulvibazar", "path65", "Sylhet"],
  ["Sunamganj", "path62", "Sylhet"],
  ["Sylhet", "path63", "Sylhet"],
  ["Dhaka", "path73", "Dhaka"],
  ["Faridpur", "path70", "Dhaka"],
  ["Gazipur", "path76", "Dhaka"],
  ["Gopalganj", "path71", "Dhaka"],
  ["Kishoreganj", "path83", "Dhaka"],
  ["Madaripur", "path75", "Dhaka"],
  ["Manikganj", "path72", "Dhaka"],
  ["Munshiganj", "path79", "Dhaka"],
  ["Narayanganj", "path78", "Dhaka"],
  ["Narsingdi", "path77", "Dhaka"],
  ["Rajbari", "path69", "Dhaka"],
  ["Shariatpur", "path74", "Dhaka"],
  ["Tangail", "path84", "Dhaka"],
  ["Jashore", "path19", "Khulna"],
  ["Jhenaidah", "path17", "Khulna"],
  ["Khulna", "path22", "Khulna"],
  ["Kushtia", "path23", "Khulna"],
  ["Magura", "path18", "Khulna"],
  ["Meherpur", "path24", "Khulna"],
  ["Narail", "path20", "Khulna"],
  ["Satkhira", "path21", "Khulna"],
  ["Bagerhat", "path26", "Khulna"],
  ["Chuadanga", "path25", "Khulna"],
  ["Barguna", "path32", "Barishal"],
  ["Barishal", "path31", "Barishal"],
  ["Bhola", "path37", "Barishal"],
  ["Jhalokati", "path30", "Barishal"],
  ["Patuakhali", "path33", "Barishal"],
  ["Pirojpur", "path29", "Barishal"],
  ["Chattogram", "path54", "Chattogram"],
  ["Bandarban", "path56", "Chattogram"],
  ["Brahmanbaria", "path41", "Chattogram"],
  ["Chandpur", "path44", "Chattogram"],
  ["Cumilla", "path43", "Chattogram"],
  ["Cox's Bazar", "path59", "Chattogram"],
  ["Feni", "path51", "Chattogram"],
  ["Khagrachhari", "path55", "Chattogram"],
  ["Lakshmipur", "path45", "Chattogram"],
  ["Noakhali", "path46", "Chattogram"],
  ["Rangamati", "path57", "Chattogram"],
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

const visitedWorldCountries = new Set(["Bangladesh", "India"]);

const WORLD_ZOOM_PRESETS = [
  { id: "all", label: "Whole World", x: 0, y: 20, w: 1000, h: 465 },
  { id: "Asia", label: "Asia", x: 560, y: 90, w: 340, h: 225 },
  { id: "Europe", label: "Europe", x: 430, y: 45, w: 210, h: 150 },
  { id: "Africa", label: "Africa", x: 430, y: 175, w: 230, h: 235 },
  { id: "North America", label: "N. America", x: 45, y: 40, w: 310, h: 225 },
  { id: "South America", label: "S. America", x: 235, y: 255, w: 190, h: 225 },
  { id: "Oceania", label: "Oceania", x: 750, y: 270, w: 240, h: 185 },
];

const totalDistricts = districts.length;
const totalWorldCountries = worldCountryPaths.length;

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
  const { isDark } = useHobbyTheme();
  // Unified Map Mode: "bangladesh" | "world"
  const [mapMode, setMapMode] = useState("bangladesh");
  const [is3DMode, setIs3DMode] = useState(true);

  // World Map Interactive Viewport (Zoom + Pan)
  const [activePreset, setActivePreset] = useState("all");
  const [viewBoxState, setViewBoxState] = useState({
    x: 0,
    y: 20,
    w: 1000,
    h: 465,
  });
  const [isDraggingMap, setIsDraggingMap] = useState(false);
  const svgContainerRef = useRef(null);
  const isPanningRef = useRef(false);
  const panStartRef = useRef({ clientX: 0, clientY: 0, x: 0, y: 0 });
  const didDragRef = useRef(false);

  // Hover & tap state
  const [activePlace, setActivePlace] = useState(null);
  const [tappedPlace, setTappedPlace] = useState(null);

  // Calculator / Map Creator state
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [selectedDistricts, setSelectedDistricts] = useState(new Set());
  const [selectedCountries, setSelectedCountries] = useState(
    new Set(["Bangladesh"]),
  );
  const [visitorName, setVisitorName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const pathById = useMemo(
    () => new Map(districtPaths.map((district) => [district.id, district.d])),
    [],
  );

  const divisionByDistrict = useMemo(
    () => new Map(districts.map(([name, , div]) => [name, div])),
    [],
  );

  const continentByCountry = useMemo(
    () => new Map(worldCountryPaths.map((c) => [c.name, c.continent])),
    [],
  );

  const isBangladesh = mapMode === "bangladesh";
  const totalCount = isBangladesh ? totalDistricts : totalWorldCountries;
  const defaultVisitedSet = isBangladesh
    ? visitedDistricts
    : visitedWorldCountries;
  const currentSelectedSet = isBangladesh
    ? selectedDistricts
    : selectedCountries;

  const activeSet = calculatorOpen ? currentSelectedSet : defaultVisitedSet;
  const activeCount = activeSet.size;
  const activeCoverage = (activeCount / totalCount) * 100;

  const selectWorldPreset = (presetId) => {
    const preset =
      WORLD_ZOOM_PRESETS.find((p) => p.id === presetId) ||
      WORLD_ZOOM_PRESETS[0];
    setActivePreset(preset.id);
    setViewBoxState({ x: preset.x, y: preset.y, w: preset.w, h: preset.h });
  };

  const zoomWorldMap = (factor) => {
    setActivePreset("custom");
    setViewBoxState((prev) => {
      const newW = Math.max(110, Math.min(1000, prev.w * factor));
      const newH = Math.max(52, Math.min(465, prev.h * factor));
      const cx = prev.x + prev.w / 2;
      const cy = prev.y + prev.h / 2;
      const newX = Math.max(0, Math.min(1000 - newW, cx - newW / 2));
      const newY = Math.max(0, Math.min(485 - newH, cy - newH / 2));
      return { x: newX, y: newY, w: newW, h: newH };
    });
  };

  const panWorldMapByStep = (dirX, dirY) => {
    setActivePreset("custom");
    setViewBoxState((prev) => {
      const stepX = Math.max(35, prev.w * 0.22) * dirX;
      const stepY = Math.max(25, prev.h * 0.22) * dirY;
      const maxX = Math.max(0, 1000 - prev.w);
      const maxY = Math.max(0, 485 - prev.h);
      return {
        ...prev,
        x: Math.max(0, Math.min(maxX, prev.x + stepX)),
        y: Math.max(0, Math.min(maxY, prev.y + stepY)),
      };
    });
  };

  const startPan = (clientX, clientY) => {
    if (isBangladesh) return;
    isPanningRef.current = true;
    didDragRef.current = false;
    setIsDraggingMap(true);
    panStartRef.current = {
      clientX,
      clientY,
      x: viewBoxState.x,
      y: viewBoxState.y,
    };
  };

  const movePan = (clientX, clientY) => {
    if (!isPanningRef.current || isBangladesh) return;
    const dx = clientX - panStartRef.current.clientX;
    const dy = clientY - panStartRef.current.clientY;
    if (Math.hypot(dx, dy) > 4) {
      didDragRef.current = true;
    }
    const containerWidth = svgContainerRef.current?.clientWidth || 800;
    const containerHeight = svgContainerRef.current?.clientHeight || 400;
    const scaleX = viewBoxState.w / containerWidth;
    const scaleY = viewBoxState.h / containerHeight;

    const maxX = Math.max(0, 1000 - viewBoxState.w);
    const maxY = Math.max(0, 485 - viewBoxState.h);

    const nextX = Math.max(
      0,
      Math.min(maxX, panStartRef.current.x - dx * scaleX),
    );
    const nextY = Math.max(
      0,
      Math.min(maxY, panStartRef.current.y - dy * scaleY),
    );
    setViewBoxState((prev) => ({ ...prev, x: nextX, y: nextY }));
  };

  const endPan = () => {
    isPanningRef.current = false;
    setIsDraggingMap(false);
  };

  const togglePlace = (name) => {
    if (!calculatorOpen) return;

    if (isBangladesh) {
      setSelectedDistricts((current) => {
        const next = new Set(current);
        if (next.has(name)) next.delete(name);
        else next.add(name);
        return next;
      });
    } else {
      setSelectedCountries((current) => {
        const next = new Set(current);
        if (next.has(name)) next.delete(name);
        else next.add(name);
        return next;
      });
    }
  };

  const toggleGroup = (groupName) => {
    if (!calculatorOpen) return;

    if (isBangladesh) {
      const groupItems = districts
        .filter(([, , div]) => div === groupName)
        .map(([name]) => name);
      setSelectedDistricts((current) => {
        const next = new Set(current);
        const allIn = groupItems.every((item) => next.has(item));
        groupItems.forEach((item) => (allIn ? next.delete(item) : next.add(item)));
        return next;
      });
    } else {
      const groupItems = worldCountryPaths
        .filter((c) => c.continent === groupName)
        .map((c) => c.name);
      setSelectedCountries((current) => {
        const next = new Set(current);
        const allIn = groupItems.every((item) => next.has(item));
        groupItems.forEach((item) => (allIn ? next.delete(item) : next.add(item)));
        return next;
      });
    }
  };

  const filteredPlaceList = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (isBangladesh) {
      return districts
        .map(([name, , div]) => ({ name, group: div }))
        .filter(
          (item) =>
            !q ||
            item.name.toLowerCase().includes(q) ||
            item.group.toLowerCase().includes(q),
        );
    }
    return worldCountryPaths
      .map((c) => ({ name: c.name, group: c.continent }))
      .filter(
        (item) =>
          !q ||
          item.name.toLowerCase().includes(q) ||
          item.group.toLowerCase().includes(q),
      );
  }, [isBangladesh, searchQuery]);

  const groupSummaries = useMemo(() => {
    if (isBangladesh) {
      const divNames = [
        "Dhaka",
        "Chattogram",
        "Sylhet",
        "Rajshahi",
        "Mymensingh",
        "Khulna",
        "Barishal",
        "Rangpur",
      ];
      return divNames.map((div) => {
        const items = districts.filter(([, , d]) => d === div);
        const count = items.filter(([name]) => activeSet.has(name)).length;
        return { name: div, count, total: items.length };
      });
    }
    const contNames = [
      "Asia",
      "Europe",
      "Africa",
      "North America",
      "South America",
      "Oceania",
    ];
    return contNames.map((cont) => {
      const items = worldCountryPaths.filter((c) => c.continent === cont);
      const count = items.filter((c) => activeSet.has(c.name)).length;
      return { name: cont, count, total: items.length };
    });
  }, [isBangladesh, activeSet]);

  const downloadMap = () => {
    const exportVisited = activeSet;
    const exportCount = exportVisited.size;
    const exportPercentage = ((exportCount / totalCount) * 100).toFixed(1);
    const exportName = escapeXml(
      (calculatorOpen ? visitorName.trim() : "Arbin Zaman") || "Your",
    );
    const progressWidth = Math.max(12, 880 * (exportCount / totalCount));

    // Theme-aware SVG & Poster Palette
    const pBg = isDark ? "#0d1512" : "#f3f0e8";
    const pText = isDark ? "#eef3ef" : "#17231f";
    const pSub = isDark ? "#8fa89b" : "#68706a";
    const pAccent = isDark ? "#4eb88e" : "#36745e";
    const pUnvisited = isDark ? "#23352d" : "#d8d4c8";
    const pDepthUnvisited = isDark ? "#121d18" : "#b8b2a2";
    const pDepthVisited = isDark ? "#183d2e" : "#1b3f31";
    const pOceanFill = isDark ? "#101b17" : "#e6e1d4";

    let mapGraphic = "";
    if (isBangladesh) {
      const baseExtrusion = districts
        .map(([name, pathId]) => {
          const path = pathById.get(pathId);
          const isVis = exportVisited.has(name);
          return `<path d="${path}" transform="translate(8, 14)" fill="${
            isVis ? pDepthVisited : pDepthUnvisited
          }" stroke="${isVis ? pDepthVisited : pDepthUnvisited}" stroke-width="2"/>`;
        })
        .join("");

      const topSurface = districts
        .map(([name, pathId]) => {
          const path = pathById.get(pathId);
          const isVis = exportVisited.has(name);
          const lift = isVis ? 'transform="translate(-4, -8)"' : "";
          const fill = isVis ? "#36745e" : pUnvisited;
          return `<path d="${path}" ${lift} fill="${fill}" stroke="${pBg}" stroke-width="4"/>`;
        })
        .join("");

      mapGraphic = `<g transform="translate(65 265) scale(.54)">${baseExtrusion}${topSurface}</g>`;
    } else {
      const baseExtrusion = worldCountryPaths
        .map((c) => {
          const isVis = exportVisited.has(c.name);
          return `<path d="${c.d}" transform="translate(2.5, 4.5)" fill="${
            isVis ? pDepthVisited : pDepthUnvisited
          }"/>`;
        })
        .join("");

      const topSurface = worldCountryPaths
        .map((c) => {
          const isVis = exportVisited.has(c.name);
          const lift = isVis ? 'transform="translate(-1.5, -2.5)"' : "";
          const fill = isVis ? "#36745e" : pUnvisited;
          return `<path d="${c.d}" ${lift} fill="${fill}" stroke="${pBg}" stroke-width="0.8"/>`;
        })
        .join("");

      mapGraphic = `
        <rect x="65" y="420" width="950" height="540" rx="32" fill="${pOceanFill}" stroke="${pUnvisited}" stroke-width="2"/>
        <g transform="translate(85 460) scale(0.91)">${baseExtrusion}${topSurface}</g>
      `;
    }

    const headerLabel = isBangladesh
      ? "BANGLADESH 3D JOURNEY MAP"
      : "WORLD 3D JOURNEY MAP";
    const titleLabel = isBangladesh
      ? `${exportName}'s Bangladesh`
      : `${exportName}'s World Map`;
    const unitLabel = isBangladesh ? "districts" : "countries";
    const scopeLabel = isBangladesh ? "of Bangladesh" : "of the World";

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
      <rect width="100%" height="100%" fill="${pBg}"/>
      <text x="100" y="90" font-family="Arial, sans-serif" font-size="20" font-weight="700" letter-spacing="4" fill="${pAccent}">${headerLabel}</text>
      <text x="100" y="180" font-family="Arial, sans-serif" font-size="56" font-weight="700" fill="${pText}">${titleLabel}</text>
      <text x="980" y="165" text-anchor="end" font-family="Arial, sans-serif" font-size="92" font-weight="700" fill="${pAccent}">${exportCount}<tspan font-size="40" fill="${pSub}"> / ${totalCount}</tspan></text>
      <text x="980" y="205" text-anchor="end" font-family="Arial, sans-serif" font-size="20" fill="${pSub}">${exportPercentage}% explored</text>
      ${mapGraphic}
      <rect x="100" y="1450" width="880" height="18" rx="9" fill="${pUnvisited}"/>
      <rect x="100" y="1450" width="${progressWidth}" height="18" rx="9" fill="#36745e"/>
      <text x="100" y="1530" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="${pText}">${exportCount}/${totalCount} ${unitLabel} explored</text>
      <text x="980" y="1530" text-anchor="end" font-family="Arial, sans-serif" font-size="22" fill="${pSub}">${exportPercentage}% ${scopeLabel}</text>
      <line x1="100" y1="1570" x2="980" y2="1570" stroke="${pUnvisited}" stroke-width="2"/>
      <text x="540" y="1660" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="${pSub}">© 2026 Arbin Zaman · 3D Travel Map Creator by Arbin Zaman</text>
      <text x="540" y="1705" text-anchor="middle" font-family="Arial, sans-serif" font-size="19" font-weight="700" fill="${pAccent}">arbin.vercel.app/hobby</text>
    </svg>`;

    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1080;
      canvas.height = 1920;
      const context = canvas.getContext("2d");

      if (!context) return;

      context.drawImage(image, 0, 0);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/jpeg", 0.94);
      link.download = `${mapMode}-journey-${exportCount}-of-${totalCount}.jpg`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    };
    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  };

  const inspectedPlace = activePlace || tappedPlace;
  const inspectedGroup = inspectedPlace
    ? isBangladesh
      ? `${divisionByDistrict.get(inspectedPlace) || ""} Division`
      : continentByCountry.get(inspectedPlace) || ""
    : null;

  const isWorldZoomed = !isBangladesh && viewBoxState.w < 980;

  return (
    <section className="mx-auto max-w-[90rem] px-4 py-20 sm:px-10 sm:py-28">
      <div
        className={`grid gap-10 ${
          isBangladesh
            ? "lg:grid-cols-[0.72fr_1.28fr] lg:items-center"
            : "lg:grid-cols-1"
        }`}
      >
        {/* Top / Left Info Panel */}
        <div
          className={
            !isBangladesh
              ? "flex flex-col justify-between gap-8 lg:flex-row lg:items-end"
              : ""
          }
        >
          <div className={!isBangladesh ? "max-w-2xl" : ""}>
            <div className="inline-flex rounded-full border border-[#17231f]/12 bg-[#f3f0e8] p-1">
              <button
                type="button"
                onClick={() => {
                  setMapMode("bangladesh");
                  setActivePlace(null);
                  setTappedPlace(null);
                  setSearchQuery("");
                }}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                  isBangladesh
                    ? "bg-[#36745e] text-white shadow-sm"
                    : "text-[#17231f]/65 hover:text-[#17231f]"
                }`}
              >
                Bangladesh (64)
              </button>
              <button
                type="button"
                onClick={() => {
                  setMapMode("world");
                  setActivePlace(null);
                  setTappedPlace(null);
                  setSearchQuery("");
                }}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                  !isBangladesh
                    ? "bg-[#36745e] text-white shadow-sm"
                    : "text-[#17231f]/65 hover:text-[#17231f]"
                }`}
              >
                World Map ({totalWorldCountries})
              </button>
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-[#36745e]">
              {isBangladesh ? "Bangladesh" : "World Travel Atlas"}
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
              Journeys, not checklists.
            </h2>
            <p className="mt-5 leading-7 text-[#17231f]/65">
              {isBangladesh
                ? "A personal record of the places, people, and quiet moments I have discovered across Bangladesh."
                : "From home in Bangladesh to the mountain passes of Sikkim, Meghalaya, West Bengal, and Agra — or click Create Your World Map to select countries and download your custom atlas."}
            </p>
          </div>

          <div className={!isBangladesh ? "lg:text-right" : "mt-10"}>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#36745e]">
              {isBangladesh ? "Districts covered" : "Countries covered"}
            </p>
            <p className="mt-2 text-6xl font-semibold tracking-[-0.06em] text-[#17231f] sm:text-8xl">
              {activeCount}
              <span className="text-3xl text-[#17231f]/50 sm:text-5xl">
                /{totalCount}
              </span>
            </p>
            <p className="mt-2 text-sm font-medium text-[#36745e]">
              {activeCoverage.toFixed(1)}% of{" "}
              {isBangladesh ? "Bangladesh" : "the World"} explored
            </p>
            {isBangladesh && (
              <p className="mt-3 max-w-md text-sm leading-6 text-[#17231f]/65">
                Every place adds a new frame to the story.
              </p>
            )}
          </div>

          {/* Division / Continent Breakdown Pills (Wrapped Grid — zero scrollbar) */}
          {isBangladesh && (
            <div className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-2">
              {groupSummaries.map((g) => {
                const pct = Math.round((g.count / g.total) * 100);
                return (
                  <button
                    key={g.name}
                    type="button"
                    onClick={() => {
                      if (calculatorOpen) toggleGroup(g.name);
                    }}
                    className="rounded-2xl border border-[#17231f]/10 bg-[#f3f0e8]/75 px-3.5 py-2.5 text-left transition hover:border-[#36745e]/45"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#17231f]">
                        {g.name}
                      </span>
                      <span className="font-mono text-[11px] font-semibold text-[#36745e]">
                        {g.count}/{g.total}
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#d8d4c8]">
                      <div
                        className="h-full rounded-full bg-[#36745e] transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Continent Breakdown Row when in Full-Width World Map Mode */}
        {!isBangladesh && (
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
            {groupSummaries.map((g) => {
              const pct = Math.round((g.count / g.total) * 100);
              return (
                <button
                  key={g.name}
                  type="button"
                  onClick={() => {
                    if (calculatorOpen) {
                      toggleGroup(g.name);
                    } else {
                      selectWorldPreset(
                        activePreset === g.name ? "all" : g.name,
                      );
                    }
                  }}
                  className={`rounded-2xl border px-3.5 py-2.5 text-left transition ${
                    activePreset === g.name
                      ? "border-[#36745e] bg-[#36745e]/10"
                      : "border-[#17231f]/10 bg-[#f3f0e8]/75 hover:border-[#36745e]/45"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#17231f]">
                      {g.name}
                    </span>
                    <span className="font-mono text-[11px] font-semibold text-[#36745e]">
                      {g.count}/{g.total}
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#d8d4c8]">
                    <div
                      className="h-full rounded-full bg-[#36745e] transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Map Studio Card (Large & Expansive) */}
        <div className="relative overflow-hidden rounded-[2rem] border border-[#17231f]/10 bg-[#f3f0e8] p-5 shadow-[0_12px_0_0_#ded9cc,0_24px_48px_-15px_rgba(23,35,31,0.14)] sm:p-8">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-[#36745e]/10" />
          <div className="absolute -bottom-32 -left-16 h-72 w-72 rounded-full border border-[#36745e]/10" />

          <div className="relative">
            {/* Top Bar inside Map Card */}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-h-[2.75rem]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#36745e]">
                  {isBangladesh
                    ? "Bangladesh 3D journey atlas"
                    : "World 3D journey atlas (176 Countries)"}
                </p>
                <p className="mt-1.5 text-xs text-[#17231f]/65 sm:text-sm">
                  {inspectedPlace ? (
                    <span>
                      <strong className="font-semibold text-[#17231f]">
                        {inspectedPlace}
                      </strong>
                      {inspectedGroup ? ` · ${inspectedGroup}` : ""} ·{" "}
                      <span className="font-semibold text-[#36745e]">
                        {activeSet.has(inspectedPlace)
                          ? calculatorOpen
                            ? "Selected ✓"
                            : "Visited ✓"
                          : calculatorOpen
                            ? "Tap to select"
                            : "Still to explore"}
                      </span>
                    </span>
                  ) : calculatorOpen ? (
                    `Tap ${
                      isBangladesh ? "districts" : "countries"
                    } on the map to select them${
                      !isBangladesh ? " (drag to move when zoomed in)" : ""
                    }`
                  ) : (
                    `Hover or tap any ${
                      isBangladesh ? "district" : "country"
                    } to see its name${
                      !isBangladesh ? " · Drag or use arrows to pan when zoomed" : ""
                    }`
                  )}
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setIs3DMode((v) => !v)}
                  className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition ${
                    is3DMode
                      ? "bg-[#36745e] text-white shadow-[0_3px_0_0_#1b3f31]"
                      : "border border-[#17231f]/15 bg-white/70 text-[#17231f]/70"
                  }`}
                >
                  {is3DMode ? "3D Relief" : "2D Flat"}
                </button>

                <div className="text-right">
                  <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-[#17231f]/65">
                    {activeCount} / {totalCount}
                  </span>
                  <span className="block text-[11px] font-medium text-[#36745e]">
                    {activeCoverage.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            {/* World Map Continent Zoom + Pan Controls Bar */}
            {!isBangladesh && (
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {WORLD_ZOOM_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => selectWorldPreset(preset.id)}
                      className={`rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.13em] transition ${
                        activePreset === preset.id
                          ? "bg-[#17231f] text-white"
                          : "bg-white/80 text-[#17231f]/70 hover:bg-white hover:text-[#17231f]"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                {/* Zoom + Directional Pan Controls */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Directional Pan Buttons */}
                  <div className="inline-flex items-center gap-1 rounded-full border border-[#17231f]/12 bg-white/85 px-1.5 py-0.5">
                    <button
                      type="button"
                      onClick={() => panWorldMapByStep(-1, 0)}
                      title="Move Left"
                      className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-[#17231f] hover:bg-[#36745e] hover:text-white"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={() => panWorldMapByStep(0, -1)}
                      title="Move Up"
                      className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-[#17231f] hover:bg-[#36745e] hover:text-white"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => panWorldMapByStep(0, 1)}
                      title="Move Down"
                      className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-[#17231f] hover:bg-[#36745e] hover:text-white"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() => panWorldMapByStep(1, 0)}
                      title="Move Right"
                      className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-[#17231f] hover:bg-[#36745e] hover:text-white"
                    >
                      →
                    </button>
                  </div>

                  {/* Zoom In / Out / Reset */}
                  <div className="inline-flex items-center gap-1 rounded-full border border-[#17231f]/12 bg-white/85 px-1.5 py-0.5">
                    <button
                      type="button"
                      onClick={() => zoomWorldMap(0.7)}
                      title="Zoom in"
                      className="flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold text-[#17231f] hover:bg-[#36745e] hover:text-white"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => zoomWorldMap(1.4)}
                      title="Zoom out"
                      className="flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold text-[#17231f] hover:bg-[#36745e] hover:text-white"
                    >
                      −
                    </button>
                    {isWorldZoomed && (
                      <button
                        type="button"
                        onClick={() => selectWorldPreset("all")}
                        className="rounded-full bg-[#36745e]/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#36745e] hover:bg-[#36745e] hover:text-white"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Map Stage (Large & Steady) */}
            <div className="relative mx-auto mt-6">
              <div
                className={`mx-auto ${
                  isBangladesh ? "max-w-[33rem]" : "w-full"
                }`}
                style={{
                  filter: is3DMode
                    ? isDark
                      ? "drop-shadow(0 18px 24px rgba(0,0,0,0.48))"
                      : "drop-shadow(0 16px 20px rgba(23,35,31,0.16))"
                    : "none",
                }}
              >
                {isBangladesh ? (
                  <svg
                    viewBox="0 0 1550.242 2149.604"
                    className="h-auto w-full overflow-visible"
                    role="img"
                    aria-label="3D interactive map of Bangladesh showing 64 districts"
                  >
                    {/* 3D Extruded Depth Base Slab */}
                    {is3DMode && (
                      <g
                        transform="translate(12, 20)"
                        className="pointer-events-none"
                        aria-hidden="true"
                      >
                        {districts.map(([name, pathId]) => {
                          const path = pathById.get(pathId);
                          if (!path) return null;
                          const isMarked = activeSet.has(name);
                          const depthColor = isMarked
                            ? isDark
                              ? "#173c2d"
                              : "#1b3f31"
                            : isDark
                              ? "#101a16"
                              : "#b8b2a2";
                          return (
                            <path
                              key={`depth-${name}`}
                              d={path}
                              fill={depthColor}
                              stroke={depthColor}
                              strokeWidth="5"
                            />
                          );
                        })}
                      </g>
                    )}

                    {/* Top Surface Layer: Unvisited Districts */}
                    {districts.map(([name, pathId]) => {
                      const isMarked = activeSet.has(name);
                      if (isMarked) return null;
                      const active = activePlace === name;
                      const path = pathById.get(pathId);
                      if (!path) return null;

                      return (
                        <path
                          key={name}
                          d={path}
                          tabIndex="0"
                          role="button"
                          aria-label={`${name}, not visited`}
                          className="cursor-pointer outline-none transition-colors duration-150"
                          fill={
                            active
                              ? isDark
                                ? "#2f4d41"
                                : "#b9cec4"
                              : isDark
                                ? "#23352d"
                                : "#d8d4c8"
                          }
                          stroke={
                            active
                              ? isDark
                                ? "#eef3ef"
                                : "#17231f"
                              : isDark
                                ? "#14201b"
                                : "#f3f0e8"
                          }
                          strokeWidth={active ? "6" : "4"}
                          onMouseEnter={() => setActivePlace(name)}
                          onMouseLeave={() => setActivePlace(null)}
                          onFocus={() => setActivePlace(name)}
                          onBlur={() => setActivePlace(null)}
                          onClick={() => {
                            setActivePlace(name);
                            setTappedPlace(name);
                            togglePlace(name);
                          }}
                        >
                          <title>{name}</title>
                        </path>
                      );
                    })}

                    {/* Elevated 3D Layer: Visited / Selected Districts */}
                    {districts.map(([name, pathId]) => {
                      const isMarked = activeSet.has(name);
                      if (!isMarked) return null;
                      const active = activePlace === name;
                      const path = pathById.get(pathId);
                      if (!path) return null;

                      return (
                        <g
                          key={name}
                          transform={
                            is3DMode ? "translate(-5, -9)" : undefined
                          }
                        >
                          {is3DMode && (
                            <path
                              d={path}
                              transform="translate(6, 11)"
                              fill={isDark ? "#173c2d" : "#1b3f31"}
                              className="pointer-events-none"
                            />
                          )}
                          <path
                            d={path}
                            tabIndex="0"
                            role="button"
                            aria-label={`${name}, visited`}
                            className="cursor-pointer outline-none transition-colors duration-150"
                            fill={
                              active
                                ? isDark
                                  ? "#48ad84"
                                  : "#245741"
                                : isDark
                                  ? "#3c876c"
                                  : "#36745e"
                            }
                            stroke={
                              active
                                ? isDark
                                  ? "#eef3ef"
                                  : "#17231f"
                                : isDark
                                  ? "#14201b"
                                  : "#f3f0e8"
                            }
                            strokeWidth={active ? "6" : "4"}
                            onMouseEnter={() => setActivePlace(name)}
                            onMouseLeave={() => setActivePlace(null)}
                            onFocus={() => setActivePlace(name)}
                            onBlur={() => setActivePlace(null)}
                            onClick={() => {
                              setActivePlace(name);
                              setTappedPlace(name);
                              togglePlace(name);
                            }}
                          >
                            <title>{name} · Visited</title>
                          </path>
                        </g>
                      );
                    })}
                  </svg>
                ) : (
                  /* LARGE, DRAGGABLE 176-COUNTRY WORLD MAP */
                  <div
                    ref={svgContainerRef}
                    className={`relative overflow-hidden rounded-2xl border shadow-inner select-none ${
                      isDark
                        ? "border-[#eef3ef]/12 bg-gradient-to-b from-[#0b1411] via-[#0f1b16] to-[#0b1310]"
                        : "border-[#17231f]/12 bg-gradient-to-b from-[#dfece6] via-[#e6e3d8] to-[#dfd9cb]"
                    } ${isDraggingMap ? "cursor-grabbing" : "cursor-grab"}`}
                    style={{ touchAction: "none" }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      startPan(e.clientX, e.clientY);
                    }}
                    onMouseMove={(e) => movePan(e.clientX, e.clientY)}
                    onMouseUp={endPan}
                    onMouseLeave={endPan}
                    onTouchStart={(e) => {
                      if (e.touches.length === 1) {
                        startPan(e.touches[0].clientX, e.touches[0].clientY);
                      }
                    }}
                    onTouchMove={(e) => {
                      if (e.touches.length === 1) {
                        movePan(e.touches[0].clientX, e.touches[0].clientY);
                      }
                    }}
                    onTouchEnd={endPan}
                  >
                    <svg
                      viewBox={`${viewBoxState.x} ${viewBoxState.y} ${viewBoxState.w} ${viewBoxState.h}`}
                      className="block h-auto min-h-[22rem] w-full select-none sm:min-h-[32rem] lg:min-h-[38rem]"
                      role="img"
                      aria-label="Enhanced 3D interactive world map showing 176 countries"
                    >
                      {/* Cartographic Graticule Grid (Equator, Tropics, Meridians) */}
                      <g className="pointer-events-none">
                        {[95, 165, 210, 272, 334, 385, 440].map((y) => (
                          <line
                            key={`lat-${y}`}
                            x1="0"
                            y1={y}
                            x2="1000"
                            y2={y}
                            stroke={isDark ? "#eef3ef" : "#17231f"}
                            strokeOpacity={y === 272 ? "0.14" : "0.06"}
                            strokeDasharray={
                              y === 210 || y === 334 ? "3 3" : undefined
                            }
                            strokeWidth={y === 272 ? "0.7" : "0.45"}
                          />
                        ))}
                        {[125, 250, 375, 500, 625, 750, 875].map((x) => (
                          <line
                            key={`lon-${x}`}
                            x1={x}
                            y1="0"
                            x2={x}
                            y2="500"
                            stroke={isDark ? "#eef3ef" : "#17231f"}
                            strokeOpacity={x === 500 ? "0.1" : "0.06"}
                            strokeWidth="0.45"
                          />
                        ))}
                        <text
                          x="12"
                          y="269"
                          fontSize="6.5"
                          fontWeight="600"
                          letterSpacing="1"
                          fill={isDark ? "#eef3ef" : "#17231f"}
                          fillOpacity="0.35"
                        >
                          0° EQUATOR
                        </text>
                        <text
                          x="12"
                          y="207"
                          fontSize="5.5"
                          fontWeight="600"
                          letterSpacing="0.8"
                          fill={isDark ? "#eef3ef" : "#17231f"}
                          fillOpacity="0.28"
                        >
                          23.5°N TROPIC OF CANCER
                        </text>
                      </g>

                      {/* 3D Extruded Continental Base Shadow Slab */}
                      {is3DMode && (
                        <g
                          transform="translate(2.5, 4.5)"
                          className="pointer-events-none"
                          aria-hidden="true"
                        >
                          {worldCountryPaths.map((country) => {
                            const isMarked = activeSet.has(country.name);
                            const depthFill = isMarked
                              ? isDark
                                ? "#173c2d"
                                : "#1b3f31"
                              : isDark
                                ? "#09100d"
                                : "#b5afa0";
                            return (
                              <path
                                key={`world-depth-${country.name}`}
                                d={country.d}
                                fill={depthFill}
                                stroke={depthFill}
                                strokeWidth="0.6"
                                strokeLinejoin="round"
                              />
                            );
                          })}
                        </g>
                      )}

                      {/* Unvisited Countries Layer */}
                      {worldCountryPaths.map((country) => {
                        const isMarked = activeSet.has(country.name);
                        if (isMarked) return null;
                        const active = activePlace === country.name;

                        return (
                          <path
                            key={country.name}
                            d={country.d}
                            tabIndex="0"
                            role="button"
                            aria-label={`${country.name} (${country.continent})`}
                            className="outline-none transition-colors duration-150"
                            fill={
                              active
                                ? isDark
                                  ? "#2f4d41"
                                  : "#b4cbc0"
                                : isDark
                                  ? "#21322b"
                                  : "#dcd8cc"
                            }
                            stroke={
                              active
                                ? isDark
                                  ? "#eef3ef"
                                  : "#17231f"
                                : isDark
                                  ? "#0f1915"
                                  : "#f5f2eb"
                            }
                            strokeWidth={active ? "1.1" : "0.55"}
                            strokeLinejoin="round"
                            onMouseEnter={() => setActivePlace(country.name)}
                            onMouseLeave={() => setActivePlace(null)}
                            onFocus={() => setActivePlace(country.name)}
                            onBlur={() => setActivePlace(null)}
                            onClick={() => {
                              if (didDragRef.current) return;
                              setActivePlace(country.name);
                              setTappedPlace(country.name);
                              togglePlace(country.name);
                            }}
                          >
                            <title>
                              {country.name} ({country.continent})
                            </title>
                          </path>
                        );
                      })}

                      {/* Elevated 3D Layer: Visited / Selected Countries */}
                      {worldCountryPaths.map((country) => {
                        const isMarked = activeSet.has(country.name);
                        if (!isMarked) return null;
                        const active = activePlace === country.name;

                        return (
                          <g
                            key={country.name}
                            transform={
                              is3DMode ? "translate(-1.6, -2.8)" : undefined
                            }
                          >
                            {is3DMode && (
                              <path
                                d={country.d}
                                transform="translate(1.8, 3.2)"
                                fill={isDark ? "#173c2d" : "#1b3f31"}
                                className="pointer-events-none"
                              />
                            )}
                            <path
                              d={country.d}
                              tabIndex="0"
                              role="button"
                              aria-label={`${country.name} (${country.continent}), visited`}
                              className="outline-none transition-colors duration-150"
                              fill={
                                active
                                  ? isDark
                                    ? "#48ad84"
                                    : "#245741"
                                  : isDark
                                    ? "#3c876c"
                                    : "#36745e"
                              }
                              stroke={
                                active
                                  ? isDark
                                    ? "#eef3ef"
                                    : "#17231f"
                                  : isDark
                                    ? "#0f1915"
                                    : "#f5f2eb"
                              }
                              strokeWidth={active ? "1.2" : "0.65"}
                              strokeLinejoin="round"
                              onMouseEnter={() => setActivePlace(country.name)}
                              onMouseLeave={() => setActivePlace(null)}
                              onFocus={() => setActivePlace(country.name)}
                              onBlur={() => setActivePlace(null)}
                              onClick={() => {
                                if (didDragRef.current) return;
                                setActivePlace(country.name);
                                setTappedPlace(country.name);
                                togglePlace(country.name);
                              }}
                            >
                              <title>
                                {country.name} ({country.continent}) · Visited
                              </title>
                            </path>
                            {country.cx && country.cy && (
                              <circle
                                cx={country.cx}
                                cy={country.cy}
                                r="2.2"
                                fill="#dff7ea"
                                stroke={isDark ? "#0d1512" : "#17231f"}
                                strokeWidth="0.6"
                                className="pointer-events-none"
                              />
                            )}
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Map Legend Footer */}
            <div className="mt-5 flex items-center justify-between gap-4 border-t border-[#17231f]/10 pt-4 text-[10px] font-medium uppercase tracking-[0.16em] text-[#17231f]/55">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#36745e]" />
                {calculatorOpen ? "Selected" : "Visited"}
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#d8d4c8]" />
                Still to explore
              </span>
              <span className="text-right font-semibold text-[#36745e]">
                {inspectedPlace ||
                  `Tap a ${isBangladesh ? "district" : "country"}`}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  setCalculatorOpen((open) => !open);
                  setActivePlace(null);
                  setTappedPlace(null);
                }}
                className={`rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                  calculatorOpen
                    ? "bg-[#17231f] text-white"
                    : "bg-[#36745e] text-white shadow-[0_4px_0_0_#1b3f31] hover:bg-[#245741]"
                }`}
              >
                {calculatorOpen
                  ? "Close map creator"
                  : isBangladesh
                    ? "Calculate yours (BD)"
                    : "Create your world map"}
              </button>
              <button
                type="button"
                onClick={downloadMap}
                className="rounded-full border border-[#17231f]/15 bg-white/60 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#17231f] transition hover:border-[#36745e] hover:text-[#36745e]"
              >
                Download {isBangladesh ? "BD" : "World"} map
              </button>
            </div>

            {/* Interactive Map Creator Drawer */}
            {calculatorOpen && (
              <div className="mt-5 rounded-2xl border border-[#36745e]/20 bg-white/65 p-4 backdrop-blur-sm sm:p-5">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#36745e]">
                      {isBangladesh
                        ? "Your Bangladesh Map"
                        : "Your World Travel Map"}
                    </p>
                    <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#17231f]">
                      {activeCount}
                      <span className="text-base text-[#17231f]/50">
                        {" "}
                        / {totalCount}{" "}
                        {isBangladesh ? "districts" : "countries"}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        isBangladesh
                          ? setSelectedDistricts(new Set(visitedDistricts))
                          : setSelectedCountries(new Set(visitedWorldCountries))
                      }
                      className="rounded-lg border border-[#17231f]/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#17231f]/70 hover:border-[#36745e]"
                    >
                      Load Arbin&apos;s
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        isBangladesh
                          ? setSelectedDistricts(new Set())
                          : setSelectedCountries(new Set())
                      }
                      className="rounded-lg border border-[#17231f]/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#17231f]/70 hover:border-[#36745e]"
                    >
                      Clear
                    </button>
                    <p className="ml-2 text-2xl font-semibold text-[#36745e]">
                      {activeCoverage.toFixed(1)}%
                    </p>
                  </div>
                </div>

                {/* Quick Search + Clickable Place Chips */}
                <div className="mt-4">
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search ${
                      isBangladesh ? "64 districts" : "176 countries"
                    } to toggle...`}
                    className="w-full rounded-xl border border-[#17231f]/15 bg-white/80 px-3.5 py-2 text-xs text-[#17231f] outline-none placeholder:text-[#17231f]/40 focus:border-[#36745e]"
                  />
                  <div className="mt-2.5 flex max-h-28 flex-wrap gap-1.5 overflow-y-auto pr-1">
                    {filteredPlaceList.map((item) => {
                      const isSel = activeSet.has(item.name);
                      return (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => togglePlace(item.name)}
                          className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition ${
                            isSel
                              ? "bg-[#36745e] text-white"
                              : "border border-[#17231f]/12 bg-white text-[#17231f]/70 hover:border-[#36745e]"
                          }`}
                        >
                          {isSel ? "✓ " : "+ "}
                          {item.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <label className="mt-4 block">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#17231f]/55">
                    Name for your map poster
                  </span>
                  <input
                    type="text"
                    value={visitorName}
                    onChange={(event) => setVisitorName(event.target.value)}
                    placeholder="Enter your name"
                    maxLength={40}
                    className="mt-2 w-full rounded-xl border border-[#17231f]/15 bg-white/80 px-4 py-2.5 text-sm text-[#17231f] outline-none transition placeholder:text-[#17231f]/35 focus:border-[#36745e]"
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
