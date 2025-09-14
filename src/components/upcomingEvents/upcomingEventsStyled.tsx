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
        margin: 0 -${props => props.theme.spacing.sm};
        padding: ${props => props.theme.spacing.sm};
        border-radius: ${props => props.theme.borderRadius.sm};
        border-bottom: 1px solid transparent;
    }

    &:last-child {
        border-bottom: none;
        margin-bottom: 0;
    }
    
    &:first-child {
        padding-top: 0;
    }
`;

export const EventDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.spacing.xs};
`;

export const EventTitle = styled.div`
    font-weight: 500;
    color: ${props => props.theme.colors.text.primary};
    font-size: ${props => props.theme.fontSizes.base};
    line-height: 1.4;
`;

export const EventDate = styled.div`
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.text.secondary};
    line-height: 1.3;
`;

export const EventAmount = styled.div<{ type: 'income' | 'expense' }>`
    font-weight: 600;
    font-size: ${props => props.theme.fontSizes.base};
    color: ${props => props.type === 'income' 
        ? props.theme.colors.status.income 
        : props.theme.colors.status.expense};
    text-align: right;
    min-width: fit-content;
    padding-left: ${props => props.theme.spacing.sm};

    &::before {
    content: '${props => props.type === 'income' ? '↗' : '↙'}';
    display: inline-block;
    margin-right: ${props => props.theme.spacing.xs};
    font-size: ${props => props.theme.fontSizes.sm};
    opacity: 0.7;
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
