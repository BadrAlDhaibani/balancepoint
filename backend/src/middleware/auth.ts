import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

//extend express request type to include user
interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
    };
}

//middleware to verify JWT token
export const authenticateToken = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        //get token from authorization header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; //format: "Bearer TOKEN"

        if (!token) {
            return res.status(401).json({ error: 'Access token required' });
        }

        //verify token
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET not configured');
        }

        const decoded = jwt.verify(token, secret) as {
            id: string;
            email: string;
        }

        //attach user info to request
        req.user = {
            id: decoded.id,
            email: decoded.email
        };

        next(); //continue to route handler
    }
    catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        return res.status(500).json({ error: 'Authentication failed' });
    }
};

//export the AuthRequest type for use in other files
export { AuthRequest };