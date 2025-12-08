import { createGlobalTheme } from '@vanilla-extract/css';

import { palette } from './Palette';

const withAlpha = (hex: string, alpha: number) =>
  `color-mix(in srgb, ${hex} ${alpha}%, transparent)`;

export const color = createGlobalTheme(':root', {
  common: {
    white: palette.common[100],
    black: palette.common[0],
  },

  primary: {
    surface: palette.coolNeutral[96],
    soft: palette.coolNeutral[70],
    normal: palette.coolNeutral[20],
    strong: palette.coolNeutral[10],
    text: palette.common[100],
  },

  accent: {
    info: palette.lightBlue[50],
    success: palette.mint[50],
    highlight: palette.pink[50],
  },

  light: {
    background: {
      base: palette.coolNeutral[100],
      raised: palette.coolNeutral[99],
    },
    text: {
      primary: palette.coolNeutral[10],
      secondary: palette.coolNeutral[25],
      muted: withAlpha(palette.coolNeutral[22], 70),
      disabled: withAlpha(palette.coolNeutral[25], 24),
      inverse: palette.coolNeutral[99],
    },
    icon: {
      primary: palette.coolNeutral[10],
      secondary: palette.coolNeutral[50],
      disabled: withAlpha(palette.coolNeutral[25], 24),
    },
    border: {
      strong: withAlpha(palette.coolNeutral[50], 48),
      default: withAlpha(palette.coolNeutral[50], 22),
      subtle: withAlpha(palette.coolNeutral[50], 10),
    },
    fill: {
      soft: withAlpha(palette.coolNeutral[50], 8),
      strong: withAlpha(palette.coolNeutral[50], 16),
    },
    overlay: {
      dimmer: withAlpha(palette.coolNeutral[10], 52),
    },
  },

  dark: {
    background: {
      base: palette.coolNeutral[15],
      surface: palette.coolNeutral[21],
      raised: palette.coolNeutral[22],
    },
    text: {
      primary: palette.coolNeutral[99],
      secondary: palette.coolNeutral[80],
      muted: withAlpha(palette.coolNeutral[80], 70),
      disabled: palette.coolNeutral[70],
      inverse: palette.coolNeutral[10],
    },
    icon: {
      primary: palette.coolNeutral[99],
      secondary: palette.coolNeutral[80],
      disabled: palette.coolNeutral[70],
    },
    border: {
      strong: palette.coolNeutral[30],
      default: withAlpha(palette.coolNeutral[50], 28),
      subtle: withAlpha(palette.coolNeutral[50], 14),
    },
    fill: {
      soft: withAlpha(palette.coolNeutral[50], 10),
      strong: withAlpha(palette.coolNeutral[50], 22),
    },
    overlay: {
      dimmer: withAlpha(palette.coolNeutral[0], 60),
    },
  },

  inverse: {
    primary: palette.coolNeutral[20],
    background: palette.coolNeutral[15],
    surface: palette.coolNeutral[21],
    text: palette.coolNeutral[99],
    icon: palette.coolNeutral[80],
  },
} as const);
