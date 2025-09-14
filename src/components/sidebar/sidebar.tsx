import React from 'react';
import {
  SidebarContainer,
  NavMenu,
  NavItem,
} from './sidebarStyled';

interface SidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab = 'Dashboard',
  onTabChange 
}) => {
  const navItems = [
    { id: 'Dashboard', label: 'Dashboard' },
    { id: 'Income', label: 'Income' },
    { id: 'Expenses', label: 'Expenses' },
    { id: 'Transactions', label: 'Transactions' },
  ];

  const handleTabClick = (tabId: string) => {
    console.log(`Clicked on ${tabId}`);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <SidebarContainer>
      <NavMenu>
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            isActive={activeTab === item.id}
            onClick={() => handleTabClick(item.id)}
          >
            {item.label}
          </NavItem>
        ))}
      </NavMenu>
    </SidebarContainer>
  );
};

export default Sidebar;