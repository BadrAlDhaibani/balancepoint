import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchAllExpenses } from '../../store/slices/expenseSlice';
import {
    PageContainer,
    ContentGrid,
    FullWidthCard,
} from './ExpenseStyled';
import { QuickAddExpense } from './quickAddExpense';
import { ExpenseSummary } from './expenseSummary';
import { RecurringExpense } from './recurringExpense';
import { RecentExpenseActivity } from './recentExpenseActivity';

const Expense: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.expense);

    useEffect(() => {
        dispatch(fetchAllExpenses());
    }, [dispatch]);

    return (
        <PageContainer>
            {error && (
                <div style={{ color: 'red', padding: '1rem', marginBottom: '1rem' }}>
                    Error: {error}
                </div>
            )}

            <ContentGrid>
                <ExpenseSummary />
                <RecurringExpense />
            </ContentGrid>

            <QuickAddExpense />

            <FullWidthCard>
                <RecentExpenseActivity />
            </FullWidthCard>
        </PageContainer>
    );
};

export default Expense;