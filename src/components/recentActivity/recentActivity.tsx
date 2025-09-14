import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Transaction } from '../../store/slices/transactionSlice';
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

const RecentActivity: React.FC<RecentActivityProps> = ({
    maxTransactions = 5,
    title = "Recent Activity",
    showViewAll = false,
    onViewAll
}) => {
    const transactions = useSelector((state: RootState) => state.transactions.transactions);

    const displayedTransactions = transactions.slice(0, maxTransactions);

    const formatAmount = (amount: number, type: 'income' | 'expense') => {
        const prefix = type === 'income' ? '+' : '-';
        return `${prefix}$${Math.abs(amount).toFixed(2)}`;
    };

    const getTransactionTypeLabel = (isRecurring: boolean) => {
        return isRecurring ? 'Auto' : 'Manual';
    };

   return (
    <Card>
        <SectionTitle>
            {title}
            {showViewAll && displayedTransactions.length > 0 && (
                <button onClick={onViewAll}>View All</button>
            )}
        </SectionTitle>
    
        <ActivityList>
            {displayedTransactions.length > 0 ? (
                displayedTransactions.map((transaction: Transaction) => (
                    <ActivityItem key={transaction.id}>
                        <ActivityDetails>
                            <ActivityTitle>{transaction.description}</ActivityTitle>
                            <ActivityMeta>
                                {transaction.date} • {getTransactionTypeLabel(transaction.isRecurring)}
                                <ActivityType type={transaction.type} isRecurring={transaction.isRecurring}>
                                    {getTransactionTypeLabel(transaction.isRecurring)}
                                </ActivityType>
                            </ActivityMeta>
                        </ActivityDetails>
                        <ActivityAmount type={transaction.type}>
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
