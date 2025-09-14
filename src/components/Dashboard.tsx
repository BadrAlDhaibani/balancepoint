import React, { useState } from 'react';
import { AppLayout, MainContent } from './DashboardStyled';

// Import all our components
import { Sidebar } from './sidebar';
import { Header } from './header';
import { FinancialHealth } from './financialHealth';
import { SmartInsights } from './smartInsights';
import { UpcomingEvents } from './upcomingEvents';
import { RecentActivity } from './recentActivity';

interface DashboardProps {
  onNavigateToTransactions?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  onNavigateToTransactions,
}) => {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const handleAddClick = () => {
    console.log('Global add button clicked - could show modal with options');
  };

  const handleViewAllTransactions = () => {
    console.log('View all transactions clicked');
    if (onNavigateToTransactions) {
      onNavigateToTransactions();
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    console.log(`Switched to ${tab} tab`);
  };

  return (
    <AppLayout>
      <Header onAddClick={handleAddClick} />
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      
      <MainContent>
        {/* Row 1: Financial Health Overview */}
        <FinancialHealth />
        
        {/* Row 1: Smart Insights */}
        <SmartInsights maxInsights={4} />
        
        {/* Row 2: Upcoming Financial Events */}
        <UpcomingEvents 
          maxEvents={4}
          title="Upcoming Financial Events"
        />
        
        {/* Row 2: Recent Activity */}
        <RecentActivity 
          maxTransactions={5}
          title="Recent Activity"
          showViewAll={true}
          onViewAll={handleViewAllTransactions}
        />
      </MainContent>
    </AppLayout>
  );
};

export default Dashboard;