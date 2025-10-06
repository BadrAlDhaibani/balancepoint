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
    const recurringExpenses = useSelector((state: RootState) => state.expense.recurringExpenses);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const formatFrequency = (frequency: string) => {
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
                return frequency;
        }
    };

    const getNextPaymentText = (frequency: string, nextDate?: string) => {
        if (nextDate) {
            const date = new Date(nextDate);
            return `Next: ${date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
            })}`;
        }
        
        //calculate next payment based on frequency
        const today = new Date();
        let nextPayment = new Date(today);
        
        switch (frequency) {
            case 'weekly':
                nextPayment.setDate(today.getDate() + 7);
                break;
            case 'bi-weekly':
                nextPayment.setDate(today.getDate() + 14);
                break;
            case 'monthly':
                nextPayment.setMonth(today.getMonth() + 1);
                break;
            case 'quarterly':
                nextPayment.setMonth(today.getMonth() + 3);
                break;
        }
        
        return `Next: ${nextPayment.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        })}`;
    };

    //filter active recurring expenses
    const activeRecurringExpenses = recurringExpenses.filter(expense => expense.isActive);

    return (
        <Card>
            <CardTitle>Recurring Expenses</CardTitle>
            {activeRecurringExpenses.length > 0 ? (
                activeRecurringExpenses.map((expense) => (
                    <ExpenseItem key={expense.id}>
                        <ExpenseDetails>
                            <ExpenseTitle>{expense.description}</ExpenseTitle>
                            <ExpenseMeta>
                                {formatFrequency(expense.frequency)} • {getNextPaymentText(expense.frequency, expense.nextPaymentDate)}
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