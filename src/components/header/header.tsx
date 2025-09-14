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
      <AddButton onClick={handleAddClick}>+</AddButton>
    </HeaderContainer>
  );
};

export default Header;