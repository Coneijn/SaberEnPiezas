"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export interface SomaPieceConfig {
  id: string;
  name: string;
  color: string;
  material: string;
  solutions: [number, number, number][][];
}

const SOMA_PIECES: SomaPieceConfig[] = [
  {
    id: "V",
    name: "Tricubo V",
    color: "#0D9488",
    material: "PLA 1.75mm",
    solutions: [
      [[0, 2, 0], [1, 2, 0], [1, 1, 0]],
      [[0, 0, 0], [0, 1, 0], [1, 1, 0]],
      [[0, 2, 2], [1, 2, 2], [1, 2, 1]],
    ],
  },
  {
    id: "L",
    name: "Tetracubo L",
    color: "#1E1B4B",
    material: "PLA Calibrado",
    solutions: [
      [[2, 0, 0], [2, 1, 0], [2, 2, 0], [2, 2, 1]],
      [[2, 2, 0], [1, 2, 0], [0, 2, 0], [0, 2, 1]],
      [[2, 2, 0], [2, 2, 1], [2, 2, 2], [2, 1, 2]],
    ],
  },
  {
    id: "T",
    name: "Tetracubo T",
    color: "#D97706",
    material: "PLA Calibrado",
    solutions: [
      [[0, 2, 2], [1, 2, 2], [2, 2, 2], [1, 1, 2]],
      [[0, 0, 2], [0, 1, 2], [0, 2, 2], [1, 1, 2]],
      [[0, 0, 2], [1, 0, 2], [2, 0, 2], [1, 0, 1]],
    ],
  },
  {
    id: "Z",
    name: "Tetracubo Z",
    color: "#EA580C",
    material: "PLA Precisión",
    solutions: [
      [[0, 2, 1], [1, 2, 1], [1, 1, 1], [2, 1, 1]],
      [[0, 0, 1], [0, 1, 1], [1, 1, 1], [1, 2, 1]],
      [[0, 1, 2], [1, 1, 2], [1, 1, 1], [2, 1, 1]],
    ],
  },
  {
    id: "A",
    name: "Quiral A (Dextro)",
    color: "#0284C7",
    material: "PLA Prismático",
    solutions: [
      [[0, 1, 1], [0, 1, 2], [0, 0, 2], [1, 0, 2]],
      [[1, 0, 1], [1, 0, 2], [2, 0, 2], [2, 1, 2]],
      [[0, 1, 1], [0, 0, 1], [0, 0, 0], [1, 0, 0]],
    ],
  },
  {
    id: "B",
    name: "Quiral B (Levo)",
    color: "#7C3AED",
    material: "PLA Prismático",
    solutions: [
      [[1, 0, 1], [2, 0, 1], [2, 0, 2], [2, 1, 2]],
      [[2, 1, 1], [2, 2, 1], [2, 2, 2], [1, 2, 2]],
      [[1, 1, 0], [2, 1, 0], [2, 0, 0], [2, 0, 1]],
    ],
  },
  {
    id: "P",
    name: "Trípode P",
    color: "#E11D48",
    material: "PLA Calibrado",
    solutions: [
      [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]],
      [[2, 0, 0], [2, 1, 0], [1, 0, 0], [2, 0, 1]],
      [[0, 2, 0], [1, 2, 0], [0, 2, 1], [0, 1, 0]],
    ],
  },
];

function assertSomaSolutions(pieces: SomaPieceConfig[]) {
  const solutionCount = pieces[0]?.solutions.length ?? 0;
  for (let s = 0; s < solutionCount; s++) {
    const seen = new Set<string>();
    for (const piece of pieces) {
      const voxels = piece.solutions[s];
      if (!voxels) throw new Error(`Falta solución ${s} para ${piece.id}`);
      for (const [x, y, z] of voxels) {
        const key = `${x},${y},${z}`;
        if (seen.has(key)) throw new Error(`Solapamiento en ${s}: ${key}`);
        seen.add(key);
      }
    }
    if (seen.size !== 27) throw new Error(`La solución ${s} cubre ${seen.size}/27 celdas`);
  }
}

assertSomaSolutions(SOMA_PIECES);

