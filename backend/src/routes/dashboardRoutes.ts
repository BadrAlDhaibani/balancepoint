import { Router } from 'express';
import { getDashboardSummary } from '../controllers/dashboardController';
import { authenticateToken } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

//all routes require authentication
router.use(authenticateToken);

//dashboard routes
router.get('/summary', asyncHandler(getDashboardSummary));

export default router;