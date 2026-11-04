import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  getChapterPalette,
  sharedBoxGeo,
  sharedIcosaGeo,
  sharedOctaGeo,
  sharedTorusGeo,
} from "./scrollExperienceConfig";

/**
 * Full-Scale 3D Section Monuments:
 * Gives EVERY section of the portfolio its own signature large-scale 3D architectural
 * structure in the WebGL world (inspired by Kage's scroll-scene monuments).
 */
const Section3DMonuments = ({
  activeChapter,
  scrollMotion,
  pointer,
  reducedMotion,
}) => {
  const rootRef = useRef();
  const monumentRef = useRef();
  const isMobile = useThree((state) => state.viewport.aspect < 0.85);
  const { chapterIndex, palette } = getChapterPalette(activeChapter);

  useFrame(({ clock }, delta) => {
    if (!rootRef.current || !monumentRef.current || document.hidden) return;
    const t = clock.elapsedTime;
    const p = scrollMotion.current.progress;
    const v = reducedMotion ? 0 : scrollMotion.current.velocity;
    const px = reducedMotion ? 0 : pointer.current.x;
    const py = reducedMotion ? 0 : pointer.current.y;

    // Position the section monument so it's prominently framed on both mobile & desktop
    const sideSign = chapterIndex % 2 === 0 ? -1 : 1;
    const targetX = isMobile
      ? -Math.sin(p * Math.PI * 3.5) * 0.45 + px * 0.35
      : sideSign * 2.55 + px * 0.45;
    const targetY = isMobile
      ? -0.95 * Math.cos(p * Math.PI * 4.5) + py * 0.35 - v * 0.2
      : Math.cos(p * Math.PI * 4.0) * 0.35 + py * 0.35 - v * 0.25;
    const targetZ =
      (isMobile ? -1.85 : -2.4) + Math.sin(p * Math.PI * 2.0) * 0.45;

    rootRef.current.position.x = THREE.MathUtils.damp(
      rootRef.current.position.x,
      targetX,
      2.6,
      delta,
    );
    rootRef.current.position.y = THREE.MathUtils.damp(
      rootRef.current.position.y,
      targetY,
      2.6,
      delta,
    );
    rootRef.current.position.z = THREE.MathUtils.damp(
      rootRef.current.position.z,
      targetZ,
      2.6,
      delta,
    );

    const targetScale = isMobile ? 0.72 : 1.22;
    rootRef.current.scale.setScalar(
      THREE.MathUtils.damp(rootRef.current.scale.x, targetScale, 3.0, delta),
    );

    if (!reducedMotion) {
      monumentRef.current.rotation.y = t * 0.22 + p * Math.PI * 2.0 + px * 0.35;
      monumentRef.current.rotation.x =
        Math.sin(t * 0.35) * 0.22 + py * 0.25 + v * 0.2;
    }
  });

  const wirePrimary = (
    <meshBasicMaterial
      color={palette.primary}
      wireframe
      transparent
      opacity={0.42}
      depthWrite={false}
      blending={THREE.AdditiveBlending}
    />
  );

  const wireRim = (
    <meshBasicMaterial
      color={palette.rim}
      wireframe
      transparent
      opacity={0.34}
      depthWrite={false}
      blending={THREE.AdditiveBlending}
    />
  );

  const solidAccent = (
    <meshBasicMaterial
      color={palette.secondary}
      transparent
      opacity={0.28}
      depthWrite={false}
      blending={THREE.AdditiveBlending}
    />
  );

  let monumentContent = null;
  switch (activeChapter) {
    case "about":
      // 02 Overview: 4D Tesseract Sanctuary & Floating Monolith Pillars
      monumentContent = (
        <group>
          <mesh geometry={sharedBoxGeo} scale={1.55}>
            {wirePrimary}
          </mesh>
          <mesh
            geometry={sharedBoxGeo}
            scale={0.88}
            rotation={[Math.PI / 4, Math.PI / 4, 0]}
          >
            {wireRim}
          </mesh>
          <mesh geometry={sharedOctaGeo} scale={0.42}>
            {solidAccent}
          </mesh>
          {[-1.3, 1.3].map((x, idx) => (
            <mesh
              key={`monolith-${idx}`}
              position={[x, 0, 0]}
              geometry={sharedBoxGeo}
              scale={[0.14, 2.2, 0.14]}
            >
              {wireRim}
            </mesh>
          ))}
          <mesh
            geometry={sharedTorusGeo}
            scale={1.45}
            rotation={[Math.PI / 2, 0, 0]}
          >
            {solidAccent}
          </mesh>
        </group>
      );
      break;

    case "work":
      // 03 Experience: Chronos Astrolabe & 3D Career Helix
      monumentContent = (
        <group>
          {[0, 1, 2, 3].map((i) => (
            <mesh
              key={`astrolabe-${i}`}
              geometry={sharedTorusGeo}
              scale={1.05 + i * 0.26}
              rotation={[(i * Math.PI) / 4, (i * Math.PI) / 3, 0]}
            >
              {i % 2 === 0 ? wirePrimary : wireRim}
            </mesh>
          ))}
          {Array.from({ length: 10 }, (_, i) => {
            const y = (i - 4.5) * 0.28;
            const angle = i * 0.65;
            return (
              <mesh
                key={`helix-rung-${i}`}
                position={[0, y, 0]}
                rotation={[0, angle, 0]}
                geometry={sharedBoxGeo}
                scale={[1.25, 0.025, 0.025]}
              >
                {solidAccent}
              </mesh>
            );
          })}
          <mesh geometry={sharedOctaGeo} scale={0.52}>
            {wirePrimary}
          </mesh>
        </group>
      );
      break;

    case "stack":
      // 04 Technology: Geodesic Crystal Matrix
      monumentContent = (
        <group>
          <mesh geometry={sharedIcosaGeo} scale={1.65}>
            {wirePrimary}
          </mesh>
          <mesh
            geometry={sharedOctaGeo}
            scale={1.05}
            rotation={[Math.PI / 3, Math.PI / 4, 0]}
          >
            {wireRim}
          </mesh>
          <mesh
            geometry={sharedTorusGeo}
            scale={1.9}
            rotation={[Math.PI / 2.4, 0.3, 0]}
          >
            {solidAccent}
          </mesh>
        </group>
      );
      break;

    case "projects":
      // 05 Selected Work: Orbital Drydock & 3D Holographic Gateways
      monumentContent = (
        <group>
          {[-0.65, 0, 0.65].map((zOffset, idx) => (
            <group
              key={`drydock-bay-${idx}`}
              position={[0, 0, zOffset]}
              rotation={[0, 0, (idx * Math.PI) / 6]}
            >
              <mesh geometry={sharedBoxGeo} scale={[1.75, 1.15, 0.03]}>
                {idx === 1 ? wirePrimary : wireRim}
              </mesh>
            </group>
          ))}
          <mesh geometry={sharedIcosaGeo} scale={0.62}>
            {solidAccent}
          </mesh>
          <mesh
            geometry={sharedTorusGeo}
            scale={1.55}
            rotation={[Math.PI / 3, 0.4, 0]}
          >
            {wirePrimary}
          </mesh>
        </group>
      );
      break;

    case "recognition":
      // 06 Recognition: Supernova Crown & Celestial Spire
      monumentContent = (
        <group>
          <mesh geometry={sharedOctaGeo} scale={[0.65, 1.85, 0.65]}>
            {wirePrimary}
          </mesh>
          <mesh
            geometry={sharedOctaGeo}
            scale={[1.15, 0.75, 1.15]}
            rotation={[0, Math.PI / 4, 0]}
          >
            {wireRim}
          </mesh>
          {Array.from({ length: 8 }, (_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            return (
              <mesh
                key={`crown-spire-${i}`}
                position={[Math.cos(angle) * 1.35, 0, Math.sin(angle) * 1.35]}
                rotation={[0, -angle, Math.PI / 8]}
                geometry={sharedOctaGeo}
                scale={[0.12, 0.55, 0.12]}
              >
                {solidAccent}
              </mesh>
            );
          })}
          <mesh
            geometry={sharedTorusGeo}
            scale={1.45}
            rotation={[Math.PI / 2, 0, 0]}
          >
            {wirePrimary}
          </mesh>
        </group>
      );
      break;

    case "credentials":
      // 07 Credentials: Kage-Inspired 3D Sacred Torii / Cyber Portal Corridor
      monumentContent = (
        <group>
          {[-0.9, -0.3, 0.3, 0.9].map((z, idx) => (
            <group key={`portal-arch-${idx}`} position={[0, 0, z]}>
              <mesh
                position={[-0.95, 0, 0]}
                geometry={sharedBoxGeo}
                scale={[0.08, 1.75, 0.08]}
              >
                {idx % 2 === 0 ? wirePrimary : wireRim}
              </mesh>
              <mesh
                position={[0.95, 0, 0]}
                geometry={sharedBoxGeo}
                scale={[0.08, 1.75, 0.08]}
              >
                {idx % 2 === 0 ? wirePrimary : wireRim}
              </mesh>
              <mesh
                position={[0, 0.85, 0]}
                geometry={sharedBoxGeo}
                scale={[2.25, 0.09, 0.1]}
              >
                {wirePrimary}
              </mesh>
              <mesh
                position={[0, 0.62, 0]}
                geometry={sharedBoxGeo}
                scale={[1.95, 0.05, 0.06]}
              >
                {solidAccent}
              </mesh>
            </group>
          ))}
        </group>
      );
      break;

    case "gallery":
      // 08 Featured Stories: 3D Floating Panorama Carousel Ring
      monumentContent = (
        <group>
          {Array.from({ length: 6 }, (_, i) => {
            const angle = (i / 6) * Math.PI * 2;
            const r = 1.45;
            return (
              <mesh
                key={`gallery-frame-${i}`}
                position={[
                  Math.cos(angle) * r,
                  Math.sin(angle * 2) * 0.2,
                  Math.sin(angle) * r,
                ]}
                rotation={[0, -angle + Math.PI / 2, 0]}
                geometry={sharedBoxGeo}
                scale={[0.92, 0.62, 0.03]}
              >
                {i % 2 === 0 ? wirePrimary : wireRim}
              </mesh>
            );
          })}
          <mesh geometry={sharedOctaGeo} scale={0.55}>
            {solidAccent}
          </mesh>
          <mesh
            geometry={sharedTorusGeo}
            scale={1.5}
            rotation={[Math.PI / 2, 0, 0]}
          >
            {wireRim}
          </mesh>
        </group>
      );
      break;

    case "feedback":
      // 09 Testimonials: Harmonic Resonance Sphere & Echo Waves
      monumentContent = (
        <group>
          <mesh geometry={sharedIcosaGeo} scale={1.25}>
            {wirePrimary}
          </mesh>
          {[1.45, 1.75, 2.05].map((r, i) => (
            <mesh
              key={`echo-ring-${i}`}
              geometry={sharedTorusGeo}
              scale={r}
              rotation={[Math.PI / 2.5 + i * 0.35, i * 0.4, 0]}
            >
              {i % 2 === 0 ? wireRim : solidAccent}
            </mesh>
          ))}
        </group>
      );
      break;

    case "contact":
      // 10 Contact: Deep-Space Wormhole Relay Dish
      monumentContent = (
        <group>
          {[0.6, 1.0, 1.4, 1.8].map((r, i) => (
            <mesh
              key={`relay-dish-${i}`}
              position={[0, 0, -i * 0.22]}
              geometry={sharedTorusGeo}
              scale={r}
            >
              {i % 2 === 0 ? wirePrimary : wireRim}
            </mesh>
          ))}
          <mesh
            position={[0, 0, 0.4]}
            geometry={sharedBoxGeo}
            scale={[0.06, 0.06, 1.8]}
          >
            {solidAccent}
          </mesh>
          <mesh position={[0, 0, 1.2]} geometry={sharedOctaGeo} scale={0.25}>
            {wirePrimary}
          </mesh>
        </group>
      );
      break;

    default:
      // 01 Intro: Subtle orbital beacon complimenting the 3D PC & Gargantua
      monumentContent = (
        <group>
          <mesh geometry={sharedOctaGeo} scale={0.75}>
            {wireRim}
          </mesh>
          <mesh
            geometry={sharedTorusGeo}
            scale={1.2}
            rotation={[Math.PI / 3, 0.4, 0]}
          >
            {solidAccent}
          </mesh>
        </group>
      );
  }

  return (
    <group ref={rootRef} position={[-2.4, 0, -2.5]}>
      <group ref={monumentRef}>{monumentContent}</group>
    </group>
  );
};

export default Section3DMonuments;

