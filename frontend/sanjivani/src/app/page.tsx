// pages/index.tsx
'use client'

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { NextPage } from "next";
import { useRef, useState } from "react";
import * as THREE from "three";

const InteractiveCube = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  const [clicked, setClick] = useState(false);
  const { viewport } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.mouse.y * Math.PI;
      meshRef.current.rotation.y = state.mouse.x * Math.PI;
    }
  });

  return (
    <mesh
      ref={meshRef}
      scale={clicked ? 1.5 : 1}
      onClick={() => setClick(!clicked)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[viewport.width / 5, viewport.width / 5, viewport.width / 5]} />
      <meshPhongMaterial color={hovered ? "#ff4d4d" : "#4d4dff"} />
    </mesh>
  );
};

const Home: NextPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-12rem)]">
        <Canvas
          className="w-full h-full"
          gl={{ antialias: true }}
          camera={{ position: [0, 0, 5], fov: 75 }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <directionalLight position={[-5, 5, 5]} intensity={0.5} />
          <InteractiveCube />
        </Canvas>
      </div>
    </main>
  )
}

export default Home;