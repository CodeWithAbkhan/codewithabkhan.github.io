import { useEffect, useRef } from "react";
import * as THREE from "three";

const nodePositions: [number, number, number][] = [
  [-2.05, 0.95, 0.2],
  [1.95, 1.25, -0.25],
  [-1.75, -1.35, -0.4],
  [2.15, -1.05, 0.35],
];

export default function SystemScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.15, 8.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const rig = new THREE.Group();
    rig.rotation.x = -0.12;
    scene.add(rig);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.02, 2),
      new THREE.MeshStandardMaterial({
        color: 0xc9ff43,
        metalness: 0.18,
        roughness: 0.28,
        emissive: 0x233a08,
        emissiveIntensity: 0.42,
        flatShading: true,
      }),
    );
    rig.add(core);

    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.26, 1),
      new THREE.MeshBasicMaterial({
        color: 0xe9f4ef,
        wireframe: true,
        transparent: true,
        opacity: 0.23,
      }),
    );
    rig.add(shell);

    const halo = new THREE.Mesh(
      new THREE.TorusGeometry(1.7, 0.012, 8, 128),
      new THREE.MeshBasicMaterial({ color: 0x99b6aa, transparent: true, opacity: 0.55 }),
    );
    halo.rotation.x = Math.PI / 2.55;
    halo.rotation.y = 0.32;
    rig.add(halo);

    const palette = [0xc9ff43, 0xff6b35, 0x66d9ff, 0xf4eee2];
    const nodes: THREE.Mesh[] = [];

    nodePositions.forEach((position, index) => {
      const connectorGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(...position),
      ]);
      const connector = new THREE.Line(
        connectorGeometry,
        new THREE.LineBasicMaterial({ color: 0x789086, transparent: true, opacity: 0.42 }),
      );
      rig.add(connector);

      const node = new THREE.Mesh(
        index === 1 ? new THREE.OctahedronGeometry(0.24, 0) : new THREE.SphereGeometry(0.2, 24, 24),
        new THREE.MeshStandardMaterial({
          color: palette[index],
          metalness: 0.12,
          roughness: 0.35,
          emissive: palette[index],
          emissiveIntensity: 0.08,
        }),
      );
      node.position.set(...position);
      rig.add(node);
      nodes.push(node);
    });

    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(90 * 3);
    for (let i = 0; i < particlePositions.length; i += 3) {
      const radius = 2.9 + Math.random() * 1.8;
      const angle = Math.random() * Math.PI * 2;
      particlePositions[i] = Math.cos(angle) * radius;
      particlePositions[i + 1] = (Math.random() - 0.5) * 4.2;
      particlePositions[i + 2] = Math.sin(angle) * radius * 0.32;
    }
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({ color: 0xb7c8c0, size: 0.026, transparent: true, opacity: 0.65 }),
    );
    rig.add(particles);

    scene.add(new THREE.HemisphereLight(0xf4fff6, 0x07100d, 2.4));
    const key = new THREE.PointLight(0xffffff, 34, 16);
    key.position.set(3.4, 3.8, 4.5);
    scene.add(key);
    const rim = new THREE.PointLight(0x56d7ff, 22, 14);
    rim.position.set(-4, -2.5, 3);
    scene.add(rim);

    const pointer = new THREE.Vector2();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handlePointer = (event: PointerEvent) => {
      const bounds = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      pointer.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    };
    mount.addEventListener("pointermove", handlePointer, { passive: true });

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    let frame = 0;
    const clock = new THREE.Clock();
    const render = () => {
      const elapsed = clock.getElapsedTime();
      rig.rotation.y += (pointer.x * 0.2 - rig.rotation.y) * 0.035;
      rig.rotation.x += (-pointer.y * 0.12 - 0.12 - rig.rotation.x) * 0.035;

      if (!reducedMotion) {
        core.rotation.y = elapsed * 0.2;
        core.rotation.x = elapsed * 0.11;
        shell.rotation.y = -elapsed * 0.12;
        halo.rotation.z = elapsed * 0.09;
        particles.rotation.z = elapsed * 0.015;
        nodes.forEach((node, index) => {
          node.position.y = nodePositions[index][1] + Math.sin(elapsed * 1.2 + index) * 0.08;
          node.rotation.y = elapsed * (0.5 + index * 0.08);
        });
      }

      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      mount.removeEventListener("pointermove", handlePointer);
      renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.Points) {
          object.geometry?.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.domElement.remove();
    };
  }, []);

  return <div className="system-scene" ref={mountRef} aria-hidden="true" />;
}
