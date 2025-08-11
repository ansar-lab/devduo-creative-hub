import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Text } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedSphere = () => {
  return (
    <Sphere visible args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial
        color="#9d4edd"
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.4}
        metalness={0.8}
      />
    </Sphere>
  );
};

const FloatingText = () => {
  return (
    <Text
      scale={[3, 3, 3]}
      color="#e0aaff"
      anchorX="center"
      anchorY="middle"
      font="/fonts/helvetiker_regular.typeface.json"
    >
      DEV DUO
    </Text>
  );
};

const ParticleField = () => {
  const particlesCount = 50;
  const positions = new Float32Array(particlesCount * 3);
  
  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#c77dff" />
    </points>
  );
};

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');

  const loadingSteps = [
    'Initializing...',
    'Loading neural networks...',
    'Configuring cyber matrix...',
    'Syncing quantum processors...',
    'Activating holographic display...',
    'Ready for engagement!'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        
        // Update loading text based on progress
        const stepIndex = Math.floor((newProgress / 100) * loadingSteps.length);
        if (stepIndex < loadingSteps.length) {
          setLoadingText(loadingSteps[stepIndex]);
        }

        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-background via-card to-background flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <pointLight position={[-10, -10, -10]} color="#9d4edd" />
          
          <ParticleField />
          <AnimatedSphere />
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate
            autoRotateSpeed={1}
          />
        </Canvas>
      </div>

      {/* Loading UI */}
      <div className="relative z-10 text-center">
        <div className="glass-effect p-12 rounded-3xl max-w-md mx-auto">
          <h1 className="text-6xl font-bold mb-8 cyber-text animate-hologram">
            DEV DUO
          </h1>
          
          <div className="mb-8">
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary via-primary-glow to-primary transition-all duration-300 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
              </div>
            </div>
            <div className="mt-4 text-primary-glow font-mono text-lg">
              {progress}%
            </div>
          </div>

          <p className="text-foreground/80 text-lg font-mono animate-pulse">
            {loadingText}
          </p>

          {/* Floating Elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full animate-float-cyber" />
          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary-glow rounded-full animate-float-cyber" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 -left-8 w-4 h-4 bg-accent rounded-full animate-float-cyber" style={{ animationDelay: '2s' }} />
        </div>

        {/* Data streams */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent animate-data-stream" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-accent/30 to-transparent animate-data-stream" style={{ animationDelay: '1s' }} />
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-primary-glow/30 to-transparent animate-data-stream" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
};