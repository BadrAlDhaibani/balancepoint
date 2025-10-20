import styled from 'styled-components';

export const Card = styled.div`
    background-color: ${props => props.theme.colors.background.card};
    padding: ${props => props.theme.spacing.lg};
`;

export const SectionTitle = styled.h2`
    font-size: ${props => props.theme.fontSizes.xl};
    font-weight: 400;
    margin-bottom: ${props => props.theme.spacing.sm};
    color: ${props => props.theme.colors.text.primary};
`;

export const EventsList = styled.div`
    display: flex;
    flex-direction: column;
`;

export const EventItem = styled.div`
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

export const EventDetails = styled.div`
    display: flex;
    flex-direction: column;
`;

export const EventTitle = styled.div`
    font-weight: 400;
    color: ${props => props.theme.colors.text.primary};
    font-size: ${props => props.theme.fontSizes.base};
`;

export const EventDate = styled.div`
    font-size: ${props => props.theme.fontSizes.base};
    color: ${props => props.theme.colors.text.secondary};
`;

export const EventAmount = styled.div<{ $type: 'income' | 'expense' }>`
    font-weight: 600;
    font-size: ${props => props.theme.fontSizes.base};
    color: ${props => props.$type === 'income'
        ? props.theme.colors.status.income
        : props.theme.colors.status.expense};
    text-align: right;
    min-width: fit-content;

    &::before {
        content: '${props => props.$type === 'income' ? '↗' : '↙'}';
        display: inline-block;
        margin-right: ${props => props.theme.spacing.xs};
        font-size: ${props => props.theme.fontSizes.base};
    }
`;

export const EmptyState = styled.div`
    display: flex;
    flex-direction: column;
    align-itmes: center;
    gap: ${props => props.theme.spacing.xs};
    padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.lg};
    text-align: center;

    ${EventTitle} {
        color: ${props => props.theme.colors.text.secondary};
    }
    
    ${EventDate} {
        color: ${props => props.theme.fontSizes.base};
    }
`;
