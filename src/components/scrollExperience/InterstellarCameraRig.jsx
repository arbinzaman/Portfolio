import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Kage-inspired Scroll & Pointer Camera Rig:
 * Flies the camera through 3D space along a curved orbital path as the user scrolls,
 * banking with scroll velocity and parallaxing strongly with cursor/touch movement.
 */
const InterstellarCameraRig = ({ pointer, scrollMotion, reducedMotion }) => {
  const smoothProgress = useRef(0);
  const smoothVelocity = useRef(0);
  const lookAtTarget = useRef(new THREE.Vector3(0.4, 0, -4));

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

    // Curved orbital camera flight path across all 10 chapters
    const isMobile = state.viewport.aspect < 0.85;
    const orbitAngle = p * Math.PI * (isMobile ? 3.2 : 2.2);
    const mobileSwayX = isMobile ? Math.sin(t * 0.55 + p * 6.0) * 0.35 : 0;
    const mobileSwayY = isMobile ? Math.cos(t * 0.45 + p * 5.0) * 0.28 : 0;

    const targetCamX =
      Math.sin(orbitAngle) * (isMobile ? 0.65 : 1.45) +
      px * 0.95 +
      mobileSwayX +
      Math.cos(t * 0.22) * 0.12;
    const targetCamY =
      Math.cos(p * Math.PI * 2.5) * 0.68 +
      py * 0.72 +
      mobileSwayY +
      Math.sin(t * 0.28) * 0.08;
    const targetCamZ =
      (isMobile ? 6.6 : 6.2) -
      Math.sin(p * Math.PI) * 1.35 -
      Math.abs(v) * 0.55;

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
    const focusX =
      (isMobile ? 0 : 0.45) +
      Math.cos(orbitAngle) * (isMobile ? 0.25 : 0.55) +
      px * 0.45;
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

export default InterstellarCameraRig;

