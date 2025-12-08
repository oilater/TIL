import { style } from '@vanilla-extract/css';
import { color } from '@/shared/tokens/color/Semantic.css';

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.5rem 2rem',
  //   borderBottom: `1px solid ${color.light.border.default}`,
  backgroundColor: color.common.white,
});

export const leftSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});

export const title = style({
  fontSize: '1.25rem',
  fontWeight: 'bold',
  margin: 0,
});

export const repoInfo = style({
  fontSize: '0.875rem',
  color: color.light.text.secondary,
});

export const rightSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});

export const userInfo = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
});

export const avatar = style({
  width: '32px',
  height: '32px',
  borderRadius: '50%',
});

export const username = style({
  fontSize: '0.875rem',
  fontWeight: '500',
  color: color.light.text.primary,
});

export const logoutButton = style({
  padding: '0.5rem 1rem',
  backgroundColor: color.common.black,
  color: color.common.white,
  border: 'none',
  borderRadius: '0.375rem',
  cursor: 'pointer',
  fontSize: '0.8rem',
  fontWeight: '500',
  transition: 'all 0.2s',
  ':hover': {
    backgroundColor: color.light.text.primary,
  },
});
