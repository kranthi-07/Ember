"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float, Environment, Lightformer, Html, OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { menuData } from "@/lib/menu-data";
import { Search, X } from "lucide-react";
import { usePremiumSounds } from "@/lib/use-sound";

function GlassTorus({ view, isFiltering, themeColor }: { view: "HUB" | "AI" | "MENU", isFiltering: boolean, themeColor: string }) {
  const mesh = React.useRef<THREE.Mesh>(null);
  const materialRef = React.useRef<any>(null);
  
  const targetX = 0; // Always centered
  const targetZ = view === "HUB" ? 0 : view === "AI" ? -5 : isFiltering ? -15 : -5;
  const targetScale = view === "HUB" ? 1 : view === "AI" ? 1.5 : 1.2;

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, targetX, delta * 3);
      mesh.current.position.z = THREE.MathUtils.lerp(mesh.current.position.z, targetZ, delta * 3);
      mesh.current.scale.setScalar(THREE.MathUtils.lerp(mesh.current.scale.x, targetScale, delta * 3));
      mesh.current.rotation.x += delta * 0.2;
      mesh.current.rotation.y += delta * 0.3;
    }
    
    if (materialRef.current) {
      const current = new THREE.Color(materialRef.current.color);
      const target = new THREE.Color(themeColor);
      current.lerp(target, delta * 2);
      materialRef.current.color = current;
    }
  });

  return (
    <Float floatIntensity={2} rotationIntensity={2} speed={2}>
      <mesh ref={mesh}>
        <torusKnotGeometry args={[1.5, 0.5, 256, 64]} />
        <MeshTransmissionMaterial 
          ref={materialRef}
          backside thickness={1.5} roughness={0} transmission={1} ior={1.5}
          chromaticAberration={0.1} anisotropy={0.3} color="#f97316"
        />
      </mesh>
    </Float>
  );
}

function MenuUniverse({ onFilteringChange, onThemeChange }: { onFilteringChange: (isFiltering: boolean) => void, onThemeChange: (color: string) => void }) {
  const groupRef = React.useRef<THREE.Group>(null);
  const [search, setSearch] = React.useState("");
  const { playPop, playTink } = usePremiumSounds();
  const radius = 8;

  // Notify parent when search changes so we can move the Torus out of the way
  React.useEffect(() => {
    onFilteringChange(search.length > 0);
    
    // Dynamic Mood Lighting
    const s = search.toLowerCase();
    if (s.includes("spice") || s.includes("chicken") || s.includes("tikka") || s.includes("rogan")) {
      onThemeChange("#ef4444"); // Crimson Red
    } else if (s.includes("veg") || s.includes("paneer") || s.includes("palak")) {
      onThemeChange("#10b981"); // Emerald Green
    } else if (s.includes("sweet") || s.includes("jamun") || s.includes("dessert") || s.includes("rasmalai")) {
      onThemeChange("#8b5cf6"); // Purple
    } else if (s.includes("water") || s.includes("drink") || s.includes("lassi")) {
      onThemeChange("#3b82f6"); // Blue
    } else {
      onThemeChange("#f97316"); // Default Ember Orange
    }
  }, [search, onFilteringChange, onThemeChange]);

  useFrame((state, delta) => {
    if (groupRef.current && !search) {
      groupRef.current.rotation.y += delta * 0.01;
    }
  });

  const filtered = search ? menuData.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.description.toLowerCase().includes(search.toLowerCase())) : menuData;

  return (
    <group position={[0, 0, -5]}>
      {/* 3D Floating Search Bar in the center of the universe */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
        <Html transform position={[0, 3, 2]} scale={0.3} occlude="blending">
          <div className="w-[500px] flex items-center bg-white/10 backdrop-blur-3xl border border-white/20 rounded-full px-6 py-4 shadow-2xl">
            <Search className="w-6 h-6 text-white/50 mr-4" />
            <input 
              type="text" 
              value={search} 
              onChange={e => { playTink(); setSearch(e.target.value); }} 
              placeholder="Search the universe..." 
              className="bg-transparent text-white text-xl outline-none w-full placeholder:text-white/30"
            />
            {search && <X className="w-6 h-6 text-white/50 cursor-pointer hover:text-white" onClick={() => { playTink(); setSearch(""); }} />}
          </div>
        </Html>
      </Float>

      <group ref={groupRef}>
        {filtered.map((item, i) => {
          const total = filtered.length;
          // If filtering (<=3 items), place them perfectly in the front (z=2). Else distribute in circle.
          const angle = total <= 3 ? (i - (total-1)/2) * 0.5 : (i / total) * Math.PI * 2;
          const x = total <= 3 ? angle * radius : Math.sin(angle) * radius;
          const z = total <= 3 ? 2 : Math.cos(angle) * radius;
          const y = total <= 3 ? 0 : Math.sin(i * 2.5) * 3;

          return (
            <Float key={item.id} speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
              <Html transform position={[x, y, z]} rotation={[0, total <= 3 ? 0 : angle, 0]} scale={0.25} occlude="blending">
                <div className="w-[320px] bg-black/60 backdrop-blur-2xl border border-white/10 hover:border-ember-accent/50 rounded-3xl p-5 text-white shadow-2xl transition-all">
                  {item.image && (
                    <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-2xl mb-4" />
                  )}
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-xl font-medium text-white">{item.name}</h3>
                    <span className="font-bold text-ember-accent">₹{item.price}</span>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed mb-4">{item.description}</p>
                  <button 
                    onClick={() => {
                      playPop();
                      window.dispatchEvent(new CustomEvent('add-to-cart', { detail: item }));
                    }}
                    className="w-full py-3 rounded-xl bg-white/10 hover:bg-ember-accent text-white font-bold uppercase text-[10px] transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </Html>
            </Float>
          );
        })}
      </group>
    </group>
  );
}

