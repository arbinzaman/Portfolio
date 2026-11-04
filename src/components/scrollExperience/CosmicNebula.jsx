import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getChapterPalette } from "./scrollExperienceConfig";
import {
  NEBULA_FRAGMENT_SHADER,
  NEBULA_VERTEX_SHADER,
} from "./shaders/interstellarShaders";

/**
 * Volumetric Deep-Space Nebula Shader Backdrop:
 * Procedural swirling interstellar gas clouds that shift hue with active chapter and scroll.
 */
const CosmicNebula = ({ activeChapter, scrollMotion, pointer, reducedMotion }) => {
  const meshRef = useRef();
  const { palette } = getChapterPalette(activeChapter);

  const targetColorA = useMemo(
    () => new THREE.Color(palette.primary),
    [palette.primary],
  );
  const targetColorB = useMemo(
    () => new THREE.Color(palette.secondary),
    [palette.secondary],
  );

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uColorA: { value: new THREE.Color("#f59e0b") },
      uColorB: { value: new THREE.Color("#a78bfa") },
    }),
    [],
  );

  useFrame(({ clock }, delta) => {
    if (!meshRef.current || document.hidden) return;
    const mat = meshRef.current.material;
    if (!reducedMotion) {
      mat.uniforms.uTime.value = clock.elapsedTime;
      mat.uniforms.uScroll.value = scrollMotion.current.progress;
      mat.uniforms.uPointer.value.lerp(
        new THREE.Vector2(pointer.current.x, pointer.current.y),
        1 - Math.exp(-delta * 3),
      );
    }
    mat.uniforms.uColorA.value.lerp(targetColorA, 1 - Math.exp(-delta * 2.0));
    mat.uniforms.uColorB.value.lerp(targetColorB, 1 - Math.exp(-delta * 2.0));
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -16]} scale={[38, 24, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={NEBULA_VERTEX_SHADER}
        fragmentShader={NEBULA_FRAGMENT_SHADER}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

export default CosmicNebula;

