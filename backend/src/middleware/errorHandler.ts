import { Request, Response, NextFunction } from 'express';

//custom error class
export class AppError extends Error {
    statusCode: number;
    isOperational: boolean;

    constructor(message: string, statusCode: number){
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

//global error handling middleware
export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let error = { ...err };
    error.message = err.message;

    //log error for debugging
    console.error('Error:', err);

    //default error
    let statusCode = error.statusCode || 500;
    let message = error.message || 'Internal Server Error';

    //postgres errors
    if (err.code === '23505') {
        //duplicate key error
        statusCode = 400;
        message = 'Duplicate entry. This record already exists.';
    }

    if (err.code === '23503') {
        //foreign key violation
        statusCode = 400;
        message = 'Invalid reference. Related record does not exist.';
    }

    if (err.code === '22P02') {
        //invalid text representation
        statusCode = 400;
        message = 'Invalid input format.';
    }

    //JWT errors
    if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token. Please log in again.';
    }

    if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired. Please log in again.';
    }

    //validation errors
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = err.message;
    }

    //send error response
    res.status(statusCode).json({
        success: false,
        error: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

//async handler wrapper to catch errors in async routes
export const asyncHandler = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};