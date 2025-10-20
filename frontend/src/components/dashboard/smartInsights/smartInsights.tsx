import React from 'react';
import {
    Card,
    SectionTitle,
    InsightCard,
    InsightMessage,
    InsightDetails,
} from './smartInsightsStyled';

interface SmartInsightsProps {
    maxInsights?: number;
}

interface Insight {
    id: string;
    type: 'good' | 'warning' | 'info';
    message: string;
    details?: string;
}

// Mock insights - will be replaced with AI-generated insights later
const mockInsights: Insight[] = [
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
];

const SmartInsights: React.FC<SmartInsightsProps> = ({ maxInsights = 4 }) => {
    const displayedInsights = mockInsights.slice(0, maxInsights);

    return (
        <Card>
            <SectionTitle>Smart Insights</SectionTitle>
            {displayedInsights.map((insight: Insight) => (
                <InsightCard key={insight.id} $type={insight.type}>
                    <InsightMessage>{insight.message}</InsightMessage>
                    {insight.details && (
                        <InsightDetails>{insight.details}</InsightDetails>
                    )}
                </InsightCard>
            ))}
        </Card>
    );
};

export default SmartInsights;