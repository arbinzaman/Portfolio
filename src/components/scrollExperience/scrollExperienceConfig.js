import * as THREE from "three";

/**
 * Ordered portfolio chapters mapped to DOM `[data-portfolio-chapter]` attributes.
 */
export const CHAPTERS = [
  { id: "intro", label: "Introduction", number: "01" },
  { id: "about", label: "About", number: "02" },
  { id: "work", label: "Experience", number: "03" },
  { id: "stack", label: "Technology", number: "04" },
  { id: "projects", label: "Selected work", number: "05" },
  { id: "recognition", label: "Recognition", number: "06" },
  { id: "credentials", label: "Credentials", number: "07" },
  { id: "gallery", label: "In the spotlight", number: "08" },
  { id: "feedback", label: "Testimonials", number: "09" },
  { id: "contact", label: "Contact", number: "10" },
];

/**
 * Interstellar color palettes per chapter:
 * Gargantua amber/gold, Doppler cyan, cosmic violet, and crimson flare.
 */
export const CHAPTER_PALETTES = [
  { primary: "#f59e0b", secondary: "#a78bfa", rim: "#38bdf8" }, // 01 intro: Gargantua Gold & Violet
  { primary: "#38bdf8", secondary: "#f59e0b", rim: "#c084fc" }, // 02 about: Wormhole Cyan & Amber
  { primary: "#a78bfa", secondary: "#fb923c", rim: "#67e8f9" }, // 03 work: Deep Nebula Violet & Orange
  { primary: "#22d3ee", secondary: "#818cf8", rim: "#fbbf24" }, // 04 stack: Cherenkov Cyan & Indigo
  { primary: "#fb923c", secondary: "#c084fc", rim: "#38bdf8" }, // 05 projects: Supernova Amber & Purple
  { primary: "#fbbf24", secondary: "#f43f5e", rim: "#a78bfa" }, // 06 recognition: Golden Horizon
  { primary: "#818cf8", secondary: "#38bdf8", rim: "#f59e0b" }, // 07 credentials: Endurance Blue
  { primary: "#f43f5e", secondary: "#fb923c", rim: "#c084fc" }, // 08 gallery: Redshift Crimson
  { primary: "#34d399", secondary: "#38bdf8", rim: "#a78bfa" }, // 09 feedback: Aurora Emerald
  { primary: "#f59e0b", secondary: "#67e8f9", rim: "#a78bfa" }, // 10 contact: Binary Star Gold & Cyan
];

/**
 * Helper to resolve the active chapter's index and color palette.
 */
export const getChapterPalette = (activeChapter) => {
  const index = Math.max(
    0,
    CHAPTERS.findIndex(({ id }) => id === activeChapter),
  );
  return {
    chapterIndex: index,
    palette: CHAPTER_PALETTES[index] || CHAPTER_PALETTES[0],
  };
};

/**
 * Shared singleton Three.js geometries to avoid per-render GPU allocations.
 */
export const sharedBoxGeo = new THREE.BoxGeometry(1, 1, 1);
export const sharedOctaGeo = new THREE.OctahedronGeometry(1, 0);
export const sharedIcosaGeo = new THREE.IcosahedronGeometry(1, 0);
export const sharedSphereLowGeo = new THREE.SphereGeometry(1, 16, 16);
export const sharedTorusGeo = new THREE.TorusGeometry(1, 0.015, 8, 96);

