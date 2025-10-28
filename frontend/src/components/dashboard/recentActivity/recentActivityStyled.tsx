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
    padding: ${props => props.theme.spacing.sm} 0;
    border-bottom: 1px solid ${props => props.theme.colors.background.gray};
    transition: all ${props => props.theme.transitions.fast};
    gap: ${props => props.theme.spacing.sm};

    ${props => props.theme.mediaQueries.mobile} {
        flex-wrap: wrap;
        align-items: flex-start;
        padding: ${props => props.theme.spacing.sm} 0;
    }

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
    min-width: 0;

    ${props => props.theme.mediaQueries.mobile} {
        width: 100%;
    }
`;

export const ActivityTitle = styled.div`
    font-weight: 400;
    color: ${props => props.theme.colors.text.primary};
    font-size: ${props => props.theme.fontSizes.base};
    word-break: break-word;

    ${props => props.theme.mediaQueries.mobile} {
        font-size: ${props => props.theme.fontSizes.sm};
    }
`;

export const ActivityMeta = styled.div`
    font-size: ${props => props.theme.fontSizes.base};
    color: ${props => props.theme.colors.text.secondary};

    ${props => props.theme.mediaQueries.mobile} {
        font-size: ${props => props.theme.fontSizes.xs};
    }
`;

export const ActivityAmount = styled.div<{ $type: 'income' | 'expense' }>`
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.sm};
    flex-shrink: 0;
    font-weight: 600;
    font-size: ${props => props.theme.fontSizes.base};
    color: ${props => props.$type === 'income'
        ? props.theme.colors.status.income
        : props.theme.colors.status.expense};
    text-align: right;
    white-space: nowrap;

    ${props => props.theme.mediaQueries.mobile} {
        width: 100%;
        justify-content: space-between;
        align-items: flex-end;
        font-size: ${props => props.theme.fontSizes.sm};
        margin-top: ${props => props.theme.spacing.xs};
    }
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