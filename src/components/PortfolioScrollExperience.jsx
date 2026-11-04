import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const chapters = [
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

// Interstellar palette: Gargantua amber/gold, Doppler cyan, cosmic violet, crimson flare
const chapterPalettes = [
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

// Shared geometries for high performance across all devices
const sharedBoxGeo = new THREE.BoxGeometry(1, 1, 1);
const sharedOctaGeo = new THREE.OctahedronGeometry(1, 0);
const sharedIcosaGeo = new THREE.IcosahedronGeometry(1, 0);
const sharedSphereLowGeo = new THREE.SphereGeometry(1, 16, 16);

/**
 * Kage-inspired Scroll & Pointer Camera Rig:
 * Flies the camera through 3D space along a curved orbital path as the user scrolls,
 * banking with scroll velocity and parallaxing strongly with cursor/touch movement.
 */
const InterstellarCameraRig = ({ pointer, scrollMotion, reducedMotion }) => {
  const smoothProgress = useRef(0);
  const smoothVelocity = useRef(0);
  const lookAtTarget = useRef(new THREE.Vector3(0.6, 0, -4));

  useFrame((state, delta) => {
    if (document.hidden) return;
    const camera = state.camera;
    const targetProgress = reducedMotion ? 0 : scrollMotion.current.progress;
    const rawVelocity = reducedMotion ? 0 : scrollMotion.current.velocity;

    smoothProgress.current = THREE.MathUtils.damp(
      smoothProgress.current,
      targetProgress,
      3.2,
      delta,
    );
    smoothVelocity.current = THREE.MathUtils.damp(
      smoothVelocity.current,
      rawVelocity,
      4.5,
      delta,
    );

    const p = smoothProgress.current;
    const v = smoothVelocity.current;
    const px = reducedMotion ? 0 : pointer.current.x;
    const py = reducedMotion ? 0 : pointer.current.y;
    const t = state.clock.elapsedTime;

    // Curved orbital camera flight path inspired by Kage scroll scenes
    const orbitAngle = p * Math.PI * 1.35;
    const targetCamX =
      Math.sin(orbitAngle) * 1.35 + px * 0.95 + Math.cos(t * 0.22) * 0.12;
    const targetCamY =
      Math.cos(p * Math.PI * 2.0) * 0.65 +
      py * 0.72 +
      Math.sin(t * 0.28) * 0.08;
    const targetCamZ = 6.2 - Math.sin(p * Math.PI) * 1.45 - Math.abs(v) * 0.55;

    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      targetCamX,
      3.5,
      delta,
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      targetCamY,
      3.5,
      delta,
    );
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      targetCamZ,
      3.5,
      delta,
    );

    // Dynamic look-at target that shifts across the cosmic horizon
    const isMobile = state.viewport.aspect < 0.85;
    const focusX = (isMobile ? 0.15 : 1.15) + Math.cos(orbitAngle) * 0.45 + px * 0.45;
    const focusY = Math.sin(p * Math.PI * 1.5) * 0.35 + py * 0.35 - v * 0.25;
    const focusZ = -3.5;

    lookAtTarget.current.x = THREE.MathUtils.damp(
      lookAtTarget.current.x,
      focusX,
      4.0,
      delta,
    );
    lookAtTarget.current.y = THREE.MathUtils.damp(
      lookAtTarget.current.y,
      focusY,
      4.0,
      delta,
    );
    lookAtTarget.current.z = THREE.MathUtils.damp(
      lookAtTarget.current.z,
      focusZ,
      4.0,
      delta,
    );

    camera.lookAt(lookAtTarget.current);

    // Subtle spacecraft roll banking on pointer X and scroll velocity
    camera.rotation.z = THREE.MathUtils.damp(
      camera.rotation.z,
      -px * 0.065 + v * 0.08,
      3.5,
      delta,
    );

    // Relativistic warp FOV expansion when scrolling fast
    const targetFov = 44 + Math.abs(v) * 8;
    if (Math.abs(camera.fov - targetFov) > 0.05) {
      camera.fov = THREE.MathUtils.damp(camera.fov, targetFov, 4.0, delta);
      camera.updateProjectionMatrix();
    }
  });

  return null;
};

