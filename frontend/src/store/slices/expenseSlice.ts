import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Expense {
    id: string;
    description: string;
    amount: number;
    date: string;
    is_recurring: boolean;
    frequency?: 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly';
}

interface ExpenseState {
    items: Expense[];
    loading: boolean;
    error: string | null;
}

const initialState: ExpenseState = {
    items: [
        {
            id: '1',
            description: 'Grocery Shopping',
            amount: 87.43,
            date: new Date().toISOString().split('T')[0],
            is_recurring: false,
        },
        {
            id: '2',
            description: 'Rent',
            amount: 1200.00,
            date: '2024-10-01',
            is_recurring: true,
            frequency: 'monthly',
        },
        {
            id: '3',
            description: 'Netflix Subscription',
            amount: 15.99,
            date: '2024-10-10',
            is_recurring: true,
            frequency: 'monthly',
        },
    ],
    loading: false,
    error: null,
};

const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        addExpense: (state, action: PayloadAction<Expense>) => {
            state.items.unshift(action.payload);
        },
        updateExpense: (state, action: PayloadAction<Expense>) => {
            const index = state.items.findIndex(e => e.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteExpense: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(e => e.id !== action.payload);
        },
        setExpenseItems: (state, action: PayloadAction<Expense[]>) => {
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
    addExpense,
    updateExpense,
    deleteExpense,
    setExpenseItems,
    setLoading,
    setError,
} = expenseSlice.actions;

export default expenseSlice.reducer;