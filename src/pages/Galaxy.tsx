import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere } from '@react-three/drei';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Animated Planet Component
function Planet({ position, size, color, rotationSpeed = 0.01 }: { position: [number, number, number], size: number, color: string, rotationSpeed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <Sphere ref={meshRef} position={position} args={[size, 32, 32]}>
      <meshStandardMaterial 
        color={color} 
        emissive={color} 
        emissiveIntensity={0.2}
        roughness={0.8}
        metalness={0.1}
      />
    </Sphere>
  );
}

// Animated Ring Component
function Ring({ position, innerRadius, outerRadius, color }: { position: [number, number, number], innerRadius: number, outerRadius: number, color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[innerRadius, outerRadius, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
}

// Main Galaxy Scene
function GalaxyScene() {
  return (
    <>
      {/* Ambient and directional lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#8B5CF6" />

      {/* Central Star */}
      <Sphere position={[0, 0, 0]} args={[0.8, 32, 32]}>
        <meshStandardMaterial 
          color="#FFA500" 
          emissive="#FFA500" 
          emissiveIntensity={0.8}
        />
      </Sphere>

      {/* Planets */}
      <Planet position={[3, 0, 0]} size={0.3} color="#8B5CF6" rotationSpeed={0.02} />
      <Planet position={[-4, 1, 2]} size={0.4} color="#A855F7" rotationSpeed={0.015} />
      <Planet position={[6, -1, -1]} size={0.25} color="#C084FC" rotationSpeed={0.025} />
      <Planet position={[-7, 2, -3]} size={0.35} color="#DDD6FE" rotationSpeed={0.01} />
      <Planet position={[9, 0.5, 1]} size={0.2} color="#7C3AED" rotationSpeed={0.03} />

      {/* Rings around planets */}
      <Ring position={[-4, 1, 2]} innerRadius={0.6} outerRadius={0.8} color="#A855F7" />
      <Ring position={[6, -1, -1]} innerRadius={0.4} outerRadius={0.6} color="#C084FC" />

      {/* Starfield */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Orbit Controls for interaction */}
      <OrbitControls 
        enableZoom={true} 
        enablePan={true} 
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.5}
        minDistance={5}
        maxDistance={50}
      />
    </>
  );
}

const Galaxy = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section with 3D Galaxy */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 z-10">
          <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
            <GalaxyScene />
          </Canvas>
        </div>
        
        {/* Overlay Content */}
        <div className="relative z-20 h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
              Galaxy
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Explore the infinite cosmos of possibilities with our planetary-themed experiences
            </p>
            <div className="flex gap-4 justify-center">
              <button className="btn-gradient">
                Explore Universe
              </button>
              <button className="btn-neon">
                Discover Planets
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-primary">Solar Systems</h3>
              <p className="text-muted-foreground">
                Discover multiple solar systems with unique planetary configurations and cosmic phenomena.
              </p>
            </div>
            <div className="glass-card p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-primary">Celestial Bodies</h3>
              <p className="text-muted-foreground">
                Explore planets, moons, asteroids, and other celestial objects in stunning 3D detail.
              </p>
            </div>
            <div className="glass-card p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-primary">Cosmic Adventures</h3>
              <p className="text-muted-foreground">
                Embark on interstellar journeys and experience the wonder of space exploration.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Galaxy;