import { useState, useEffect } from 'react';

/**
 * Custom hook to detect user reduced motion preferences
 */
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

/**
 * Custom hook to detect device capability & return adaptive graphics settings
 */
export function useAdaptiveQuality() {
  const [quality, setQuality] = useState({
    isLowEnd: false,
    particleCount: 2500,
    dprCap: [1, 2],
    shadowResolution: 1024
  });

  useEffect(() => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768;
    const lowCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    const isLowEndDevice = isMobile || lowCores;

    setQuality({
      isLowEnd: isLowEndDevice,
      particleCount: isLowEndDevice ? 1000 : 2500,
      dprCap: isLowEndDevice ? [1, 1.25] : [1, 2],
      shadowResolution: isLowEndDevice ? 512 : 1024
    });
  }, []);

  return quality;
}
