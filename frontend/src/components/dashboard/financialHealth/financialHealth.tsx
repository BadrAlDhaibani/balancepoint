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
    const incomeItems = useSelector((state: RootState) => state.income.items);
    const expenseItems = useSelector((state: RootState) => state.expense.items);

    //calculate total income and expenses
    const totalIncome = incomeItems.reduce((sum, item) => sum + item.amount, 0);
    const totalExpenses = expenseItems.reduce((sum, item) => sum + item.amount, 0);
    const availableBalance = totalIncome - totalExpenses;

    //calculate income vs expense ratio
    const incomeVsExpenseRatio = totalIncome > 0 
        ? Math.round((totalIncome / (totalIncome + totalExpenses)) * 100)
        : 0;

    //determine health status
    const getHealthStatus = (): 'good' | 'warning' | 'critical' => {
        if (incomeVsExpenseRatio >= 66) return 'good';
        if (incomeVsExpenseRatio >= 33) return 'warning';
        return 'critical';
    };

    //find next recurring income
    const recurringIncome = incomeItems.filter(i => i.is_recurring);
    const calculateNextPayment = (startDate: string, frequency?: string) => {
        const today = new Date();
        let nextDate = new Date(startDate);

        if (!frequency) return nextDate;

        while (nextDate < today) {
            switch (frequency) {
                case 'weekly':
                    nextDate.setDate(nextDate.getDate() + 7);
                    break;
                case 'bi-weekly':
                    nextDate.setDate(nextDate.getDate() + 14);
                    break;
                case 'monthly':
                    nextDate.setMonth(nextDate.getMonth() + 1);
                    break;
                case 'quarterly':
                    nextDate.setMonth(nextDate.getMonth() + 3);
                    break;
            }
        }
        return nextDate;
    };

    //find closest upcoming income
    let nextIncomeDate = 'N/A';
    let nextIncomeAmount = 0;
    let daysUntilNextIncome = 0;

    if (recurringIncome.length > 0) {
        const upcomingIncomes = recurringIncome.map(income => ({
            ...income,
            nextPayment: calculateNextPayment(income.date, income.frequency)
        }));

        const nextIncome = upcomingIncomes.sort((a, b) => 
            a.nextPayment.getTime() - b.nextPayment.getTime()
        )[0];

        nextIncomeDate = nextIncome.nextPayment.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        });
        nextIncomeAmount = nextIncome.amount;
        daysUntilNextIncome = Math.ceil(
            (nextIncome.nextPayment.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
        );
    }

    const healthStatus = getHealthStatus();

    return (
        <Card>
            <SectionTitle>Financial Health Overview</SectionTitle>

            <BalanceAmount>${availableBalance.toFixed(2)}</BalanceAmount>
            <BalanceLabel>
                Available Balance<br />
                Last 30 Days
            </BalanceLabel>

            <HealthStatus status={healthStatus}>
                <HealthStatusLabel>Health Status:</HealthStatusLabel>
                <HealthStatusValue status={healthStatus}>
                    {healthStatus}
                </HealthStatusValue>
            </HealthStatus>

            <RatioSection>
                <RatioLabel>Quick Ratio</RatioLabel>
                <RatioProgress>
                    <RatioFill percentage={incomeVsExpenseRatio} />
                    <RatioGap percentage={incomeVsExpenseRatio} />
                </RatioProgress>
                <RatioText>
                    Income vs Expenses
                </RatioText>
            </RatioSection>

            {showNextIncome && recurringIncome.length > 0 && (
                <NextIncomeSection>
                    <NextIncomeLabel>Next Income</NextIncomeLabel>
                    <NextIncomeDays>{daysUntilNextIncome} days</NextIncomeDays>
                    <NextIncomeDetails>
                        ${nextIncomeAmount.toFixed(2)} - {nextIncomeDate}
                    </NextIncomeDetails>
                </NextIncomeSection>
            )}
        </Card>
    );
};

export default FinancialHealth;