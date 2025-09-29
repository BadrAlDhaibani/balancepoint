import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ExpenseTransaction {
    id: string;
    description: string;
    amount: number;
    date: string;
    isRecurring: boolean;
    frequency?: 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly';
}

export interface RecurringExpense {
    id: string;
    description: string;
    amount: number;
    frequency: 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly';
    isActive: boolean;
    nextPaymentDate?: string;
    startDate: string;
}

interface ExpenseState {
    transactions: ExpenseTransaction[];
    recurringExpenses: RecurringExpense[];
}

//mock data for development
const initialState: ExpenseState = {
    transactions: [
        {
            id: '1',
            description: 'Grocery Shopping',
            amount: 87.43,
            date: new Date().toISOString().split('T')[0],
            isRecurring: false,
        },
        {
            id: '2',
            description: 'Gas Station',
            amount: 45.20,
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            isRecurring: false,
        },
    ],
    recurringExpenses: [
        {
            id: '1',
            description: 'Rent',
            amount: 1200.00,
            frequency: 'monthly',
            isActive: true,
            nextPaymentDate: '2024-10-01',
            startDate: '2024-01-01',
        },
        {
            id: '2',
            description: 'Internet Bill',
            amount: 65.00,
            frequency: 'monthly',
            isActive: true,
            nextPaymentDate: '2024-10-05',
            startDate: '2024-01-01',
        },
        {
            id: '3',
            description: 'Netflix Subscription',
            amount: 15.99,
            frequency: 'monthly',
            isActive: true,
            nextPaymentDate: '2024-10-10',
            startDate: '2024-03-10',
        },
    ],
};

const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        addExpense: (state, action: PayloadAction<ExpenseTransaction>) => {
            state.transactions.unshift(action.payload);
        },
        addRecurringExpense: (state, action: PayloadAction<RecurringExpense>) => {
            state.recurringExpenses.unshift(action.payload);
        },
        updateExpense: (state, action: PayloadAction<ExpenseTransaction>) => {
            const index = state.transactions.findIndex(t => t.id === action.payload.id);
            if (index !== -1) {
                state.transactions[index] = action.payload;
            }
        },
        deleteExpense: (state, action: PayloadAction<string>) => {
            state.transactions = state.transactions.filter(t => t.id !== action.payload);
        },
        updateRecurringExpense: (state, action: PayloadAction<RecurringExpense>) => {
            const index = state.recurringExpenses.findIndex(r => r.id === action.payload.id);
            if (index !== -1) {
                state.recurringExpenses[index] = action.payload;
            }
        },
        deleteRecurringExpense: (state, action: PayloadAction<string>) => {
            state.recurringExpenses = state.recurringExpenses.filter(r => r.id !== action.payload);
        },
        toggleRecurringExpense: (state, action: PayloadAction<string>) => {
            const recurring = state.recurringExpenses.find(r => r.id === action.payload);
            if (recurring) {
                recurring.isActive = !recurring.isActive;
            }
        },
    },
});

export const {
    addExpense,
    addRecurringExpense,
    updateExpense,
    deleteExpense,
    updateRecurringExpense,
    deleteRecurringExpense,
    toggleRecurringExpense,
} = expenseSlice.actions;

export default expenseSlice.reducer;