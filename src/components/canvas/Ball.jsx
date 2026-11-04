import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { DecalGeometry } from "three-stdlib";

let sharedRenderer = null;
const textureLoader = new THREE.TextureLoader();
const textureCache = new Map();

function getSharedRenderer() {
  if (typeof window === "undefined") return null;
  if (!sharedRenderer) {
    sharedRenderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    sharedRenderer.outputEncoding = THREE.sRGBEncoding;
    sharedRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    sharedRenderer.setClearColor(0x000000, 0);
  }
  return sharedRenderer;
}

function loadCachedTexture(url, onLoad) {
  if (textureCache.has(url)) {
    const cached = textureCache.get(url);
    if (cached.image) {
      onLoad(cached);
    } else {
      cached.userData.callbacks.push(onLoad);
    }
    return;
  }

  const tex = textureLoader.load(url, (loaded) => {
    loaded.encoding = THREE.sRGBEncoding;
    loaded.needsUpdate = true;
    const cbs = loaded.userData.callbacks || [];
    loaded.userData.callbacks = [];
    cbs.forEach((cb) => cb(loaded));
  });
  tex.encoding = THREE.sRGBEncoding;
  tex.userData = { callbacks: [onLoad] };
  textureCache.set(url, tex);
}

const sharedIcosahedronGeo = new THREE.IcosahedronGeometry(1, 1);
let sharedDecalGeo = null;

function getSharedDecalGeometry() {
  if (!sharedDecalGeo) {
    const dummyParent = new THREE.Mesh(sharedIcosahedronGeo);
    dummyParent.matrixWorld.identity();
    sharedDecalGeo = new DecalGeometry(
      dummyParent,
      new THREE.Vector3(0, 0, 1),
      new THREE.Euler(2 * Math.PI, 0, 6.25),
      new THREE.Vector3(1, 1, 1),
    );
  }
  return sharedDecalGeo;
}

const BallCanvas = ({ icon }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 0, 5);

    const floatGroup = new THREE.Group();
    const t = Math.random() * 10000;
    const speed = 1.75;
    const rotationIntensity = 1;
    const floatIntensity = 2;
    floatGroup.rotation.x = (Math.cos((t / 4) * speed) / 8) * rotationIntensity;
    floatGroup.rotation.y = (Math.sin((t / 4) * speed) / 8) * rotationIntensity;
    floatGroup.rotation.z = (Math.sin((t / 4) * speed) / 20) * rotationIntensity;
    floatGroup.position.y = (Math.sin((t / 4) * speed) / 10) * floatIntensity;
    scene.add(floatGroup);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
    floatGroup.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 0, 0.05);
    floatGroup.add(directionalLight);

    const ballMaterial = new THREE.MeshStandardMaterial({
      color: "#fff8eb",
      polygonOffset: true,
      polygonOffsetFactor: -5,
      flatShading: true,
    });

    const ballMesh = new THREE.Mesh(sharedIcosahedronGeo, ballMaterial);
    ballMesh.scale.setScalar(2.75);
    floatGroup.add(ballMesh);

    const decalMaterial = new THREE.MeshStandardMaterial({
      transparent: true,
      polygonOffset: true,
      polygonOffsetFactor: -10,
      flatShading: true,
    });

    const decalMesh = new THREE.Mesh(getSharedDecalGeometry(), decalMaterial);
    ballMesh.add(decalMesh);

    let disposed = false;
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let azimuth = 0;
    let polar = Math.PI / 2;

    const updateCamera = () => {
      const r = 5;
      camera.position.x = r * Math.sin(polar) * Math.sin(azimuth);
      camera.position.y = r * Math.cos(polar);
      camera.position.z = r * Math.sin(polar) * Math.cos(azimuth);
      camera.lookAt(0, 0, 0);
    };

    const renderBall = () => {
      if (disposed) return;
      const renderer = getSharedRenderer();
      if (!renderer) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round((rect.width || 112) * dpr));
      const height = Math.max(1, Math.round((rect.height || 112) * dpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      updateCamera();

      renderer.setSize(width, height, false);
      renderer.clear();
      renderer.render(scene, camera);

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(renderer.domElement, 0, 0, width, height);
    };

    loadCachedTexture(icon, (tex) => {
      if (disposed) return;
      decalMaterial.map = tex;
      decalMaterial.needsUpdate = true;
      renderBall();
    });

    renderBall();

    const onPointerDown = (e) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;

      azimuth -= dx * 0.015;
      polar = THREE.MathUtils.clamp(
        polar - dy * 0.015,
        0.15,
        Math.PI - 0.15,
      );
      renderBall();
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("resize", renderBall);

    return () => {
      disposed = true;
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", renderBall);
      ballMaterial.dispose();
      decalMaterial.dispose();
    };
  }, [icon]);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full touch-pan-y cursor-grab active:cursor-grabbing"
    />
  );
};

export default BallCanvas;
