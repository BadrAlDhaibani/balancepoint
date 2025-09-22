import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.background.main};
  border-bottom: 3px solid #f8fafc;
  position: fixed;
  top: 0;
  left: 0; /* Start after sidebar */
  right: 0;
  height: 80px;
  z-index: 50;
`;

export const Logo = styled.h1`
  font-size: ${props => props.theme.fontSizes['3xl']};
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin: 0;
`;

export const AddButton = styled.button`
  background-color: ${props => props.theme.colors.secondary};
  border: none;
  border-radius: ${props => props.theme.borderRadius.full};
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.text.white};
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;