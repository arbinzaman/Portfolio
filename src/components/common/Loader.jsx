import React from "react";
import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();
  const pct = Math.min(100, Math.max(0, Math.round(progress)));

  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <Html as="div" center>
      <div className="pointer-events-none flex flex-col items-center justify-center rounded-2xl border border-white/15 bg-[#050816]/85 px-5 py-4 shadow-[0_8px_0_0_rgba(14,12,32,0.95),0_20px_50px_rgba(0,0,0,0.65)] backdrop-blur-xl select-none">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 animate-[spin_3s_linear_infinite] rounded-full border border-dashed border-cyan-300/35" />
          <svg className="h-16 w-16 -rotate-90 transform" viewBox="0 0 64 64">
            <circle
              cx="32"
              cy="32"
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="3"
            />
            <circle
              cx="32"
              cy="32"
              r={radius}
              fill="none"
              stroke="#a78bfa"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{
                transition: "stroke-dashoffset 120ms ease-out",
                filter: "drop-shadow(0 0 8px rgba(167, 139, 250, 0.7))",
              }}
            />
          </svg>
          <span className="absolute font-mono text-xs font-bold text-white">
            {pct}%
          </span>
        </div>
        <span className="mt-2 whitespace-nowrap font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-cyan-200/80">
          3D MODEL SYNC
        </span>
      </div>
    </Html>
  );
};

export default CanvasLoader;
