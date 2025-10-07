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
    const incomeItems = useSelector((state: RootState) => state.income.items);

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const thisMonthIncome = incomeItems
        .filter(item => !item.is_recurring)
        .filter(item => {
            const itemDate = new Date(item.date);
            return itemDate.getMonth() === currentMonth && 
                   itemDate.getFullYear() === currentYear;
        })
        .reduce((sum, item) => sum + item.amount, 0);

    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    
    const lastMonthIncome = incomeItems
        .filter(item => !item.is_recurring)
        .filter(item => {
            const itemDate = new Date(item.date);
            return itemDate.getMonth() === lastMonth && 
                   itemDate.getFullYear() === lastMonthYear;
        })
        .reduce((sum, item) => sum + item.amount, 0);

    const monthlyRecurringIncome = incomeItems
        .filter(item => item.is_recurring && item.frequency === 'monthly')
        .reduce((sum, item) => sum + item.amount, 0);

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