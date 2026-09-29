"use client";

import { Canvas } from "@react-three/fiber";
import { Sparkles, Float, PerspectiveCamera } from "@react-three/drei";

export function EmberScene() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <ambientLight intensity={1} />
        
        {/* Core Glowing Embers */}
        <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
          <Sparkles 
            count={200} 
            scale={15} 
            size={4} 
            speed={0.4} 
            opacity={0.8} 
            color="#ea580c" // Ember orange
          />
        </Float>

        {/* Hot White/Yellow Sparks */}
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <Sparkles 
            count={50} 
            scale={12} 
            size={2} 
            speed={0.8} 
            opacity={0.9} 
            color="#fbbf24" // Yellow
            noise={1}
          />
        </Float>

        {/* Deep Red Background Particles */}
        <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <Sparkles 
            count={100} 
            scale={20} 
            size={8} 
            speed={0.2} 
            opacity={0.3} 
            color="#991b1b" // Deep red
          />
        </Float>
      </Canvas>
    </div>
  );
}
