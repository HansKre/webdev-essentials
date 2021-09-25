import { css } from 'styled-components';

const mainTheme = {
  typography: {
    h1: '28px',
    h2: '21px',
    icon: '3rem',
  },
  primaryColor: '#0275b2',
  successColor: 'mediumseagreen',
  infoColor: '#0275b2',
  errorColor: 'darkred',
  backgroundColor: 'rgba(243, 234, 234, 1)',
};

export enum Role {
  success,
  info,
  error,
}

export function roleColor(role: keyof typeof Role) {
  switch (role) {
    case 'success':
      return mainTheme.successColor;
    case 'info':
      return mainTheme.infoColor;
    case 'error':
      return mainTheme.errorColor;
  }
}

export function setRoleColor(props: { role: keyof typeof Role; theme: any }) {
  console.log(props);
  if (props.role === 'success') {
    return css`
      color: ${props.theme.successColor};
    `;
  } else if (props.role === 'info') {
    return css`
      color: ${props.theme.infoColor};
    `;
  } else if (props.role === 'error') {
    return css`
      color: ${props.theme.errorColor};
    `;
  }
}

export default mainTheme;
