import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { incomeService } from '../../services/incomeService';

// Match backend schema exactly
export interface Income {
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

// For creating new income (no id, user_id, timestamps)
export interface CreateIncomePayload {
    description: string;
    amount: number;
    date: string;
    is_recurring: boolean;
    frequency?: 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly';
}

// For updating income
export interface UpdateIncomePayload {
    id: string;
    description?: string;
    amount?: number;
    date?: string;
    is_recurring?: boolean;
    frequency?: 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly';
}

interface IncomeState {
    items: Income[];
    loading: boolean;
    error: string | null;
}

const initialState: IncomeState = {
    items: [],
    loading: false,
    error: null,
};

// Async thunks
export const fetchAllIncome = createAsyncThunk(
    'income/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const data = await incomeService.getAll();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Failed to fetch income');
        }
    }
);

export const createIncome = createAsyncThunk(
    'income/create',
    async (payload: CreateIncomePayload, { rejectWithValue }) => {
        try {
            const data = await incomeService.create(payload);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Failed to create income');
        }
    }
);

export const updateIncomeAsync = createAsyncThunk(
    'income/update',
    async (payload: UpdateIncomePayload, { rejectWithValue }) => {
        try {
            const { id, ...updates } = payload;
            const data = await incomeService.update(id, updates);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Failed to update income');
        }
    }
);

export const deleteIncomeAsync = createAsyncThunk(
    'income/delete',
    async (id: string, { rejectWithValue }) => {
        try {
            await incomeService.delete(id);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Failed to delete income');
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

// Helper to normalize income data (convert string amounts to numbers and dates to strings)
const normalizeIncome = (income: any): Income => ({
    ...income,
    amount: typeof income.amount === 'string' ? parseFloat(income.amount) : income.amount,
    date: normalizeDateToString(income.date),
});

const incomeSlice = createSlice({
    name: 'income',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch all income
        builder.addCase(fetchAllIncome.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchAllIncome.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload.map(normalizeIncome);
        });
        builder.addCase(fetchAllIncome.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Create income
        builder.addCase(createIncome.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createIncome.fulfilled, (state, action) => {
            state.loading = false;
            state.items.unshift(normalizeIncome(action.payload));
        });
        builder.addCase(createIncome.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Update income
        builder.addCase(updateIncomeAsync.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateIncomeAsync.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.items.findIndex(i => i.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = normalizeIncome(action.payload);
            }
        });
        builder.addCase(updateIncomeAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Delete income
        builder.addCase(deleteIncomeAsync.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteIncomeAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.items = state.items.filter(i => i.id !== action.payload);
        });
        builder.addCase(deleteIncomeAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { clearError } = incomeSlice.actions;

export default incomeSlice.reducer;
