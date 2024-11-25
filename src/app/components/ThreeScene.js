"use client"; // Pour activer le rendu côté client dans Next.js
import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function ThreeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    // Initialiser la scène, la caméra et le renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Ajouter OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Pour une navigation plus fluide
    controls.dampingFactor = 0.05; // Amortissement
    controls.screenSpacePanning = false; // Désactiver le panoramique en fonction de l'écran

    // Ajouter un cube à la scène
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Animation de la scène
    const animate = () => {
      requestAnimationFrame(animate);

      // Mise à jour des contrôles
      controls.update();

      // Rendu de la scène
      renderer.render(scene, camera);
    };
    animate();

    // Nettoyage lors de la destruction du composant
    return () => {
      controls.dispose(); // Supprime les écouteurs ajoutés par OrbitControls
      renderer.dispose();
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
}
