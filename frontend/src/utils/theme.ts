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
  },
  breakpoints: {
    mobile: '767px',
    tablet: '1024px',
    desktop: '1025px',
  },
  mediaQueries: {
    mobile: '@media (max-width: 767px)',
    tablet: '@media (min-width: 768px) and (max-width: 1024px)',
    desktop: '@media (min-width: 1025px)',
    tabletAndUp: '@media (min-width: 768px)',
    mobileAndTablet: '@media (max-width: 1024px)',
  },
  icons: {
    status: {
      good: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='%2316a34a'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'/%3E%3C/svg%3E")`,
      warning: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='%23eab308'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z'/%3E%3C/svg%3E")`,
      critical: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='%23dc2626'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z'/%3E%3C/svg%3E")`,
    }
  }

};

export type Theme = typeof theme;

// Styled-components theme declaration
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}