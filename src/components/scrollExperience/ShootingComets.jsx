import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { sharedSphereLowGeo } from "./scrollExperienceConfig";

/**
 * Shooting Comets & Meteorites streaking across the cosmos.
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

export default ShootingComets;

