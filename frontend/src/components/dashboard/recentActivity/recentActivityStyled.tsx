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
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
        background: none;
        border: none;
        color: ${props => props.theme.colors.primary};
        font-weight: 400;
        font-size: ${props => props.theme.fontSizes.base};
        cursor: pointer;
        padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
        border-radius: ${props => props.theme.borderRadius.sm};
        transition: all ${props => props.theme.transitions.fast};

        &:hover {
            font-weight: 600;
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
        padding: ${props => props.theme.spacing.sm};
    }

    &:last-child {
        border-bottom: none;
    }
`;

export const ActivityDetails = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const ActivityTitle = styled.div`
    font-weight: 400;
    color: ${props => props.theme.colors.text.primary};
    font-size: ${props => props.theme.fontSizes.base};
`;

export const ActivityMeta = styled.div`
    font-size: ${props => props.theme.fontSizes.base};
    color: ${props => props.theme.colors.text.secondary};
    display: flex;
    align-items: center;
`;

export const ActivityType = styled.span<{
    $type: 'income' | 'expense';
    $isRecurring: boolean
}>`
    display: inline-flex;
    align-items: center;
    padding: 2px ${props => props.theme.spacing.xs};
    border-radius: ${props => props.theme.borderRadius.sm};
    font-size: ${props => props.theme.fontSizes.xs};
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-left: auto;

    font-weight: ${props => {
        if (props.$isRecurring) {
            return 600;
        }
        return 400;
    }};

    color: ${props => {
        if (props.$isRecurring) {
            return props.theme.colors.primary;
        }
        return props.theme.colors.text.secondary;
    }};
`;

export const ActivityAmount = styled.div<{ $type: 'income' | 'expense' }>`
    font-weight: 600;
    font-size: ${props => props.theme.fontSizes.base};
    color: ${props => props.$type === 'income'
        ? props.theme.colors.status.income
        : props.theme.colors.status.expense};
    text-align: right;
    min-width: fit-content;
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