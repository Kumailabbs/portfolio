import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/** Lightweight WebGL scene. Fully self-contained; no model files or API keys. */
export default function ResearchScene3D() {
  const mount = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [supported, setSupported] = useState(true);
  const playRef = useRef(playing);
  useEffect(() => { playRef.current = playing; }, [playing]);

  useEffect(() => {
    const root = mount.current;
    if (!root) return;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    } catch {
      setSupported(false);
      return;
    }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 8.8);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    root.appendChild(renderer.domElement);
    renderer.domElement.setAttribute('aria-hidden', 'true');
    const group = new THREE.Group();
    scene.add(group);
    scene.add(new THREE.AmbientLight(0x9fceff, 1.25));
    const key = new THREE.PointLight(0x6fdbff, 55, 18);
    key.position.set(-2.5, 2.9, 4.5);
    scene.add(key);
    const rim = new THREE.PointLight(0x89ffc9, 42, 14);
    rim.position.set(2.5, -2, -1);
    scene.add(rim);

    const mainGeo = new THREE.IcosahedronGeometry(1.65, 5);
    const core = new THREE.Mesh(mainGeo, new THREE.MeshPhysicalMaterial({
      color: 0x195785, metalness: 0.6, roughness: 0.18,
      transmission: 0.18, thickness: 1.2, clearcoat: 0.9,
      clearcoatRoughness: 0.15, transparent: true, opacity: 0.89,
      flatShading: false
    }));
    group.add(core);
    const wireframe = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.67, 2)),
      new THREE.LineBasicMaterial({ color: 0x84e7ff, transparent: true, opacity: 0.35 })
    );
    group.add(wireframe);
    const lattice = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.05, 0.045, 220, 10, 3, 5),
      new THREE.MeshBasicMaterial({ color: 0x6cebd5, transparent: true, opacity: 0.95 })
    );
    group.add(lattice);
    const rings = [];
    [2.24, 2.56, 2.88].forEach((r, i) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(r, 0.012, 5, 200),
        new THREE.MeshBasicMaterial({ color: i === 1 ? 0x6eafff : 0x55d9c3, transparent: true, opacity: 0.52 - i * 0.1 })
      );
      ring.rotation.set((i + 1) * 0.65, (i + 1) * 0.32, i * 0.3);
      group.add(ring);
      rings.push(ring);
    });
    const satelliteGeometry = new THREE.OctahedronGeometry(0.16, 1);
    const satellites = [];
    for (let i = 0; i < 8; i++) {
      const satellite = new THREE.Mesh(satelliteGeometry, new THREE.MeshStandardMaterial({
        color: i % 2 ? 0x7ab7ff : 0x7afbdd,
        emissive: i % 2 ? 0x276fa0 : 0x1b866e,
        emissiveIntensity: 0.85, metalness: 0.3, roughness: 0.25
      }));
      group.add(satellite);
      satellites.push(satellite);
    }
    // Deterministic stars: no external images, textures, or models.
    let seed = 2149;
    const rand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    const starsPositions = new Float32Array(380 * 3);
    for (let i = 0; i < 380; i++) {
      starsPositions[i*3] = (rand() - .5) * 13;
      starsPositions[i*3+1] = (rand() - .5) * 13;
      starsPositions[i*3+2] = (rand() - .5) * 7 - 1;
    }
    const starsGeometry = new THREE.BufferGeometry();
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
    const stars = new THREE.Points(starsGeometry, new THREE.PointsMaterial({ color: 0x89c8ff, size: 0.025, sizeAttenuation: true, transparent: true, opacity: .8 }));
    scene.add(stars);

    const pointer = { x: 0, y: 0 };
    const onMove = event => {
      const rect = root.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const onLeave = () => { pointer.x = 0; pointer.y = 0; };
    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerleave', onLeave);
    const resize = () => {
      const w = Math.max(1, root.clientWidth), h = Math.max(1, root.clientHeight);
      camera.aspect = w / h;
      camera.position.z = w < 410 ? 10.1 : 8.8;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(root);
    resize();
    const clock = new THREE.Clock();
    let elapsed = 0, frame = 0;
    const animate = () => {
      frame = window.requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      if (playRef.current && !document.hidden) elapsed += dt;
      group.rotation.y += ((pointer.x * 0.2 + elapsed * 0.14) - group.rotation.y) * 0.045;
      group.rotation.x += ((-pointer.y * 0.17 + Math.sin(elapsed * .33) * .07) - group.rotation.x) * .04;
      lattice.rotation.z = elapsed * 0.12;
      core.rotation.y = elapsed * 0.1;
      wireframe.rotation.y = elapsed * -0.16;
      rings.forEach((ring, i) => { ring.rotation.z = (i + 1) * 0.3 + elapsed * (i % 2 ? -.12 : .09); });
      satellites.forEach((node, i) => {
        const a = i * Math.PI * 2 / satellites.length + elapsed * (i % 2 ? -.22 : .25);
        node.position.set(Math.cos(a) * (2.1 + (i % 3) * .25), Math.sin(a) * (1.55 + (i % 2) * .35), Math.sin(a * 1.8) * .7);
        node.rotation.y = elapsed * .45;
      });
      stars.rotation.y = elapsed * 0.012;
      renderer.render(scene, camera);
    };
    animate();
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
      scene.traverse(object => {
        object.geometry?.dispose?.();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach(material => material?.dispose?.());
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === root) root.removeChild(renderer.domElement);
    };
  }, []);
  return <div className="scene-panel">
    <div className="scene-grid" />
    <div className="scene-heading"><span className="scene-live-dot" /> INTERACTIVE RESEARCH SPACE <span className="scene-version">/ 3D.01</span></div>
    <div className="scene-canvas" ref={mount} role="img" aria-label="Interactive three-dimensional molecular-inspired AI research visualization. Move your pointer to rotate the scene.">
      {!supported && <div className="scene-fallback" aria-label="3D scene unavailable">◈<span>3D visualization requires WebGL</span></div>}
    </div>
    <div className="scene-chip scene-chip-a">01 <strong>MEDICAL AI</strong></div>
    <div className="scene-chip scene-chip-b">02 <strong>COMPUTER VISION</strong></div>
    <div className="scene-chip scene-chip-c">03 <strong>TIME SERIES</strong></div>
    <div className="scene-bottom"><span>DRAG YOUR CURSOR TO EXPLORE</span><button className="motion-toggle" onClick={() => setPlaying(v => !v)} aria-pressed={!playing}>{playing ? 'Ⅱ Pause motion' : '▶ Resume motion'}</button></div>
  </div>;
}
