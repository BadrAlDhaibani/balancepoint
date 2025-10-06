import { Request, Response } from 'express';
import { createUser, findUserByEmail } from '../models/User';
import { comparePassword, generateToken } from '../utils/helpers';
import { AppError } from '../middleware/errorHandler';

//register a new user
export const register = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    //check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        throw new AppError('User with this email already exists', 400);
    }

    //create user
    const user = await createUser(email, password, name);

    //generate token
    const token = generateToken(user.id, user.email);

    res.status(201).json({
        success: true,
        token,
        user: {
            id: user.id,
            email: user.email,
            name: user.name
        }
    });
};

//login user
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    //find user
    const user = await findUserByEmail(email);
    if (!user) {
        throw new AppError('Invalid email or password', 401);
    }

    //check password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
        throw new AppError('Invalid email or password', 401);
    }

    //generate token
    const token = generateToken(user.id, user.email);

    res.json({
        success: true,
        token,
        user: {
            id: user.id,
            email: user.email,
            name: user.name
        }
    });
};

//get current user profile
export const getProfile = async (req: Request, res: Response) => {
    const userId = (req as any).user.id;

    const user = await findUserByEmail((req as any).user.email);
    if (!user) {
        throw new AppError('User not found', 404);
    }

    res.json({
        success: true,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            created_at: user.created_at
        }
    });
};