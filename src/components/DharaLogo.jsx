import React from 'react';

/**
 * Dhara AI — Minimalist D+A Monogram Logo Component
 * 
 * Concept: Seamless fusion of letters 'D' and 'A' in a single geometric mark.
 * High-contrast readability across dark & light themes.
 * 
 * Supports variants: 'primary' | 'horizontal' | 'vertical' | 'icon' | 'app-icon' | 'favicon'
 * Supports themes: 'dark' | 'light' | 'monochrome-dark' | 'monochrome-light'
 */
export default function DharaLogo({
  variant = 'primary',
  theme = 'dark',
  size = 180,
  showTagline = true,
  className = '',
  style = {}
}) {
  const isDark = theme === 'dark' || theme === 'monochrome-dark';
  const isMono = theme === 'monochrome-dark' || theme === 'monochrome-light';

  // Palette Specs — Ensured Maximum Contrast & Legibility
  const colors = {
    bg: isMono
      ? (theme === 'monochrome-dark' ? '#08120D' : '#FFFFFF')
      : (isDark ? '#08120D' : '#F8FAF7'),
    markPrimary: isMono
      ? (theme === 'monochrome-dark' ? '#FFFFFF' : '#08120D')
      : (isDark ? '#F8FAF7' : '#08120D'),
    markAccent: isMono
      ? (theme === 'monochrome-dark' ? '#FFFFFF' : '#08120D')
      : '#69C36D', // Emerald Green Accent
    markGold: isMono
      ? (theme === 'monochrome-dark' ? '#FFFFFF' : '#08120D')
      : '#E8C547', // Gold Accent
    textPrimary: isMono
      ? (theme === 'monochrome-dark' ? '#FFFFFF' : '#08120D')
      : (isDark ? '#F8FAF7' : '#08120D'),
    textAccent: isMono
      ? (theme === 'monochrome-dark' ? '#FFFFFF' : '#08120D')
      : (isDark ? '#69C36D' : '#1A8225'),
    textTagline: isMono
      ? (theme === 'monochrome-dark' ? 'rgba(255, 255, 255, 0.75)' : 'rgba(8, 18, 13, 0.75)')
      : (isDark ? 'rgba(248, 250, 247, 0.82)' : 'rgba(8, 18, 13, 0.75)')
  };

  /**
   * The D+A Monogram Vector Symbol
   * Clean geometric 100x100 ViewBox
   */
  const renderMonogramSymbol = (iconSize = 48) => (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', flexShrink: 0 }}
    >
      {/* Outer D Boundary */}
      <path
        d="M 24 18 H 52 C 70 18 82 32 82 50 C 82 68 70 82 52 82 H 24 Z"
        fill={colors.markPrimary}
      />

      {/* Inner Cutout matching background */}
      <path
        d="M 36 30 L 52 30 C 62 30 70 38 70 50 C 70 62 62 70 52 70 L 36 70 Z"
        fill={colors.bg}
      />

      {/* Integrated A Apex & Crossbar */}
      <path
        d="M 52 32 L 64 68 H 54 L 51 58 H 43 L 40 68 H 30 Z M 47 44 L 45 51 H 49 Z"
        fill={colors.markPrimary}
      />

      {/* Leaf Sprout Accent Dot */}
      {!isMono && (
        <circle cx="47" cy="40" r="3.5" fill={colors.markAccent} />
      )}
    </svg>
  );

  // Favicon
  if (variant === 'favicon') {
    return (
      <div style={{ width: size, height: size, ...style }} className={className}>
        <svg viewBox="0 0 100 100" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="24" fill={colors.bg} />
          <g transform="translate(4, 4) scale(0.92)">
            {renderMonogramSymbol(100)}
          </g>
        </svg>
      </div>
    );
  }

  // App Icon
  if (variant === 'app-icon') {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: `${size * 0.22}px`,
          backgroundColor: colors.bg,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)'}`,
          boxShadow: isDark ? '0 12px 32px rgba(0, 0, 0, 0.4)' : '0 12px 32px rgba(0, 0, 0, 0.06)',
          ...style
        }}
        className={className}
      >
        {renderMonogramSymbol(size * 0.68)}
      </div>
    );
  }

  // Icon Only Mode
  if (variant === 'icon') {
    return (
      <div style={{ width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', ...style }} className={className}>
        {renderMonogramSymbol(size)}
      </div>
    );
  }

  // Vertical Lockup (Used in Intro Splash Screen)
  if (variant === 'vertical') {
    return (
      <div
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: `${size * 0.08}px`,
          ...style
        }}
        className={className}
      >
        {renderMonogramSymbol(size * 0.45)}

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span
              style={{
                fontFamily: "'Sora', 'Space Grotesk', sans-serif",
                fontSize: `${size * 0.22}px`,
                fontWeight: '800',
                letterSpacing: '-0.03em',
                color: colors.textPrimary,
                lineHeight: 1
              }}
            >
              Dhara
            </span>
            <span
              style={{
                fontFamily: "'Sora', 'Manrope', sans-serif",
                fontSize: `${size * 0.18}px`,
                fontWeight: '600',
                letterSpacing: '0.04em',
                color: colors.textAccent,
                lineHeight: 1
              }}
            >
              AI
            </span>
          </div>

          {showTagline && (
            <span
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: `${Math.max(11, size * 0.072)}px`,
                fontWeight: '700',
                letterSpacing: '0.14em',
                color: colors.textTagline,
                textTransform: 'uppercase',
                marginTop: '10px'
              }}
            >
              Where Earth Meets Intelligence.
            </span>
          )}
        </div>
      </div>
    );
  }

  // Primary & Horizontal Lockup (Default)
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: `${size * 0.12}px`,
        ...style
      }}
      className={className}
    >
      {renderMonogramSymbol(size * 0.32)}

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          <span
            style={{
              fontFamily: "'Sora', 'Space Grotesk', sans-serif",
              fontSize: `${size * 0.22}px`,
              fontWeight: '800',
              letterSpacing: '-0.03em',
              color: colors.textPrimary,
              lineHeight: 1.05
            }}
          >
            Dhara
          </span>
          <span
            style={{
              fontFamily: "'Sora', 'Manrope', sans-serif",
              fontSize: `${size * 0.18}px`,
              fontWeight: '600',
              letterSpacing: '0.04em',
              color: colors.textAccent,
              lineHeight: 1.05
            }}
          >
            AI
          </span>
        </div>

        {showTagline && (
          <span
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: `${Math.max(10, size * 0.062)}px`,
              fontWeight: '700',
              letterSpacing: '0.14em',
              color: colors.textTagline,
              textTransform: 'uppercase',
              marginTop: '4px'
            }}
          >
            Where Earth Meets Intelligence.
          </span>
        )}
      </div>
    </div>
  );
}
