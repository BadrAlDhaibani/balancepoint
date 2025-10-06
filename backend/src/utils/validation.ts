import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

//middleware to check validation results
export const validateRequest = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }
    next();
};

//user registration validation rules
export const validateRegistration = [
    body('email')
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters'),
    validateRequest
];

//user login validation rules
export const validateLogin = [
    body('email')
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
    validateRequest
];

//income validation rules
export const validateIncome = [
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ max: 200 })
        .withMessage('Description must be less than 200 characters'),
    body('amount')
        .isFloat({ min: 0.01 })
        .withMessage('Amount must be a positive number'),
    body('date')
        .isISO8601()
        .withMessage('Please provide a valid date'),
    body('is_recurring')
        .isBoolean()
        .withMessage('is_recurring must be a boolean'),
    body('frequency')
        .optional()
        .isIn(['weekly', 'bi-weekly', 'monthly', 'quarterly'])
        .withMessage('Frequency must be weekly, bi-weekly, monthly, or quarterly'),
    validateRequest
]

//expense validation rules
export const validateExpense = [
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ max: 200 })
        .withMessage('Description must be less than 200 characters'),
    body('amount')
        .isFloat({ min: 0.01 })
        .withMessage('Amount must be a positive number'),
    body('date')
        .isISO8601()
        .withMessage('Please provide a valid date'),
    body('is_recurring')
        .isBoolean()
        .withMessage('is_recurring must be a boolean'),
    body('frequency')
        .optional()
        .isIn(['weekly', 'bi-weekly', 'monthly', 'quarterly'])
        .withMessage('Frequency must be weekly, bi-weekly, monthly, or quarterly'),
    validateRequest
];

//helper functuion to validate UUID format
export const isValidUUID = (id: string): boolean => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
};