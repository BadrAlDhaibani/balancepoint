import api from './api';
import { Expense } from '../store/slices/expenseSlice';

export const expenseService = {
    async getAll() {
        const response = await api.get('/expenses');
        return response.data.data;
    },

    async create(expense: Omit<Expense, 'id'>) {
        const response = await api.post('/expenses', expense);
        return response.data.data;
    },

    async update(id: string, expense: Partial<Expense>) {
        const response = await api.put(`/expenses/${id}`, expense);
        return response.data.data;
    },

    async delete(id: string) {
        const response = await api.delete(`/expenses/${id}`);
        return response.data;
    },

    async getRecurring() {
        const response = await api.get('/expenses/recurring');
        return response.data.data;
    },

    async getOneTime() {
        const response = await api.get('/expenses/one-time');
        return response.data.data;
    }
};