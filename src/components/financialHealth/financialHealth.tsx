import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
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
    const balance = useSelector((state: RootState) => state.balance);

    return (
        <Card>
            <SectionTitle>Financial Health Overview</SectionTitle>

            <BalanceAmount>${balance.availableBalance.toFixed(2)}</BalanceAmount>
            <BalanceLabel>
                Available Balance<br />
                Last 30 Days
            </BalanceLabel>

            <HealthStatus status={balance.healthStatus}>
                <HealthStatusLabel>Health Status:</HealthStatusLabel>
                <HealthStatusValue status={balance.healthStatus}>
                    {balance.healthStatus}
                </HealthStatusValue>
            </HealthStatus>

            <RatioSection>
                <RatioLabel>Quick Ratio</RatioLabel>
                <RatioProgress>
                    <RatioFill percentage={balance.incomeVsExpenseRatio} />
                    <RatioGap percentage={balance.incomeVsExpenseRatio} />
                </RatioProgress>
                <RatioText>
                    Income vs Expenses
                </RatioText>
            </RatioSection>

            {showNextIncome && (
                <NextIncomeSection>
                    <NextIncomeLabel>Next Income</NextIncomeLabel>
                    <NextIncomeDays>{balance.daysUntilNextIncome} days</NextIncomeDays>
                    <NextIncomeDetails>
                        ${balance.nextIncomeAmount.toFixed(2)} - {balance.nextIncomeDate}
                    </NextIncomeDetails>
                </NextIncomeSection>
            )}
        </Card>
    );
};

export default FinancialHealth;