/**
 * 3D Warp Starfield & Relativistic Streak Lines:
 * 1,600 multi-colored stars in a deep 3D volume that stream past the camera
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
      new THREE.Color("#ffd8a8"), // Warm K-type gold star
      new THREE.Color("#bae6fd"), // Blue supergiant
      new THREE.Color("#ddd6fe"), // Violet pulsar
      new THREE.Color("#fde68a"), // Solar yellow
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

/**
 * Volumetric Deep-Space Nebula Shader Backdrop:
 * Procedural swirling interstellar gas clouds that shift hue with active chapter and scroll.
 */
const CosmicNebula = ({ activeChapter, scrollMotion, pointer, reducedMotion }) => {
  const meshRef = useRef();
  const chapterIndex = Math.max(
    0,
    chapters.findIndex(({ id }) => id === activeChapter),
  );
  const palette = chapterPalettes[chapterIndex] || chapterPalettes[0];
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
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          precision mediump float;
          uniform float uTime;
          uniform float uScroll;
          uniform vec2 uPointer;
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          varying vec2 vUv;

          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
          }

          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            f = f * f * (3.0 - 2.0 * f);
            float a = hash(i);
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));
            return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
          }

          float fbm(vec2 p) {
            float v = 0.0;
            v += 0.50 * noise(p); p *= 2.02;
            v += 0.25 * noise(p); p *= 2.03;
            v += 0.125 * noise(p);
            return v;
          }

          void main() {
            vec2 uv = vUv - 0.5;
            uv += uPointer * 0.04;
            float t = uTime * 0.045;
            vec2 q = vec2(
              fbm(uv * 2.6 + vec2(t, uScroll * 1.4)),
              fbm(uv * 2.6 + vec2(-t * 0.8, 1.7 - uScroll * 1.1))
            );
            float n = fbm(uv * 3.2 + q * 1.8);
            float vignette = smoothstep(0.78, 0.08, length(uv));
            vec3 col = mix(uColorB * 0.65, uColorA, smoothstep(0.32, 0.75, n));
            float alpha = smoothstep(0.36, 0.78, n) * vignette * 0.22;
            gl_FragColor = vec4(col, alpha);
          }
        `}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

/**
 * Wormhole / Gravitational Wave Corridor:
 * Concentric space-time rings stretching into deep space that pulse and twist with scroll.
 */
const WormholeCorridor = ({ scrollMotion, pointer, activeChapter, reducedMotion }) => {
  const groupRef = useRef();
  const ringRefs = useRef([]);
  const chapterIndex = Math.max(
    0,
    chapters.findIndex(({ id }) => id === activeChapter),
  );
  const palette = chapterPalettes[chapterIndex] || chapterPalettes[0];

  const rings = useMemo(
    () =>
      Array.from({ length: 7 }, (_, idx) => ({
        z: -4.5 - idx * 2.2,
        radius: 3.2 + idx * 0.55,
        speed: (idx % 2 === 0 ? 1 : -1) * (0.08 + idx * 0.02),
      })),
    [],
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
      mesh.material.opacity = 0.045 + wave * 0.065 + pulse * 0.12;
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

/**
 * Shooting Comets & Meteorites streaking across the cosmos
 */
const ShootingComets = ({ reducedMotion }) => {
  const comet1 = useRef();
  const comet2 = useRef();
  const viewport = useThree((state) => state.viewport);

  useFrame(({ clock }) => {
    if (document.hidden || reducedMotion) return;
    const t = clock.elapsedTime;

    if (comet1.current) {
      const c1 = (t * 0.11) % 1;
      comet1.current.visible = c1 < 0.38;
      if (comet1.current.visible) {
        const p = c1 / 0.38;
        comet1.current.position.set(
          -viewport.width * 0.75 + p * viewport.width * 1.5,
          viewport.height * 0.48 - p * viewport.height * 0.85,
          -2.5,
        );
      }
    }

    if (comet2.current) {
      const c2 = ((t + 4.7) * 0.085) % 1;
      comet2.current.visible = c2 < 0.34;
      if (comet2.current.visible) {
        const p = c2 / 0.34;
        comet2.current.position.set(
          viewport.width * 0.75 - p * viewport.width * 1.5,
          viewport.height * 0.32 - p * viewport.height * 0.75,
          -4.2,
        );
      }
    }
  });

  return (
    <>
      <group ref={comet1} visible={false}>
        <mesh geometry={sharedSphereLowGeo} scale={0.04}>
          <meshBasicMaterial color="#fff7ed" />
        </mesh>
        <mesh position={[-0.45, 0.22, 0]} rotation={[0, 0, -0.44]}>
          <planeGeometry args={[0.95, 0.018]} />
          <meshBasicMaterial
            color="#f59e0b"
            transparent
            opacity={0.65}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      <group ref={comet2} visible={false}>
        <mesh geometry={sharedSphereLowGeo} scale={0.035}>
          <meshBasicMaterial color="#e0f2fe" />
        </mesh>
        <mesh position={[0.42, 0.19, 0]} rotation={[0, 0, 0.42]}>
          <planeGeometry args={[0.88, 0.015]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.6}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </>
  );
};

/**
 * Chapter-Specific Interstellar Artifact (Endurance / Tesseract / Wormhole / Pulsar):
 * Morphs inside/around the main cosmic anomaly as the user scrolls through chapters.
 */
const InterstellarChapterArtifact = ({ chapter, accentColor, reducedMotion }) => {
  const group = useRef();

  useFrame(({ clock }, delta) => {
    if (!group.current || reducedMotion || document.hidden) return;
    group.current.rotation.y += delta * 0.35;
    group.current.rotation.x = Math.sin(clock.elapsedTime * 0.5) * 0.25;
  });

  const wireMat = (
    <meshBasicMaterial
      color={accentColor}
      transparent
      opacity={0.65}
      wireframe
      depthWrite={false}
      blending={THREE.AdditiveBlending}
    />
  );

  const solidGlowMat = (
    <meshBasicMaterial
      color={accentColor}
      transparent
      opacity={0.45}
      depthWrite={false}
      blending={THREE.AdditiveBlending}
    />
  );

  let artifact;
  switch (chapter) {
    case "about":
    case "work":
      // Tesseract 4D Hypercube projection
      artifact = (
        <>
          <mesh geometry={sharedBoxGeo} scale={0.68}>
            {wireMat}
          </mesh>
          <mesh
            geometry={sharedBoxGeo}
            scale={0.36}
            rotation={[Math.PI / 4, Math.PI / 4, 0]}
          >
            {solidGlowMat}
          </mesh>
        </>
      );
      break;
    case "stack":
    case "projects":
      // Gyroscopic Wormhole Sphere
      artifact = (
        <>
          {[0, 1, 2].map((i) => (
            <mesh
              key={i}
              rotation={[(i * Math.PI) / 3, (i * Math.PI) / 4, 0]}
            >
              <torusGeometry args={[0.56, 0.012, 6, 64]} />
              {solidGlowMat}
            </mesh>
          ))}
          <mesh geometry={sharedOctaGeo} scale={0.28}>
            {wireMat}
          </mesh>
        </>
      );
      break;
    case "recognition":
    case "credentials":
      // Binary Pulsar Star Core
      artifact = (
        <>
          <mesh geometry={sharedIcosaGeo} scale={0.46}>
            {wireMat}
          </mesh>
          <mesh position={[0, 0, 0]} scale={[0.04, 1.35, 0.04]} geometry={sharedBoxGeo}>
            {solidGlowMat}
          </mesh>
        </>
      );
      break;
    default:
      // Endurance Core Beacon
      artifact = (
        <>
          <mesh geometry={sharedOctaGeo} scale={0.48}>
            {wireMat}
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.66, 0.014, 6, 64]} />
            {solidGlowMat}
          </mesh>
        </>
      );
  }

  return (
    <group ref={group} position={[2.35, 0.25, 0.25]}>
      {artifact}
    </group>
  );
};

/**
 * Gargantua Black Hole + Relativistic Accretion Disk + Endurance Spacecraft Ring:
 * The centerpiece Interstellar 3D object that travels, tilts, and reacts to scroll & cursor.
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

  const chapterIndex = Math.max(
    0,
    chapters.findIndex(({ id }) => id === activeChapter),
  );
  const palette = chapterPalettes[chapterIndex] || chapterPalettes[0];
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
      const ySpread = (Math.sin(i * 19.7) * 0.08) * (3.3 - radius);
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
    const baseX = aspect > 1.15 ? 2.35 : aspect < 0.85 ? 0.15 : 0.85;
    const baseScale = aspect > 1.15 ? 1.55 : aspect < 0.85 ? 0.98 : 1.15;

    // Dramatic 3D figure-eight flight path across chapters + cursor reactivity
    const targetX =
      baseX +
      Math.sin(progress * Math.PI * 2.5) * 0.75 +
      Math.cos(chapterIndex * 0.9) * 0.28 +
      px * 0.65;
    const targetY =
      0.38 -
      progress * 0.55 +
      Math.sin(progress * Math.PI * 3.0) * 0.42 +
      py * 0.52;
    const targetZ =
      -2.2 + Math.cos(progress * Math.PI * 2.0) * 0.85 + energy * 0.45;
    const targetScale =
      baseScale * (0.94 + Math.sin(progress * Math.PI) * 0.16 + energy * 0.14);

    rootGroup.current.position.x = THREE.MathUtils.damp(
      rootGroup.current.position.x,
      targetX,
      3.0,
      delta,
    );
    rootGroup.current.position.y = THREE.MathUtils.damp(
      rootGroup.current.position.y,
      targetY,
      3.0,
      delta,
    );
    rootGroup.current.position.z = THREE.MathUtils.damp(
      rootGroup.current.position.z,
      targetZ,
      3.0,
      delta,
    );
    rootGroup.current.scale.setScalar(
      THREE.MathUtils.damp(rootGroup.current.scale.x, targetScale, 3.0, delta),
    );

    // Dynamic 3D tilt of Gargantua with scroll, chapter, and pointer
    if (blackHoleGroup.current) {
      const targetRotX =
        0.38 +
        Math.sin(progress * Math.PI * 2.0) * 0.42 +
        py * 0.35 +
        velocity * 0.25;
      const targetRotZ =
        -0.22 +
        Math.cos(progress * Math.PI * 1.5) * 0.32 +
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
        0.75 + py * 0.25 + Math.sin(progress * Math.PI) * 0.35,
        2.8,
        delta,
      );
      enduranceRingRef.current.rotation.y = THREE.MathUtils.damp(
        enduranceRingRef.current.rotation.y,
        -0.35 + px * 0.25 + Math.cos(progress * Math.PI) * 0.3,
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

  const accretionVertexShader = `
    varying vec2 vUv;
    varying vec3 vPos;
    void main() {
      vUv = uv;
      vPos = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const accretionFragmentShader = `
    precision mediump float;
    uniform float uTime;
    uniform float uEnergy;
    uniform vec3 uColorHot;
    uniform vec3 uColorMid;
    uniform vec3 uColorOuter;
    varying vec2 vUv;
    varying vec3 vPos;

    void main() {
      vec2 p = vPos.xy;
      float r = length(p);
      float angle = atan(p.y, p.x);

      // Inner event horizon cutoff & outer fade
      float innerMask = smoothstep(0.92, 1.18, r);
      float outerMask = 1.0 - smoothstep(1.95, 2.85, r);
      float ringMask = innerMask * outerMask;
      if (ringMask <= 0.001) discard;

      // Relativistic spiral plasma bands
      float spiral1 = sin(angle * 5.0 - r * 9.5 + uTime * 2.4);
      float spiral2 = cos(angle * 11.0 - r * 15.0 - uTime * 3.1);
      float rings = sin(r * 26.0 - uTime * 4.0) * 0.5 + 0.5;
      float plasma = (spiral1 * 0.35 + spiral2 * 0.25 + rings * 0.4) * 0.5 + 0.5;

      // Intense inner photon heat grading to outer cosmic plasma
      float radialT = clamp((r - 0.95) / 1.85, 0.0, 1.0);
      vec3 col = mix(uColorHot * 1.35, uColorMid, smoothstep(0.0, 0.55, radialT));
      col = mix(col, uColorOuter, smoothstep(0.45, 1.0, radialT));

      // Doppler beaming (brighter on the approaching side)
      float doppler = 0.78 + 0.35 * sin(angle + 0.8);
      float coreBright = pow(1.0 - radialT, 2.2) * 0.85;
      float alpha = ringMask * (0.22 + plasma * 0.52 + coreBright + uEnergy * 0.35) * doppler;

      gl_FragColor = vec4(col * (1.0 + coreBright * 0.6), clamp(alpha, 0.0, 0.92));
    }
  `;

  return (
    <group ref={rootGroup} position={[2.2, 0.35, -2.2]}>
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
            vertexShader={`
              varying vec3 vNormal;
              void main() {
                vNormal = normalize(normalMatrix * normal);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `}
            fragmentShader={`
              precision mediump float;
              uniform float uTime;
              uniform vec3 uRimColor;
              uniform vec3 uAccentColor;
              varying vec3 vNormal;
              void main() {
                float viewDot = abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)));
                float rim = pow(1.0 - viewDot, 3.2);
                float pulse = 0.88 + 0.12 * sin(uTime * 2.2);
                vec3 col = mix(uAccentColor, uRimColor * 1.4, rim);
                gl_FragColor = vec4(col, rim * 0.85 * pulse);
              }
            `}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Main Relativistic Accretion Disk */}
        <mesh
          ref={accretionDiskRef}
          rotation={[Math.PI * 0.44, 0, 0]}
        >
          <ringGeometry args={[0.9, 2.85, 96, 2]} />
          <shaderMaterial
            uniforms={diskUniforms}
            vertexShader={accretionVertexShader}
            fragmentShader={accretionFragmentShader}
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
            vertexShader={accretionVertexShader}
            fragmentShader={accretionFragmentShader}
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

      {/* Chapter-Specific Interstellar Artifact */}
      <InterstellarChapterArtifact
        key={activeChapter}
        chapter={activeChapter}
        accentColor={palette.primary}
        reducedMotion={reducedMotion}
      />
    </group>
  );
};

