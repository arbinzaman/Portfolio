import React, { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { getChapterPalette } from "./scrollExperienceConfig";

/**
 * Wormhole / Gravitational Wave Corridor:
 * Concentric space-time rings stretching into deep space that pulse and twist with scroll.
 */
const WormholeCorridor = ({
  scrollMotion,
  pointer,
  activeChapter,
  reducedMotion,
}) => {
  const groupRef = useRef();
  const ringRefs = useRef([]);
  const isMobile = useThree((state) => state.viewport.aspect < 0.85);
  const { palette } = getChapterPalette(activeChapter);

  const rings = useMemo(
    () =>
      Array.from({ length: 7 }, (_, idx) => ({
        z: -4.2 - idx * 2.1,
        radius: isMobile ? 1.15 + idx * 0.28 : 3.2 + idx * 0.55,
        speed: (idx % 2 === 0 ? 1 : -1) * (0.08 + idx * 0.02),
      })),
    [isMobile],
  );

  useFrame(({ clock }, delta) => {
    if (!groupRef.current || document.hidden) return;
    const progress = scrollMotion.current.progress;
    const pulse = Math.abs(scrollMotion.current.velocity);

    groupRef.current.position.x = THREE.MathUtils.damp(
      groupRef.current.position.x,
      pointer.current.x * 0.45,
      2.2,
      delta,
    );
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      pointer.current.y * 0.35,
      2.2,
      delta,
    );

    ringRefs.current.forEach((mesh, idx) => {
      if (!mesh) return;
      const ring = rings[idx];
      if (!reducedMotion) {
        mesh.rotation.z = clock.elapsedTime * ring.speed + progress * 1.8;
        mesh.rotation.x =
          Math.sin(clock.elapsedTime * 0.35 + idx) * 0.14 +
          pointer.current.y * 0.08;
        mesh.rotation.y =
          Math.cos(clock.elapsedTime * 0.28 + idx) * 0.14 +
          pointer.current.x * 0.08;
      }
      const wave =
        0.5 + 0.5 * Math.sin(clock.elapsedTime * 1.6 - idx * 0.7 + progress * 8);
      mesh.material.opacity = 0.05 + wave * 0.07 + pulse * 0.12;
    });
  });

  return (
    <group ref={groupRef}>
      {rings.map((ring, idx) => (
        <mesh
          key={`wormhole-ring-${idx}`}
          ref={(el) => {
            ringRefs.current[idx] = el;
          }}
          position={[0, 0, ring.z]}
        >
          <torusGeometry args={[ring.radius, 0.007, 6, 128]} />
          <meshBasicMaterial
            color={idx % 2 === 0 ? palette.primary : palette.rim}
            transparent
            opacity={0.08}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
};

export default WormholeCorridor;

