import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';
import { INTRO_PALETTE } from './constants';

export default function SeedElement({ currentTime }) {
  const meshRef = useRef();
  const seedGroupRef = useRef();

  const seedGeometry = useMemo(() => {
    const geom = new THREE.SphereGeometry(1, 48, 48);
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
      const yFactor = 1.0 - Math.abs(y) * 0.25;
      x *= yFactor * 0.55;
      z *= yFactor * 0.45;
      y *= 1.4;
      if (z > 0) {
        const creaseDist = Math.abs(x);
        if (creaseDist < 0.25) z -= (0.25 - creaseDist) * 0.6;
      }
      pos.setXYZ(i, x, y, z);
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  const matProgress = Math.min(1, Math.max(0, currentTime / 0.6));
  const fallProgress = Math.min(1, Math.max(0, (currentTime - 0.6) / 0.6));
  const easedFall = Math.pow(fallProgress, 2.4);
  const posY = 3.2 * (1 - easedFall);
  const impactProgress = Math.min(1, Math.max(0, (currentTime - 1.2) / 0.12));
  const scaleY = impactProgress > 0 && impactProgress < 1 ? 1 - Math.sin(impactProgress * Math.PI) * 0.2 : 1;

  useFrame((state, delta) => {
    if (seedGroupRef.current) {
      if (currentTime < 0.6) {
        seedGroupRef.current.rotation.y += delta * 0.4;
        seedGroupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.1;
      } else if (currentTime < 1.3) {
        seedGroupRef.current.rotation.y *= 0.92;
        seedGroupRef.current.rotation.z *= 0.92;
      }
    }
  });

  if (currentTime > 2.6) return null;

  return (
    <group position={[0, posY, 0]}>
      <Float speed={currentTime < 0.6 ? 2.5 : 0} rotationIntensity={0.2} floatIntensity={0.3}>
        <group ref={seedGroupRef}>
          <mesh
            ref={meshRef}
            geometry={seedGeometry}
            scale={[matProgress * 0.38, matProgress * 0.38 * scaleY, matProgress * 0.38]}
            castShadow receiveShadow
          >
            <meshPhysicalMaterial
              color="#4A3B2C" roughness={0.65} metalness={0.05}
              clearcoat={0.15} clearcoatRoughness={0.4}
              sheen={0.4} sheenColor="#7A6248"
              emissive="#2A1B0E" emissiveIntensity={0.2 * matProgress}
            />
          </mesh>
          {currentTime < 0.8 && (
            <pointLight color={INTRO_PALETTE.GOLD_SUNLIGHT} intensity={matProgress * 2.2} distance={2.0} />
          )}
        </group>
      </Float>
    </group>
  );
}
