import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  SidebarContainer,
  NavMenu,
  NavItem,
} from './sidebarStyled';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
    { id: 'income', label: 'Income', path: '/income' },
    { id: 'expenses', label: 'Expenses', path: '/expenses' },
    { id: 'transactions', label: 'Transactions', path: '/transactions' },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  // Check if current path matches the nav item path
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <SidebarContainer>
      <NavMenu>
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            isActive={isActive(item.path)}
            onClick={() => handleNavClick(item.path)}
          >
            {item.label}
          </NavItem>
        ))}
      </NavMenu>
    </SidebarContainer>
  );
};