const PortfolioScrollExperience = () => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeChapter, setActiveChapter] = useState("intro");
  const pointer = useRef({ x: 0, y: 0 });
  const scrollMotion = useRef({ velocity: 0, progress: 0 });
  const activeChapterRef = useRef("intro");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    let updateFrame = 0;
    const updateScrollInterface = () => {
      if (updateFrame) return;

      updateFrame = window.requestAnimationFrame(() => {
        updateFrame = 0;
        const scrollableHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress =
          scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        scrollMotion.current.progress = progress;

        const marker = window.innerHeight * 0.42;
        const currentChapter = chapters
          .map(({ id }) =>
            document.querySelector(`[data-portfolio-chapter="${id}"]`),
          )
          .filter(Boolean)
          .reduce((current, element) => {
            return element.getBoundingClientRect().top <= marker
              ? element.dataset.portfolioChapter
              : current;
          }, chapters[0].id);
        if (activeChapterRef.current !== currentChapter) {
          document
            .querySelectorAll("[data-portfolio-chapter][data-chapter-active]")
            .forEach((element) => {
              delete element.dataset.chapterActive;
            });
          document
            .querySelector(`[data-portfolio-chapter="${currentChapter}"]`)
            ?.setAttribute("data-chapter-active", "true");
          activeChapterRef.current = currentChapter;
          setActiveChapter(currentChapter);
        }
      });
    };

    updateScrollInterface();
    let previousScrollY = window.scrollY;
    const handleScroll = () => {
      const deltaY = window.scrollY - previousScrollY;
      previousScrollY = window.scrollY;
      scrollMotion.current.velocity = THREE.MathUtils.clamp(
        scrollMotion.current.velocity + deltaY / 150,
        -1.2,
        1.2,
      );
      updateScrollInterface();
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateScrollInterface);

    const updatePointer = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = 1 - (event.clientY / window.innerHeight) * 2;
    };
    const clearPointer = () => {
      pointer.current.x = 0;
      pointer.current.y = 0;
    };
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("blur", clearPointer);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateScrollInterface);
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("blur", clearPointer);
      if (updateFrame) window.cancelAnimationFrame(updateFrame);
    };
  }, []);

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
