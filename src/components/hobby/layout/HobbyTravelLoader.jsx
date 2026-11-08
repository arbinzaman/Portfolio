import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const HobbyTravelLoader = ({ onReady }) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let rafId;
    let current = 0;
    const startTime = performance.now();
    const duration = 1350;

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

  const radius = 84;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (displayProgress / 100) * circumference;

  const planeAngle = (displayProgress / 100) * 360;

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
            transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#0b1512] select-none"
        >
          {/* Subtle Emerald Radial Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(54,116,94,0.28),transparent_50%)]"
          />

          {/* Single Unified Circular Compass & Flight Globe */}
          <div className="relative flex h-56 w-56 items-center justify-center">
            {/* Outer Fine Compass Degree Ticks (Perfect Circle) */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full animate-[spin_30s_linear_infinite]"
              viewBox="0 0 220 220"
            >
              <circle
                cx="110"
                cy="110"
                r="104"
                fill="none"
                stroke="rgba(185, 223, 200, 0.22)"
                strokeWidth="1.5"
                strokeDasharray="1.5 6.5"
              />
              {/* 4 Cardinal Compass Points */}
              <polygon points="110,2 113,11 107,11" fill="#4eb88e" />
              <polygon
                points="218,110 209,113 209,107"
                fill="rgba(185,223,200,0.4)"
              />
              <polygon
                points="110,218 113,209 107,209"
                fill="rgba(211,95,63,0.7)"
              />
              <polygon
                points="2,110 11,113 11,107"
                fill="rgba(185,223,200,0.4)"
              />
            </svg>

            {/* Circular Flight Progress Ring */}
            <svg
              className="h-48 w-48 -rotate-90 transform"
              viewBox="0 0 192 192"
            >
              <circle
                cx="96"
                cy="96"
                r={radius}
                fill="none"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="2.5"
                strokeDasharray="4 6"
              />
              <circle
                cx="96"
                cy="96"
                r={radius}
                fill="none"
                stroke="url(#cleanFlightArc)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{
                  transition: "stroke-dashoffset 70ms linear",
                  filter: "drop-shadow(0 0 8px rgba(78, 184, 142, 0.6))",
                }}
              />
              <defs>
                <linearGradient
                  id="cleanFlightArc"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#36745e" />
                  <stop offset="60%" stopColor="#6ee7b7" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
            </svg>

            {/* Sleek Aircraft Gliding Directly on the Circular Line */}
            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center transition-transform duration-75 ease-linear"
              style={{ transform: `rotate(${planeAngle}deg)` }}
            >
              <div className="-translate-y-[84px]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 rotate-90 fill-[#f59e0b] drop-shadow-[0_0_10px_rgba(245,158,11,0.85)]"
                >
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                </svg>
              </div>
            </div>

            {/* Inner Circular Globe + Compass Rose Core */}
            <div className="absolute flex h-32 w-32 flex-col items-center justify-center overflow-hidden rounded-full border border-[#4eb88e]/30 bg-gradient-to-b from-[#132821] to-[#091410] shadow-[inset_0_0_25px_rgba(78,184,142,0.22),0_12px_30px_rgba(0,0,0,0.65)]">
              {/* Rotating Latitude / Longitude Globe Lines + Compass Star */}
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full animate-[spin_20s_linear_infinite] opacity-25"
                viewBox="0 0 120 120"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  fill="none"
                  stroke="#6ee7b7"
                  strokeWidth="1"
                />
                <ellipse
                  cx="60"
                  cy="60"
                  rx="24"
                  ry="48"
                  fill="none"
                  stroke="#6ee7b7"
                  strokeWidth="1"
                />
                <ellipse
                  cx="60"
                  cy="60"
                  rx="48"
                  ry="22"
                  fill="none"
                  stroke="#6ee7b7"
                  strokeWidth="1"
                />
                {/* 8-Pointed Compass Rose Watermark */}
                <polygon
                  points="60,10 65,55 110,60 65,65 60,110 55,65 10,60 55,55"
                  fill="none"
                  stroke="#6ee7b7"
                  strokeWidth="1"
                />
              </svg>

              {/* Crisp Percentage Readout */}
              <div className="relative z-10 flex items-baseline font-mono text-2xl font-bold tracking-tight text-white">
                <span>{String(displayProgress).padStart(2, "0")}</span>
                <span className="ml-0.5 text-xs font-semibold text-[#6ee7b7]">
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
