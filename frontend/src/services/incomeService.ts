import api from './api';
import { Income, CreateIncomePayload } from '../store/slices/incomeSlice';

export const incomeService = {
    async getAll(): Promise<Income[]> {
        const response = await api.get('/income');
        return response.data.data;
    },

    async create(income: CreateIncomePayload): Promise<Income> {
        const response = await api.post('/income', income);
        return response.data.data;
    },

    async update(id: string, income: Partial<CreateIncomePayload>): Promise<Income> {
        const response = await api.put(`/income/${id}`, income);
        return response.data.data;
    },

    async delete(id: string): Promise<void> {
        await api.delete(`/income/${id}`);
    },

    async getRecurring(): Promise<Income[]> {
        const response = await api.get('/income/recurring');
        return response.data.data;
    },

    async getOneTime(): Promise<Income[]> {
        const response = await api.get('/income/one-time');
        return response.data.data;
    }
};