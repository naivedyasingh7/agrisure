import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

export default function CameraController({ currentTime = 0 }) {
  const cameraRef = useRef();

  useFrame(() => {
    if (!cameraRef.current) return;

    let targetPos = new THREE.Vector3(0, 2.5, 4.0);
    let lookTarget = new THREE.Vector3(0, 2.5, 0);

    if (currentTime <= 0.6) {
      const t = currentTime / 0.6;
      targetPos.set(Math.sin(t * 0.3) * 0.6, 2.5, 4.0);
      lookTarget.set(0, 2.5, 0);
    } else if (currentTime <= 1.3) {
      const t = (currentTime - 0.6) / 0.7;
      const eased = Math.pow(t, 1.8);
      targetPos.set(0, 2.5 - eased * 2.15, 4.0 - eased * 1.2);
      lookTarget.set(0, 2.5 - eased * 2.5, 0);
    } else if (currentTime <= 2.3) {
      const t = (currentTime - 1.3) / 1.0;
      targetPos.set(Math.sin(t * 0.2) * 0.3, 0.35 - t * 0.2, 2.8 - t * 0.6);
      lookTarget.set(0, 0.3, 0);
    } else if (currentTime <= 3.9) {
      const t = (currentTime - 2.3) / 1.6;
      const eased = 1 - Math.pow(1 - t, 2.2);
      targetPos.set(0, 0.15 + eased * 0.4, 2.2 - eased * 0.2);
      lookTarget.set(0, 0.3 + eased * 0.15, 0);
    } else if (currentTime <= 5.0) {
      const t = (currentTime - 3.9) / 1.1;
      targetPos.set(0, 0.55 + t * 0.05, 2.0 - t * 0.9);
      lookTarget.set(0, 0.6, 0);
    } else {
      const t = Math.min(1, (currentTime - 5.0) / 1.0);
      const eased = 1 - Math.pow(1 - t, 2);
      targetPos.set(0, 0.6 - eased * 0.25, 1.1 + eased * 2.4);
      lookTarget.set(0, 0.35, 0);
    }

    cameraRef.current.position.lerp(targetPos, 0.08);
    cameraRef.current.lookAt(lookTarget);
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 2.5, 4.0]}
      fov={38}
      near={0.1}
      far={1000}
    />
  );
}
