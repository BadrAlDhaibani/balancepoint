import styled from 'styled-components';

export const Card = styled.div`
    background-color: ${props => props.theme.colors.background.card};
    padding: ${props => props.theme.spacing.lg};
    display: flex;
    flex-direction: column;
    height: fit-content;

    @media (max-width: 768px) {
        padding: ${props => props.theme.spacing.md};
    }
`;

export const CardTitle = styled.h2`
    font-size: ${props => props.theme.fontSizes.xl};
    font-weight: 400;
    margin-bottom: ${props => props.theme.spacing.sm};
    color: ${props => props.theme.colors.text.primary};
`;

export const SummaryStats = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.spacing.sm};
    flex: 1;

    @media (max-width: 768px) {
        gap: ${props => props.theme.spacing.md};
    }
`;

export const Stat = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.spacing.xs};
    padding: ${props => props.theme.spacing.sm};
    background-color: ${props => props.theme.colors.background.main};
    border-left: 4px solid ${props => props.theme.colors.status.income};
    transition: all ${props => props.theme.transitions.fast};

    &:hover {
        transform: translateX(8px);
        box-shadow: ${props => props.theme.shadows.sm};
    }
`;

export const StatLabel = styled.div`
    font-size: ${props => props.theme.fontSizes.base};
    color: ${props => props.theme.colors.text.secondary};
    text-transform: uppercase;
    font-weight: 400;
`;

export const StatValue = styled.div`
    font-size: ${props => props.theme.fontSizes.xl};
    font-weight: 600;
    color: ${props => props.theme.colors.status.income};

    @media (max-width: 768px) {
        font-size: ${props => props.theme.fontSizes.xl};
    }
`;