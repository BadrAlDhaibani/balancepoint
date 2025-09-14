import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { UpcomingEvent } from '../../store/slices/transactionSlice';
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

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ 
    maxEvents = 4, 
    title = 'Upcoming Financial Events' 
}) => {
    const upcomingEvents = useSelector((state: RootState) => state.transactions.upcomingEvents);

    const displayedEvents = upcomingEvents.slice(0, maxEvents);

    const formatAmount = ((amount: number, type: 'income' | 'expense') => {
        const prefix = type === 'income' ? '+' : '-';
        return `${prefix}$${Math.abs(amount).toFixed(2)}`;
    });

    return (
        <Card>
            <SectionTitle>{title}</SectionTitle>
            <EventsList>
                {displayedEvents.length > 0 ? (
                    displayedEvents.map((event: UpcomingEvent) => (
                        <EventItem key={event.id}>
                            <EventDetails>
                                <EventTitle>{event.description}</EventTitle>
                                <EventDate>Due {event.dueDate}</EventDate>
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