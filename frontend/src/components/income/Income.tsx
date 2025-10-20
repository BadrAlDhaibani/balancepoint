import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchAllIncome } from '../../store/slices/incomeSlice';
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
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.income);

    useEffect(() => {
        dispatch(fetchAllIncome());
    }, [dispatch]);

    return (
        <PageContainer>
            {error && (
                <div style={{ color: 'red', padding: '1rem', marginBottom: '1rem' }}>
                    Error: {error}
                </div>
            )}

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