export function SomaCubeHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene & Camera ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      36,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // --- Luces ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.35);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffbeb, 2.2);
    keyLight.position.set(8, 12, 10);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x99f6e4, 0.85);
    fillLight.position.set(-8, -2, -4);
    scene.add(fillLight);

    // Sombra inferior suave (recalibrada a la nueva escala)
    const floorGeo = new THREE.PlaneGeometry(16, 16);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.12 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // --- Estructura del Cubo Soma con escala reducida ---
    const rootGroup = new THREE.Group();
    rootGroup.scale.setScalar(0.75); // Reducción de tamaño (~18% más compacto)
    scene.add(rootGroup);

    const cubeSize = 0.94;
    const boxGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

    interface PieceVisual {
      group: THREE.Group;
      id: string;
      voxels: THREE.Mesh[];
      explodedOffset: THREE.Vector3;
      randomRotation: THREE.Euler;
    }

    const pieceVisuals: PieceVisual[] = [];

    SOMA_PIECES.forEach((piece, index) => {
      const pieceGroup = new THREE.Group();
      const material = new THREE.MeshStandardMaterial({
        color: piece.color,
        roughness: 0.35,
        metalness: 0.08,
      });

      const voxels: THREE.Mesh[] = [];
      piece.solutions[0].forEach(() => {
        const mesh = new THREE.Mesh(boxGeo, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        pieceGroup.add(mesh);
        voxels.push(mesh);
      });

      const angle = (index / SOMA_PIECES.length) * Math.PI * 2;
      const elevation = (index % 2 === 0 ? 1 : -1) * 0.75;
      const explodedOffset = new THREE.Vector3(
        Math.cos(angle) * 2.15,
        elevation * 1.35,
        Math.sin(angle) * 2.15
      );

      const randomRotation = new THREE.Euler(
        (Math.random() - 0.5) * 0.7,
        (Math.random() - 0.5) * 1.0,
        (Math.random() - 0.5) * 0.7
      );

      rootGroup.add(pieceGroup);
      pieceVisuals.push({
        group: pieceGroup,
        id: piece.id,
        voxels,
        explodedOffset,
        randomRotation,
      });
    });

    const centerOffset = new THREE.Vector3(-1, -1, -1);

    // Encuadre y posicionamiento relativo en pantalla
    const updateFraming = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      if (w >= 1280) {
        rootGroup.position.set(2.4, 0.05, 0);
        floor.position.set(2.4, -1.35, 0);
        camera.position.set(0.6, 3.4, 7.8);
        camera.lookAt(0.6, 0, 0);
      } else if (w >= 1024) {
        rootGroup.position.set(1.9, 0.05, 0);
        floor.position.set(1.9, -1.35, 0);
        camera.position.set(0.5, 3.4, 8.2);
        camera.lookAt(0.5, 0, 0);
      } else {
        rootGroup.position.set(0, -0.65, 0);
        floor.position.set(0, -2.05, 0);
        camera.position.set(0, 3.2, 8.4);
        camera.lookAt(0, -0.5, 0);
      }
    };
    updateFraming();

    // --- Control de Arrastre (Mouse y Touch) ---
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let autoRotateAngle = 0.35;

    const onPointerDown = (clientX: number, clientY: number) => {
      isDragging = true;
      prevX = clientX;
      prevY = clientY;
    };

    const onPointerMove = (clientX: number, clientY: number) => {
      if (!isDragging) return;
      const deltaX = clientX - prevX;
      const deltaY = clientY - prevY;
      rootGroup.rotation.y += deltaX * 0.007;
      rootGroup.rotation.x += deltaY * 0.007;
      prevX = clientX;
      prevY = clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const handleMouseDown = (e: MouseEvent) => onPointerDown(e.clientX, e.clientY);
    const handleMouseMove = (e: MouseEvent) => onPointerMove(e.clientX, e.clientY);
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", onPointerUp);

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    // --- Animación continua autónoma ---
    const animState = {
      currentSolution: 0,
      progress: 0,
      targetProgress: 0,
      isExploded: false,
      cycleTimer: 0,
    };

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      if (!isDragging) {
        autoRotateAngle += dt * 0.28;
        rootGroup.rotation.y = autoRotateAngle;
        rootGroup.rotation.x = Math.sin(autoRotateAngle * 0.4) * 0.1;
      }

      animState.cycleTimer += dt;
      const phaseDuration = animState.isExploded ? 2.6 : 3.6;

      if (animState.cycleTimer > phaseDuration) {
        animState.cycleTimer = 0;
        if (!animState.isExploded) {
          animState.isExploded = true;
          animState.targetProgress = 1;
        } else {
          animState.currentSolution = (animState.currentSolution + 1) % 3;
          animState.isExploded = false;
          animState.targetProgress = 0;
        }
      }

      animState.progress += (animState.targetProgress - animState.progress) * 0.07;
      const solIdx = animState.currentSolution;

      pieceVisuals.forEach((pv, pIdx) => {
        const pieceData = SOMA_PIECES[pIdx];
        const targetCubes = pieceData.solutions[solIdx];

        pv.voxels.forEach((mesh, vIdx) => {
          const target = targetCubes[vIdx];
          if (!target) return;

          const assembledPos = new THREE.Vector3(
            target[0] + centerOffset.x,
            target[1] + centerOffset.y,
            target[2] + centerOffset.z
          );

          const currentPos = assembledPos
            .clone()
            .addScaledVector(pv.explodedOffset, animState.progress);

          mesh.position.lerp(currentPos, 0.14);
        });

        pv.group.rotation.x = pv.randomRotation.x * animState.progress;
        pv.group.rotation.y = pv.randomRotation.y * animState.progress;
        pv.group.rotation.z = pv.randomRotation.z * animState.progress;
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    const resizeObserver = new ResizeObserver(() => updateFraming());
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", onPointerUp);
      container.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", onPointerUp);
      renderer.dispose();
      boxGeo.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full select-none">
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        title="Arrastra en cualquier parte para girar el Cubo Soma"
      />
      <div className="pointer-events-none absolute bottom-4 right-8 hidden md:flex items-center gap-2 rounded-full bg-slate-900/40 px-3 py-1 font-mono text-[10px] text-white/90 backdrop-blur-xs">
        <span className="h-1.5 w-1.5 rounded-full bg-salvia-400 animate-pulse" />
        <span>Arrastra para rotar 3D</span>
      </div>
    </div>
  );
}