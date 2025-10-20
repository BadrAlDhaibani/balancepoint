import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { getHistoricalIncome, getUpcomingIncome } from '../models/Income';
import { getHistoricalExpenses, getUpcomingExpenses } from '../models/Expense';
import { calculateHealthStatus, daysBetween, formatDate } from '../utils/helpers';

//get dashboard summary
export const getDashboardSummary = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;

    //get historical transactions (last 30 days including today)
    const historicalIncome = await getHistoricalIncome(userId);
    const historicalExpenses = await getHistoricalExpenses(userId);

    //get upcoming transactions (after today)
    const upcomingIncome = await getUpcomingIncome(userId);
    const upcomingExpenses = await getUpcomingExpenses(userId);

    //calculate totals from historical data (30-day lookback)
    const totalHistoricalIncome = historicalIncome.reduce((sum, item) => sum + Number(item.amount), 0);
    const totalHistoricalExpenses = historicalExpenses.reduce((sum, item) => sum + Number(item.amount), 0);

    //calculate available balance based on 30-day historical data
    const availableBalance = totalHistoricalIncome - totalHistoricalExpenses;

    //calculate income vs expense ratio (as percentage)
    const incomeVsExpenseRatio = totalHistoricalIncome > 0
        ? Math.round((totalHistoricalIncome / (totalHistoricalIncome + totalHistoricalExpenses)) * 100)
        : 0;

    //determine health status
    const healthStatus = calculateHealthStatus(incomeVsExpenseRatio);

    //find next upcoming income and sum all income on that date
    let nextIncomeDate = 'N/A';
    let nextIncomeAmount = 0;
    let daysUntilNextIncome = 0;

    if (upcomingIncome.length > 0) {
        const nextIncome = upcomingIncome[0]; // Already sorted by date ASC
        nextIncomeDate = new Date(nextIncome.date).toISOString().split('T')[0];

        // Sum all income that occurs on the same date
        nextIncomeAmount = upcomingIncome
            .filter(income => {
                const incomeDate = new Date(income.date).toISOString().split('T')[0];
                return incomeDate === nextIncomeDate;
            })
            .reduce((sum, income) => sum + Number(income.amount), 0);

        daysUntilNextIncome = daysBetween(new Date(), new Date(nextIncome.date));
    }

    //combine and sort upcoming events (income and expenses)
    const upcomingEvents = [
        ...upcomingIncome.map(item => ({
            id: item.id,
            type: 'income' as const,
            description: item.description,
            amount: Number(item.amount),
            date: formatDate(new Date(item.date)),
            is_recurring: item.is_recurring,
            frequency: item.frequency
        })),
        ...upcomingExpenses.map(item => ({
            id: item.id,
            type: 'expense' as const,
            description: item.description,
            amount: Number(item.amount),
            date: formatDate(new Date(item.date)),
            is_recurring: item.is_recurring,
            frequency: item.frequency
        }))
    ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    //combine and sort recent activity (5 most recent past transactions)
    const recentActivity = [
        ...historicalIncome.map(item => ({
            id: item.id,
            type: 'income' as const,
            description: item.description,
            amount: Number(item.amount),
            date: formatDate(new Date(item.date)),
            is_recurring: item.is_recurring,
            frequency: item.frequency
        })),
        ...historicalExpenses.map(item => ({
            id: item.id,
            type: 'expense' as const,
            description: item.description,
            amount: Number(item.amount),
            date: formatDate(new Date(item.date)),
            is_recurring: item.is_recurring,
            frequency: item.frequency
        }))
    ]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort DESC (most recent first)
        .slice(0, 5); // Take only 5 most recent

    res.json({
        success: true,
        data: {
            available_balance: availableBalance,
            health_status: healthStatus,
            income_vs_expense_ratio: incomeVsExpenseRatio,
            next_income_date: nextIncomeDate,
            next_income_amount: nextIncomeAmount,
            days_until_next_income: daysUntilNextIncome,
            total_income: totalHistoricalIncome,
            total_expenses: totalHistoricalExpenses,
            upcoming_events: upcomingEvents,
            recent_activity: recentActivity
        }
    });
};