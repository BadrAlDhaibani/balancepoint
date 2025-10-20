import styled from 'styled-components';

export const Card = styled.div`
    background-color: ${props => props.theme.colors.background.card};
    padding: ${props => props.theme.spacing.lg};

    ${props => props.theme.mediaQueries.mobile} {
        padding: ${props => props.theme.spacing.md};
    }
`;

export const SectionTitle = styled.h2`
    font-size: ${props => props.theme.fontSizes.xl};
    font-weight: 400;
    margin-bottom: ${props => props.theme.spacing.sm};
    color: ${props => props.theme.colors.text.primary};
`;

export const InsightCard = styled.div<{ $type: 'good' | 'warning' | 'info' }>`
    padding: ${props => props.theme.spacing.md};
    background-color: ${props => {
        switch (props.$type) {
            case 'good':
                return props.theme.colors.accent.green;
            case 'warning':
                return props.theme.colors.accent.yellow;
            case 'info':
                return props.theme.colors.background.gray;
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
    font-size: ${props => props.theme.fontSizes.base};
    font-weight: 400;
    color: ${props => props.theme.colors.text.primary};
`

export const InsightDetails = styled.div`
    font-size: ${props => props.theme.fontSizes.base};
    color: ${props => props.theme.colors.text.secondary};
`;