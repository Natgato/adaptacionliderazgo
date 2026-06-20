"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function AmbientBlueprint() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas,
    });
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    const clock = new THREE.Clock();
    const cluster = new THREE.Group();
    const shards: THREE.Mesh[] = [];
    let frameId = 0;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    camera.position.set(0, 0, 18);
    scene.add(cluster);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x4fdfff,
      transparent: true,
      opacity: 0.32,
      wireframe: true,
    });

    const brightRing = new THREE.Mesh(
      new THREE.TorusGeometry(4.6, 0.05, 12, 120),
      ringMaterial,
    );
    brightRing.rotation.x = Math.PI / 2.25;
    brightRing.rotation.y = Math.PI / 8;
    cluster.add(brightRing);

    const orbitRing = new THREE.Mesh(
      new THREE.TorusGeometry(7.1, 0.04, 10, 90),
      ringMaterial.clone(),
    );
    orbitRing.rotation.set(Math.PI / 2.7, Math.PI / 5, Math.PI / 8);
    cluster.add(orbitRing);

    const halo = new THREE.Mesh(
      new THREE.CircleGeometry(2.2, 48),
      new THREE.MeshBasicMaterial({
        color: 0x2a68ff,
        transparent: true,
        opacity: 0.12,
      }),
    );
    halo.position.set(-2.4, -0.5, -2.2);
    cluster.add(halo);

    for (let index = 0; index < 13; index += 1) {
      const shard = new THREE.Mesh(
        new THREE.CylinderGeometry(0, 0.3 + Math.random() * 0.35, 1.1 + Math.random() * 1.8, 3),
        new THREE.MeshBasicMaterial({
          color: index % 4 === 0 ? 0xffffff : 0x3b7dff,
          transparent: true,
          opacity: 0.42,
          wireframe: true,
        }),
      );

      const angle = (index / 13) * Math.PI * 2;
      const radius = 4 + Math.random() * 4.5;

      shard.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 7,
        (Math.random() - 0.5) * 5,
      );
      shard.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      shard.userData = {
        baseY: shard.position.y,
        offset: Math.random() * Math.PI * 2,
        speed: 0.25 + Math.random() * 0.55,
      };

      shards.push(shard);
      cluster.add(shard);
    }

    const particles = new Float32Array(180 * 3);

    for (let index = 0; index < particles.length; index += 3) {
      particles[index] = (Math.random() - 0.5) * 26;
      particles[index + 1] = (Math.random() - 0.5) * 18;
      particles[index + 2] = (Math.random() - 0.5) * 12;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particles, 3));

    const particleCloud = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color: 0x79ebff,
        transparent: true,
        opacity: 0.78,
        size: 0.07,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      }),
    );

    scene.add(particleCloud);

    const handleResize = () => {
      const { clientWidth, clientHeight } = canvas;

      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const renderFrame = () => {
      const elapsed = clock.getElapsedTime();

      cluster.rotation.z = elapsed * 0.04;
      cluster.rotation.y = Math.sin(elapsed * 0.16) * 0.25;
      brightRing.rotation.z = elapsed * 0.3;
      orbitRing.rotation.z = -elapsed * 0.22;
      halo.scale.setScalar(1 + Math.sin(elapsed * 0.9) * 0.06);

      shards.forEach((shard, index) => {
        shard.rotation.x += 0.002 + index * 0.00004;
        shard.rotation.y -= 0.003;
        shard.position.y =
          shard.userData.baseY + Math.sin(elapsed * shard.userData.speed + shard.userData.offset) * 0.35;
      });

      particleCloud.rotation.z = elapsed * 0.015;
      renderer.render(scene, camera);

      if (!mediaQuery.matches) {
        frameId = window.requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();

          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      particleGeometry.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full opacity-80" />;
}
