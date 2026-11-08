import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Compass, Film, Globe2, MapPin, Plane } from "lucide-react";

const EXPEDITION_STAGES = [
  {
    code: "BD-64",
    status: "UNFOLDING 64-DISTRICT BANGLADESH ATLAS",
    coords: "23.8103° N, 90.4125° E · DHAKA BASE",
  },
  {
    code: "HIM-IN",
    status: "CHARTING HIMALAYAN & BENGAL PASSES",
    coords: "27.3389° N, 88.6065° E · SIKKIM & MEGHALAYA",
  },
  {
    code: "FILM-01",
    status: "CURATING 35MM FRAMES & FESTIVAL REELS",
    coords: "21.4272° N, 92.0058° E · COAST TO PEAKS",
  },
  {
    code: "WLD-176",
    status: "COMPASS CALIBRATED · READY FOR DEPARTURE",
    coords: "GLOBAL ATLAS ONLINE · 64 DISTRICTS · 176 COUNTRIES",
  },
];

const WAYPOINTS = [
  { label: "Dhaka", icon: MapPin },
  { label: "64 Districts", icon: Compass },
  { label: "Films & Reels", icon: Film },
  { label: "World Atlas", icon: Globe2 },
];

const HobbyTravelLoader = ({ onReady }) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let rafId;
    let current = 0;
    const startTime = performance.now();
    const duration = 1450; // Crisp, cinematic expedition intro

    const tick = (now) => {
      const elapsed = Math.max(0, now - startTime);
      const target = Math.min(100, Math.max(0, (elapsed / duration) * 100));

      current += (target - current) * 0.18;
      if (target >= 99.5 && current >= 98.5) {
        current = 100;
      }

      const rounded = Math.min(100, Math.max(0, Math.round(current)));
      setDisplayProgress(rounded);

      if (rounded >= 100) {
        window.setTimeout(() => {
          setIsVisible(false);
          if (onReady) onReady();
        }, 220);
        return;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [onReady]);

  const stageIndex = Math.max(
    0,
    Math.min(
      EXPEDITION_STAGES.length - 1,
      Math.floor((displayProgress / 100) * EXPEDITION_STAGES.length),
    ),
  );
  const currentStage = EXPEDITION_STAGES[stageIndex] || EXPEDITION_STAGES[0];

  // Flight path circle geometry
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (displayProgress / 100) * circumference;

  // Airplane rotation angle along the circular flight path (-90deg top start)
  const planeAngleDeg = (displayProgress / 100) * 360;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="hobby-travel-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: "blur(8px)",
            transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-between overflow-hidden bg-[#fbfaf7] px-6 py-8 text-[#17231f] select-none sm:py-12"
        >
          {/* Subtle Topographic Contour & Cartography Grid Background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 45%, rgba(54, 116, 94, 0.14), transparent 52%), radial-gradient(circle at 65% 60%, rgba(211, 95, 63, 0.08), transparent 40%)",
            }}
          />

          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
            viewBox="0 0 1200 800"
            fill="none"
          >
            <circle
              cx="600"
              cy="400"
              r="180"
              stroke="#36745e"
              strokeWidth="1.2"
              strokeDasharray="6 8"
            />
            <circle
              cx="600"
              cy="400"
              r="290"
              stroke="#17231f"
              strokeWidth="1"
            />
            <circle
              cx="600"
              cy="400"
              r="410"
              stroke="#36745e"
              strokeWidth="1"
              strokeDasharray="12 10"
            />
            <circle
              cx="600"
              cy="400"
              r="540"
              stroke="#17231f"
              strokeWidth="0.8"
            />
            <line
              x1="0"
              y1="400"
              x2="1200"
              y2="400"
              stroke="#17231f"
              strokeWidth="0.8"
              strokeDasharray="4 8"
            />
            <line
              x1="600"
              y1="0"
              x2="600"
              y2="800"
              stroke="#17231f"
              strokeWidth="0.8"
              strokeDasharray="4 8"
            />
          </svg>

          {/* Top Expedition Header Bar */}
          <div className="relative z-10 flex w-full max-w-5xl items-center justify-between border-b border-[#17231f]/10 pb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#17231f]/60">
            <span className="inline-flex items-center gap-2 text-[#36745e]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#36745e]" />
              Arbin Zaman &middot; Field Atlas
            </span>
            <span className="hidden font-mono sm:inline">
              {currentStage.coords}
            </span>
            <span className="rounded-full border border-[#36745e]/30 bg-[#36745e]/10 px-2.5 py-0.5 font-mono text-[10px] text-[#36745e]">
              {currentStage.code}
            </span>
          </div>

          {/* Center 3D Cartographer's Compass & Flight Orbit */}
          <div className="relative z-10 my-auto flex flex-col items-center">
            <div className="relative flex h-52 w-52 items-center justify-center sm:h-60 sm:w-60">
              {/* Outer Rotating Compass Rose Degree Ring */}
              <svg
                className="absolute inset-0 h-full w-full animate-[spin_22s_linear_infinite]"
                viewBox="0 0 220 220"
              >
                <circle
                  cx="110"
                  cy="110"
                  r="102"
                  fill="none"
                  stroke="#36745e"
                  strokeOpacity="0.22"
                  strokeWidth="1"
                  strokeDasharray="2 6"
                />
                <circle
                  cx="110"
                  cy="110"
                  r="92"
                  fill="none"
                  stroke="#17231f"
                  strokeOpacity="0.12"
                  strokeWidth="1"
                />
                {/* Cardinal Direction Markers */}
                <text
                  x="110"
                  y="14"
                  textAnchor="middle"
                  className="fill-[#36745e] font-mono text-[9px] font-bold tracking-widest"
                >
                  N
                </text>
                <text
                  x="207"
                  y="113"
                  textAnchor="middle"
                  className="fill-[#17231f]/50 font-mono text-[8px] font-bold"
                >
                  E
                </text>
                <text
                  x="110"
                  y="213"
                  textAnchor="middle"
                  className="fill-[#17231f]/50 font-mono text-[8px] font-bold"
                >
                  S
                </text>
                <text
                  x="13"
                  y="113"
                  textAnchor="middle"
                  className="fill-[#17231f]/50 font-mono text-[8px] font-bold"
                >
                  W
                </text>
              </svg>

              {/* 3D Tilted Globe Meridian Rings */}
              <div className="pointer-events-none absolute inset-6 animate-[spin_8s_linear_infinite_reverse] rounded-full border border-dashed border-[#36745e]/30 [transform:rotateX(62deg)_rotateY(20deg)]" />
              <div className="pointer-events-none absolute inset-8 animate-[spin_6s_linear_infinite] rounded-full border border-[#d35f3f]/25 [transform:rotateX(66deg)_rotateY(-24deg)]" />

              {/* Flight Trajectory Progress SVG */}
              <svg
                className="h-44 w-44 -rotate-90 transform sm:h-48 sm:w-48"
                viewBox="0 0 160 160"
              >
                {/* Base Flight Track */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="none"
                  stroke="#17231f"
                  strokeOpacity="0.08"
                  strokeWidth="3"
                  strokeDasharray="4 6"
                />
                {/* Active Flight Trail */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="none"
                  stroke="url(#travelFlightGrad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  style={{
                    transition: "stroke-dashoffset 75ms linear",
                  }}
                />
                <defs>
                  <linearGradient
                    id="travelFlightGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#36745e" />
                    <stop offset="60%" stopColor="#4eb88e" />
                    <stop offset="100%" stopColor="#d35f3f" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Orbiting Aircraft Carrier along the Flight Ring */}
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center transition-transform duration-75 ease-linear"
                style={{ transform: `rotate(${planeAngleDeg}deg)` }}
              >
                <div className=" -translate-y-[76px] sm:-translate-y-[82px]">
                  <div className="flex h-7 w-7 rotate-45 items-center justify-center rounded-full border border-[#36745e]/40 bg-[#fbfaf7] text-[#36745e] shadow-[0_3px_10px_rgba(54,116,94,0.28)]">
                    <Plane size={14} className="fill-[#36745e]/20" />
                  </div>
                </div>
              </div>

              {/* Center 3D Raised Postmark Medallion */}
              <div className="absolute flex h-28 w-28 flex-col items-center justify-center rounded-full border border-[#17231f]/12 bg-[#f3f0e8] shadow-[0_8px_0_0_#ded9cc,0_18px_35px_rgba(23,35,31,0.14)] sm:h-32 sm:w-32">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-[#36745e]">
                  COMPASS
                </span>
                <div className="mt-0.5 flex items-baseline font-mono text-3xl font-bold tracking-tight text-[#17231f] sm:text-4xl">
                  <span>{String(displayProgress).padStart(2, "0")}</span>
                  <span className="ml-0.5 text-xs font-semibold text-[#36745e]">
                    %
                  </span>
                </div>
                <span className="mt-1 rounded-full bg-[#36745e]/12 px-2 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-[#36745e]">
                  {displayProgress < 100 ? "IN FLIGHT" : "ARRIVED"}
                </span>
              </div>
            </div>

            {/* Destination Title & Live Telemetry Status */}
            <div className="mt-7 flex flex-col items-center text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#36745e]">
                Meaningful Traveller &middot; Visual Storyteller
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#17231f] sm:text-3xl">
                Bangladesh &amp; Beyond
              </h2>
              <p className="mt-2.5 h-4 font-mono text-[11px] font-medium tracking-[0.16em] text-[#17231f]/65">
                {currentStage.status}
              </p>

              {/* Waypoint Boarding Pass Progress Strip */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                {WAYPOINTS.map(({ label, icon: Icon }, idx) => {
                  const reached =
                    displayProgress >= idx * 25 + 5 || displayProgress >= 98;
                  return (
                    <div
                      key={label}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold tracking-[0.06em] transition-all duration-200 ${
                        reached
                          ? "border-[#36745e] bg-[#36745e] text-white shadow-[0_3px_0_0_#1b3f31]"
                          : "border-[#17231f]/12 bg-[#f3f0e8] text-[#17231f]/50"
                      }`}
                    >
                      <Icon size={12} />
                      <span>{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Postmark Stamp Footer */}
          <div className="relative z-10 flex w-full max-w-5xl items-center justify-between border-t border-[#17231f]/10 pt-4 text-[11px] font-medium text-[#17231f]/55">
            <span>64 Districts of Bangladesh</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
              PASSPORT STAMP &bull; VERIFIED
            </span>
            <span>176 World Countries</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HobbyTravelLoader;

