import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import {
    Card,
    CardTitle,
    SummaryStats,
    Stat,
    StatValue,
    StatLabel,
} from './incomeSummaryStyled';

export const IncomeSummary: React.FC = () => {
    const incomeData = useSelector((state: RootState) => state.income);

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const thisMonthIncome = incomeData.transactions
        .filter(transaction => {
            const transactionDate = new Date(transaction.date);
            return transactionDate.getMonth() === currentMonth && 
                   transactionDate.getFullYear() === currentYear;
        })
        .reduce((sum, transaction) => sum + transaction.amount, 0);

    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    
    const lastMonthIncome = incomeData.transactions
        .filter(transaction => {
            const transactionDate = new Date(transaction.date);
            return transactionDate.getMonth() === lastMonth && 
                   transactionDate.getFullYear() === lastMonthYear;
        })
        .reduce((sum, transaction) => sum + transaction.amount, 0);

    const monthlyRecurringIncome = incomeData.recurringIncome
        .filter(income => income.frequency === 'monthly' && income.isActive)
        .reduce((sum, income) => sum + income.amount, 0);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    return (
        <Card>
            <CardTitle>Income Summary</CardTitle>
            <SummaryStats>
                <Stat>
                    <StatLabel>This Month</StatLabel>
                    <StatValue>{formatCurrency(thisMonthIncome)}</StatValue>
                </Stat>
                <Stat>
                    <StatLabel>Last Month</StatLabel>
                    <StatValue>{formatCurrency(lastMonthIncome)}</StatValue>
                </Stat>
                <Stat>
                    <StatLabel>Monthly Recurring</StatLabel>
                    <StatValue>{formatCurrency(monthlyRecurringIncome)}</StatValue>
                </Stat>
            </SummaryStats>
        </Card>
    );
};