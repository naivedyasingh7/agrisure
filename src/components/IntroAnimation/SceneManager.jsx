import React, { Suspense, memo } from 'react';
import { Canvas } from '@react-three/fiber';
import CameraController from './CameraController';
import Environment from './Environment';
import ParticleSystem from './ParticleSystem';
import SeedElement from './SeedElement';
import SoilElement from './SoilElement';
import DropletsElement from './DropletsElement';
import MacroSprout from './MacroSprout';
import SatelliteContourGrid from './SatelliteContourGrid';
import MonogramAssembly from './MonogramAssembly';
import { useAdaptiveQuality } from './hooks';

const MemoizedParticleSystem = memo(ParticleSystem);
const MemoizedSeedElement = memo(SeedElement);
const MemoizedSoilElement = memo(SoilElement);
const MemoizedDropletsElement = memo(DropletsElement);
const MemoizedMacroSprout = memo(MacroSprout);
const MemoizedSatelliteContourGrid = memo(SatelliteContourGrid);
const MemoizedMonogramAssembly = memo(MonogramAssembly);

export default function SceneManager({ currentTime = 0 }) {
  const quality = useAdaptiveQuality();

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', preserveDrawingBuffer: false }}
        dpr={quality.dprCap}
      >
        <CameraController currentTime={currentTime} />
        <Suspense fallback={null}>
          <Environment currentTime={currentTime} shadowRes={quality.shadowResolution} />
          <MemoizedParticleSystem count={quality.particleCount} currentTime={currentTime} />
          <MemoizedSeedElement currentTime={currentTime} />
          <MemoizedSoilElement currentTime={currentTime} />
          <MemoizedDropletsElement currentTime={currentTime} />
          <MemoizedMacroSprout currentTime={currentTime} />
          <MemoizedSatelliteContourGrid currentTime={currentTime} />
          <MemoizedMonogramAssembly currentTime={currentTime} count={quality.isLowEnd ? 600 : 1200} />
        </Suspense>
      </Canvas>
    </div>
  );
}
