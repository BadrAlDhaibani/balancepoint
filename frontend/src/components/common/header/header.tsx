import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../../../services';
import {
  HeaderContainer,
  Logo,
  AddButtonContainer,
  AddButton,
  DropdownMenu,
  DropdownItem,
  HamburgerButton,
  MobileNav,
  MobileNavItem,
  HeaderLeftSection
} from './headerStyled';

interface HeaderProps {
  onAddClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);

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

  const handleLogout = () => {
    authService.logout();
    setShowDropdown(false);
  };

  const handleHamburgerClick = () => {
    setShowMobileNav(!showMobileNav);
  };

  const handleMobileNavClick = (path: string) => {
    navigate(path);
    setShowMobileNav(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
    { id: 'income', label: 'Income', path: '/income' },
    { id: 'expenses', label: 'Expenses', path: '/expenses' },
  ];

  //close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
      if (mobileNavRef.current && !mobileNavRef.current.contains(event.target as Node)) {
        const target = event.target as HTMLElement;
        if (!target.closest('button[data-hamburger]')) {
          setShowMobileNav(false);
        }
      }
    };

    if (showDropdown || showMobileNav) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown, showMobileNav]);

  return (
    <>
      <HeaderContainer>
        <HeaderLeftSection>
          <HamburgerButton onClick={handleHamburgerClick} data-hamburger>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </HamburgerButton>
          <Logo>BalancePoint</Logo>
        </HeaderLeftSection>
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
              <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
            </DropdownMenu>
          )}
        </AddButtonContainer>
      </HeaderContainer>
      {showMobileNav && (
        <MobileNav ref={mobileNavRef}>
          {navItems.map((item) => (
            <MobileNavItem
              key={item.id}
              $isActive={isActive(item.path)}
              onClick={() => handleMobileNavClick(item.path)}
            >
              {item.label}
            </MobileNavItem>
          ))}
        </MobileNav>
      )}
    </>
  );
};

export default Header;