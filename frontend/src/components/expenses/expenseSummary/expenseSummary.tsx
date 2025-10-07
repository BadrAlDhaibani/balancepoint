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
} from './expenseSummaryStyled';

export const ExpenseSummary: React.FC = () => {
    const expenseItems = useSelector((state: RootState) => state.expense.items);

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const thisMonthExpense = expenseItems
        .filter(item => !item.is_recurring)
        .filter(item => {
            const itemDate = new Date(item.date);
            return itemDate.getMonth() === currentMonth && 
                   itemDate.getFullYear() === currentYear;
        })
        .reduce((sum, item) => sum + item.amount, 0);

    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    
    const lastMonthExpense = expenseItems
        .filter(item => !item.is_recurring)
        .filter(item => {
            const itemDate = new Date(item.date);
            return itemDate.getMonth() === lastMonth && 
                   itemDate.getFullYear() === lastMonthYear;
        })
        .reduce((sum, item) => sum + item.amount, 0);

    const monthlyRecurringExpense = expenseItems
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
            <CardTitle>Expense Summary</CardTitle>
            <SummaryStats>
                <Stat>
                    <StatLabel>This Month</StatLabel>
                    <StatValue>{formatCurrency(thisMonthExpense)}</StatValue>
                </Stat>
                <Stat>
                    <StatLabel>Last Month</StatLabel>
                    <StatValue>{formatCurrency(lastMonthExpense)}</StatValue>
                </Stat>
                <Stat>
                    <StatLabel>Monthly Recurring</StatLabel>
                    <StatValue>{formatCurrency(monthlyRecurringExpense)}</StatValue>
                </Stat>
            </SummaryStats>
        </Card>
    );
};