import api from './api';
import { Income } from '../store/slices/incomeSlice';

export const incomeService = {
    async getAll() {
        const response = await api.get('/income');
        return response.data.data;
    },

    async create(income: Omit<Income, 'id'>) {
        const response = await api.post('/income', income);
        return response.data.data;
    },

    async update(id: string, income: Partial<Income>) {
        const response = await api.put(`/income/${id}`, income);
        return response.data.data;
    },

    async delete(id: string) {
        const response = await api.delete(`/income/${id}`);
        return response.data;
    },

    async getRecurring() {
        const response = await api.get('/income/recurring');
        return response.data.data;
    },

    async getOneTime() {
        const response = await api.get('/income/one-time');
        return response.data.data;
    }
};