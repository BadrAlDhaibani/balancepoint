import React from 'react';
import styled from 'styled-components';
import { LoadingSpinner } from './LoadingSpinner';

const LoaderContainer = styled.div`
  position: fixed;
  top: 80px; /* Start below header */
  left: 200px; /* Start after sidebar */
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background.main};

  @media (max-width: 768px) {
    left: 0; /* No sidebar on mobile */
    top: 60px; /* Smaller header on mobile */
  }
`;

export const PageLoader: React.FC = () => {
  return (
    <LoaderContainer>
      <LoadingSpinner />
    </LoaderContainer>
  );
};
