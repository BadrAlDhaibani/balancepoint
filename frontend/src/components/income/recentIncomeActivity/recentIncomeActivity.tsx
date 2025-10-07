import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import {
    CardTitle,
    IncomeItem,
    IncomeDetails,
    IncomeTitle,
    IncomeMeta,
    IncomeAmountContainer,
    IncomeAmount,
    Badge,
    EmptyState,
} from './recentIncomeActivityStyled';

export const RecentIncomeActivity: React.FC = () => {
    const incomeItems = useSelector((state: RootState) => state.income.items);

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

    // Sort by date and show last 10
    const sortedIncome = [...incomeItems]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10);

    return (
        <>
            <CardTitle>Recent Income Activity</CardTitle>
            {sortedIncome.length > 0 ? (
                sortedIncome.map((item) => (
                    <IncomeItem key={item.id}>
                        <IncomeDetails>
                            <IncomeTitle>{item.description}</IncomeTitle>
                            <IncomeMeta>
                                {formatDate(item.date)} • {item.is_recurring ? 'Automatic' : 'Manual Entry'}
                            </IncomeMeta>
                        </IncomeDetails>
                        <IncomeAmountContainer>
                            <IncomeAmount>+{formatCurrency(item.amount)}</IncomeAmount>
                            <Badge variant={item.is_recurring ? 'recurring' : 'manual'}>
                                {item.is_recurring ? 'AUTO' : 'MANUAL'}
                            </Badge>
                        </IncomeAmountContainer>
                    </IncomeItem>
                ))
            ) : (
                <EmptyState>
                    <IncomeTitle>No income activity yet</IncomeTitle>
                    <IncomeMeta>Your income transactions will appear here</IncomeMeta>
                </EmptyState>
            )}
        </>
    );
};