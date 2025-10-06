import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import {
    Card,
    CardTitle,
    IncomeItem,
    IncomeDetails,
    IncomeTitle,
    IncomeMeta,
    IncomeAmountContainer,
    IncomeAmount,
    EmptyState,
} from './recurringIncomeStyled';

export const RecurringIncome: React.FC = () => {
    const recurringIncome = useSelector((state: RootState) => state.income.recurringIncome);

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

    //filter active recurring income
    const activeRecurringIncome = recurringIncome.filter(income => income.isActive);

    return (
        <Card>
            <CardTitle>Recurring Income</CardTitle>
            {activeRecurringIncome.length > 0 ? (
                activeRecurringIncome.map((income) => (
                    <IncomeItem key={income.id}>
                        <IncomeDetails>
                            <IncomeTitle>{income.description}</IncomeTitle>
                            <IncomeMeta>
                                {formatFrequency(income.frequency)} • {getNextPaymentText(income.frequency, income.nextPaymentDate)}
                            </IncomeMeta>
                        </IncomeDetails>
                        <IncomeAmountContainer>
                            <IncomeAmount>+{formatCurrency(income.amount)}</IncomeAmount>
                        </IncomeAmountContainer>
                    </IncomeItem>
                ))
            ) : (
                <EmptyState>
                    <IncomeTitle>No recurring income set up</IncomeTitle>
                    <IncomeMeta>Add your regular income sources above</IncomeMeta>
                </EmptyState>
            )}
        </Card>
    );
};