/**
 * Dhara AI — Cinematic Intro Sequence Configuration & Timeline Milestones
 * Target Total Duration: 5.8s - 6.0s
 */

export const SCENE_TIMES = {
  BIRTH: { start: 0.0, end: 0.6, duration: 0.6 },
  JOURNEY: { start: 0.6, end: 1.3, duration: 0.7 },
  AWAKENING: { start: 1.3, end: 2.3, duration: 1.0 },
  GROWTH: { start: 2.3, end: 3.9, duration: 1.6 },
  INTELLIGENCE: { start: 3.9, end: 5.0, duration: 1.1 },
  IDENTITY: { start: 5.0, end: 6.0, duration: 1.0 }
};

export const TOTAL_DURATION = 6.0;

export const INTRO_PALETTE = {
  BACKGROUND: '#08120D',
  SOIL_DARK: '#0D1610',
  SOIL_ACCENT: '#1B2C20',
  GREEN_ACCENT: '#69C36D',
  GOLD_SUNLIGHT: '#E8C547',
  CYAN_NODE: '#67D6FF',
  WHITE: '#F8FAF7'
};

export const INTRO_CONFIG = {
  PARTICLES: {
    COUNT_DESKTOP: 2500,
    COUNT_MOBILE: 1000,
    SIZE: 0.08
  },
  COLORS: {
    BACKGROUND: INTRO_PALETTE.BACKGROUND,
    ACCENT_GREEN: INTRO_PALETTE.GREEN_ACCENT,
    WHITE: INTRO_PALETTE.WHITE
  },
  CAMERA: {
    INITIAL_POSITION: [0, 2.8, 5.0],
    FOV: 45,
    NEAR: 0.1,
    FAR: 1000
  }
};
