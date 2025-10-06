import { configureStore } from '@reduxjs/toolkit';
//import slices
import balanceSlice from './slices/balanceSlice';
import transactionSlice from './slices/transactionSlice';
import incomeReducer from './slices/incomeSlice';
import expenseReducer from './slices/expenseSlice'; 


export const store = configureStore({
  reducer: {
    balance: balanceSlice,
    transactions: transactionSlice,
    income: incomeReducer,
    expense: expenseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;