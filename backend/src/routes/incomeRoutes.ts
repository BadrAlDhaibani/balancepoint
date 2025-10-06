import { Router } from 'express';
import {
    getAllIncome,
    getRecurring,
    getOneTime,
    addIncome,
    modifyIncome,
    removeIncome
} from '../controllers/incomeController';
import { authenticateToken } from '../middleware/auth';
import { validateIncome } from '../utils/validation';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

//all routes require authentication
router.use(authenticateToken);

//income routes
router.get('/', asyncHandler(getAllIncome));
router.get('/recurring', asyncHandler(getRecurring));
router.get('/one-time', asyncHandler(getOneTime));
router.post('/', validateIncome, asyncHandler(addIncome));
router.put('/:id', asyncHandler(modifyIncome));
router.delete('/:id', asyncHandler(removeIncome));

export default router;