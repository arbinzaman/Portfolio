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

const satellitePositions = [
  [0, 2.25, 0],
  [1.65, 1.35, 0],
  [2.05, -0.65, 0],
  [0.2, -2.2, 0],
  [-1.75, -1.1, 0],
  [-1.9, 0.9, 0],
];

const StarField = ({ pointer, reducedMotion }) => {
  const stars = useRef();
  const field = useRef();
  const comet = useRef();
  const viewport = useThree((state) => state.viewport);
  const positions = useMemo(() => {
    const values = new Float32Array(1200 * 3);
    for (let index = 0; index < 1200; index += 1) {
      const seed = index + 1;
      const random = (multiplier, offset) => {
        const value = Math.sin(seed * multiplier) * offset;
        return value - Math.floor(value);
      };
      values[index * 3] =
        (random(127.1, 43758.5453) - 0.5) * viewport.width * 2.2;
      values[index * 3 + 1] =
        (random(311.7, 24634.6345) - 0.5) * viewport.height * 2.2;
      values[index * 3 + 2] = -1 - random(74.7, 19341.171) * 5;
    }
    return values;
  }, [viewport.height, viewport.width]);
  const constellationLines = useMemo(
    () => {
      const constellations = [
        [
          [-0.1, 0.5],
          [-0.02, 0.62],
          [0.08, 0.56],
          [0.15, 0.7],
          [0.23, 0.54],
        ],
        [
          [0.28, -0.43],
          [0.34, -0.3],
          [0.43, -0.38],
          [0.48, -0.55],
          [0.36, -0.62],
          [0.28, -0.43],
        ],
      ];
      const segments = [];
      const nodes = [];
      const toWorld = ([x, y]) => [
        x * viewport.width,
        y * viewport.height,
        -0.7,
      ];

      constellations.forEach((constellation) => {
        constellation.forEach((point, index) => {
          nodes.push(toWorld(point));
          if (index > 0) {
            segments.push(...toWorld(constellation[index - 1]), ...toWorld(point));
          }
        });
      });

      return {
        lines: new Float32Array(segments),
        nodes,
      };
    },
    [viewport.height, viewport.width],
  );

  useFrame(({ clock }, delta) => {
    if (stars.current) {
      stars.current.material.opacity = 0.18 + Math.sin(clock.elapsedTime * 0.45) * 0.035;
    }

    if (!reducedMotion) {
      const progress =
        (document.documentElement.scrollHeight - window.innerHeight) > 0
          ? window.scrollY /
            (document.documentElement.scrollHeight - window.innerHeight)
          : 0;
      if (field.current) {
        field.current.position.x = THREE.MathUtils.damp(
          field.current.position.x,
          pointer.current.x * 0.14,
          1.2,
          delta,
        );
        field.current.position.y = THREE.MathUtils.damp(
          field.current.position.y,
          progress * 0.35 + pointer.current.y * 0.12,
          1.2,
          delta,
        );
      }

      if (comet.current) {
        const cycle = (clock.elapsedTime * 0.075) % 1;
        comet.current.position.set(
          -viewport.width * 0.65 + cycle * viewport.width * 1.3,
          viewport.height * 0.42 - cycle * viewport.height * 0.8,
          -1.5,
        );
        comet.current.visible = cycle < 0.35;
      }
    }
  });

  return (
    <>
      <group ref={field}>
        <points ref={stars}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[positions, 3]}
              count={positions.length / 3}
            />
          </bufferGeometry>
          <pointsMaterial
            color="#d9d4ff"
            size={0.018}
            transparent
            opacity={0.18}
            sizeAttenuation
            depthWrite={false}
          />
        </points>
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[constellationLines.lines, 3]}
              count={constellationLines.lines.length / 3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#a78bfa"
            transparent
            opacity={0.08}
            depthWrite={false}
          />
        </lineSegments>
        {constellationLines.nodes.map((position, index) => (
          <mesh
            key={`constellation-${index}`}
            position={position}
            scale={index % 3 === 0 ? 0.035 : 0.022}
          >
            <octahedronGeometry args={[1, 0]} />
            <meshBasicMaterial
              color={index % 3 === 0 ? "#67e8f9" : "#c4b5fd"}
              transparent
              opacity={0.24}
            />
          </mesh>
        ))}
      </group>
      <group ref={comet} visible={false}>
        <mesh>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial color="#e0f2fe" />
        </mesh>
        <mesh position={[-0.3, 0.1, 0]} rotation={[0, 0, -0.3]}>
          <planeGeometry args={[0.62, 0.012]} />
          <meshBasicMaterial
            color="#a78bfa"
            transparent
            opacity={0.45}
            depthWrite={false}
          />
        </mesh>
      </group>
    </>
  );
};

