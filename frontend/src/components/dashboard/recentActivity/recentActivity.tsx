import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { formatDateLabel } from '../../../utils/dateFormatter';
import {
    Card,
    SectionTitle,
    ActivityList,
    ActivityItem,
    ActivityDetails,
    ActivityTitle,
    ActivityMeta,
    ActivityAmount,
    ActivityType,
    EmptyState,
} from './recentActivityStyled';

interface RecentActivityProps {
    maxTransactions?: number;
    title?: string;
    showViewAll?: boolean;
    onViewAll?: () => void;
}

interface CombinedTransaction {
    id: string;
    description: string;
    amount: number;
    date: string;
    type: 'income' | 'expense';
    is_recurring: boolean;
}

const RecentActivity: React.FC<RecentActivityProps> = ({
    maxTransactions = 5,
    title = "Recent Activity",
    showViewAll = false,
    onViewAll
}) => {
    const incomeItems = useSelector((state: RootState) => state.income.items);
    const expenseItems = useSelector((state: RootState) => state.expense.items);

    //combine income and expenses
    const allTransactions: CombinedTransaction[] = [
        ...incomeItems.map(item => ({
            id: item.id,
            description: item.description,
            amount: item.amount,
            date: item.date,
            type: 'income' as const,
            is_recurring: item.is_recurring
        })),
        ...expenseItems.map(item => ({
            id: item.id,
            description: item.description,
            amount: item.amount,
            date: item.date,
            type: 'expense' as const,
            is_recurring: item.is_recurring
        }))
    ];

    //sort by date and get most recent
    const sortedTransactions = allTransactions
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, maxTransactions);

    const formatAmount = (amount: number, type: 'income' | 'expense') => {
        const prefix = type === 'income' ? '+' : '-';
        return `${prefix}$${Math.abs(amount).toFixed(2)}`;
    };

    const getTransactionTypeLabel = (is_recurring: boolean) => {
        return is_recurring ? 'Auto' : 'Manual';
    };

   return (
    <Card>
        <SectionTitle>
            {title}
            {showViewAll && sortedTransactions.length > 0 && (
                <button onClick={onViewAll}>View All</button>
            )}
        </SectionTitle>
    
        <ActivityList>
            {sortedTransactions.length > 0 ? (
                sortedTransactions.map((transaction) => (
                    <ActivityItem key={transaction.id}>
                        <ActivityDetails>
                            <ActivityTitle>{transaction.description}</ActivityTitle>
                            <ActivityMeta>
                                {formatDateLabel(transaction.date)} • {getTransactionTypeLabel(transaction.is_recurring)}
                                <ActivityType $type={transaction.type} $isRecurring={transaction.is_recurring}>
                                    {getTransactionTypeLabel(transaction.is_recurring)}
                                </ActivityType>
                            </ActivityMeta>
                        </ActivityDetails>
                        <ActivityAmount $type={transaction.type}>
                            {formatAmount(transaction.amount, transaction.type)}
                        </ActivityAmount>
                    </ActivityItem>
                ))
            ) : (
                <EmptyState>
                    <ActivityTitle>No recent transactions</ActivityTitle>
                    <ActivityMeta>Your transactions will appear here</ActivityMeta>
                </EmptyState>
            )}
        </ActivityList>
    </Card>
  );
};

export default RecentActivity;