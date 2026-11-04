/**
 * GLSL Shaders for the Interstellar 3D Scroll Experience:
 * 1. Volumetric FBM Cosmic Nebula Shader
 * 2. Relativistic Photon Sphere Rim Shader
 * 3. Gargantua Relativistic Accretion Disk & Doppler Beaming Shader
 */

export const NEBULA_VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const NEBULA_FRAGMENT_SHADER = `
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
    float alpha = smoothstep(0.36, 0.78, n) * vignette * 0.24;
    gl_FragColor = vec4(col, alpha);
  }
`;

export const PHOTON_RING_VERTEX_SHADER = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const PHOTON_RING_FRAGMENT_SHADER = `
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
`;

export const ACCRETION_VERTEX_SHADER = `
  varying vec2 vUv;
  varying vec3 vPos;
  void main() {
    vUv = uv;
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const ACCRETION_FRAGMENT_SHADER = `
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

