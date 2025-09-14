import styled from 'styled-components';

export const Card = styled.div`
    background-color: ${props => props.theme.colors.text.white};
    border-radius: ${props => props.theme.borderRadius.lg};
    padding: ${props => props.theme.spacing.lg};
    box-shadow: ${props => props.theme.shadows.md};
`;

export const SectionTitle = styled.h2`
    font-size: ${props => props.theme.fontSizes.lg};
    font-weight: 600;
    margin-bottom: ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.text.primary};
`;

export const InsightCard = styled.div<{ type: 'good' | 'warning' | 'info' }>`
    padding: ${props => props.theme.spacing.md};
    border-radius: ${props => props.theme.borderRadius.md};
    background-color: ${props => {
        switch (props.type) {
            case 'good':
                return props.theme.colors.accent.green;
            case 'warning':
                return props.theme.colors.accent.yellow;
            case 'info':
                return props.theme.colors.background.card;
        }
    }};
    margin-bottom: ${props => props.theme.spacing.sm};
    transition: all ${props => props.theme.transitions.fast};
    cursor: pointer;

    &:hover {
        transform: translateY(-2px);
        box-shadow: ${props => props.theme.shadows.md};
    }

    &:last-child {
        margin-bottom: 0;
    }
`;

export const InsightMessage = styled.div`
    font-weight: 600;
    color: ${props => props.theme.colors.text.primary};
    margin-bottom: ${props => props.theme.spacing.xs};
    line-height: 1.4;
`

export const InsightDetails = styled.div`
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.text.secondary};
    line-height: 1.4;
`;