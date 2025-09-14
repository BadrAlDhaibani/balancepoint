import { configureStore } from '@reduxjs/toolkit';
//import slices
import balanceSlice from './slices/balanceSlice';
import transactionSlice from './slices/transactionSlice';

export const store = configureStore({
  reducer: {
    balance: balanceSlice,
    transactions: transactionSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;