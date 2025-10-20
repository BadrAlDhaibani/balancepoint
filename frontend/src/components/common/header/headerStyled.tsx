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
  left: 0;
  right: 0;
  height: 80px;
  z-index: 50;

  ${props => props.theme.mediaQueries.mobile} {
    height: 60px;
    padding: ${props => props.theme.spacing.md};
  }
`;

export const HeaderLeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

export const Logo = styled.h1`
  font-size: ${props => props.theme.fontSizes['3xl']};
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin: 0;

  ${props => props.theme.mediaQueries.mobile} {
    font-size: ${props => props.theme.fontSizes.xl};
  }
`;

export const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.primary};

  ${props => props.theme.mediaQueries.mobile} {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    width: 28px;
    height: 28px;
  }

  &:hover {
    opacity: 0.7;
  }
`;

export const AddButtonContainer = styled.div`
  position: relative;
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
  font-size: ${props => props.theme.fontSizes['3xl']};
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};

  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.text.white};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1);
  }

  svg {
    width: 24px;
    height: 24px;
  }

  ${props => props.theme.mediaQueries.mobile} {
    width: 40px;
    height: 40px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 50px;
  right: 20px;
  background-color: ${props => props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: ${props => props.theme.borderRadius.sm};
  box-shadow: ${props => props.theme.shadows.lg};
  overflow: hidden;
  min-width: 160px;
  z-index: 100;
`;

export const DropdownItem = styled.button`
  width: 100%;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: none;
  border: none;
  text-align: left;
  font-size: ${props => props.theme.fontSizes.base};
  color: ${props => props.theme.colors.text.white};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};

  &:hover {
    background-color: ${props => props.theme.colors.background.card};
    color: ${props => props.theme.colors.primary};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.colors.text.white}};
  }
`;

export const MobileNav = styled.div`
  display: none;

  ${props => props.theme.mediaQueries.mobile} {
    display: block;
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background-color: ${props => props.theme.colors.background.main};
    border-bottom: 3px solid #f8fafc;
    box-shadow: ${props => props.theme.shadows.lg};
    z-index: 40;
  }
`;

export const MobileNavItem = styled.button<{ $isActive: boolean }>`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  background: none;
  border: none;
  text-align: left;
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.$isActive ? 700 : 400};
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  background-color: ${props => props.$isActive ? '#f8fafc' : 'transparent'};

  &:hover {
    background-color: #f8fafc;
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.colors.background.gray};
  }
`;