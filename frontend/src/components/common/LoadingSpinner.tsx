import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 4px solid ${({ theme }) => theme.colors.background.gray};
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  animation: ${spin} 0.8s linear infinite;
`;

export const LoadingSpinner: React.FC = () => {
  return <SpinnerContainer />;
};
