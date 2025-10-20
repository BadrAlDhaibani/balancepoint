import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchAllIncome } from '../../store/slices/incomeSlice';
import { fetchAllExpenses } from '../../store/slices/expenseSlice';
import { fetchDashboardData } from '../../store/slices/dashboardSlice';
import { MainContent } from './DashboardStyled';
import { FinancialHealth } from './financialHealth';
import { SmartInsights } from './smartInsights';
import { UpcomingEvents } from './upcomingEvents';
import { RecentActivity } from './recentActivity';
import { PageLoader } from '../common/PageLoader';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const dashboardLoading = useSelector((state: RootState) => state.dashboard.loading);
  const incomeLoading = useSelector((state: RootState) => state.income.loading);
  const expenseLoading = useSelector((state: RootState) => state.expense.loading);

  const isLoading = dashboardLoading || incomeLoading || expenseLoading;

  useEffect(() => {
    // Fetch dashboard data, income and expense data on dashboard mount
    dispatch(fetchDashboardData());
    dispatch(fetchAllIncome());
    dispatch(fetchAllExpenses());
  }, [dispatch]);

  const handleViewAllTransactions = () => {
    console.log('View all transactions clicked');
  };

  if (isLoading) {
    return <PageLoader />;
  }

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