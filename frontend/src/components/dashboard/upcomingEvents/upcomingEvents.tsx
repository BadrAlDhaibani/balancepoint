import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import {
    Card,
    SectionTitle,
    EventsList,
    EventItem,
    EventDetails,
    EventTitle,
    EventDate,
    EventAmount,
    EmptyState,
} from './upcomingEventsStyled';

interface UpcomingEventsProps {
    maxEvents?: number;
    title?: string;
}

interface UpcomingEvent {
    id: string;
    description: string;
    amount: number;
    dueDate: Date;
    type: 'income' | 'expense';
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ 
    maxEvents = 4, 
    title = 'Upcoming Financial Events' 
}) => {
    const incomeItems = useSelector((state: RootState) => state.income.items);
    const expenseItems = useSelector((state: RootState) => state.expense.items);

    const calculateNextPayment = (startDate: string, frequency?: string): Date => {
        const today = new Date();
        let nextDate = new Date(startDate);

        if (!frequency) return nextDate;

        while (nextDate < today) {
            switch (frequency) {
                case 'weekly':
                    nextDate.setDate(nextDate.getDate() + 7);
                    break;
                case 'bi-weekly':
                    nextDate.setDate(nextDate.getDate() + 14);
                    break;
                case 'monthly':
                    nextDate.setMonth(nextDate.getMonth() + 1);
                    break;
                case 'quarterly':
                    nextDate.setMonth(nextDate.getMonth() + 3);
                    break;
            }
        }
        return nextDate;
    };

    //get recurring income
    const recurringIncome = incomeItems
        .filter(item => item.is_recurring)
        .map(item => ({
            id: item.id,
            description: item.description,
            amount: item.amount,
            dueDate: calculateNextPayment(item.date, item.frequency),
            type: 'income' as const
        }));

    //get recurring expenses
    const recurringExpenses = expenseItems
        .filter(item => item.is_recurring)
        .map(item => ({
            id: item.id,
            description: item.description,
            amount: item.amount,
            dueDate: calculateNextPayment(item.date, item.frequency),
            type: 'expense' as const
        }));

    //combine and sort by due date
    const upcomingEvents: UpcomingEvent[] = [...recurringIncome, ...recurringExpenses]
        .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
        .slice(0, maxEvents);

    const formatAmount = ((amount: number, type: 'income' | 'expense') => {
        const prefix = type === 'income' ? '+' : '-';
        return `${prefix}$${Math.abs(amount).toFixed(2)}`;
    });

    const formatDate = (date: Date) => {
        const today = new Date();
        const diffTime = date.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Tomorrow';
        if (diffDays < 7) return `In ${diffDays} days`;
        
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        });
    };

    return (
        <Card>
            <SectionTitle>{title}</SectionTitle>
            <EventsList>
                {upcomingEvents.length > 0 ? (
                    upcomingEvents.map((event: UpcomingEvent) => (
                        <EventItem key={event.id}>
                            <EventDetails>
                                <EventTitle>{event.description}</EventTitle>
                                <EventDate>Due {formatDate(event.dueDate)}</EventDate>
                            </EventDetails>
                            <EventAmount type={event.type}>
                                {formatAmount(event.amount, event.type)}
                            </EventAmount>
                        </EventItem>
                    ))
                ) : (
                    <EmptyState>
                        <EventTitle>No upcoming events</EventTitle>
                        <EventDate>All caught up!</EventDate>
                    </EmptyState>
                )}
            </EventsList>
        </Card>
    );
};

export default UpcomingEvents;