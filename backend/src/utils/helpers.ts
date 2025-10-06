import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

//hash password
export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
};

//compare password with hash
export const comparePassword = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
};

//generate JWT token
export const generateToken = (userId: string, email: string): string => {
    const secret = process.env.JWT_SECRET;
    
    if (!secret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    return jwt.sign(
        { id: userId, email: email },
        secret,
        { expiresIn: '7d' }
    ) as string;
};

//calculate next payment date for recurring transactions
export const calculateNextPaymentDate = (
    startDate: Date,
    frequency: 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly'
): Date => {
    const today = new Date();
    const nextDate = new Date(startDate);

    //keep adding frequency intervals until we're in the future
    while (nextDate < today) {
        if (frequency === 'weekly') {
            nextDate.setDate(nextDate.getDate() + 7);
        } else if (frequency === 'bi-weekly') {
            nextDate.setDate(nextDate.getDate() + 14);
        } else if (frequency === 'monthly') {
            nextDate.setMonth(nextDate.getMonth() + 1);
        } else if (frequency === 'quarterly') {
            nextDate.setMonth(nextDate.getMonth() + 3);
        }
    }

    return nextDate;
};

//format currency
export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};

//calculate financial health status
export const calculateHealthStatus = (
    incomeVsExpenseRatio: number
): 'good' | 'warning' | 'critical' => {
    if (incomeVsExpenseRatio >= 66) {
        return 'good';
    } else if (incomeVsExpenseRatio >= 33) {
        return 'warning';
    } else {
        return 'critical';
    }
};

//generate unique ID (simple version for development)
export const generateId = (): string => {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 9);
    return timestamp + random;
};

//format date to ISO string (YYYY-MM-DD)
export const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

//calculate days between two dates
export const daysBetween = (date1: Date, date2: Date): number => {
    const oneDay = 24 * 60 * 60 * 1000;
    const diffInMs = Math.abs(date1.getTime() - date2.getTime());
    return Math.round(diffInMs / oneDay);
};