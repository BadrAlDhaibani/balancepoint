import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Income {
    id: string;
    description: string;
    amount: number;
    date: string;
    is_recurring: boolean;
    frequency?: 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly';
}

interface IncomeState {
    items: Income[];
    loading: boolean;
    error: string | null;
}

const initialState: IncomeState = {
    items: [
        {
            id: '1',
            description: 'Freelance Payment',
            amount: 350.00,
            date: new Date().toISOString().split('T')[0],
            is_recurring: false,
        },
        {
            id: '2',
            description: 'Monthly Salary',
            amount: 2100.00,
            date: '2024-10-01',
            is_recurring: true,
            frequency: 'monthly',
        },
        {
            id: '3',
            description: 'Freelance Contract',
            amount: 800.00,
            date: '2024-10-15',
            is_recurring: true,
            frequency: 'monthly',
        },
    ],
    loading: false,
    error: null,
};

const incomeSlice = createSlice({
    name: 'income',
    initialState,
    reducers: {
        addIncome: (state, action: PayloadAction<Income>) => {
            state.items.unshift(action.payload);
        },
        updateIncome: (state, action: PayloadAction<Income>) => {
            const index = state.items.findIndex(i => i.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteIncome: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(i => i.id !== action.payload);
        },
        setIncomeItems: (state, action: PayloadAction<Income[]>) => {
            state.items = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const {
    addIncome,
    updateIncome,
    deleteIncome,
    setIncomeItems,
    setLoading,
    setError,
} = incomeSlice.actions;

export default incomeSlice.reducer;