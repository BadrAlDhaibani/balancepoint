import React, { useState } from 'react'
import {
    PageContainer,
    ContentGrid,
    FullWidthCard,
} from './IncomeStyled';
import { QuickAddIncome } from './quickAddIncome';
import { IncomeSummary } from './incomeSummary';
import { RecurringIncome } from './recurringIncome';
import { RecentIncomeActivity } from './recentIncomeActivity';

const Income: React.FC = () => {
    return (
        <PageContainer>
            <ContentGrid>
                <IncomeSummary />
                <RecurringIncome />
            </ContentGrid>

            <QuickAddIncome />

            <FullWidthCard>
                <RecentIncomeActivity />
            </FullWidthCard>
        </PageContainer>
    );
};

export default Income;