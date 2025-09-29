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
    const expenseData = useSelector((state: RootState) => state.expense);

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const thisMonthExpense = expenseData.transactions
        .filter(transaction => {
            const transactionDate = new Date(transaction.date);
            return transactionDate.getMonth() === currentMonth && 
                   transactionDate.getFullYear() === currentYear;
        })
        .reduce((sum, transaction) => sum + transaction.amount, 0);

    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    
    const lastMonthExpense = expenseData.transactions
        .filter(transaction => {
            const transactionDate = new Date(transaction.date);
            return transactionDate.getMonth() === lastMonth && 
                   transactionDate.getFullYear() === lastMonthYear;
        })
        .reduce((sum, transaction) => sum + transaction.amount, 0);

    const monthlyRecurringExpense = expenseData.recurringExpenses
        .filter(expense => expense.frequency === 'monthly' && expense.isActive)
        .reduce((sum, expense) => sum + expense.amount, 0);

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