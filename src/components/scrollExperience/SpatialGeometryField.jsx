import React, { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  getChapterPalette,
  sharedBoxGeo,
  sharedIcosaGeo,
  sharedOctaGeo,
} from "./scrollExperienceConfig";

/**
 * 3D Spatial Floating Polyhedra Field:
 * Wireframe geometric artifacts distributed across the 3D tunnel so every scroll position
 * has tangible foreground/midground 3D objects gliding past the camera.
 */
const SpatialGeometryField = ({
  scrollMotion,
  pointer,
  activeChapter,
  reducedMotion,
}) => {
  const groupRef = useRef();
  const itemRefs = useRef([]);
  const isMobile = useThree((state) => state.viewport.aspect < 0.85);
  const { palette } = getChapterPalette(activeChapter);

  const items = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => {
        const side = i % 2 === 0 ? -1 : 1;
        const x = isMobile
          ? side * (0.45 + ((i * 0.37) % 0.95))
          : side * (2.6 + ((i * 0.91) % 2.8));
        const y = ((i * 1.37) % 9) - 4.5;
        const z = -1.2 - ((i * 1.13) % 7.5);
        const scale = isMobile
          ? 0.14 + ((i * 0.05) % 0.16)
          : 0.16 + ((i * 0.07) % 0.22);
        const shape = i % 3;
        return { x, y, z, scale, shape, speed: 0.25 + (i % 5) * 0.08 };
      }),
    [isMobile],
  );

  useFrame(({ clock }, delta) => {
    if (!groupRef.current || document.hidden || reducedMotion) return;
    const t = clock.elapsedTime;
    const p = scrollMotion.current.progress;

    groupRef.current.position.x = THREE.MathUtils.damp(
      groupRef.current.position.x,
      -pointer.current.x * 0.55,
      2.5,
      delta,
    );

    itemRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const item = items[i];
      mesh.rotation.x = t * item.speed + i;
      mesh.rotation.y = t * (item.speed * 0.8) + p * 3.5;
      // Loop Y position smoothly with scroll so 3D shapes continuously travel vertically
      const rawY = item.y + ((p * 18 + t * 0.15) % 9);
      mesh.position.y = ((rawY + 4.5) % 9) - 4.5;
    });
  });

  return (
    <group ref={groupRef}>
      {items.map((item, i) => (
        <mesh
          key={`spatial-geo-${i}`}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          position={[item.x, item.y, item.z]}
          scale={item.scale}
          geometry={
            item.shape === 0
              ? sharedOctaGeo
              : item.shape === 1
              ? sharedIcosaGeo
              : sharedBoxGeo
          }
        >
          <meshBasicMaterial
            color={i % 2 === 0 ? palette.primary : palette.rim}
            wireframe
            transparent
            opacity={0.26}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
};

export default SpatialGeometryField;

