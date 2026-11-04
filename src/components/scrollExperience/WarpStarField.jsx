import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * 3D Warp Starfield & Relativistic Streak Lines:
 * Multi-colored stars in a deep 3D volume that stream past the camera
 * and stretch into hyperspace warp streaks when scrolling.
 */
const WarpStarField = ({ pointer, scrollMotion, reducedMotion }) => {
  const starsRef = useRef();
  const nearStarsRef = useRef();
  const warpLinesRef = useRef();

  const { positions, colors } = useMemo(() => {
    const count = 1500;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const starColors = [
      new THREE.Color("#ffffff"),
      new THREE.Color("#ffd8a8"),
      new THREE.Color("#bae6fd"),
      new THREE.Color("#ddd6fe"),
      new THREE.Color("#fde68a"),
    ];

    for (let i = 0; i < count; i += 1) {
      const seed = i + 1;
      const rand = (m, o) => {
        const v = Math.sin(seed * m) * o;
        return v - Math.floor(v);
      };
      pos[i * 3] = (rand(127.1, 43758.5) - 0.5) * 34;
      pos[i * 3 + 1] = (rand(311.7, 24634.6) - 0.5) * 24;
      pos[i * 3 + 2] = -28 + rand(74.7, 19341.1) * 31;

      const c = starColors[i % starColors.length];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, []);

  const nearPositions = useMemo(() => {
    const count = 320;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const seed = i + 99;
      const rand = (m, o) => {
        const v = Math.sin(seed * m) * o;
        return v - Math.floor(v);
      };
      pos[i * 3] = (rand(51.7, 65432.1) - 0.5) * 20;
      pos[i * 3 + 1] = (rand(83.3, 19283.7) - 0.5) * 14;
      pos[i * 3 + 2] = -12 + rand(19.9, 54321.9) * 15;
    }
    return pos;
  }, []);

  const warpLineSegments = useMemo(() => {
    const lineCount = 90;
    const segments = new Float32Array(lineCount * 6);
    for (let i = 0; i < lineCount; i += 1) {
      const angle = (i / lineCount) * Math.PI * 2 * 3.7;
      const radius = 2.2 + ((i * 1.618) % 8.5);
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = -18 + ((i * 2.718) % 20);
      segments[i * 6] = x;
      segments[i * 6 + 1] = y;
      segments[i * 6 + 2] = z;
      segments[i * 6 + 3] = x;
      segments[i * 6 + 4] = y;
      segments[i * 6 + 5] = z + 1.65;
    }
    return segments;
  }, []);

  useFrame(({ clock }, delta) => {
    if (document.hidden || reducedMotion) return;
    const t = clock.elapsedTime;
    const progress = scrollMotion.current.progress;
    const velocity = scrollMotion.current.velocity;
    const speed = Math.abs(velocity);

    if (starsRef.current) {
      starsRef.current.rotation.z = t * 0.012 + progress * 0.35;
      starsRef.current.position.z = ((t * 0.35 + progress * 12) % 14) - 4;
      starsRef.current.position.x = THREE.MathUtils.damp(
        starsRef.current.position.x,
        -pointer.current.x * 0.65,
        2.0,
        delta,
      );
      starsRef.current.position.y = THREE.MathUtils.damp(
        starsRef.current.position.y,
        -pointer.current.y * 0.45,
        2.0,
        delta,
      );
    }

    if (nearStarsRef.current) {
      nearStarsRef.current.rotation.z = -t * 0.02 + progress * 0.5;
      nearStarsRef.current.position.z = ((t * 0.85 + progress * 22) % 10) - 2;
      nearStarsRef.current.position.x = THREE.MathUtils.damp(
        nearStarsRef.current.position.x,
        -pointer.current.x * 1.25,
        2.5,
        delta,
      );
      nearStarsRef.current.position.y = THREE.MathUtils.damp(
        nearStarsRef.current.position.y,
        -pointer.current.y * 0.9,
        2.5,
        delta,
      );
    }

    if (warpLinesRef.current) {
      warpLinesRef.current.material.opacity = THREE.MathUtils.damp(
        warpLinesRef.current.material.opacity,
        0.04 + speed * 0.52,
        4.0,
        delta,
      );
      warpLinesRef.current.scale.z = THREE.MathUtils.damp(
        warpLinesRef.current.scale.z,
        1 + speed * 3.8,
        4.0,
        delta,
      );
      warpLinesRef.current.position.z = ((t * 4.5 + progress * 35) % 16) - 4;
      warpLinesRef.current.rotation.z = progress * 0.8;
    }
  });

  return (
    <group>
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={positions.length / 3}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
            count={colors.length / 3}
          />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          size={0.042}
          transparent
          opacity={0.78}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points ref={nearStarsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nearPositions, 3]}
            count={nearPositions.length / 3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#fef3c7"
          size={0.055}
          transparent
          opacity={0.55}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <lineSegments ref={warpLinesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[warpLineSegments, 3]}
            count={warpLineSegments.length / 3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#bae6fd"
          transparent
          opacity={0.06}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
};

export default WarpStarField;

