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

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({
    maxEvents = 4,
    title = 'Upcoming Financial Events'
}) => {
    const dashboardData = useSelector((state: RootState) => state.dashboard.data);
    const loading = useSelector((state: RootState) => state.dashboard.loading);

    const formatAmount = (amount: number, type: 'income' | 'expense') => {
        const prefix = type === 'income' ? '+' : '-';
        return `${prefix}$${Math.abs(amount).toFixed(2)}`;
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);

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

    if (loading || !dashboardData) {
        return (
            <Card>
                <SectionTitle>{title}</SectionTitle>
                <EventsList>
                    <EmptyState>
                        <EventTitle>Loading...</EventTitle>
                    </EmptyState>
                </EventsList>
            </Card>
        );
    }

    const upcomingEvents = dashboardData.upcoming_events.slice(0, maxEvents);

    return (
        <Card>
            <SectionTitle>{title}</SectionTitle>
            <EventsList>
                {upcomingEvents.length > 0 ? (
                    upcomingEvents.map((event) => (
                        <EventItem key={event.id}>
                            <EventDetails>
                                <EventTitle>{event.description}</EventTitle>
                                <EventDate>Due {formatDate(event.date)}</EventDate>
                            </EventDetails>
                            <EventAmount $type={event.type}>
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
