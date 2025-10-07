import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderContainer, Logo, AddButtonContainer, AddButton, DropdownMenu, DropdownItem } from './headerStyled';

interface HeaderProps {
  onAddClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddClick }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleAddClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleAddIncome = () => {
    navigate('/income');
    setShowDropdown(false);
    setTimeout(() => {
      document.getElementById('quick-add')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleAddExpense = () => {
    navigate('/expenses');
    setShowDropdown(false);
    setTimeout(() => {
      document.getElementById('quick-add')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  //close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <HeaderContainer>
      <Logo>BalancePoint</Logo>
      <AddButtonContainer ref={dropdownRef}>
        <AddButton onClick={handleAddClick}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </AddButton>
        {showDropdown && (
          <DropdownMenu>
            <DropdownItem onClick={handleAddIncome}>Add Income</DropdownItem>
            <DropdownItem onClick={handleAddExpense}>Add Expense</DropdownItem>
          </DropdownMenu>
        )}
      </AddButtonContainer>
    </HeaderContainer>
  );
};

export default Header;