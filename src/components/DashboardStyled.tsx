import styled from 'styled-components';

export const AppLayout = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background.main};
  font-family: ${props => props.theme.fonts.primary};
`;

export const MainContent = styled.div`
  margin-left: 200px; /* Account for fixed sidebar */
  margin-top: 80px; /* Account for fixed header */
  padding: ${props => props.theme.spacing.xl};
  flex: 1;
  
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: min-content;
  gap: ${props => props.theme.spacing.lg};
  align-items: start;
  
  /* Financial Health - top left */
  > div:nth-child(1) {
    grid-column: 1;
  }
  
  /* Smart Insights - top right */
  > div:nth-child(2) {
    grid-column: 2;
  }
  
  /* Upcoming Events - bottom left */
  > div:nth-child(3) {
    grid-column: 1;
  }
  
  /* Recent Activity - bottom right */
  > div:nth-child(4) {
    grid-column: 2;
  }
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr; /* Simple 2-column on medium screens */
    
    > div:nth-child(1) {
      grid-column: 1;
      grid-row: 1;
    }
    
    > div:nth-child(2) {
      grid-column: 2;
      grid-row: 1;
    }
    
    > div:nth-child(3) {
      grid-column: 1;
      grid-row: 2;
    }
    
    > div:nth-child(4) {
      grid-column: 2;
      grid-row: 2;
    }
  }
  
  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 60px;
    padding: ${props => props.theme.spacing.md};
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.md};
    
    /* Mobile layout: All components stack vertically in optimal order */
    > div:nth-child(1),
    > div:nth-child(2),
    > div:nth-child(3),
    > div:nth-child(4) {
      grid-column: 1;
      grid-row: auto;
    }
  }
`;