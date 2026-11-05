import React, { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";

const TELEMETRY_STEPS = [
  "INITIALIZING WEBGL 3D ENGINE",
  "CALIBRATING GARGANTUA OPTICS",
  "ASSEMBLING SPATIAL MONUMENTS",
  "SYSTEMS ONLINE · READY",
];

/**
 * SmartLoader:
 * An Interstellar / Kage-inspired 3D orbital telemetry preloader that tracks
 * Three.js asset loading (`useProgress`) with a smooth animated counter,
 * concentric counter-rotating SVG rings, and a clean curtain reveal.
 */
const SmartLoader = ({ onReady }) => {
  const { active, progress } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let rafId;
    let current = 0;
    const startTime = performance.now();
    const minDuration = 1150; // enough time to appreciate the smart loader without feeling slow
    const maxDuration = 2200; // hard cap so lazy assets never block the user

    const tick = (now) => {
      const elapsed = now - startTime;
      const timeProgress = Math.min(100, (elapsed / minDuration) * 100);
      const realProgress = active ? Math.max(progress, timeProgress * 0.85) : 100;
      const target =
        elapsed >= maxDuration ? 100 : Math.min(realProgress, timeProgress);

      current += (target - current) * 0.16;
      if (target >= 99.5 && current >= 98.5) {
        current = 100;
      }

      const rounded = Math.min(100, Math.round(current));
      setDisplayProgress(rounded);

      if (rounded >= 100) {
        window.setTimeout(() => {
          setIsVisible(false);
          if (onReady) onReady();
        }, 180);
        return;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [active, progress, onReady]);

  const stepIndex = Math.min(
    TELEMETRY_STEPS.length - 1,
    Math.floor((displayProgress / 100) * TELEMETRY_STEPS.length),
  );

  // SVG Ring geometry
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (displayProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="smart-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: "blur(10px)",
            transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#03050e] px-6 select-none"
        >
          {/* Ambient Interstellar Backdrop Glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(145,94,255,0.18),transparent_45%),radial-gradient(circle_at_55%_52%,rgba(245,158,11,0.12),transparent_38%),radial-gradient(circle_at_45%_55%,rgba(56,189,248,0.12),transparent_42%)]" />

          {/* Perspective 3D Horizon Grid */}
          <div
            aria-hidden="true"
            className="perspective-floor h-56 opacity-40"
          >
            <div className="perspective-floor__plane" />
          </div>

          {/* Center 3D Orbital Core */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative flex h-40 w-40 items-center justify-center sm:h-44 sm:w-44">
              {/* Outer Rotating Tick Ring */}
              <svg
                className="absolute inset-0 h-full w-full animate-[spin_14s_linear_infinite] opacity-40"
                viewBox="0 0 160 160"
              >
                <circle
                  cx="80"
                  cy="80"
                  r="74"
                  fill="none"
                  stroke="url(#loaderGradOuter)"
                  strokeWidth="1"
                  strokeDasharray="3 7"
                />
                <defs>
                  <linearGradient
                    id="loaderGradOuter"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="50%" stopColor="#a78bfa" />
                    <stop offset="100%" stopColor="#38bdf8" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Counter-Rotating Tilted Accretion Orbit */}
              <div className="pointer-events-none absolute inset-3 animate-[spin_5s_linear_infinite_reverse] rounded-full border border-dashed border-cyan-300/25 [transform:rotateX(62deg)_rotateY(18deg)]" />
              <div className="pointer-events-none absolute inset-5 animate-[spin_3.5s_linear_infinite] rounded-full border border-amber-400/30 shadow-[0_0_24px_rgba(245,158,11,0.2)] [transform:rotateX(68deg)_rotateY(-22deg)]" />

              {/* Progress Arc SVG */}
              <svg
                className="h-36 w-36 -rotate-90 transform sm:h-40 sm:w-40"
                viewBox="0 0 140 140"
              >
                <circle
                  cx="70"
                  cy="70"
                  r={radius}
                  fill="none"
                  stroke="rgba(255,255,255,0.07)"
                  strokeWidth="3"
                />
                <circle
                  cx="70"
                  cy="70"
                  r={radius}
                  fill="none"
                  stroke="url(#loaderArcGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  style={{
                    transition: "stroke-dashoffset 90ms linear",
                    filter: "drop-shadow(0 0 10px rgba(167, 139, 250, 0.65))",
                  }}
                />
                <defs>
                  <linearGradient
                    id="loaderArcGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="50%" stopColor="#a78bfa" />
                    <stop offset="100%" stopColor="#38bdf8" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Event Horizon Core + Percentage Readout */}
              <div className="absolute flex h-24 w-24 flex-col items-center justify-center rounded-full border border-white/10 bg-[#050816]/90 shadow-[inset_0_0_24px_rgba(145,94,255,0.25),0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-md">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-300/80">
                  SYNC
                </span>
                <div className="mt-0.5 flex items-baseline font-mono text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  <span>{String(displayProgress).padStart(2, "0")}</span>
                  <span className="ml-0.5 text-xs font-semibold text-[#a78bfa]">
                    %
                  </span>
                </div>
              </div>
            </div>

            {/* Identity & Telemetry Readout */}
            <div className="mt-6 flex flex-col items-center text-center">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 backdrop-blur-md">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-white/80">
                  ARBIN ZAMAN
                </span>
              </div>

              <p className="mt-3 h-4 font-mono text-[11px] tracking-[0.18em] text-cyan-200/75">
                {TELEMETRY_STEPS[stepIndex]}
              </p>

              {/* Segmented Progress Bar */}
              <div className="mt-4 flex w-56 items-center gap-1.5 sm:w-64">
                {Array.from({ length: 12 }, (_, idx) => {
                  const threshold = ((idx + 1) / 12) * 100;
                  const activeBar = displayProgress >= threshold - 4;
                  return (
                    <span
                      key={idx}
                      className={`h-1 flex-1 rounded-full transition-all duration-150 ${
                        activeBar
                          ? "bg-gradient-to-r from-amber-400 via-[#a78bfa] to-cyan-300 shadow-[0_0_8px_rgba(167,139,250,0.7)]"
                          : "bg-white/10"
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SmartLoader;

