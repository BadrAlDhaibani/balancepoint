import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//define types for transaction data
export interface Transaction {
    id: string;
    type: 'income' | 'expense';
    amount: number;
    description: string;
    date: string;
    category: string;
    isRecurring: boolean;
}

export interface UpcomingEvent{
    id: string;
    type: 'income' | 'expense';
    description: string;
    amount: number;
    dueDate: string;
}

export interface Insight {
    id: string;
    type: 'good' | 'warning' | 'info';
    message: string;
    details?: string;
}

//define the shape of our transaction state
interface TransactionState {
    transactions: Transaction[];
    upcomingEvents: UpcomingEvent[];
    insights: Insight[];
}

//initial state with mock data
const initialState: TransactionState = {
    transactions: [
        {
            id: '1',
            type: 'expense',
            amount: -87.43,
            description: 'Grocery Shopping',
            date: 'Today',
            category: 'Food',
            isRecurring: false
        },
        {
            id: '2',
            type: 'expense',
            amount: -15.99,
            description: 'Netflix Subscription',
            date: 'Yesterday',
            category: 'Entertainment',
            isRecurring: true
        },
        {
            id: '3',
            type: 'expense',
            amount: -45.20,
            description: 'Gas Station',
            date: 'Aug 22',
            category: 'Transportation',
            isRecurring: false,
        },
        {
            id: '4',
            type: 'income',
            amount: 350.00,
            description: 'Freelance Payment',
            date: 'Aug 20',
            category: 'Income',
            isRecurring: false,
        },
        {
            id: '5',
            type: 'expense',
            amount: -32.50,
            description: 'Restaurant',
            date: 'Aug 19',
            category: 'Food',
            isRecurring: false,
        },
    ],
    upcomingEvents: [
        {
            id: '1',
            type: 'expense',
            description: 'Electricity Bill',
            amount: -89.50,
            dueDate: 'Aug 27',
        },
        {
            id: '2',
            type: 'expense',
            description: 'Netflix Subscription',
            amount: -15.99,
            dueDate: 'Aug 28',
        },
        {
            id: '3',
            type: 'expense',
            description: 'Internet Bill',
            amount: -65.00,
            dueDate: 'Aug 30',
        },
        {
            id: '4',
            type: 'income',
            description: 'Salary Payment',
            amount: 2100.00,
            dueDate: 'Sep 5',
        },
    ],
    insights: [
        {
            id: '1',
            type: 'good',
            message: "You're spending less on groceries!",
            details: 'Down 18% ($47) compared to last month',
        },
        {
            id: '2',
            type: 'warning',
            message: 'Coffee spending is trending up',
            details: "You've spent $89 this month vs $62 last month",
        },
        {
            id: '3',
            type: 'info',
            message: '3 unused subscriptions detected',
            details: 'Consider reviewing Hulu, Adobe, and Spotify Premium',
        },
        {
            id: '4',
            type: 'good',
            message: 'You have more available this week',
            details: '$127 extra compared to your usual weekly balance',
        },
    ]
};

//create slice
const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        //action to add a new transaction
        addTransaction: (state, action: PayloadAction<Transaction>) => {
            state.transactions.unshift(action.payload);
        },
        //action to remove a transaction by id
        removeTransaction: (state, action: PayloadAction<string>) => {
            state.transactions = state.transactions.filter(tx => tx.id !== action.payload);
        },
        //action to update an existing transaction
        updateTransaction: (state, action: PayloadAction<Transaction>) => {
            const index = state.transactions.findIndex(tx => tx.id === action.payload.id);
            if (index !== -1) {
                state.transactions[index] = action.payload;
            }
        },
        //action to add an upcoming event
        addUpcomingEvent: (state, action: PayloadAction<UpcomingEvent>) => {
            state.upcomingEvents.push(action.payload);
        },
        //action to remove an upcoming event by id
        removeUpcomingEvent: (state, action: PayloadAction<string>) => {
            state.upcomingEvents = state.upcomingEvents.filter(event => event.id !== action.payload);
        },
        //action to add an insight
        addInsight: (state, action: PayloadAction<Insight>) => {
            state.insights.push(action.payload);
        },
        //action to clear all insights
        clearInsights: (state) => {
            state.insights = [];
        },
    },
});

//export actions for use in components
export const {
    addTransaction,
    removeTransaction,
    updateTransaction,
    addUpcomingEvent,
    removeUpcomingEvent,
    addInsight,
    clearInsights,
} = transactionSlice.actions;

//export reducer for use in store
export default transactionSlice.reducer;
