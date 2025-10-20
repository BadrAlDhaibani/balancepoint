import api from './api';

export interface UpcomingEvent {
    id: string;
    type: 'income' | 'expense';
    description: string;
    amount: number;
    date: string;
    is_recurring: boolean;
    frequency?: 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly';
}

export interface DashboardData {
    available_balance: number;
    health_status: 'good' | 'warning' | 'critical';
    income_vs_expense_ratio: number;
    next_income_date: string;
    next_income_amount: number;
    days_until_next_income: number;
    total_income: number;
    total_expenses: number;
    upcoming_events: UpcomingEvent[];
    recent_activity: UpcomingEvent[];
}

export const dashboardService = {
    async getSummary(): Promise<DashboardData> {
        const response = await api.get('/dashboard');
        return response.data.data;
    }
};
