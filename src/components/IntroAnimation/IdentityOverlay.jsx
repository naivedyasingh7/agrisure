import React from 'react';
import { INTRO_PALETTE } from './constants';

/**
 * Identity Typography Overlay Component — Reveals at 5.3s
 * Displays Dhara (Bold), AI (Green Accent), and Tagline with soft upward fade.
 */
export default function IdentityOverlay({ currentTime = 0 }) {
  // Reveal progress starting at 5.3s
  const revealProgress = Math.min(1, Math.max(0, (currentTime - 5.3) / 0.5));
  const easedReveal = 1 - Math.pow(1 - revealProgress, 2);

  if (currentTime < 5.2) return null;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '22%',
        left: '50%',
        transform: `translate(-50%, ${15 * (1 - easedReveal)}px)`,
        opacity: easedReveal,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        pointerEvents: 'none',
        zIndex: 5,
        transition: 'none'
      }}
    >
      {/* Brand Title: Dhara (Bold) + AI (Green Accent) */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <span
          style={{
            fontFamily: "'Sora', 'Space Grotesk', sans-serif",
            fontSize: 'clamp(36px, 4vw, 54px)',
            fontWeight: '800',
            letterSpacing: '-0.03em',
            color: INTRO_PALETTE.WHITE,
            lineHeight: 1
          }}
        >
          Dhara
        </span>
        <span
          style={{
            fontFamily: "'Sora', 'Manrope', sans-serif",
            fontSize: 'clamp(30px, 3.5vw, 46px)',
            fontWeight: '600',
            letterSpacing: '0.04em',
            color: INTRO_PALETTE.GREEN_ACCENT,
            lineHeight: 1
          }}
        >
          AI
        </span>
      </div>

      {/* Tagline */}
      <span
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: 'clamp(11px, 1.2vw, 15px)',
          fontWeight: '600',
          letterSpacing: '0.14em',
          color: 'rgba(248, 250, 247, 0.75)',
          textTransform: 'uppercase',
          marginTop: '12px'
        }}
      >
        Where Earth Meets Intelligence.
      </span>
    </div>
  );
}
