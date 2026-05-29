"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface RedPlanetProps {
  onLoadComplete?: () => void;
}

export default function RedPlanet({ onLoadComplete }: RedPlanetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  // References for mouse interaction
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Dimensions
    let width = container.clientWidth;
    let height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 8;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.08);
    scene.add(ambientLight);

    // Primary red glowing light (representing Imperial Red)
    const redLight = new THREE.DirectionalLight(0xfb3640, 6.0);
    redLight.position.set(5, -3, 3);
    scene.add(redLight);

    // Accent side light to define sphere depth
    const accentLight = new THREE.DirectionalLight(0xffffff, 1.5);
    accentLight.position.set(-5, 3, 2);
    scene.add(accentLight);

    // Top glow rim light
    const rimLight = new THREE.PointLight(0xfb3640, 4, 15);
    rimLight.position.set(0, 5, 0);
    scene.add(rimLight);

    // Loading 3D Model
    let planetGroup = new THREE.Group();
    scene.add(planetGroup);
    
    let planetMesh: THREE.Object3D | null = null;
    const loader = new GLTFLoader();

    loader.load(
      "/models/mars_the_red_planet_free.glb",
      (gltf) => {
        planetMesh = gltf.scene;

        // Custom material replacement to enhance visual luxury (glassmorphic roughness & metallic glow)
        planetMesh.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            const mat = mesh.material as THREE.MeshStandardMaterial;
            if (mat) {
              // Enhance normal maps, roughness and specular details
              mat.roughness = 0.65;
              mat.metalness = 0.75;
              
              // Apply subtle red tint overlay in emissive for detailed sci-fi glow
              if (!mat.emissive) mat.emissive = new THREE.Color(0x000000);
              mat.emissive.setHex(0x2e0808);
            }
          }
        });

        // Center and scale the model
        const box = new THREE.Box3().setFromObject(planetMesh);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 3.6 / maxDim; // Fit perfectly
        planetMesh.scale.set(scale, scale, scale);

        // Adjust position so it floats slightly lower/centered
        planetMesh.position.y = -0.1;
        
        planetGroup.add(planetMesh);
        
        setLoading(false);
        if (onLoadComplete) onLoadComplete();
      },
      (xhr) => {
        if (xhr.total > 0) {
          const percent = Math.min(Math.round((xhr.loaded / xhr.total) * 100), 100);
          setLoadProgress(percent);
        }
      },
      (error) => {
        console.error("Error loading planet model:", error);
        // Fallback: Create a procedural procedural Mars sphere if GLTF fails
        const geometry = new THREE.SphereGeometry(1.8, 64, 64);
        const material = new THREE.MeshStandardMaterial({
          color: 0x3a1010,
          roughness: 0.7,
          metalness: 0.8,
          emissive: 0xfb3640,
          emissiveIntensity: 0.15,
        });
        const fallbackSphere = new THREE.Mesh(geometry, material);
        planetGroup.add(fallbackSphere);
        planetMesh = fallbackSphere;
        setLoading(false);
        if (onLoadComplete) onLoadComplete();
      }
    );

    // Mouse movement event handler
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize to [-0.5, 0.5]
      const x = (event.clientX / window.innerWidth) - 0.5;
      const y = (event.clientY / window.innerHeight) - 0.5;
      
      // Target rotation shifts based on mouse client coordinates
      targetRotation.current.y = x * 0.45;
      targetRotation.current.x = y * 0.45;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    // Intersection Observer: Only render when visible to save high-end rendering budgets
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Render loop variables
    let clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Cinematic floating hover (vertical sinusoid)
      planetGroup.position.y = Math.sin(elapsedTime * 0.85) * 0.12;

      // Slow constant base rotation
      if (planetMesh) {
        planetGroup.rotation.y += delta * 0.045;
      }

      // Smooth inertia mouse tilt (lerp)
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.05;
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.05;

      planetGroup.rotation.x = currentRotation.current.x;
      // Combine mouse tilt with auto rotation
      planetGroup.rotation.z = -currentRotation.current.y * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanups
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();

      // Dispose resources
      scene.traverse((object) => {
        if ((object as THREE.Mesh).isMesh) {
          const mesh = object as THREE.Mesh;
          mesh.geometry.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => mat.dispose());
          } else {
            mesh.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, [onLoadComplete]);

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-[#000F08]/80 backdrop-blur-md rounded-full">
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Outer spinning ring */}
            <div className="absolute inset-0 border-2 border-dashed border-white/10 rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-t-2 border-brand-red rounded-full animate-spin [animation-duration:1.5s]"></div>
            <span className="text-[11px] font-medium tracking-widest text-white/50 uppercase">{loadProgress}%</span>
          </div>
          <p className="mt-4 text-[10px] uppercase tracking-widest text-brand-red animate-pulse font-medium">
            Loading System Layer
          </p>
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />
    </div>
  );
}
