import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { 
    createIncome, 
    getIncomeByUserId, 
    getIncomeById,
    getRecurringIncome,
    getOneTimeIncome,
    updateIncome, 
    deleteIncome 
} from '../models/Income';
import { AppError } from '../middleware/errorHandler';

//get all income for user
export const getAllIncome = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const income = await getIncomeByUserId(userId);

    res.json({
        success: true,
        count: income.length,
        data: income
    });
};

//get recurring income only
export const getRecurring = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const income = await getRecurringIncome(userId);

    res.json({
        success: true,
        count: income.length,
        data: income
    });
};

//get one-time income only
export const getOneTime = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const income = await getOneTimeIncome(userId);

    res.json({
        success: true,
        count: income.length,
        data: income
    });
};

//create new income
export const addIncome = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const { description, amount, date, is_recurring, frequency } = req.body;

    const income = await createIncome(
        userId,
        description,
        amount,
        date, // Pass date string directly to avoid timezone conversion
        is_recurring,
        frequency
    );

    res.status(201).json({
        success: true,
        data: income
    });
};

//update income
export const modifyIncome = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const { id } = req.params;
    const updates = req.body;

    //check if income exists and belongs to user
    const existing = await getIncomeById(id, userId);
    if (!existing) {
        throw new AppError('Income not found', 404);
    }

    const income = await updateIncome(id, userId, updates);

    res.json({
        success: true,
        data: income
    });
};

//delete income
export const removeIncome = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const { id } = req.params;

    const deleted = await deleteIncome(id, userId);
    if (!deleted) {
        throw new AppError('Income not found', 404);
    }

    res.json({
        success: true,
        message: 'Income deleted successfully'
    });
};