import styled from 'styled-components';

export const SidebarContainer = styled.nav`
  width: 200px;
  min-height: calc(100vh - 80px);
  background-color: ${props => props.theme.colors.background.main};
  border-right: 3px solid #f8fafc;
  padding: ${props => props.theme.spacing.lg} 0;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 80px;
  z-index: 100;

  ${props => props.theme.mediaQueries.mobile} {
    display: none;
  }

  ${props => props.theme.mediaQueries.tablet} {
    width: 180px;
  }
`;

export const NavMenu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

export const NavItem = styled.li<{ $isActive: boolean }>`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.md};
  cursor: pointer;
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.$isActive ? 700 : 400};
  transition: all ${props => props.theme.transitions.fast};
  width: 100%; /* Full width */
  color: ${props => props.theme.colors.primary}; /* Always purple */

  background-color: ${props => props.$isActive
    ? '#f8fafc'
    : 'transparent'};

  &:hover {
    background-color: #f8fafc;
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;