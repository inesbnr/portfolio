import { useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

// This component will load the GLB model using useGLTF hook
const Model = (props) => {
  const { scene } = useGLTF('/untitled.glb'); // path to your GLB file in the public folder

  return (
    <group {...props}>
      <primitive object={scene} />
    </group>
  );
};

export default Model;
