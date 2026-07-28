import React, { useMemo } from 'react';
import * as THREE from 'three';
import { INTRO_PALETTE } from './constants';

export default function SoilElement({ currentTime }) {
  const soilGeometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(6, 6, 32, 32);
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i);
      const noise = (Math.sin(x * 3.1) * Math.cos(y * 2.7) + Math.sin(x * 1.4 + y * 2.1)) * 0.04;
      pos.setZ(i, noise);
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  const soilVisible = currentTime >= 0.8;
  const soilOpacity = Math.min(1, Math.max(0, (currentTime - 0.8) / 0.5));

  if (!soilVisible) return null;

  return (
    <group position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh geometry={soilGeometry} receiveShadow>
        <meshPhysicalMaterial
          color={INTRO_PALETTE.SOIL_ACCENT}
          roughness={0.92} metalness={0.02}
          transparent opacity={soilOpacity}
        />
      </mesh>
      {/* Subtle soil surface detail ring */}
      <mesh position={[0, 0, 0.01]}>
        <ringGeometry args={[0.08, 0.22, 32]} />
        <meshBasicMaterial color={INTRO_PALETTE.SOIL_DARK} transparent opacity={soilOpacity * 0.6} />
      </mesh>
    </group>
  );
}
