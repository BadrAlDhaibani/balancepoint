import styled from 'styled-components';

export const CardTitle = styled.h2`
    font-size: ${props => props.theme.fontSizes.xl};
    font-weight: 400;
    margin-bottom: ${props => props.theme.spacing.sm};
    color: ${props => props.theme.colors.text.primary};
`;

export const IncomeItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${props => props.theme.spacing.md} 0;
    border-bottom: 1px solid ${props => props.theme.colors.background.gray};
    transition: all ${props => props.theme.transitions.fast};

    &:hover {
        margin: 0 -${props => props.theme.spacing.xs};
        padding: ${props => props.theme.spacing.md};
    }
    &:last-child {
        border-bottom: none;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: ${props => props.theme.spacing.sm};
    }
`;

export const IncomeDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.spacing.xs};
    flex: 1;
`;

export const IncomeTitle = styled.h4`
    font-weight: 600;
    color: ${props => props.theme.colors.text.primary};
    font-size: ${props => props.theme.fontSizes.base};
`;

export const IncomeMeta = styled.p`
    font-size: ${props => props.theme.fontSizes.base};
    color: ${props => props.theme.colors.text.secondary};
`;

export const IncomeAmountContainer = styled.div`
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.sm};
    flex-shrink: 0;

    @media (max-width: 768px) {
        width: 100%;
        justify-content: space-between;
    }
`;

export const IncomeAmount = styled.span`
    font-weight: 600;
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.status.income};
`;

export const Badge = styled.span<{ variant: 'recurring' | 'manual' }>`
    font-size: ${props => props.theme.fontSizes.xs};
    font-weight: 600;
    text-transform: uppercase;

    ${props => props.variant === 'recurring' ? `
        color: ${props.theme.colors.primary};
    ` : `
        color: ${props.theme.colors.text.secondary};
    `}
`;

export const EmptyState = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${props => props.theme.spacing.xs};
    padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.lg};
    text-align: center;

    ${IncomeTitle} {
        color: ${props => props.theme.colors.text.secondary};
    }

    ${IncomeMeta} {
        font-size: ${props => props.theme.fontSizes.base};
    }
`;