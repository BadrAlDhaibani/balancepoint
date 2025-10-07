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
    const incomeItems = useSelector((state: RootState) => state.income.items);
    
    //filter for recurring income only
    const recurringIncomeItems = incomeItems.filter(item => item.is_recurring);

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
            <CardTitle>Recurring Income</CardTitle>
            {recurringIncomeItems.length > 0 ? (
                recurringIncomeItems.map((income) => (
                    <IncomeItem key={income.id}>
                        <IncomeDetails>
                            <IncomeTitle>{income.description}</IncomeTitle>
                            <IncomeMeta>
                                {formatFrequency(income.frequency)} • Next: {calculateNextPaymentDate(income.date, income.frequency)}
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