const BackgroundOrbits = ({ pointer, reducedMotion }) => {
  const group = useRef();

  useFrame((state, delta) => {
    if (!group.current || reducedMotion) return;

    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress =
      scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
    group.current.scale.set(
      state.viewport.width / 6.8,
      state.viewport.height / 6.2,
      1,
    );
    group.current.position.x = THREE.MathUtils.damp(
      group.current.position.x,
      pointer.current.x * 0.08,
      1.2,
      delta,
    );
    group.current.position.y = THREE.MathUtils.damp(
      group.current.position.y,
      progress * 0.2 + pointer.current.y * 0.06,
      1.2,
      delta,
    );
    group.current.rotation.z = THREE.MathUtils.damp(
      group.current.rotation.z,
      progress * 0.12 + pointer.current.x * 0.025,
      1.2,
      delta,
    );
  });

  return (
    <group ref={group} position={[0, 0, -3.8]}>
      <mesh>
        <torusGeometry args={[3.05, 0.006, 4, 180]} />
        <meshBasicMaterial
          color="#a78bfa"
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </mesh>
      <mesh rotation={[0.12, 0.2, 0.32]}>
        <torusGeometry args={[2.42, 0.004, 4, 160]} />
        <meshBasicMaterial
          color="#67e8f9"
          transparent
          opacity={0.1}
          depthWrite={false}
        />
      </mesh>
      {[
        [3.05, 0, 0],
        [-3.05, 0, 0],
        [0, 2.45, 0],
        [0, -2.45, 0],
      ].map((position, index) => (
        <mesh key={`orbit-node-${index}`} position={position} scale={index < 2 ? 0.06 : 0.045}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial
            color={index % 2 === 0 ? "#67e8f9" : "#c4b5fd"}
            transparent
            opacity={0.65}
          />
        </mesh>
      ))}
    </group>
  );
};

