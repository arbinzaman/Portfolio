import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Plane } from "lucide-react";

const HobbyTravelLoader = ({ onReady }) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let rafId;
    let current = 0;
    const startTime = performance.now();
    const duration = 1250;

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
        }, 200);
        return;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [onReady]);

  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (displayProgress / 100) * circumference;

  const planeAngleDeg = (displayProgress / 100) * 360;
  // Compass needle gently swings and locks onto North (0deg) as progress reaches 100%
  const needleSwingDeg =
    Math.sin((displayProgress / 100) * Math.PI * 2.5) *
    (1 - displayProgress / 100) *
    38;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="hobby-travel-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: "blur(8px)",
            transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#fbfaf7] text-[#17231f] select-none"
        >
          {/* Soft Ambient Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, rgba(54, 116, 94, 0.14), transparent 48%)",
            }}
          />

          {/* Minimal Compass + Plane-to-Location-Pin Animation */}
          <div className="relative z-10 flex h-56 w-56 items-center justify-center sm:h-64 sm:w-64">
            {/* Outer Rotating Compass Dial */}
            <svg
              className="absolute inset-0 h-full w-full animate-[spin_24s_linear_infinite]"
              viewBox="0 0 220 220"
            >
              <circle
                cx="110"
                cy="110"
                r="102"
                fill="none"
                stroke="#36745e"
                strokeOpacity="0.22"
                strokeWidth="1.2"
                strokeDasharray="2 6"
              />
              <circle
                cx="110"
                cy="110"
                r="92"
                fill="none"
                stroke="#17231f"
                strokeOpacity="0.1"
                strokeWidth="1"
              />
              {/* Compass Cardinal Ticks */}
              <line
                x1="110"
                y1="4"
                x2="110"
                y2="14"
                stroke="#36745e"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="216"
                y1="110"
                x2="206"
                y2="110"
                stroke="#17231f"
                strokeOpacity="0.3"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="110"
                y1="216"
                x2="110"
                y2="206"
                stroke="#d35f3f"
                strokeOpacity="0.6"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="4"
                y1="110"
                x2="14"
                y2="110"
                stroke="#17231f"
                strokeOpacity="0.3"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>

            {/* 3D Tilted Globe Orbit Rings */}
            <div className="pointer-events-none absolute inset-7 animate-[spin_7s_linear_infinite_reverse] rounded-full border border-dashed border-[#36745e]/25 [transform:rotateX(64deg)_rotateY(20deg)]" />
            <div className="pointer-events-none absolute inset-9 animate-[spin_5s_linear_infinite] rounded-full border border-[#d35f3f]/20 [transform:rotateX(66deg)_rotateY(-22deg)]" />

            {/* Circular Flight Route SVG */}
            <svg
              className="h-48 w-48 -rotate-90 transform sm:h-52 sm:w-52"
              viewBox="0 0 168 168"
            >
              <circle
                cx="84"
                cy="84"
                r={radius}
                fill="none"
                stroke="#17231f"
                strokeOpacity="0.08"
                strokeWidth="2.5"
                strokeDasharray="4 6"
              />
              <circle
                cx="84"
                cy="84"
                r={radius}
                fill="none"
                stroke="url(#planeRouteGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{ transition: "stroke-dashoffset 70ms linear" }}
              />
              <defs>
                <linearGradient
                  id="planeRouteGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#36745e" />
                  <stop offset="65%" stopColor="#4eb88e" />
                  <stop offset="100%" stopColor="#d35f3f" />
                </linearGradient>
              </defs>
            </svg>

            {/* Destination Location Pin at Top (12 o'clock) with Pulse Radar */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="-translate-y-[82px] sm:-translate-y-[88px]">
                <div className="relative flex items-center justify-center">
                  <span className="absolute h-8 w-8 animate-ping rounded-full bg-[#d35f3f]/25" />
                  <div
                    className={`relative flex h-7 w-7 items-center justify-center rounded-full border transition-transform duration-200 ${
                      displayProgress >= 92
                        ? "scale-115 border-[#d35f3f] bg-[#d35f3f] text-white shadow-[0_0_16px_rgba(211,95,63,0.5)]"
                        : "border-[#d35f3f]/40 bg-[#fbfaf7] text-[#d35f3f]"
                    }`}
                  >
                    <MapPin size={14} />
                  </div>
                </div>
              </div>
            </div>

            {/* Orbiting Plane Flying Around Compass Toward the Location Pin */}
            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center transition-transform duration-75 ease-linear"
              style={{ transform: `rotate(${planeAngleDeg}deg)` }}
            >
              <div className="-translate-y-[82px] sm:-translate-y-[88px]">
                <div className="flex h-8 w-8 rotate-45 items-center justify-center rounded-full border border-[#36745e]/45 bg-[#36745e] text-white shadow-[0_4px_14px_rgba(54,116,94,0.4)]">
                  <Plane size={15} />
                </div>
              </div>
            </div>

            {/* Center 3D Compass Core with Live Magnetic Needle */}
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-[#17231f]/12 bg-[#f3f0e8] shadow-[0_8px_0_0_#ded9cc,0_18px_35px_rgba(23,35,31,0.14)] sm:h-32 sm:w-32">
              {/* Swinging Compass Needle SVG */}
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full transition-transform duration-100 ease-out"
                style={{ transform: `rotate(${needleSwingDeg}deg)` }}
                viewBox="0 0 120 120"
              >
                {/* North Pointer (Emerald) */}
                <polygon
                  points="60,14 66,56 60,50 54,56"
                  fill="#36745e"
                  opacity="0.85"
                />
                {/* South Pointer (Terracotta) */}
                <polygon
                  points="60,106 66,64 60,70 54,64"
                  fill="#d35f3f"
                  opacity="0.75"
                />
              </svg>

              {/* Center Hub Badge */}
              <div className="relative z-10 flex h-14 w-14 items-baseline justify-center rounded-full border border-[#17231f]/10 bg-[#fbfaf7] pt-3.5 font-mono text-lg font-bold tracking-tight text-[#17231f] shadow-sm sm:h-16 sm:w-16 sm:pt-4 sm:text-xl">
                <span>{String(displayProgress).padStart(2, "0")}</span>
                <span className="ml-0.5 text-[10px] font-semibold text-[#36745e]">
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
