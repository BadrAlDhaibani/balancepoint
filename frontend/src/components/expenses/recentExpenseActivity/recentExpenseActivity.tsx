import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { formatDateLabel } from '../../../utils/dateFormatter';
import {
    CardTitle,
    ExpenseItem,
    ExpenseDetails,
    ExpenseTitle,
    ExpenseMeta,
    ExpenseAmountContainer,
    ExpenseAmount,
    Badge,
    EmptyState,
} from './recentExpenseActivityStyled';

export const RecentExpenseActivity: React.FC = () => {
    const expenseItems = useSelector((state: RootState) => state.expense.items);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    // Sort by date and show last 10
    const sortedExpenses = [...expenseItems]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10);

    return (
        <>
            <CardTitle>Recent Expense Activity</CardTitle>
            {sortedExpenses.length > 0 ? (
                sortedExpenses.map((item) => (
                    <ExpenseItem key={item.id}>
                        <ExpenseDetails>
                            <ExpenseTitle>{item.description}</ExpenseTitle>
                            <ExpenseMeta>
                                {formatDateLabel(item.date)} • {item.is_recurring ? 'Automatic' : 'Manual Entry'}
                            </ExpenseMeta>
                        </ExpenseDetails>
                        <ExpenseAmountContainer>
                            <ExpenseAmount>-{formatCurrency(item.amount)}</ExpenseAmount>
                            <Badge variant={item.is_recurring ? 'recurring' : 'manual'}>
                                {item.is_recurring ? 'AUTO' : 'MANUAL'}
                            </Badge>
                        </ExpenseAmountContainer>
                    </ExpenseItem>
                ))
            ) : (
                <EmptyState>
                    <ExpenseTitle>No expense activity yet</ExpenseTitle>
                    <ExpenseMeta>Your expense transactions will appear here</ExpenseMeta>
                </EmptyState>
            )}
        </>
    );
};