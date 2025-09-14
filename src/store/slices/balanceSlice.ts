import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BalanceState {
    availableBalance: number;
    healthStatus: 'good' | 'warning' | 'critical';
    incomeVsExpenseRatio: number;
    nextIncomeDate: string;
    nextIncomeAmount: number;
    daysUntilNextIncome: number;
}

//initial state with mock data
const initialState: BalanceState = {
    availableBalance: 1234.56,
    healthStatus: 'good',
    incomeVsExpenseRatio: 75,
    nextIncomeDate: 'Aug 5',
    nextIncomeAmount: 2100.00,
    daysUntilNextIncome: 12,
}

//create slice
const balanceSlice = createSlice({
    name: 'balance',
    initialState,
    reducers: {
        //action to update available balance
        updateAvailableBalance: (state, action: PayloadAction<number>) => {
            state.availableBalance = action.payload;
        },
        //action to update health status
        updateHealthStatus: (state, action: PayloadAction<'good' | 'warning' | 'critical'>) => {
            state.healthStatus = action.payload;
        },
        //action to update income vs expense ratio
        updateIncomeVsExpenseRatio: (state, action: PayloadAction<number>) => {
            state.incomeVsExpenseRatio = action.payload;
        },
        //action to update next income information
        updateNextIncome: (state, action: PayloadAction<{ date: string; amount: number; days: number }>) => {
            state.nextIncomeDate = action.payload.date;
            state.nextIncomeAmount = action.payload.amount;
            state.daysUntilNextIncome = action.payload.days;
        }
    },
});

//export actions for use in components
export const {
    updateAvailableBalance,
    updateHealthStatus,
    updateIncomeVsExpenseRatio,
    updateNextIncome
} = balanceSlice.actions;

//export reducer
export default balanceSlice.reducer;