import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { formatDateLabel } from '../../../utils/dateFormatter';
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
                                {formatDateLabel(item.date)} • {item.is_recurring ? 'Automatic' : 'Manual Entry'}
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