//user types
export interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    created_at: Date;
    updated_at: Date;
}

export interface UserRegistration {
    email: string;
    password: string;
    name: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
}

//income types
export interface Income {
    id: string;
    user_id: string;
    description: string;
    amount: number;
    date: Date; //for one time: when it occurred, for recurring: start date to calculate next income
    is_recurring: boolean;
    frequency?: 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly'; //only for recurring
    created_at: Date;
    updated_at: Date;
}

export interface Expense {
    id: string;
    user_id: string;
    description: string;
    amount: number;
    date: Date; //for one time: when it occurred, for recurring: start date to calculate next payments
    is_recurring: boolean;
    frequency?: 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly'; //only for recurring
    created_at: Date;
    updated_at: Date;
}

//Dashboard types
export interface UpcomingEvent {
    id: string;
    type: 'income' | 'expense';
    description: string;
    amount: number;
    date: Date;
    is_recurring: boolean;
    frequency?: 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly';
}

export interface FinancialHealth {
    available_balance: number;
    health_status: 'good' | 'warning' | 'critical';
    income_vs_expense_ratio: number;
    next_income_date: string;
    next_income_amount: number;
    days_until_next_income: number;
    total_income: number;
    total_expenses: number;
    upcoming_events: UpcomingEvent[];
}

export interface Insight {
    id: string;
    type: 'good' | 'warning' | 'info';
    message: string;
    details?: string;
}

//request types
export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
    };
}