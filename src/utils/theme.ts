export const theme = {
  colors: {
    primary: '#7c86ff',
    secondary: '#c7d2fe',
    background: {
      main: '#ffffff',
      card: '#f8fafc',
      gray: '#e2e8f0',
    },
    text: {
      primary: '#000000',
      secondary: '#64748b',
      white: '#ffffff',
    },
    status: {
      good: '#16a34a',
      warning: '#eab308',
      critical: '#dc2626',
      income: '#16a34a',
      expense: '#dc2626',
    },
    accent: {
      green: '#b9f8cf',
      red: '#ffc9c9',
      yellow: '#fff085',
    }
  },
  fonts: {
    primary: "'Inria Sans', sans-serif",
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '20px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '36px',
    '4xl': '40px',
  },
  spacing: {
    xs: '5px',
    sm: '10px',
    md: '15px',
    lg: '20px',
    xl: '30px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.1)',
    md: '0 2px 4px rgba(0, 0, 0, 0.1)',
    lg: '0 4px 8px rgba(0, 0, 0, 0.15)',
  },
  transitions: {
    fast: '0.15s ease',
    normal: '0.2s ease',
    slow: '0.3s ease',
  }
};

export type Theme = typeof theme;

// Styled-components theme declaration
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}