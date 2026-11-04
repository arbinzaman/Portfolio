import React, { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { getChapterPalette, sharedBoxGeo } from "./scrollExperienceConfig";
import {
  ACCRETION_FRAGMENT_SHADER,
  ACCRETION_VERTEX_SHADER,
  PHOTON_RING_FRAGMENT_SHADER,
  PHOTON_RING_VERTEX_SHADER,
} from "./shaders/interstellarShaders";

/**
 * Gargantua Black Hole + Relativistic Accretion Disk + Endurance Spacecraft Ring:
 * The centerpiece Interstellar 3D object that travels across the screen in an S-curve
 * across all 10 chapters, tilting and reacting to scroll & cursor.
 */
const GargantuaAndEndurance = ({
  pointer,
  reducedMotion,
  activeChapter,
  scrollMotion,
}) => {
  const rootGroup = useRef();
  const blackHoleGroup = useRef();
  const accretionDiskRef = useRef();
  const lensingHaloRef = useRef();
  const photonRingRef = useRef();
  const enduranceRingRef = useRef();
  const shockwaveRingRef = useRef();
  const scrollEnergy = useRef(0);

  const { palette } = getChapterPalette(activeChapter);
  const targetPrimary = useMemo(
    () => new THREE.Color(palette.primary),
    [palette.primary],
  );
  const targetSecondary = useMemo(
    () => new THREE.Color(palette.secondary),
    [palette.secondary],
  );
  const targetRim = useMemo(
    () => new THREE.Color(palette.rim),
    [palette.rim],
  );

  const isMobile = useThree((state) => state.viewport.aspect < 0.85);

  // 12 Endurance spacecraft habitat modules arranged in a precision ring
  const enduranceModules = useMemo(
    () =>
      Array.from({ length: 12 }, (_, idx) => {
        const angle = (idx / 12) * Math.PI * 2;
        const radius = 2.55;
        return {
          position: [Math.cos(angle) * radius, Math.sin(angle) * radius, 0],
          rotation: [0, 0, angle],
        };
      }),
    [],
  );

  // Orbiting debris / satellite dust particles around Gargantua
  const accretionParticles = useMemo(() => {
    const count = 320;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const angle = (i / count) * Math.PI * 2 * 7.0;
      const radius = 1.35 + ((i * 0.618) % 1.85);
      const ySpread = Math.sin(i * 19.7) * 0.08 * (3.3 - radius);
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = ySpread;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return positions;
  }, []);

  const diskUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uEnergy: { value: 0 },
      uColorHot: { value: new THREE.Color("#f59e0b") },
      uColorMid: { value: new THREE.Color("#a78bfa") },
      uColorOuter: { value: new THREE.Color("#38bdf8") },
    }),
    [],
  );

  const photonUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRimColor: { value: new THREE.Color("#fde68a") },
      uAccentColor: { value: new THREE.Color("#38bdf8") },
    }),
    [],
  );

  useFrame((state, delta) => {
    if (!rootGroup.current || document.hidden) return;

    const progress = scrollMotion.current.progress;
    const velocity = reducedMotion ? 0 : scrollMotion.current.velocity;
    const speed = Math.abs(velocity);
    const px = reducedMotion ? 0 : pointer.current.x;
    const py = reducedMotion ? 0 : pointer.current.y;
    const t = state.clock.elapsedTime;

    scrollEnergy.current = THREE.MathUtils.damp(
      scrollEnergy.current,
      speed,
      4.5,
      delta,
    );
    const energy = scrollEnergy.current;

    const aspect = state.viewport.aspect;
    const maxSwipeX = aspect > 1.15 ? 2.15 : aspect < 0.85 ? 0.45 : 1.15;
    const baseScale = aspect > 1.15 ? 1.55 : aspect < 0.85 ? 0.72 : 1.2;

    // Sweeping 3D S-curve flight path across all sections (with vertical travel on mobile so it shines in upper/lower viewport bands)
    const targetX =
      Math.cos(progress * Math.PI * (isMobile ? 3.5 : 3.0)) * maxSwipeX +
      px * 0.65;
    const targetY = isMobile
      ? 0.95 * Math.sin(progress * Math.PI * 4.5 + 0.6) + py * 0.45
      : 0.32 -
        progress * 0.35 +
        Math.sin(progress * Math.PI * 4.0) * 0.45 +
        py * 0.52;
    const targetZ =
      (isMobile ? -1.65 : -2.1) +
      Math.cos(progress * Math.PI * 2.0) * 0.65 +
      energy * 0.45;
    const targetScale =
      baseScale *
      (0.95 + Math.sin(progress * Math.PI * 2.0) * 0.14 + energy * 0.14);

    rootGroup.current.position.x = THREE.MathUtils.damp(
      rootGroup.current.position.x,
      targetX,
      2.8,
      delta,
    );
    rootGroup.current.position.y = THREE.MathUtils.damp(
      rootGroup.current.position.y,
      targetY,
      2.8,
      delta,
    );
    rootGroup.current.position.z = THREE.MathUtils.damp(
      rootGroup.current.position.z,
      targetZ,
      2.8,
      delta,
    );
    rootGroup.current.scale.setScalar(
      THREE.MathUtils.damp(rootGroup.current.scale.x, targetScale, 3.0, delta),
    );

    // Dynamic 3D tilt of Gargantua with scroll, chapter, and pointer
    if (blackHoleGroup.current) {
      const targetRotX =
        0.38 +
        Math.sin(progress * Math.PI * 2.5) * 0.42 +
        py * 0.35 +
        velocity * 0.25;
      const targetRotZ =
        -0.22 +
        Math.cos(progress * Math.PI * 2.0) * 0.35 +
        px * 0.3 +
        velocity * 0.18;

      blackHoleGroup.current.rotation.x = THREE.MathUtils.damp(
        blackHoleGroup.current.rotation.x,
        targetRotX,
        3.2,
        delta,
      );
      blackHoleGroup.current.rotation.z = THREE.MathUtils.damp(
        blackHoleGroup.current.rotation.z,
        targetRotZ,
        3.2,
        delta,
      );
      if (!reducedMotion) {
        blackHoleGroup.current.rotation.y +=
          delta * (0.14 + energy * 0.85) + px * delta * 0.25;
      }
    }

    // Update Accretion Disk & Lensing Halo Shader Uniforms
    if (accretionDiskRef.current) {
      const u = accretionDiskRef.current.material.uniforms;
      u.uTime.value = t * (1.0 + energy * 1.5);
      u.uEnergy.value = energy;
      u.uColorHot.value.lerp(targetPrimary, 1 - Math.exp(-delta * 2.5));
      u.uColorMid.value.lerp(targetSecondary, 1 - Math.exp(-delta * 2.5));
      u.uColorOuter.value.lerp(targetRim, 1 - Math.exp(-delta * 2.5));
    }

    if (lensingHaloRef.current) {
      const u = lensingHaloRef.current.material.uniforms;
      u.uTime.value = -t * 0.85;
      u.uEnergy.value = energy;
      u.uColorHot.value.lerp(targetPrimary, 1 - Math.exp(-delta * 2.5));
      u.uColorMid.value.lerp(targetSecondary, 1 - Math.exp(-delta * 2.5));
      u.uColorOuter.value.lerp(targetRim, 1 - Math.exp(-delta * 2.5));
    }

    if (photonRingRef.current) {
      const u = photonRingRef.current.material.uniforms;
      u.uTime.value = t;
      u.uRimColor.value.lerp(targetPrimary, 1 - Math.exp(-delta * 2.5));
      u.uAccentColor.value.lerp(targetRim, 1 - Math.exp(-delta * 2.5));
    }

    // Rotate Endurance 12-module spacecraft ring
    if (enduranceRingRef.current && !reducedMotion) {
      enduranceRingRef.current.rotation.z -= delta * (0.18 + energy * 0.9);
      enduranceRingRef.current.rotation.x = THREE.MathUtils.damp(
        enduranceRingRef.current.rotation.x,
        0.75 + py * 0.25 + Math.sin(progress * Math.PI * 2.0) * 0.35,
        2.8,
        delta,
      );
      enduranceRingRef.current.rotation.y = THREE.MathUtils.damp(
        enduranceRingRef.current.rotation.y,
        -0.35 + px * 0.25 + Math.cos(progress * Math.PI * 2.0) * 0.3,
        2.8,
        delta,
      );
    }

    // Relativistic Shockwave Ring expanding on scroll velocity
    if (shockwaveRingRef.current) {
      shockwaveRingRef.current.scale.setScalar(
        1.0 + energy * 0.55 + Math.sin(t * 1.5) * 0.04,
      );
      shockwaveRingRef.current.material.opacity =
        (isMobile ? 0.14 : 0.09) + energy * 0.45;
      if (!reducedMotion) {
        shockwaveRingRef.current.rotation.z += delta * (0.25 + energy * 1.2);
      }
    }

    if (!reducedMotion) {
      scrollMotion.current.velocity *= Math.exp(-delta * 2.8);
      if (Math.abs(scrollMotion.current.velocity) < 0.002) {
        scrollMotion.current.velocity = 0;
      }
    }
  });

  return (
    <group ref={rootGroup} position={[2.1, 0.35, -2.1]}>
      {/* Gargantua Black Hole & Accretion System */}
      <group ref={blackHoleGroup}>
        {/* Pitch-Black Event Horizon Sphere */}
        <mesh scale={0.92}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color="#010206" />
        </mesh>

        {/* Relativistic Photon Sphere Rim Glow */}
        <mesh ref={photonRingRef} scale={1.04}>
          <sphereGeometry args={[1, 32, 32]} />
          <shaderMaterial
            uniforms={photonUniforms}
            vertexShader={PHOTON_RING_VERTEX_SHADER}
            fragmentShader={PHOTON_RING_FRAGMENT_SHADER}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Main Relativistic Accretion Disk */}
        <mesh ref={accretionDiskRef} rotation={[Math.PI * 0.44, 0, 0]}>
          <ringGeometry args={[0.9, 2.85, 96, 2]} />
          <shaderMaterial
            uniforms={diskUniforms}
            vertexShader={ACCRETION_VERTEX_SHADER}
            fragmentShader={ACCRETION_FRAGMENT_SHADER}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Gravitational Lensing Upper/Lower Bent Light Halo */}
        <mesh
          ref={lensingHaloRef}
          rotation={[0.08, 0.12, -0.08]}
          scale={[0.82, 0.82, 0.82]}
        >
          <ringGeometry args={[0.92, 2.25, 96, 1]} />
          <shaderMaterial
            uniforms={diskUniforms}
            vertexShader={ACCRETION_VERTEX_SHADER}
            fragmentShader={ACCRETION_FRAGMENT_SHADER}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Orbiting Relativistic Accretion Sparks */}
        <points rotation={[Math.PI * 0.06, 0, 0]}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[accretionParticles, 3]}
              count={accretionParticles.length / 3}
            />
          </bufferGeometry>
          <pointsMaterial
            color={palette.primary}
            size={0.028}
            transparent
            opacity={0.68}
            sizeAttenuation
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>

      {/* Endurance 12-Module Spacecraft Ring */}
      <group ref={enduranceRingRef} rotation={[0.75, -0.35, 0]}>
        <mesh>
          <torusGeometry args={[2.55, 0.012, 8, 128]} />
          <meshBasicMaterial
            color="#e2e8f0"
            transparent
            opacity={0.35}
            depthWrite={false}
          />
        </mesh>
        <mesh>
          <torusGeometry args={[2.32, 0.005, 6, 128]} />
          <meshBasicMaterial
            color={palette.rim}
            transparent
            opacity={0.28}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        {enduranceModules.map((mod, idx) => (
          <group
            key={`endurance-mod-${idx}`}
            position={mod.position}
            rotation={mod.rotation}
          >
            <mesh geometry={sharedBoxGeo} scale={[0.14, 0.24, 0.09]}>
              <meshBasicMaterial
                color={idx % 3 === 0 ? palette.primary : "#cbd5e1"}
                transparent
                opacity={0.78}
              />
            </mesh>
            {idx % 3 === 0 && (
              <mesh
                position={[-0.62, 0, 0]}
                geometry={sharedBoxGeo}
                scale={[1.1, 0.012, 0.012]}
              >
                <meshBasicMaterial
                  color={palette.rim}
                  transparent
                  opacity={0.22}
                />
              </mesh>
            )}
          </group>
        ))}
      </group>

      {/* Relativistic Shockwave Pulse Ring */}
      <mesh ref={shockwaveRingRef} rotation={[0.95, 0.25, 0.15]}>
        <torusGeometry args={[3.05, 0.009, 6, 144]} />
        <meshBasicMaterial
          color={palette.rim}
          transparent
          opacity={0.12}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

export default GargantuaAndEndurance;

