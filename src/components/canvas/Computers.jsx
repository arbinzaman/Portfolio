import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("/desktop_pc/scene.gltf");
  const modelRef = useRef();
  const { gl } = useThree();

  const interaction = useRef({
    isDragging: false,
    userOffsetY: 0,
    targetOffsetY: 0,
    velocityY: 0,
  });

  useEffect(() => {
    const domElement = gl.domElement;
    if (!domElement) return undefined;
    domElement.style.touchAction = "pan-y";

    if (!isMobile) return undefined;

    let startX = 0;
    let startY = 0;
    let prevX = 0;
    let gestureLock = null; // "x" | "y" | null

    const onTouchStart = (e) => {
      const touch = e.touches?.[0];
      if (!touch) return;
      interaction.current.isDragging = true;
      interaction.current.velocityY = 0;
      gestureLock = null;
      startX = touch.clientX;
      startY = touch.clientY;
      prevX = touch.clientX;
    };

    const onTouchMove = (e) => {
      if (!interaction.current.isDragging) return;
      const touch = e.touches?.[0];
      if (!touch) return;

      const totalDx = Math.abs(touch.clientX - startX);
      const totalDy = Math.abs(touch.clientY - startY);

      if (!gestureLock && (totalDx > 6 || totalDy > 6)) {
        gestureLock = totalDx >= totalDy ? "x" : "y";
      }

      if (gestureLock === "y") {
        // Let the browser natively scroll the page vertically
        return;
      }

      const dx = touch.clientX - prevX;
      prevX = touch.clientX;
      const deltaRot = dx * 0.014;
      interaction.current.targetOffsetY += deltaRot;
      interaction.current.velocityY = deltaRot;
    };

    const onTouchEnd = () => {
      interaction.current.isDragging = false;
      gestureLock = null;
    };

    domElement.addEventListener("touchstart", onTouchStart, { passive: true });
    domElement.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      domElement.removeEventListener("touchstart", onTouchStart);
      domElement.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [gl, isMobile]);

  useFrame((state, delta) => {
    if (!modelRef.current || document.hidden) return;
    const t = state.clock.elapsedTime;
    const stateRef = interaction.current;

    // Apply inertia when touch release happens on mobile
    if (!stateRef.isDragging && Math.abs(stateRef.velocityY) > 0.0001) {
      stateRef.targetOffsetY += stateRef.velocityY;
      stateRef.velocityY *= Math.exp(-delta * 5.5);
    }

    // Smoothly damp toward target rotation offset
    stateRef.userOffsetY = THREE.MathUtils.damp(
      stateRef.userOffsetY,
      stateRef.targetOffsetY,
      6.5,
      delta,
    );

    // Smooth continuous 3D motion (gentle orbital sway + subtle hover float) on both PC and mobile
    const idleSwayY = Math.sin(t * 0.65) * 0.14;
    const idleTiltZ = -0.1 + Math.cos(t * 0.5) * 0.02;
    const basePosY = isMobile ? -2.2 : -3.65;
    const idleFloatY = Math.sin(t * 1.15) * (isMobile ? 0.045 : 0.07);

    modelRef.current.rotation.y = -0.2 + idleSwayY + stateRef.userOffsetY;
    modelRef.current.rotation.z = idleTiltZ;
    modelRef.current.position.y = basePosY + idleFloatY;
  });

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
      />
      <pointLight intensity={1} />
      <primitive
        ref={modelRef}
        object={computer.scene}
        scale={isMobile ? 0.25 : 0.75}
        position={isMobile ? [0.22, -2.2, -0.33] : [0, -3.65, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <div className="h-full w-full touch-pan-y">
      <Canvas
        frameloop="always"
        dpr={[1, 2]}
        camera={{ position: [20, 3, 5], fov: 25 }}
        gl={{ powerPreference: "low-power", antialias: true }}
        style={{ touchAction: "pan-y" }}
      >
        <Suspense fallback={<CanvasLoader />}>
          {!isMobile && (
            <OrbitControls
              enableZoom={false}
              enableDamping
              dampingFactor={0.05}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
          )}
          <Computers isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ComputersCanvas;
