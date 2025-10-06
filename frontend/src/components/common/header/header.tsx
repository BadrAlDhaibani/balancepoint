import React from 'react';
import { HeaderContainer, Logo, AddButton } from './headerStyled';

interface HeaderProps {
  onAddClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddClick }) => {
  const handleAddClick = () => {
    console.log('Add button clicked!');
    if (onAddClick) {
      onAddClick();
    }
  };

  return (
    <HeaderContainer>
      <Logo>BalancePoint</Logo>
      <AddButton onClick={handleAddClick}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
      </AddButton>
    </HeaderContainer>
  );
};

export default Header;