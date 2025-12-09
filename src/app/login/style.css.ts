import { style } from '@vanilla-extract/css';
import { color } from '@/shared/tokens/color/Semantic.css';

export const page = style({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color.light.background.base,
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 20,
});

export const title = style({
  fontSize: 84,
  fontWeight: 700,
  color: color.light.text.disabled,
  transition: 'color 0.2s ease-in-out',
  selectors: {
    [`${content}:hover &`]: {
      color: color.accent.merged,
    },
  },
});
