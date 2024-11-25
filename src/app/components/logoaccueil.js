import React from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export function Ines(props) {
  const { nodes } = useGLTF('/logoaccueil.glb')

  // Create a blue material for the meshes
  const blueMaterial = new THREE.MeshStandardMaterial({
    color: '#0ABCC1',  // Blue color
    metalness: 0.5,   // Metallic appearance
    roughness: 0.1,   // Slightly reflective    
 
})

  return (
    <group {...props} dispose={null}>
      {/* Add Lighting */}
      <ambientLight intensity={1} /> {/* Ambient light for general illumination */}
      <directionalLight
        position={[1, 0, 10]} // Position of the light
        intensity={0.5} // Intensity of the light
        
      />

      {/* Main Group */}
      <group scale={0.01} rotation={[0, 0, 0]}>
        <group position={[0, 0, 0]}>
          <group position={[0, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Shape_4.geometry}
              material={blueMaterial}
              position={[-35.345, 90.395, -4.985]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Shape_1.geometry}
              material={blueMaterial}
              position={[-250.285, 90.395, -5.015]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Shape_2.geometry}
              material={blueMaterial}
              position={[-186.285, 90.395, -5.005]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Shape_3.geometry}
              material={blueMaterial}
              position={[94.285, 97.615, -4.995]}
            />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/logoaccueil.glb')
