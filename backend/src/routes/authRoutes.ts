import { Router } from 'express';
import { register, login, getProfile } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';
import { validateRegistration, validateLogin } from '../utils/validation';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

//public routes
router.post('/register', validateRegistration, asyncHandler(register));
router.post('/login', validateLogin, asyncHandler(login));

//protected routes
router.get('/profile', authenticateToken, asyncHandler(getProfile));

export default router;