function CameraRig({ view }: { view: "HUB" | "AI" | "MENU" }) {
  useFrame((state, delta) => {
    if (view !== "MENU") {
      // Smoothly animate camera back to default position
      state.camera.position.lerp(new THREE.Vector3(0, 0, 8), delta * 3);
      
      // Smoothly animate camera rotation to look at center
      const targetLook = new THREE.Vector3(0, 0, 0);
      const targetRotation = new THREE.Quaternion().setFromRotationMatrix(
        new THREE.Matrix4().lookAt(state.camera.position, targetLook, state.camera.up)
      );
      state.camera.quaternion.slerp(targetRotation, delta * 3);
    }
  });
  return null;
}

export function Premium3DScene({ view }: { view: "HUB" | "AI" | "MENU" }) {
  const isInteractive = view === "MENU";
  const [isFilteringMenu, setIsFilteringMenu] = React.useState(false);
  const [themeColor, setThemeColor] = React.useState("#f97316");

  return (
    <div className={`absolute inset-0 z-0 ${isInteractive ? "pointer-events-auto" : "pointer-events-none"}`}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={['#000000']} />
        
        <CameraRig view={view} />
        
        {view === "MENU" && (
          <>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <OrbitControls enableZoom={true} minDistance={2} maxDistance={20} enablePan={false} target={[0, 0, -5]} />
          </>
        )}
        
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow color={themeColor} />
        
        <GlassTorus view={view} isFiltering={isFilteringMenu} themeColor={themeColor} />
        
        {view === "MENU" && <MenuUniverse onFilteringChange={setIsFilteringMenu} onThemeChange={setThemeColor} />}

        <Environment resolution={256}>
          <group rotation={[-Math.PI / 3, 0, 1]}>
            <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} color={themeColor} />
            <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} color={themeColor} />
            <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[5, 1, -1]} scale={2} color={themeColor} />
            <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} color={themeColor} />
          </group>
        </Environment>
      </Canvas>
    </div>
  );
}

