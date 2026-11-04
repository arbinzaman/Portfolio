import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  CosmicNebula,
  GargantuaAndEndurance,
  InterstellarCameraRig,
  Section3DMonuments,
  ShootingComets,
  SpatialGeometryField,
  useScrollAndPointerTracker,
  WarpStarField,
  WormholeCorridor,
} from "./scrollExperience";

/**
 * PortfolioScrollExperience:
 * Top-level 3D WebGL background orchestrator that renders the scroll-driven
 * Interstellar cosmos, Gargantua black hole, Endurance spacecraft ring,
 * and section-specific 3D architectural monuments.
 */
const PortfolioScrollExperience = () => {
  const { reducedMotion, activeChapter, pointer, scrollMotion } =
    useScrollAndPointerTracker();

  return (
    <div
      aria-hidden="true"
      className="portfolio-background-scene pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-95"
    >
      <div className="portfolio-background-gradient absolute inset-0 bg-[radial-gradient(ellipse_at_72%_42%,rgba(245,158,11,0.14),transparent_42%),radial-gradient(ellipse_at_68%_56%,rgba(56,189,248,0.12),transparent_38%),radial-gradient(ellipse_at_30%_30%,rgba(145,94,255,0.16),transparent_45%),linear-gradient(180deg,rgba(3,5,14,0.2),#03050e)]" />
      <div className="portfolio-ambient-glow absolute -inset-[18%]" />
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 44 }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          depth: true,
          stencil: false,
          powerPreference: "low-power",
        }}
        frameloop="always"
      >
        <fogExp2 attach="fog" args={["#03050e", 0.032]} />
        <InterstellarCameraRig
          pointer={pointer}
          scrollMotion={scrollMotion}
          reducedMotion={reducedMotion}
        />
        <CosmicNebula
          activeChapter={activeChapter}
          scrollMotion={scrollMotion}
          pointer={pointer}
          reducedMotion={reducedMotion}
        />
        <WarpStarField
          pointer={pointer}
          scrollMotion={scrollMotion}
          reducedMotion={reducedMotion}
        />
        <WormholeCorridor
          scrollMotion={scrollMotion}
          pointer={pointer}
          activeChapter={activeChapter}
          reducedMotion={reducedMotion}
        />
        <SpatialGeometryField
          scrollMotion={scrollMotion}
          pointer={pointer}
          activeChapter={activeChapter}
          reducedMotion={reducedMotion}
        />
        <Section3DMonuments
          activeChapter={activeChapter}
          scrollMotion={scrollMotion}
          pointer={pointer}
          reducedMotion={reducedMotion}
        />
        <ShootingComets reducedMotion={reducedMotion} />
        <GargantuaAndEndurance
          pointer={pointer}
          reducedMotion={reducedMotion}
          activeChapter={activeChapter}
          scrollMotion={scrollMotion}
        />
      </Canvas>
    </div>
  );
};

export default PortfolioScrollExperience;
