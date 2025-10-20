import styled from 'styled-components';

export const AppLayout = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background.main};
  font-family: ${props => props.theme.fonts.primary};
`;

export const MainContent = styled.div`
  margin-left: 200px;
  margin-top: 80px;
  padding: ${props => props.theme.spacing.xl};
  flex: 1;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: min-content;
  gap: ${props => props.theme.spacing.lg};
  align-items: start;

  > div:nth-child(1) {
    grid-column: 1;
  }

  > div:nth-child(2) {
    grid-column: 2;
  }

  > div:nth-child(3) {
    grid-column: 1;
  }

  > div:nth-child(4) {
    grid-column: 2;
  }

  ${props => props.theme.mediaQueries.tablet} {
    margin-left: 180px;
    padding: ${props => props.theme.spacing.lg};
    grid-template-columns: 1fr 1fr;
    gap: ${props => props.theme.spacing.md};
  }

  ${props => props.theme.mediaQueries.mobile} {
    margin-left: 0;
    margin-top: 60px;
    padding: ${props => props.theme.spacing.md};
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.md};

    > div:nth-child(1),
    > div:nth-child(2),
    > div:nth-child(3),
    > div:nth-child(4) {
      grid-column: 1;
      grid-row: auto;
    }
  }
`;