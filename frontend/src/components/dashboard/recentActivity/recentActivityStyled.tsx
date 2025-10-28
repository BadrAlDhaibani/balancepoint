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
    gap: ${props => props.theme.spacing.sm};

    ${props => props.theme.mediaQueries.mobile} {
        font-size: ${props => props.theme.fontSizes.lg};
        flex-wrap: wrap;
    }

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
        white-space: nowrap;

        &:hover {
            font-weight: 600;
        }

        ${props => props.theme.mediaQueries.mobile} {
            font-size: ${props => props.theme.fontSizes.sm};
            padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.xs};
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
    padding: ${props => props.theme.spacing.md} 0;
    border-bottom: 1px solid ${props => props.theme.colors.background.gray};
    transition: all ${props => props.theme.transitions.fast};
    gap: ${props => props.theme.spacing.sm};

    &:hover {
        margin: 0 -${props => props.theme.spacing.xs};
        padding: ${props => props.theme.spacing.md};
    }

    &:last-child {
        border-bottom: none;
    }

    ${props => props.theme.mediaQueries.mobile} {
        flex-direction: column;
        align-items: flex-start;
        gap: ${props => props.theme.spacing.sm};
    }
`;

export const ActivityDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.spacing.xs};
    flex: 1;
`;

export const ActivityTitle = styled.h4`
    font-weight: 600;
    color: ${props => props.theme.colors.text.primary};
    font-size: ${props => props.theme.fontSizes.base};
`;

export const ActivityMeta = styled.p`
    font-size: ${props => props.theme.fontSizes.base};
    color: ${props => props.theme.colors.text.secondary};
`;

export const ActivityAmountContainer = styled.div`
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.sm};
    flex-shrink: 0;

    @media (max-width: 768px) {
        width: 100%;
        justify-content: space-between;
    }
`;

export const ActivityAmount = styled.span<{ $type: 'income' | 'expense' }>`
    font-weight: 600;
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.$type === 'income'
        ? props.theme.colors.status.income
        : props.theme.colors.status.expense};
`;

export const ActivityType = styled.span<{
    $type: 'income' | 'expense';
    $isRecurring: boolean
}>`
    font-size: ${props => props.theme.fontSizes.xs};
    font-weight: 600;
    text-transform: uppercase;

    color: ${props => {
        if (props.$isRecurring) {
            return props.theme.colors.primary;
        }
        return props.theme.colors.text.secondary;
    }};
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