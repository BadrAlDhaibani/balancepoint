import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
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

interface CombinedExpenseActivity {
    id: string;
    description: string;
    amount: number;
    date: string;
    type: 'manual' | 'recurring';
    sortDate: Date;
}

export const RecentExpenseActivity: React.FC = () => {
    const expenseTransactions = useSelector((state: RootState) => state.expense.transactions);
    const recurringExpenses = useSelector((state: RootState) => state.expense.recurringExpenses);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        //reset time for accurate comparison
        today.setHours(0, 0, 0, 0);
        yesterday.setHours(0, 0, 0, 0);
        const compareDate = new Date(date);
        compareDate.setHours(0, 0, 0, 0);

        if (compareDate.getTime() === today.getTime()) {
            return 'Today';
        } 
        else if (compareDate.getTime() === yesterday.getTime()) {
            return 'Yesterday';
        } 
        else {
            return date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
            });
        }
    };

    //combine and sort all expense activity
    const allExpenseActivity: CombinedExpenseActivity[] = [
        //add all manual transactions
        ...expenseTransactions.map(transaction => ({
            id: transaction.id,
            description: transaction.description,
            amount: transaction.amount,
            date: transaction.date,
            type: 'manual' as const,
            sortDate: new Date(transaction.date),
        })),
        //add sample recurring expense entries (from nextPaymentDate)
        ...recurringExpenses
            .filter(recurring => recurring.isActive && recurring.nextPaymentDate)
            .map(recurring => ({
                id: `recurring-${recurring.id}`,
                description: recurring.description,
                amount: recurring.amount,
                date: recurring.nextPaymentDate || new Date().toISOString().split('T')[0],
                type: 'recurring' as const,
                sortDate: new Date(recurring.nextPaymentDate || new Date()),
            }))
    ]
    .sort((a, b) => b.sortDate.getTime() - a.sortDate.getTime())
    .slice(0, 10); // Show last 10 entries

    return (
        <>
            <CardTitle>Recent Expense Activity</CardTitle>
            {allExpenseActivity.length > 0 ? (
                allExpenseActivity.map((activity) => (
                    <ExpenseItem key={activity.id}>
                        <ExpenseDetails>
                            <ExpenseTitle>{activity.description}</ExpenseTitle>
                            <ExpenseMeta>
                                {formatDate(activity.date)} • {activity.type === 'recurring' ? 'Automatic' : 'Manual Entry'}
                            </ExpenseMeta>
                        </ExpenseDetails>
                        <ExpenseAmountContainer>
                            <ExpenseAmount>-{formatCurrency(activity.amount)}</ExpenseAmount>
                            <Badge variant={activity.type === 'recurring' ? 'recurring' : 'manual'}>
                                {activity.type === 'recurring' ? 'AUTO' : 'MANUAL'}
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