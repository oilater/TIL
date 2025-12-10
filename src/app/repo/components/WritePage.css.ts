import { style } from '@vanilla-extract/css';
import { color } from '@/shared/tokens/color/Semantic.css';

export const page = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  minHeight: '100%',
  padding: '2rem',
});

export const container = style({
  width: '100%',
  maxWidth: 600,
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
});

export const titleSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

export const title = style({
  fontSize: '1.6rem',
  fontWeight: 500,
  marginBottom: '1rem',
  color: color.light.text.primary,
});

export const description = style({
  fontSize: '0.875rem',
  color: color.light.text.muted,
  marginBottom: '1rem',
  lineHeight: '1.5',
});

export const input = style({
  width: '100%',
  padding: '0.875rem 1rem',
  borderRadius: 8,
  border: `1px solid ${color.light.border.default}`,
  fontSize: '1rem',
  outline: 'none',
  color: color.light.text.primary,
  backgroundColor: color.light.background.base,
  transition: 'border-color 0.2s',
  selectors: {
    '&::-webkit-input-placeholder': {
      color: color.light.text.muted,
      opacity: 1,
    },
    '&:focus': {
      borderColor: color.accent.merged,
    },
  },
});

export const textarea = style({
  width: '100%',
  padding: '0.875rem 1rem',
  borderRadius: 8,
  border: `1px solid ${color.light.border.default}`,
  fontSize: '0.95rem',
  outline: 'none',
  color: color.light.text.primary,
  backgroundColor: color.light.background.base,
  fontFamily: 'inherit',
  resize: 'vertical',
  minHeight: '300px',
  lineHeight: '1.6',
  transition: 'border-color 0.2s',
  selectors: {
    '&::-webkit-input-placeholder': {
      color: color.light.text.muted,
      opacity: 1,
    },
    '&:focus': {
      borderColor: color.accent.merged,
    },
  },
});

export const button = style({
  padding: '0.75rem 1.5rem',
  borderRadius: 8,
  border: 'none',
  backgroundColor: color.accent.merged,
  color: color.common.white,
  fontSize: '0.95rem',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  alignSelf: 'flex-end',
  ':hover': {
    backgroundColor: color.hover.merged,
  },
  ':disabled': {
    backgroundColor: color.light.border.strong,
    cursor: 'not-allowed',
  },
});

export const successText = style({
  color: color.accent.pr,
  marginTop: '1rem',
});

export const errorText = style({
  color: 'red',
  marginTop: '1rem',
});
