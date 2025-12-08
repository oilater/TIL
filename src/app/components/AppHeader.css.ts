import { style } from '@vanilla-extract/css';

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 2rem',
  borderBottom: '1px solid #e5e7eb',
  backgroundColor: '#fff',
});

export const leftSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});

export const title = style({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  margin: 0,
});

export const repoInfo = style({
  fontSize: '0.875rem',
  color: '#6b7280',
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
});

export const logoutButton = style({
  padding: '0.5rem 1rem',
  backgroundColor: '#ef4444',
  color: '#fff',
  border: 'none',
  borderRadius: '0.375rem',
  cursor: 'pointer',
  fontSize: '0.875rem',
  fontWeight: '500',
  transition: 'background-color 0.2s',
  ':hover': {
    backgroundColor: '#dc2626',
  },
});
