import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Insight } from '../../store/slices/transactionSlice';
import {
    Card,
    SectionTitle,
    InsightCard,
    InsightMessage,
    InsightDetails,
} from './smartInsightsStyled';

interface smartInsightsProps {
    maxInsights?: number;
}

const SmartInsights: React.FC<smartInsightsProps> = ({ maxInsights = 4 }) => {
    const insights = useSelector((state: RootState) => state.transactions.insights);

    const displayedInsights = insights.slice(0, maxInsights);

    return (
        <Card>
            <SectionTitle>Smart Insights</SectionTitle>
            {displayedInsights.length > 0 ? (
                displayedInsights.map((insight: Insight) => (
                    <InsightCard key={insight.id} type={insight.type}>
                        <InsightMessage>{insight.message}</InsightMessage>
                        {insight.details &&(
                            <InsightDetails>{insight.details}</InsightDetails>
                        )}
                    </InsightCard>
                ))
            ) : (
                <InsightCard type="info">
                    <InsightMessage>No insights available at the moment.</InsightMessage>
                    <InsightDetails>Check back later for personalized tips!</InsightDetails>
                </InsightCard>
            )}
        </Card>
    );
};

export default SmartInsights;
    