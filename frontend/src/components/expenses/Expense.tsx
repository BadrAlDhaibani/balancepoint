import React from 'react';
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
    return (
        <PageContainer>
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