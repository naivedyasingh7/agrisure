import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { INTRO_PALETTE } from './constants';

export default function MonogramAssembly({ currentTime, count = 1200 }) {
  const pointsRef = useRef();

  const assemblyProgress = Math.min(1, Math.max(0, (currentTime - 5.0) / 0.8));
  const easedAssembly = 1 - Math.pow(1 - assemblyProgress, 3.5);

  const { initialPositions, targetPositions, colors } = useMemo(() => {
    const initPos = new Float32Array(count * 3);
    const targetPos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const greenColor = new THREE.Color(INTRO_PALETTE.GREEN_ACCENT);
    const whiteColor = new THREE.Color(INTRO_PALETTE.WHITE);
    const goldColor = new THREE.Color(INTRO_PALETTE.GOLD_SUNLIGHT);

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.8 + Math.random() * 2.2;
      initPos[i * 3]     = Math.cos(angle) * radius;
      initPos[i * 3 + 1] = Math.sin(angle) * radius;
      initPos[i * 3 + 2] = (Math.random() - 0.5) * 2.0;

      let tx = 0, ty = 0, tz = (Math.random() - 0.5) * 0.15;
      const u = Math.random();
      if (i < count * 0.45) {
        const a = (Math.random() - 0.5) * Math.PI;
        tx = 0.35 + Math.cos(a) * 0.95;
        ty = Math.sin(a) * 0.95;
      } else if (i < count * 0.8) {
        const side = Math.random() > 0.5 ? 1 : -1;
        tx = side * (0.12 + u * 0.48);
        ty = 0.82 - u * 1.64;
      } else {
        tx = (Math.random() - 0.5) * 0.85;
        ty = -0.12;
      }
      targetPos[i * 3] = tx; targetPos[i * 3 + 1] = ty; targetPos[i * 3 + 2] = tz;

      const rand = Math.random();
      const c = rand > 0.6 ? whiteColor : rand > 0.3 ? greenColor : goldColor;
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    return { initialPositions: initPos, targetPositions: targetPos, colors: col };
  }, [count]);

  const currentPositions = useMemo(() => new Float32Array(initialPositions.length), [initialPositions.length]);

  useFrame(() => {
    if (pointsRef.current && currentTime >= 4.8) {
      const positions = pointsRef.current.geometry.attributes.position.array;
      for (let i = 0; i < initialPositions.length; i++) {
        positions[i] = initialPositions[i] + (targetPositions[i] - initialPositions[i]) * easedAssembly;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  if (currentTime < 4.8) return null;

  return (
    <group position={[0, 0.35, 0]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[currentPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.065} vertexColors transparent opacity={Math.min(1, (currentTime - 4.8) * 3.5)} sizeAttenuation />
      </points>
      {assemblyProgress >= 0.85 && (
        <group scale={[(assemblyProgress - 0.85) * 6.6, (assemblyProgress - 0.85) * 6.6, (assemblyProgress - 0.85) * 6.6]}>
          <mesh>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color={INTRO_PALETTE.GREEN_ACCENT} emissive={INTRO_PALETTE.GREEN_ACCENT} emissiveIntensity={1.5} />
          </mesh>
        </group>
      )}
    </group>
  );
}
