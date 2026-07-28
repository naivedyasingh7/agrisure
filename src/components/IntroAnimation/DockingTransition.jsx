import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DharaLogo from '../DharaLogo';

/**
 * DockingTransition Component — Smoothly animates the D+A Monogram & Dhara AI Logo
 * from screen center to the top-left navigation bar logo position.
 */
export default function DockingTransition({ isDocking, isDark = true, onDockComplete }) {
  const [navLogoRect, setNavLogoRect] = useState({ x: 36, y: 24, scale: 0.65 });

  useEffect(() => {
    // Measure exact live position of Navbar logo element on screen
    const updateTargetPosition = () => {
      const el = document.querySelector('.logo-text');
      if (el) {
        const rect = el.getBoundingClientRect();
        setNavLogoRect({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          scale: 0.7
        });
      } else {
        // Default desktop responsive fallback
        setNavLogoRect({
          x: window.innerWidth > 768 ? 90 : 40,
          y: 32,
          scale: 0.7
        });
      }
    };

    updateTargetPosition();
    window.addEventListener('resize', updateTargetPosition);
    return () => window.removeEventListener('resize', updateTargetPosition);
  }, []);

  if (!isDocking) return null;

  return (
    <motion.div
      initial={{
        position: 'fixed',
        left: '50vw',
        top: '48vh',
        x: '-50%',
        y: '-50%',
        scale: 1.2,
        opacity: 1,
        zIndex: 10005
      }}
      animate={{
        left: `${navLogoRect.x}px`,
        top: `${navLogoRect.y}px`,
        x: '-50%',
        y: '-50%',
        scale: navLogoRect.scale,
        opacity: 1
      }}
      transition={{
        duration: 0.7,
        ease: [0.19, 1, 0.22, 1] // easeOutExpo
      }}
      onAnimationComplete={onDockComplete}
      style={{ pointerEvents: 'none' }}
    >
      <DharaLogo variant="horizontal" theme="dark" size={210} showTagline={false} />
    </motion.div>
  );
}
