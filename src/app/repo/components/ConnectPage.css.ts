import { style } from '@vanilla-extract/css';
import { color } from '@/shared/tokens/color/Semantic.css';

export const page = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

export const container = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  borderRadius: '8px',
});

export const titleSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

export const title = style({
  fontSize: '1.4rem',
  fontWeight: 500,
  marginBottom: '0.75rem',
  color: color.light.text.primary,
});

export const description = style({
  fontSize: '0.9rem',
  fontWeight: 400,
  marginBottom: '1.5rem',
  color: color.light.text.muted,
  textAlign: 'center',
  lineHeight: '1.5',
});

export const input = style({
  width: 300,
  padding: '0.75rem 1rem',
  borderRadius: 8,
  border: `1px solid ${color.light.border.default}`,
  marginBottom: '1rem',
  fontSize: '0.9rem',
  outline: 'none',
  color: color.light.text.primary,
  selectors: {
    '&::-webkit-input-placeholder': {
      color: color.light.text.muted,
      opacity: 1,
    },
  },
});

export const button = style({
  padding: '0.65rem 0.9rem',
  borderRadius: 8,
  border: 'none',
  backgroundColor: color.accent.pr,
  color: color.common.white,
  fontSize: '0.9rem',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  ':hover': {
    backgroundColor: color.hover.pr,
  },
  ':disabled': {
    backgroundColor: color.light.border.strong,
    cursor: 'not-allowed',
  },
});

export const existingRepoInfo = style({
  fontSize: '0.75rem',
  color: color.accent.pr,
  marginBottom: '1rem',
  textAlign: 'center',
});

export const error = style({
  color: color.light.text.secondary,
  marginTop: '1rem',
});

export const result = style({
  marginTop: '1rem',
  width: '100%',
  wordBreak: 'break-word',
  backgroundColor: '#f0f0f0',
  padding: '1rem',
  borderRadius: '12px',
  fontSize: '0.9rem',
});
