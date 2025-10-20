import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { fetchAllIncome } from '../../store/slices/incomeSlice';
import { fetchAllExpenses } from '../../store/slices/expenseSlice';
import { MainContent } from './DashboardStyled';
import { FinancialHealth } from './financialHealth';
import { SmartInsights } from './smartInsights';
import { UpcomingEvents } from './upcomingEvents';
import { RecentActivity } from './recentActivity';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Fetch both income and expense data on dashboard mount
    dispatch(fetchAllIncome());
    dispatch(fetchAllExpenses());
  }, [dispatch]);

  const handleViewAllTransactions = () => {
    console.log('View all transactions clicked');
  };

  return (
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
  );
};

export default Dashboard;