const ScrollObject = ({ pointer, reducedMotion }) => {
  const group = useRef();
  const inner = useRef();
  const outerRing = useRef();
  const network = useRef();
  const coreGlow = useRef();
  const networkLine = useMemo(
    () =>
      new Float32Array([
        0, 2.25, 0, 1.65, 1.35, 0, 2.05, -0.65, 0, 0.2, -2.2, 0, -1.75,
        -1.1, 0, -1.9, 0.9, 0,
      ]),
    [],
  );
  const points = useMemo(() => {
    const positions = new Float32Array(240 * 3);
    for (let index = 0; index < 240; index += 1) {
      const vertical = 1 - (index / 239) * 2;
      const radius = Math.sqrt(1 - vertical * vertical);
      const angle = index * Math.PI * (3 - Math.sqrt(5));
      positions[index * 3] = Math.cos(angle) * radius * 2.05;
      positions[index * 3 + 1] = vertical * 2.05;
      positions[index * 3 + 2] = Math.sin(angle) * radius * 2.05;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;

    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress =
      scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
    const aspect = state.viewport.aspect;
    const baseX = aspect > 1.15 ? 2.55 : 0.9;
    const baseScale = aspect > 1.15 ? 1.25 : 0.76;
    const targetX =
      baseX + Math.sin(progress * Math.PI * 2) * 0.4 + pointer.current.x * 0.3;
    const targetY = 0.62 - progress * 0.8 + pointer.current.y * 0.24;
    const targetZ = -2 + progress * 0.45;
    const targetScale = baseScale * (0.82 + progress * 0.22);

    group.current.position.x = THREE.MathUtils.damp(
      group.current.position.x,
      targetX,
      2.5,
      delta,
    );
    group.current.position.y = THREE.MathUtils.damp(
      group.current.position.y,
      targetY,
      2.5,
      delta,
    );
    group.current.position.z = THREE.MathUtils.damp(
      group.current.position.z,
      targetZ,
      2.5,
      delta,
    );
    group.current.scale.setScalar(
      THREE.MathUtils.damp(
        group.current.scale.x,
        targetScale,
        2.5,
        delta,
      ),
    );

    if (!reducedMotion) {
      group.current.rotation.y += delta * 0.045;
      group.current.rotation.x = THREE.MathUtils.damp(
        group.current.rotation.x,
        progress * Math.PI * 0.8 + pointer.current.y * 0.18,
        2.4,
        delta,
      );
      group.current.rotation.z = THREE.MathUtils.damp(
        group.current.rotation.z,
        pointer.current.x * 0.16,
        2.4,
        delta,
      );
      group.current.rotation.y += pointer.current.x * delta * 0.16;
      if (inner.current) inner.current.rotation.y -= delta * 0.07;
      if (outerRing.current) outerRing.current.rotation.z += delta * 0.025;
      if (network.current) network.current.rotation.z -= delta * 0.018;
    }
    if (coreGlow.current && !reducedMotion) {
      coreGlow.current.material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <group ref={group} position={[2.55, 0.62, -1.5]}>
      <mesh ref={coreGlow} scale={1.08}>
        <icosahedronGeometry args={[1.3, 3]} />
        <shaderMaterial
          uniforms={{ uTime: { value: 0 } }}
          vertexShader={`
            varying vec3 vNormal;
            varying vec3 vPosition;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              vPosition = position;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform float uTime;
            varying vec3 vNormal;
            varying vec3 vPosition;
            void main() {
              float facing = abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)));
              float rim = pow(1.0 - facing, 2.2);
              float pulse = 0.82 + 0.18 * sin(uTime * 0.8);
              float flow = 0.5 + 0.5 * sin(vPosition.y * 5.0 + uTime * 0.35);
              vec3 violet = vec3(0.45, 0.20, 0.95);
              vec3 cyan = vec3(0.12, 0.72, 0.92);
              vec3 color = mix(violet, cyan, flow * 0.32);
              float alpha = (0.025 + rim * 0.24) * pulse;
              gl_FragColor = vec4(color, alpha);
            }
          `}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.3, 2]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.1}
          wireframe
          depthWrite={false}
        />
      </mesh>
      <mesh ref={inner} scale={0.63}>
        <icosahedronGeometry args={[1.3, 1]} />
        <meshBasicMaterial
          color="#a78bfa"
          transparent
          opacity={0.16}
          wireframe
          depthWrite={false}
        />
      </mesh>
      <mesh ref={outerRing} rotation={[0.8, 0.25, 0.2]}>
        <torusGeometry args={[1.72, 0.003, 5, 144]} />
        <meshBasicMaterial
          color="#c4b5fd"
          transparent
          opacity={0.38}
          depthWrite={false}
        />
      </mesh>
      <mesh rotation={[1.1, 0.6, -0.5]}>
        <torusGeometry args={[1.92, 0.002, 4, 144]} />
        <meshBasicMaterial
          color="#67e8f9"
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </mesh>
      <group ref={network} rotation={[0.3, 0.1, 0]}>
        {satellitePositions.map((position, index) => (
          <group key={`satellite-${index}`} position={position}>
            <mesh rotation={[0.2, 0.3, index * 0.18]}>
              <torusGeometry args={[0.105, 0.006, 5, 28]} />
              <meshBasicMaterial
                color={index % 2 === 0 ? "#67e8f9" : "#c4b5fd"}
                transparent
                opacity={0.72}
                depthWrite={false}
              />
            </mesh>
            <mesh scale={0.045}>
              {index % 3 === 0 ? (
                <torusGeometry args={[1, 0.12, 4, 12]} />
              ) : index % 3 === 1 ? (
                <octahedronGeometry args={[1, 0]} />
              ) : (
                <tetrahedronGeometry args={[1, 0]} />
              )}
              <meshBasicMaterial
                color={index % 2 === 0 ? "#67e8f9" : "#c4b5fd"}
                transparent
                opacity={0.78}
              />
            </mesh>
          </group>
        ))}
        <lineLoop>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[networkLine, 3]}
              count={networkLine.length / 3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#8b7acb"
            transparent
            opacity={0.2}
          />
        </lineLoop>
      </group>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[points, 3]}
            count={points.length / 3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#c4b5fd"
              size={0.01}
          transparent
              opacity={0.3}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
};

const PortfolioScrollExperience = () => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeChapter, setActiveChapter] = useState("intro");
  const progressRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });

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
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${progress})`;
        }

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
        setActiveChapter(currentChapter);
      });
    };

    updateScrollInterface();
    window.addEventListener("scroll", updateScrollInterface, { passive: true });
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
      window.removeEventListener("scroll", updateScrollInterface);
      window.removeEventListener("resize", updateScrollInterface);
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("blur", clearPointer);
      if (updateFrame) window.cancelAnimationFrame(updateFrame);
    };
  }, []);

  const currentChapter =
    chapters.find((chapter) => chapter.id === activeChapter) || chapters[0];

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-90"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_43%,rgba(145,94,255,0.2),transparent_35%),radial-gradient(ellipse_at_76%_54%,rgba(34,211,238,0.1),transparent_30%),linear-gradient(180deg,rgba(5,8,22,0.08),#050816)]" />
        <Canvas
          camera={{ position: [0, 0, 6], fov: 42 }}
          dpr={[1, 1.35]}
          gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
          frameloop="always"
        >
          <StarField pointer={pointer} reducedMotion={reducedMotion} />
          <BackgroundOrbits pointer={pointer} reducedMotion={reducedMotion} />
          <ScrollObject pointer={pointer} reducedMotion={reducedMotion} />
        </Canvas>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 right-0 top-0 z-50 h-px bg-white/10"
      >
        <div
          ref={progressRef}
          className="h-full origin-left scale-x-0 bg-gradient-to-r from-[#915EFF] via-[#c4b5fd] to-cyan-300 shadow-[0_0_10px_rgba(145,94,255,0.8)]"
        />
      </div>

      <nav
        aria-label="Portfolio chapters"
        className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 md:flex lg:right-7"
      >
        {chapters.map((chapter) => {
          const active = activeChapter === chapter.id;
          return (
            <a
              key={chapter.id}
              href={`#${chapter.id}`}
              aria-label={`${chapter.number}: ${chapter.label}`}
              aria-current={active ? "location" : undefined}
              className="group flex h-5 items-center justify-end gap-2"
            >
              <span
                className={`pointer-events-none rounded bg-[#080a17]/90 px-2 py-1 text-[9px] font-medium text-white/75 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 ${
                  active ? "opacity-100" : ""
                }`}
              >
                {chapter.label}
              </span>
              <span
                className={`block rounded-full transition-all duration-300 ${
                  active
                    ? "h-2.5 w-2.5 bg-[#c4b5fd] shadow-[0_0_12px_rgba(167,139,250,0.9)]"
                    : "h-1.5 w-1.5 bg-white/30 group-hover:bg-white/75"
                }`}
              />
            </a>
          );
        })}
      </nav>

      <div className="pointer-events-none fixed bottom-5 left-6 z-30 hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-white/40 sm:flex sm:left-10">
        <span className="text-[#a78bfa]">{currentChapter.number}</span>
        <span className="h-px w-5 bg-white/20" />
        <span>{currentChapter.label}</span>
      </div>
    </>
  );
};

export default PortfolioScrollExperience;
