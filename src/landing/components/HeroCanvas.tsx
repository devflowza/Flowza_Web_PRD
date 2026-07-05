import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/*
 * "Particle ocean" — a grid of ~14k GPU points displaced by simplex noise
 * in the vertex shader. All motion runs on the GPU; the CPU only feeds
 * time + a damped mouse vector, so it stays cheap on mobile.
 */

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uSize;
  attribute float aRand;
  varying float vElev;
  varying float vFade;

  // Simplex 2D noise (Ian McEwan / Ashima Arts, MIT)
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec3 p = position;
    float t = uTime * 0.16;

    float swell = snoise(vec2(p.x * 0.14 + t, p.z * 0.2 - t * 0.65));
    float ripple = snoise(vec2(p.x * 0.42 - t * 0.55, p.z * 0.48 + t * 0.9));
    float elev = swell * 1.15 + ripple * 0.32;

    p.y += elev;
    p.x += uMouse.x * 0.55;
    p.y += uMouse.y * -0.3;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (0.55 + aRand * 0.9) * (6.5 / -mv.z);

    vElev = elev;
    float fadeX = smoothstep(16.0, 9.5, abs(position.x));
    float fadeFar = smoothstep(-10.0, -6.5, position.z);
    float fadeNear = smoothstep(3.4, 1.2, position.z);
    vFade = fadeX * fadeFar * fadeNear;
  }
`;

const FRAGMENT = /* glsl */ `
  precision mediump float;
  varying float vElev;
  varying float vFade;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float disc = smoothstep(0.5, 0.06, d);

    vec3 deep = vec3(0.016, 0.135, 0.27);
    vec3 mid  = vec3(0.055, 0.65, 0.913);
    vec3 high = vec3(0.62, 0.94, 1.0);

    float h = clamp(vElev * 0.42 + 0.5, 0.0, 1.0);
    vec3 col = mix(deep, mid, smoothstep(0.12, 0.78, h));
    col = mix(col, high, smoothstep(0.8, 1.0, h));

    float alpha = disc * vFade * (0.28 + 0.72 * h);
    if (alpha < 0.012) discard;
    gl_FragColor = vec4(col, alpha);
  }
`;

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return; // no WebGL — the CSS gradient behind the canvas stands in
    }

    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.75 : 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 60);
    camera.position.set(0, 2.5, 7.2);
    camera.lookAt(0, 0.4, 0);

    const COLS = isMobile ? 120 : 190;
    const ROWS = isMobile ? 72 : 104;
    const WIDTH = 32;
    const Z_NEAR = 3.4;
    const Z_FAR = -10;
    const count = COLS * ROWS;

    const positions = new Float32Array(count * 3);
    const rands = new Float32Array(count);
    let i = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        positions[i * 3] = (c / (COLS - 1) - 0.5) * WIDTH;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = Z_FAR + (r / (ROWS - 1)) * (Z_NEAR - Z_FAR);
        rands[i] = Math.random();
        i++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aRand', new THREE.BufferAttribute(rands, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uSize: { value: (isMobile ? 11 : 13.5) * dpr },
      },
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const clock = new THREE.Clock();
    const mouseTarget = { x: 0, y: 0 };
    const mouseCurrent = { x: 0, y: 0 };
    let raf = 0;
    let inView = true;
    let lost = false;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!inView || document.hidden || lost) return;
      mouseCurrent.x += (mouseTarget.x - mouseCurrent.x) * 0.045;
      mouseCurrent.y += (mouseTarget.y - mouseCurrent.y) * 0.045;
      material.uniforms.uTime.value = clock.getElapsedTime();
      material.uniforms.uMouse.value.set(mouseCurrent.x, mouseCurrent.y);
      camera.position.x = mouseCurrent.x * 0.35;
      camera.position.y = 2.5 + mouseCurrent.y * 0.2;
      camera.lookAt(0, 0.4, 0);
      renderer.render(scene, camera);
    };
    tick();

    const onPointerMove = (e: PointerEvent) => {
      mouseTarget.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseTarget.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const onContextLost = (e: Event) => {
      e.preventDefault();
      lost = true;
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
    });
    observer.observe(mount);

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('resize', onResize);
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
