import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { getIncomeByUserId } from '../models/Income';
import { getExpensesByUserId } from '../models/Expense';
import { calculateHealthStatus, daysBetween } from '../utils/helpers';

//get dashboard summary
export const getDashboardSummary = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;

    //get all income and expenses
    const allIncome = await getIncomeByUserId(userId);
    const allExpenses = await getExpensesByUserId(userId);

    //calculate total income and expenses
    const totalIncome = allIncome.reduce((sum, item) => sum + Number(item.amount), 0);
    const totalExpenses = allExpenses.reduce((sum, item) => sum + Number(item.amount), 0);

    //calculate available balance
    const availableBalance = totalIncome - totalExpenses;

    //calculate income vs expense ratio (as percentage)
    const incomeVsExpenseRatio = totalIncome > 0
        ? Math.round((totalIncome / (totalIncome + totalExpenses)) * 100)
        : 0;

    //determine health status
    const healthStatus = calculateHealthStatus(incomeVsExpenseRatio);

    //find next recurring income
    const recurringIncome = allIncome.filter(i => i.is_recurring);
    let nextIncomeDate = 'N/A';
    let nextIncomeAmount = 0;
    let daysUntilNextIncome = 0;

    if (recurringIncome.length > 0) {
        //find the closest upcoming income 
        const sortedIncome = recurringIncome.sort((a, b) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        const nextIncome = sortedIncome[0]
        nextIncomeDate = new Date(nextIncome.date).toISOString().split('T')[0];
        nextIncomeAmount = Number(nextIncome.amount);
        daysUntilNextIncome = daysBetween(new Date(), new Date(nextIncome.date));
    }

    res.json({
        success: true,
        data: {
            available_balance: availableBalance,
            health_status: healthStatus,
            income_vs_expense_ratio: incomeVsExpenseRatio,
            next_income_date: nextIncomeDate,
            next_income_amount: nextIncomeAmount,
            days_until_next_income: daysUntilNextIncome,
            total_income: totalIncome,
            total_expenses: totalExpenses
        }
    });
};