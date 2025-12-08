import { style } from '@vanilla-extract/css';
import { color } from '@/shared/tokens/color/Semantic.css';

export const githubButton = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 260,
  height: 48,
  padding: '0 16px',
  borderRadius: 10,
  textDecoration: 'none',
  backgroundColor: color.primary.normal,
  color: color.common.white,
  fontSize: 15,
  fontWeight: 500,
  transition: 'background-color 0.2s ease-out',
  willChange: 'background-color',
  selectors: {
    '&:hover': {
      backgroundColor: color.primary.strong,
    },
  },
});

export const textStack = style({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
});

export const iconWrapper = style({
  position: 'absolute',
  left: 16,
  display: 'grid',
  placeItems: 'center',
  height: '100%',
});
