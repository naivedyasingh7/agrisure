import React, { useMemo } from 'react';
import * as THREE from 'three';

export default function DropletsElement({ currentTime }) {
  const droplets = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      x: (Math.random() - 0.5) * 2.4,
      z: (Math.random() - 0.5) * 2.4,
      delay: i * 0.04,
      size: 0.018 + Math.random() * 0.022,
    }));
  }, []);

  // Rain active: 1.3s → 2.1s
  const rainProgress = Math.min(1, Math.max(0, (currentTime - 1.3) / 0.8));
  const rainFade = currentTime > 1.9 ? Math.max(0, 1 - (currentTime - 1.9) / 0.3) : 1;

  if (currentTime < 1.3 || currentTime > 2.3) return null;

  return (
    <group>
      {droplets.map((d, i) => {
        const t = Math.max(0, rainProgress - d.delay);
        const posY = 2.5 - t * 3.2;
        const opacity = t > 0 ? Math.min(1, t * 4) * rainFade : 0;
        if (opacity <= 0) return null;
        return (
          <mesh key={i} position={[d.x, posY, d.z]}>
            <sphereGeometry args={[d.size, 8, 8]} />
            <meshPhysicalMaterial
              color="#A8D8EA" transparent opacity={opacity * 0.75}
              roughness={0.1} metalness={0.1} transmission={0.4}
            />
          </mesh>
        );
      })}
    </group>
  );
}
