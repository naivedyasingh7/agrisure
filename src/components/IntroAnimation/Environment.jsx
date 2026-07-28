import React from 'react';
import { INTRO_PALETTE } from './constants';

export default function Environment({ currentTime = 0 }) {
  const sunProgress = Math.min(1, Math.max(0, (currentTime - 1.3) / 1.0));
  const sunIntensity = 0.2 + sunProgress * 1.6;
  const intelProgress = Math.min(1, Math.max(0, (currentTime - 3.9) / 1.1));

  return (
    <>
      <color attach="background" args={[INTRO_PALETTE.BACKGROUND]} />
      <ambientLight intensity={0.4 + sunProgress * 0.3} />
      <directionalLight
        position={[8, 12, 6]}
        intensity={sunIntensity}
        color={sunProgress > 0 ? INTRO_PALETTE.GOLD_SUNLIGHT : '#FFFFFF'}
        castShadow
      />
      <pointLight position={[-6, -4, -3]} intensity={0.4} color={INTRO_PALETTE.GREEN_ACCENT} />
      {intelProgress > 0 && (
        <pointLight
          position={[0, 1.8, 1.5]}
          intensity={intelProgress * 2.0}
          color={INTRO_PALETTE.CYAN_NODE}
          distance={4}
        />
      )}
      <fog attach="fog" args={[INTRO_PALETTE.BACKGROUND, 4, 18]} />
    </>
  );
}
