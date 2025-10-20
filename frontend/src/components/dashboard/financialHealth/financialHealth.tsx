import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import {
    Card,
    SectionTitle,
    BalanceAmount,
    BalanceLabel,
    HealthStatus,
    HealthStatusLabel,
    HealthStatusValue,
    RatioSection,
    RatioLabel,
    RatioProgress,
    RatioFill,
    RatioGap,
    RatioText,
    NextIncomeSection,
    NextIncomeLabel,
    NextIncomeDays,
    NextIncomeDetails,
} from './financialHealthStyled';

interface FinancialHealthProps {
    showNextIncome?: boolean;
}

const FinancialHealth: React.FC<FinancialHealthProps> = ({
    showNextIncome = true
}) => {
    const dashboardData = useSelector((state: RootState) => state.dashboard.data);
    const loading = useSelector((state: RootState) => state.dashboard.loading);

    if (loading || !dashboardData) {
        return (
            <Card>
                <SectionTitle>Financial Health Overview</SectionTitle>
                <BalanceLabel>Loading...</BalanceLabel>
            </Card>
        );
    }

    const {
        available_balance,
        health_status,
        income_vs_expense_ratio,
        next_income_date,
        next_income_amount,
        days_until_next_income
    } = dashboardData;

    const formatNextIncomeDate = (dateStr: string) => {
        if (dateStr === 'N/A') return 'N/A';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <Card>
            <SectionTitle>Financial Health Overview</SectionTitle>

            <BalanceAmount>${available_balance.toFixed(2)}</BalanceAmount>
            <BalanceLabel>
                Available Balance<br />
                Last 30 Days
            </BalanceLabel>

            <HealthStatus status={health_status}>
                <HealthStatusLabel>Health Status:</HealthStatusLabel>
                <HealthStatusValue status={health_status}>
                    {health_status}
                </HealthStatusValue>
            </HealthStatus>

            <RatioSection>
                <RatioLabel>Quick Ratio</RatioLabel>
                <RatioProgress>
                    <RatioFill percentage={income_vs_expense_ratio} />
                    <RatioGap percentage={income_vs_expense_ratio} />
                </RatioProgress>
                <RatioText>
                    Income vs Expenses
                </RatioText>
            </RatioSection>

            {showNextIncome && next_income_date !== 'N/A' && (
                <NextIncomeSection>
                    <NextIncomeLabel>Next Income</NextIncomeLabel>
                    <NextIncomeDays>{days_until_next_income} days</NextIncomeDays>
                    <NextIncomeDetails>
                        ${next_income_amount.toFixed(2)} - {formatNextIncomeDate(next_income_date)}
                    </NextIncomeDetails>
                </NextIncomeSection>
            )}
        </Card>
    );
};

export default FinancialHealth;
