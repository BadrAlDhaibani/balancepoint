import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import {
    Card,
    CardTitle,
    ExpenseItem,
    ExpenseDetails,
    ExpenseTitle,
    ExpenseMeta,
    ExpenseAmountContainer,
    ExpenseAmount,
    EmptyState,
} from './recurringExpenseStyled';

export const RecurringExpense: React.FC = () => {
    const expenseItems = useSelector((state: RootState) => state.expense.items);
    
    //filter for recurring expenses only
    const recurringExpenseItems = expenseItems.filter(item => item.is_recurring);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const formatFrequency = (frequency?: string) => {
        switch (frequency) {
            case 'weekly':
                return 'Every week';
            case 'bi-weekly':
                return 'Every 2 weeks';
            case 'monthly':
                return 'Every month';
            case 'quarterly':
                return 'Every quarter';
            default:
                return 'Recurring';
        }
    };

    const calculateNextPaymentDate = (startDate: string, frequency?: string) => {
        const today = new Date();
        let nextDate = new Date(startDate);

        if (!frequency) return 'N/A';

        //keep adding intervals until we're in the future
        while (nextDate < today) {
            switch (frequency) {
                case 'weekly':
                    nextDate.setDate(nextDate.getDate() + 7);
                    break;
                case 'bi-weekly':
                    nextDate.setDate(nextDate.getDate() + 14);
                    break;
                case 'monthly':
                    nextDate.setMonth(nextDate.getMonth() + 1);
                    break;
                case 'quarterly':
                    nextDate.setMonth(nextDate.getMonth() + 3);
                    break;
            }
        }

        return nextDate.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        });
    };

    return (
        <Card>
            <CardTitle>Recurring Expenses</CardTitle>
            {recurringExpenseItems.length > 0 ? (
                recurringExpenseItems.map((expense) => (
                    <ExpenseItem key={expense.id}>
                        <ExpenseDetails>
                            <ExpenseTitle>{expense.description}</ExpenseTitle>
                            <ExpenseMeta>
                                {formatFrequency(expense.frequency)} • Next: {calculateNextPaymentDate(expense.date, expense.frequency)}
                            </ExpenseMeta>
                        </ExpenseDetails>
                        <ExpenseAmountContainer>
                            <ExpenseAmount>-{formatCurrency(expense.amount)}</ExpenseAmount>
                        </ExpenseAmountContainer>
                    </ExpenseItem>
                ))
            ) : (
                <EmptyState>
                    <ExpenseTitle>No recurring expenses set up</ExpenseTitle>
                    <ExpenseMeta>Add your regular expense sources above</ExpenseMeta>
                </EmptyState>
            )}
        </Card>
    );
};