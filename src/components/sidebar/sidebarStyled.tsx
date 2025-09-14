import styled from 'styled-components';

export const SidebarContainer = styled.nav`
  width: 200px;
  min-height: calc(100vh - 80px); /* Full height minus header */
  background-color: ${props => props.theme.colors.background.main};
  border-right: 3px solid #f8fafc;
  padding: ${props => props.theme.spacing.lg} 0; /* Remove horizontal padding */
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 80px; /* Start below header */
  z-index: 100;
`;

export const NavMenu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

export const NavItem = styled.li<{ isActive: boolean }>`
    padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.lg};
    cursor: pointer;
    font-size: ${props => props.theme.fontSizes.lg};
    font-weight: ${props => props.isActive ? 600 : 500};
    transition: all ${props => props.theme.transitions.fast};
    width: 100%; /* Full width */
    color: ${props => props.theme.colors.primary}; /* Always purple */
    
    background-color: ${props => props.isActive 
        ? '#f8fafc' 
        : 'transparent'};

    &:hover {
        background-color: #f8fafc;
    }
`;