import { configureStore } from '@reduxjs/toolkit';
//import slices
import balanceSlice from './slices/balanceSlice';
import transactionSlice from './slices/transactionSlice';
import incomeReducer from './slices/incomeSlice'; // Add this import

export const store = configureStore({
  reducer: {
    balance: balanceSlice,
    transactions: transactionSlice,
    income: incomeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;