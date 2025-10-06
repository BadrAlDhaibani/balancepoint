import { Router } from 'express';
import {
    getAllExpenses,
    getRecurring,
    getOneTime,
    addExpense,
    modifyExpense,
    removeExpense
} from '../controllers/expenseController';
import { authenticateToken } from '../middleware/auth';
import { validateExpense } from '../utils/validation';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

//all routes require authentication
router.use(authenticateToken);

//expense routes
router.get('/', asyncHandler(getAllExpenses));
router.get('/recurring', asyncHandler(getRecurring));
router.get('/one-time', asyncHandler(getOneTime));
router.post('/', validateExpense, asyncHandler(addExpense));
router.put('/:id', asyncHandler(modifyExpense));
router.delete('/:id', asyncHandler(removeExpense));

export default router;