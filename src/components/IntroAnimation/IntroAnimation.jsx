import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import SceneManager from './SceneManager';
import IdentityOverlay from './IdentityOverlay';
import DockingTransition from './DockingTransition';
import { useReducedMotion } from './hooks';
import { TOTAL_DURATION } from './constants';

/**
 * Dhara AI — Production-Grade Cinematic Intro Controller
 * Includes Skip Control (fast-forwards smoothly to docking), Reduced Motion support,
 * and adaptive performance scaling.
 */
export default function IntroAnimation({ onStartDocking, onAnimationComplete, darkMode = true }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [isDocking, setIsDocking] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  
  const hasTriggeredDock = useRef(false);
  const animObjRef = useRef({ time: 0 });
  const timelineRef = useRef(null);

  const prefersReducedMotion = useReducedMotion();

  // If user prefers reduced motion, bypass 3D intro immediately
  useEffect(() => {
    if (prefersReducedMotion) {
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    }
  }, [prefersReducedMotion, onAnimationComplete]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const animObj = animObjRef.current;
    
    timelineRef.current = gsap.to(animObj, {
      time: TOTAL_DURATION,
      duration: TOTAL_DURATION,
      ease: 'none',
      onUpdate: () => {
        const time = animObj.time;
        setCurrentTime(time);

        // At 5.4s: Hold completed monogram, then trigger smooth docking transition
        if (time >= 5.4 && !hasTriggeredDock.current) {
          hasTriggeredDock.current = true;
          setIsDocking(true);
          setIsFadingOut(true);
          if (onStartDocking) {
            onStartDocking();
          }
        }
      }
    });

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [onStartDocking, prefersReducedMotion]);

  /**
   * Skip Intro Handler:
   * Smoothly fast-forwards remaining timeline to 5.4s in 280ms,
   * allowing the monogram docking transition to complete naturally.
   */
  const handleSkipIntro = () => {
    if (hasTriggeredDock.current || isDocking) return;

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    gsap.to(animObjRef.current, {
      time: 5.4,
      duration: 0.28,
      ease: 'power2.out',
      onUpdate: () => {
        const time = animObjRef.current.time;
        setCurrentTime(time);
        if (time >= 5.4 && !hasTriggeredDock.current) {
          hasTriggeredDock.current = true;
          setIsDocking(true);
          setIsFadingOut(true);
          if (onStartDocking) {
            onStartDocking();
          }
        }
      }
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSkipIntro();
    }
  };

  if (prefersReducedMotion) return null;

  return (
    <>
      {/* Fixed Overlay Container */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#08120D',
          color: '#F8FAF7',
          zIndex: 10000,
          opacity: isFadingOut ? 0 : 1,
          pointerEvents: isFadingOut ? 'none' : 'auto',
          transition: 'opacity 0.7s cubic-bezier(0.19, 1, 0.22, 1)',
          overflow: 'hidden'
        }}
      >
        {/* Real-time 3D Scene Layer */}
        <SceneManager currentTime={currentTime} />

        {/* Initial Typography Overlay (fades out as docking begins) */}
        {!isDocking && <IdentityOverlay currentTime={currentTime} />}
      </div>

      {/* Skip Intro Control: Appears after 1 second, hidden before 1 second */}
      {currentTime >= 1.0 && !isDocking && (
        <button
          onClick={handleSkipIntro}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          aria-label="Skip intro animation and view website"
          style={{
            position: 'fixed',
            top: '28px',
            right: '28px',
            backgroundColor: 'transparent',
            color: 'rgba(255, 255, 255, 0.7)',
            border: 'none',
            padding: '6px 12px',
            fontSize: '12px',
            fontWeight: '600',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            zIndex: 10010,
            outline: 'none',
            transition: 'color 0.2s ease, opacity 0.3s ease',
            fontFamily: "'Manrope', sans-serif"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#FFFFFF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
          }}
        >
          Skip Intro →
        </button>
      )}

      {/* Monogram Docking Motion Component */}
      <DockingTransition
        isDocking={isDocking}
        isDark={darkMode}
        onDockComplete={onAnimationComplete}
      />
    </>
  );
}
