import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { INTRO_PALETTE } from './constants';

export default function SatelliteContourGrid({ currentTime }) {
  const groupRef = useRef();

  // Active: 3.9s → 5.2s
  const progress = Math.min(1, Math.max(0, (currentTime - 3.9) / 1.1));
  const fadeOut = currentTime > 4.8 ? Math.max(0, 1 - (currentTime - 4.8) / 0.5) : 1;
  const opacity = progress * fadeOut;

  const lines = useMemo(() => {
    const result = [];
    for (let i = 0; i < 7; i++) {
      const t = i / 6;
      const points = [];
      for (let j = 0; j <= 48; j++) {
        const angle = (j / 48) * Math.PI * 2;
        const rx = (0.18 + t * 0.55) * Math.cos(angle);
        const ry = (0.08 + t * 0.28) * Math.sin(angle);
        points.push(new THREE.Vector3(rx, ry, 0));
      }
      result.push(new THREE.BufferGeometry().setFromPoints(points));
    }
    return result;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.getElapsedTime() * 0.08;
    }
  });

  if (currentTime < 3.8 || currentTime > 5.3) return null;

  return (
    <group ref={groupRef} position={[0, 0.6, 0.5]}>
      {lines.map((geo, i) => (
        <line key={i} geometry={geo}>
          <lineBasicMaterial
            color={i % 2 === 0 ? INTRO_PALETTE.CYAN_NODE : INTRO_PALETTE.GREEN_ACCENT}
            transparent
            opacity={opacity * (0.15 + i * 0.08)}
          />
        </line>
      ))}
    </group>
  );
}
