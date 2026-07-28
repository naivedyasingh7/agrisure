import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { INTRO_PALETTE } from './constants';

export default function MacroSprout({ currentTime }) {
  const groupRef = useRef();
  const leafLRef = useRef();
  const leafRRef = useRef();

  const growthProgress = Math.min(1, Math.max(0, (currentTime - 2.3) / 1.6));
  const easedGrowth = 1 - Math.pow(1 - growthProgress, 3);

  const stemGeometry = useMemo(() => {
    const points = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.02, 0.25, 0.01),
      new THREE.Vector3(-0.01, 0.55, 0.02),
      new THREE.Vector3(0.01, 0.85, 0.0),
    ];
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 48, 0.028, 16, false);
  }, []);

  const leafGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.12, 0.15, 0.22, 0.45, 0, 0.8);
    shape.bezierCurveTo(-0.22, 0.45, -0.12, 0.15, 0, 0);
    return new THREE.ExtrudeGeometry(shape, { depth: 0.008, bevelEnabled: true, bevelSegments: 4, steps: 2, bevelSize: 0.004, bevelThickness: 0.004 });
  }, []);

  useFrame((state) => {
    if (groupRef.current && currentTime >= 2.3) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.z = Math.sin(time * 1.6) * 0.03 * easedGrowth;
      groupRef.current.rotation.x = Math.cos(time * 1.2) * 0.015 * easedGrowth;
      if (leafLRef.current && leafRRef.current) {
        leafLRef.current.rotation.z = -0.55 * easedGrowth + Math.sin(time * 2.4) * 0.015;
        leafLRef.current.rotation.x = 0.2 * (1 - easedGrowth) + Math.cos(time * 1.8) * 0.01;
        leafRRef.current.rotation.z = 0.55 * easedGrowth - Math.sin(time * 2.4) * 0.015;
        leafRRef.current.rotation.x = -0.2 * (1 - easedGrowth) - Math.cos(time * 1.8) * 0.01;
      }
    }
  });

  if (currentTime < 2.2 || currentTime > 4.4) return null;

  const leafMat = { color: INTRO_PALETTE.GREEN_ACCENT, roughness: 0.25, metalness: 0.05, transmission: 0.2, thickness: 0.05, clearcoat: 0.5, clearcoatRoughness: 0.2, sheen: 0.8, sheenColor: '#A3F2A7' };

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={[1, easedGrowth, 1]}>
      {growthProgress > 0.05 && (
        <group position={[0, -0.02, 0]}>
          <mesh rotation={[0.1, 0, -0.3]}><cylinderGeometry args={[0.014, 0.004, 0.35 * easedGrowth, 8]} /><meshStandardMaterial color="#2B1D12" roughness={0.9} /></mesh>
          <mesh rotation={[-0.1, 0, 0.35]}><cylinderGeometry args={[0.014, 0.004, 0.32 * easedGrowth, 8]} /><meshStandardMaterial color="#2B1D12" roughness={0.9} /></mesh>
        </group>
      )}
      {growthProgress > 0 && (
        <mesh geometry={stemGeometry} castShadow receiveShadow>
          <meshPhysicalMaterial color={INTRO_PALETTE.GREEN_ACCENT} roughness={0.3} metalness={0.05} clearcoat={0.3} clearcoatRoughness={0.2} sheen={0.6} sheenColor="#8CE490" />
        </mesh>
      )}
      {growthProgress > 0.25 && (
        <group ref={leafLRef} position={[-0.01, 0.42 * easedGrowth, 0.01]}>
          <mesh geometry={leafGeometry} scale={[0.45 * easedGrowth, 0.45 * easedGrowth, 0.45 * easedGrowth]} rotation={[0, 0.2, 0.4]} castShadow receiveShadow>
            <meshPhysicalMaterial {...leafMat} />
          </mesh>
        </group>
      )}
      {growthProgress > 0.38 && (
        <group ref={leafRRef} position={[0.01, 0.58 * easedGrowth, -0.01]}>
          <mesh geometry={leafGeometry} scale={[0.48 * easedGrowth, 0.48 * easedGrowth, 0.48 * easedGrowth]} rotation={[0, -0.2, -0.4]} castShadow receiveShadow>
            <meshPhysicalMaterial {...leafMat} />
          </mesh>
        </group>
      )}
    </group>
  );
}
