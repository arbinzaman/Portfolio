import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const HobbyTravelLoader = ({ onReady }) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let rafId;
    let current = 0;
    const startTime = performance.now();
    const duration = 1450;

    const tick = (now) => {
      const elapsed = Math.max(0, now - startTime);
      const target = Math.min(100, Math.max(0, (elapsed / duration) * 100));

      current += (target - current) * 0.17;
      if (target >= 99.5 && current >= 98.5) {
        current = 100;
      }

      const rounded = Math.min(100, Math.max(0, Math.round(current)));
      setDisplayProgress(rounded);

      if (rounded >= 100) {
        window.setTimeout(() => {
          setIsVisible(false);
          if (onReady) onReady();
        }, 240);
        return;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [onReady]);

  // SVG progress ring geometry
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (displayProgress / 100) * circumference;

  // 3D orbital angle of the aircraft (starts at -180deg and lands at 0deg top pin)
  const orbitDeg = (displayProgress / 100) * 360;
  // 3D magnetic compass needle locks to North as progress completes
  const needleDeg =
    Math.sin((displayProgress / 100) * Math.PI * 3) *
    (1 - displayProgress / 100) *
    45;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="hobby-travel-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.08,
            filter: "blur(12px)",
            transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#06100d] select-none [perspective:1200px]"
        >
          {/* Volumetric 3D Atmospheric Lighting */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(78,184,142,0.22),transparent_42%),radial-gradient(circle_at_56%_54%,rgba(245,158,11,0.14),transparent_36%),radial-gradient(circle_at_42%_52%,rgba(211,95,63,0.14),transparent_40%)]"
          />

          {/* 3D Perspective Topographic Horizon Floor */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] overflow-hidden opacity-45 [perspective:700px]"
          >
            <div
              className="h-[200%] w-full origin-bottom [transform:rotateX(72deg)]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(78,184,142,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(78,184,142,0.16) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
                maskImage:
                  "radial-gradient(ellipse at 50% 85%, black 15%, transparent 72%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse at 50% 85%, black 15%, transparent 72%)",
              }}
            />
          </div>

          {/* Main 3D Gyroscope & Globe Assembly */}
          <div className="relative z-10 flex h-80 w-80 items-center justify-center sm:h-96 sm:w-96 [transform-style:preserve-3d]">
            {/* Deep 3D Shadow Pedestal Plate (translateZ -45px) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute h-64 w-64 rounded-full bg-black/75 blur-2xl [transform:rotateX(64deg)_translateZ(-55px)] sm:h-72 sm:w-72"
            />

            {/* Outer 3D Tilted Brass & Emerald Astrolabe Gimbal Ring */}
            <div className="pointer-events-none absolute h-72 w-72 rounded-full border-2 border-[#4eb88e]/30 shadow-[0_14px_0_0_rgba(12,32,26,0.95),0_0_50px_rgba(78,184,142,0.22),inset_0_0_30px_rgba(78,184,142,0.18)] [transform:rotateX(62deg)_rotateZ(-16deg)] sm:h-80 sm:w-80">
              <div className="h-full w-full animate-[spin_18s_linear_infinite] rounded-full border border-dashed border-amber-300/35" />
            </div>

            {/* Second Counter-Tilted 3D Gyroscope Ring */}
            <div className="pointer-events-none absolute h-64 w-64 animate-[spin_9s_linear_infinite_reverse] rounded-full border border-[#d35f3f]/40 shadow-[0_0_30px_rgba(211,95,63,0.25)] [transform:rotateX(68deg)_rotateY(26deg)] sm:h-72 sm:w-72" />

            {/* Third 3D Meridian Orbit Ring */}
            <div className="pointer-events-none absolute h-60 w-60 animate-[spin_7s_linear_infinite] rounded-full border border-dashed border-emerald-300/35 [transform:rotateX(58deg)_rotateY(-32deg)] sm:h-68 sm:w-68" />

            {/* Rotating 3D Wireframe Globe Sphere in Center */}
            <div className="pointer-events-none absolute flex h-44 w-44 items-center justify-center [transform-style:preserve-3d] animate-[spin_16s_linear_infinite] sm:h-48 sm:w-48">
              <div className="absolute inset-0 rounded-full border border-[#4eb88e]/25 [transform:rotateY(0deg)]" />
              <div className="absolute inset-0 rounded-full border border-[#4eb88e]/25 [transform:rotateY(45deg)]" />
              <div className="absolute inset-0 rounded-full border border-[#4eb88e]/25 [transform:rotateY(90deg)]" />
              <div className="absolute inset-0 rounded-full border border-[#4eb88e]/25 [transform:rotateY(135deg)]" />
              <div className="absolute inset-3 rounded-full border border-amber-300/20 [transform:rotateX(65deg)]" />
              <div className="absolute inset-6 rounded-full border border-emerald-300/20 [transform:rotateX(-65deg)]" />
            </div>

            {/* 3D Glowing Compass Rose & Flight Progress Arc (Elevated Layer) */}
            <svg
              className="relative h-60 w-60 -rotate-90 transform drop-shadow-[0_12px_28px_rgba(0,0,0,0.75)] [transform:translateZ(18px)_rotate(-90deg)] sm:h-68 sm:w-68"
              viewBox="0 0 200 200"
            >
              {/* Outer Degree Ticks */}
              <circle
                cx="100"
                cy="100"
                r="95"
                fill="none"
                stroke="rgba(78, 184, 142, 0.22)"
                strokeWidth="1.5"
                strokeDasharray="2 6"
              />
              {/* Track Ring */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="4"
              />
              {/* Glowing 3D Flight Trail */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="url(#globeFlightGrad3D)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{
                  transition: "stroke-dashoffset 70ms linear",
                  filter: "drop-shadow(0 0 12px rgba(78, 184, 142, 0.75))",
                }}
              />
              <defs>
                <linearGradient
                  id="globeFlightGrad3D"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="55%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
            </svg>

            {/* 3D Floating Destination Location Pin at 12 O'Clock (translateZ 36px) */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center [transform:translateZ(36px)]">
              <div className="-translate-y-[105px] sm:-translate-y-[118px]">
                <div className="relative flex items-center justify-center">
                  {/* Expanding 3D Radar Shockwaves */}
                  <span className="absolute h-11 w-11 animate-ping rounded-full border border-amber-400/50 bg-amber-400/20" />
                  <span className="absolute h-7 w-7 animate-pulse rounded-full bg-orange-500/30 blur-sm" />

                  {/* 3D Extruded Teardrop Location Pin SVG */}
                  <div
                    className={`relative flex h-9 w-9 items-center justify-center rounded-2xl border transition-all duration-300 ${
                      displayProgress >= 92
                        ? "scale-125 border-amber-300 bg-gradient-to-b from-amber-400 to-[#d35f3f] shadow-[0_5px_0_0_#7c2d12,0_0_25px_rgba(251,191,36,0.85)]"
                        : "border-amber-400/50 bg-gradient-to-b from-[#152e26] to-[#0a1914] shadow-[0_5px_0_0_#040b08,0_8px_20px_rgba(0,0,0,0.7)]"
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className={`h-5 w-5 ${
                        displayProgress >= 92
                          ? "text-white"
                          : "text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.7)]"
                      }`}
                      fill="currentColor"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* 3D Swept-Wing Jet Aircraft Banking Along the Orbital Ring (translateZ 42px) */}
            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center transition-transform duration-75 ease-linear [transform-style:preserve-3d]"
              style={{
                transform: `translateZ(42px) rotate(${orbitDeg}deg)`,
              }}
            >
              <div className="-translate-y-[105px] sm:-translate-y-[118px]">
                <div className="relative flex items-center justify-center">
                  {/* Jet Afterburner Trail Glow */}
                  <span className="absolute -left-3 h-3 w-6 rounded-full bg-gradient-to-r from-transparent via-emerald-400/60 to-amber-300/90 blur-[3px]" />

                  {/* 3D Sculpted Aircraft Capsule */}
                  <div className="flex h-10 w-10 rotate-90 items-center justify-center rounded-2xl border border-emerald-300/60 bg-gradient-to-br from-[#36745e] via-[#235342] to-[#0f2920] text-white shadow-[0_6px_0_0_#091913,0_0_24px_rgba(52,211,153,0.65)]">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 fill-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
                    >
                      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Center 3D Extruded Compass Core & Faceted Star (translateZ 28px) */}
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-2 border-emerald-300/30 bg-gradient-to-b from-[#132a22] via-[#0b1915] to-[#060e0b] shadow-[0_10px_0_0_#030806,0_22px_45px_rgba(0,0,0,0.85),inset_0_2px_12px_rgba(78,184,142,0.3)] [transform:translateZ(28px)] sm:h-36 sm:w-36">
              {/* Inner Brass Bezel Ring */}
              <div className="pointer-events-none absolute inset-2 rounded-full border border-amber-400/25" />

              {/* 3D Faceted Compass Needle Star */}
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full transition-transform duration-100 ease-out"
                style={{ transform: `rotate(${needleDeg}deg)` }}
                viewBox="0 0 120 120"
              >
                {/* North Faceted Blade (Emerald & Gold) */}
                <polygon points="60,8 67,56 60,48" fill="#34d399" />
                <polygon points="60,8 53,56 60,48" fill="#059669" />
                {/* South Faceted Blade (Terracotta & Amber) */}
                <polygon points="60,112 67,64 60,72" fill="#f97316" />
                <polygon points="60,112 53,64 60,72" fill="#b45309" />
                {/* East / West Minor Blades */}
                <polygon
                  points="104,60 66,55 72,60 66,65"
                  fill="rgba(251,191,36,0.35)"
                />
                <polygon
                  points="16,60 54,55 48,60 54,65"
                  fill="rgba(251,191,36,0.35)"
                />
              </svg>

              {/* Center 3D Raised Glass Medallion */}
              <div className="relative z-10 flex h-16 w-16 items-baseline justify-center rounded-full border border-emerald-300/35 bg-[#081511]/95 pt-4 font-mono text-xl font-extrabold tracking-tight text-white shadow-[0_5px_0_0_#030907,0_0_20px_rgba(52,211,153,0.35)] backdrop-blur-md sm:h-18 sm:w-18 sm:pt-4.5 sm:text-2xl">
                <span>{String(displayProgress).padStart(2, "0")}</span>
                <span className="ml-0.5 text-[10px] font-bold text-amber-400">
                  %
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HobbyTravelLoader;
