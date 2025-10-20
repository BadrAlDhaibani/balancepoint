import api from './api';
import { Expense, CreateExpensePayload } from '../store/slices/expenseSlice';

export const expenseService = {
    async getAll(): Promise<Expense[]> {
        const response = await api.get('/expenses');
        return response.data.data;
    },

    async create(expense: CreateExpensePayload): Promise<Expense> {
        const response = await api.post('/expenses', expense);
        return response.data.data;
    },

    async update(id: string, expense: Partial<CreateExpensePayload>): Promise<Expense> {
        const response = await api.put(`/expenses/${id}`, expense);
        return response.data.data;
    },

    async delete(id: string): Promise<void> {
        await api.delete(`/expenses/${id}`);
    },

    async getRecurring(): Promise<Expense[]> {
        const response = await api.get('/expenses/recurring');
        return response.data.data;
    },

    async getOneTime(): Promise<Expense[]> {
        const response = await api.get('/expenses/one-time');
        return response.data.data;
    }
};