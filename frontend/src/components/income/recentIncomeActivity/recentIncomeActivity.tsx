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

interface CombinedIncomeActivity {
    id: string;
    description: string;
    amount: number;
    date: string;
    type: 'manual' | 'recurring';
    sortDate: Date;
}

export const RecentIncomeActivity: React.FC = () => {
    const incomeTransactions = useSelector((state: RootState) => state.income.transactions);
    const recurringIncome = useSelector((state: RootState) => state.income.recurringIncome);

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

    //combine and sort all income activity
    const allIncomeActivity: CombinedIncomeActivity[] = [
        //add all manual transactions
        ...incomeTransactions.map(transaction => ({
            id: transaction.id,
            description: transaction.description,
            amount: transaction.amount,
            date: transaction.date,
            type: 'manual' as const,
            sortDate: new Date(transaction.date),
        })),
        //add sample recurring income entries (from nextPaymentDate)
        ...recurringIncome
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
            <CardTitle>Recent Income Activity</CardTitle>
            {allIncomeActivity.length > 0 ? (
                allIncomeActivity.map((activity) => (
                    <IncomeItem key={activity.id}>
                        <IncomeDetails>
                            <IncomeTitle>{activity.description}</IncomeTitle>
                            <IncomeMeta>
                                {formatDate(activity.date)} • {activity.type === 'recurring' ? 'Automatic' : 'Manual Entry'}
                            </IncomeMeta>
                        </IncomeDetails>
                        <IncomeAmountContainer>
                            <IncomeAmount>+{formatCurrency(activity.amount)}</IncomeAmount>
                            <Badge variant={activity.type === 'recurring' ? 'recurring' : 'manual'}>
                                {activity.type === 'recurring' ? 'AUTO' : 'MANUAL'}
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