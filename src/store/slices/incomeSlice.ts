import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IncomeTransaction {
    id: string;
    description: string;
    amount: number;
    date: string;
    isRecurring: boolean;
    frequency?: 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly';
}

export interface RecurringIncome {
    id: string;
    description: string;
    amount: number;
    frequency: 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly';
    isActive: boolean;
    nextPaymentDate?: string;
    startDate: string;
}

interface IncomeState {
    transactions: IncomeTransaction[];
    recurringIncome: RecurringIncome[];
}

//mock data for development
const initialState: IncomeState = {
    transactions: [
        {
            id: '1',
            description: 'Freelance Payment',
            amount: 350.00,
            date: new Date().toISOString().split('T')[0],
            isRecurring: false,
        },
        {
            id: '2',
            description: 'Side Project Payment',
            amount: 125.00,
            date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            isRecurring: false,
        },
    ],
    recurringIncome: [
        {
            id: '1',
            description: 'Monthly Salary',
            amount: 2100.00,
            frequency: 'monthly',
            isActive: true,
            nextPaymentDate: '2024-10-01',
            startDate: '2024-01-01',
        },
        {
            id: '2',
            description: 'Freelance Contract',
            amount: 800.00,
            frequency: 'monthly',
            isActive: true,
            nextPaymentDate: '2024-10-15',
            startDate: '2024-06-15',
        },
        {
            id: '3',
            description: 'Investment Returns',
            amount: 150.00,
            frequency: 'quarterly',
            isActive: true,
            nextPaymentDate: '2024-12-01',
            startDate: '2024-01-01',
        },
    ],
};

const incomeSlice = createSlice({
    name: 'income',
    initialState,
    reducers: {
        addIncome: (state, action: PayloadAction<IncomeTransaction>) => {
            state.transactions.unshift(action.payload);
        },
        addRecurringIncome: (state, action: PayloadAction<RecurringIncome>) => {
            state.recurringIncome.unshift(action.payload);
        },
        updateIncome: (state, action: PayloadAction<IncomeTransaction>) => {
            const index = state.transactions.findIndex(t => t.id === action.payload.id);
            if (index !== -1) {
                state.transactions[index] = action.payload;
            }
        },
        deleteIncome: (state, action: PayloadAction<string>) => {
            state.transactions = state.transactions.filter(t => t.id !== action.payload);
        },
        updateRecurringIncome: (state, action: PayloadAction<RecurringIncome>) => {
            const index = state.recurringIncome.findIndex(r => r.id === action.payload.id);
            if (index !== -1) {
                state.recurringIncome[index] = action.payload;
            }
        },
        deleteRecurringIncome: (state, action: PayloadAction<string>) => {
            state.recurringIncome = state.recurringIncome.filter(r => r.id !== action.payload);
        },
        toggleRecurringIncome: (state, action: PayloadAction<string>) => {
            const recurring = state.recurringIncome.find(r => r.id === action.payload);
            if (recurring) {
                recurring.isActive = !recurring.isActive;
            }
        },
    },
});

export const {
    addIncome,
    addRecurringIncome,
    updateIncome,
    deleteIncome,
    updateRecurringIncome,
    deleteRecurringIncome,
    toggleRecurringIncome,
} = incomeSlice.actions;

export default incomeSlice.reducer;