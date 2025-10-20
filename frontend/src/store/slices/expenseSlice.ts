import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { expenseService } from '../../services/expenseService';

// Match backend schema exactly
export interface Expense {
    id: string;
    user_id: string;
    description: string;
    amount: number;
    date: string;
    is_recurring: boolean;
    frequency?: 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly';
    created_at: string;
    updated_at: string;
}

// For creating new expense (no id, user_id, timestamps)
export interface CreateExpensePayload {
    description: string;
    amount: number;
    date: string;
    is_recurring: boolean;
    frequency?: 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly';
}

// For updating expense
export interface UpdateExpensePayload {
    id: string;
    description?: string;
    amount?: number;
    date?: string;
    is_recurring?: boolean;
    frequency?: 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly';
}

interface ExpenseState {
    items: Expense[];
    loading: boolean;
    error: string | null;
}

const initialState: ExpenseState = {
    items: [],
    loading: false,
    error: null,
};

// Async thunks
export const fetchAllExpenses = createAsyncThunk(
    'expense/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const data = await expenseService.getAll();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Failed to fetch expenses');
        }
    }
);

export const createExpense = createAsyncThunk(
    'expense/create',
    async (payload: CreateExpensePayload, { rejectWithValue }) => {
        try {
            const data = await expenseService.create(payload);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Failed to create expense');
        }
    }
);

export const updateExpenseAsync = createAsyncThunk(
    'expense/update',
    async (payload: UpdateExpensePayload, { rejectWithValue }) => {
        try {
            const { id, ...updates } = payload;
            const data = await expenseService.update(id, updates);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Failed to update expense');
        }
    }
);

export const deleteExpenseAsync = createAsyncThunk(
    'expense/delete',
    async (id: string, { rejectWithValue }) => {
        try {
            await expenseService.delete(id);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Failed to delete expense');
        }
    }
);

// Helper to convert date to YYYY-MM-DD string format
const normalizeDateToString = (date: any): string => {
    if (typeof date === 'string') {
        // If already a string, check if it's in YYYY-MM-DD format
        if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
            return date;
        }
        // If it's an ISO string or other format, convert to Date first
        const parsedDate = new Date(date);
        if (!isNaN(parsedDate.getTime())) {
            return parsedDate.toISOString().split('T')[0];
        }
    } else if (date instanceof Date) {
        return date.toISOString().split('T')[0];
    }
    // Fallback to today's date if invalid
    return new Date().toISOString().split('T')[0];
};

// Helper to normalize expense data (convert string amounts to numbers and dates to strings)
const normalizeExpense = (expense: any): Expense => ({
    ...expense,
    amount: typeof expense.amount === 'string' ? parseFloat(expense.amount) : expense.amount,
    date: normalizeDateToString(expense.date),
});

const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch all expenses
        builder.addCase(fetchAllExpenses.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchAllExpenses.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload.map(normalizeExpense);
        });
        builder.addCase(fetchAllExpenses.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Create expense
        builder.addCase(createExpense.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createExpense.fulfilled, (state, action) => {
            state.loading = false;
            state.items.unshift(normalizeExpense(action.payload));
        });
        builder.addCase(createExpense.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Update expense
        builder.addCase(updateExpenseAsync.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateExpenseAsync.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.items.findIndex(e => e.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = normalizeExpense(action.payload);
            }
        });
        builder.addCase(updateExpenseAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Delete expense
        builder.addCase(deleteExpenseAsync.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteExpenseAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.items = state.items.filter(e => e.id !== action.payload);
        });
        builder.addCase(deleteExpenseAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { clearError } = expenseSlice.actions;

export default expenseSlice.reducer;
