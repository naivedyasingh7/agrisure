import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { INTRO_PALETTE } from './constants';

export default function ParticleSystem({ count = 2500, currentTime = 0 }) {
  const pointsRef = useRef();

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const green = new THREE.Color(INTRO_PALETTE.GREEN_ACCENT);
    const white = new THREE.Color(INTRO_PALETTE.WHITE);
    const gold = new THREE.Color(INTRO_PALETTE.GOLD_SUNLIGHT);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3.5 + Math.random() * 3.0;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const rand = Math.random();
      const c = rand > 0.65 ? white : rand > 0.35 ? green : gold;
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.04;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.1;
    }
  });

  const opacity = Math.min(1, currentTime * 1.5) * (currentTime > 4.5 ? Math.max(0, 1 - (currentTime - 4.5) * 2) : 1);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors transparent opacity={opacity * 0.55} sizeAttenuation />
    </points>
  );
}
