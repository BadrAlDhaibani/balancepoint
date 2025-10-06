import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { 
    createExpense, 
    getExpensesByUserId, 
    getExpenseById,
    getRecurringExpenses,
    getOneTimeExpenses,
    updateExpense, 
    deleteExpense 
} from '../models/Expense';
import { AppError } from '../middleware/errorHandler';

//get all expenses for user
export const getAllExpenses = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const expenses = await getExpensesByUserId(userId);

    res.json({
        success: true,
        count: expenses.length,
        data: expenses
    });
};

//get recurring expenses only
export const getRecurring = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const expenses = await getRecurringExpenses(userId);

    res.json({
        success: true,
        count: expenses.length,
        data: expenses
    });
};

//get one-time expenses only
export const getOneTime = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const expenses = await getOneTimeExpenses(userId);

    res.json({
        success: true,
        count: expenses.length,
        data: expenses
    });
};

//create new expense
export const addExpense = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const { description, amount, date, is_recurring, frequency } = req.body;

    const expense = await createExpense(
        userId,
        description,
        amount,
        new Date(date),
        is_recurring,
        frequency
    );

    res.status(201).json({
        success: true,
        data: expense
    });
};

//update expense
export const modifyExpense = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const { id } = req.params;
    const updates = req.body;

    //check if expense exists and belongs to user
    const existing = await getExpenseById(id, userId);
    if (!existing) {
        throw new AppError('Expense not found', 404);
    }

    const expense = await updateExpense(id, userId, updates);

    res.json({
        success: true,
        data: expense
    });
};

//delete expense
export const removeExpense = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const { id } = req.params;

    const deleted = await deleteExpense(id, userId);
    if (!deleted) {
        throw new AppError('Expense not found', 404);
    }

    res.json({
        success: true,
        message: 'Expense deleted successfully'
    });
};