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
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
        background: none;
        border: none;
        color: ${props => props.theme.colors.primary};
        font-weight: 500;
        cursor: pointer;
        padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
        border-radius: ${props => props.theme.borderRadius.sm};
        transition: all ${props => props.theme.transitions.fast};

        &:hover {
            background-color: ${props => props.theme.colors.secondary};
        }
    }
`;

export const ActivityList = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ActivityItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${props => props.theme.spacing.sm} 0;
    border-bottom: 1px solid ${props => props.theme.colors.background.gray};
    transition: all ${props => props.theme.transitions.fast};

    &:hover {
        background-color: ${props => props.theme.colors.background.card};
        margin: 0 -${props => props.theme.spacing.sm};
        padding: ${props => props.theme.spacing.sm};
        border-radius: ${props => props.theme.borderRadius.sm};
        border-bottom: 1px solid transparent;
    }

    &:last-child {
        border-bottom: none;
    }

    &:first-child {
        padding-top: 0;
    }
`;

export const ActivityDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.spacing.xs};
    flex: 1;
`;

export const ActivityTitle = styled.div`
    font-weight: 500;
    color: ${props => props.theme.colors.text.primary};
    font-size: ${props => props.theme.fontSizes.base};
    line-height: 1.4;
`;

export const ActivityMeta = styled.div`
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.text.secondary};
    line-height: 1.3;
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.xs};
`;

export const ActivityType = styled.span<{ 
    type: 'income' | 'expense'; 
    isRecurring: boolean 
}>`
    display: inline-flex;
    align-items: center;
    padding: 2px ${props => props.theme.spacing.xs};
    border-radius: ${props => props.theme.borderRadius.sm};
    font-size: ${props => props.theme.fontSizes.xs};
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-left: auto;

    background-color: ${props => {
        if (props.isRecurring) {
            return props.theme.colors.accent.yellow;
        }
        return props.theme.colors.background.card;
    }};

    color: ${props => {
        if (props.isRecurring) {
            return props.theme.colors.text.primary;
        }
        return props.theme.colors.text.secondary;
    }};

    &::before {
        content: '${props => props.isRecurring ? '🔁' : '✋'}';
        margin-right: 4px;
        font-size: 10px;
    }
`;

export const ActivityAmount = styled.div<{ type: 'income' | 'expense' }>`
    font-weight: 600;
    font-size: ${props => props.theme.fontSizes.base};
    color: ${props => props.type === 'income'
        ? props.theme.colors.status.income
        : props.theme.colors.status.expense};
    text-align: right;
    min-width: fit-content;
    padding-left: ${props => props.theme.spacing.sm};

    &::after {
        content: '${props => props.type === 'income' ? '+' : '-'}';
        margin-left: ${props => props.theme.spacing.xs};
        font-size: ${props => props.theme.fontSizes.sm};
        opacity: 0.6;
    }
`;

export const EmptyState = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${props => props.theme.spacing.xs};
    padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.lg};
    text-align: center;

    ${ActivityTitle} {
        color: ${props => props.theme.colors.text.secondary};
    }

    ${ActivityMeta} {
        font-size: ${props => props.theme.fontSizes.base};
    }
`;