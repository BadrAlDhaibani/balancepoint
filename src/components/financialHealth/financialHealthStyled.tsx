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

export const BalanceAmount = styled.div`
    font-size: ${props => props.theme.fontSizes['2xl']};
    font-weight: 700;
    color: ${props => props.theme.colors.text.primary};
    margin-bottom: ${props => props.theme.spacing.xs};
    line-height: 1.2;
`;

export const BalanceLabel = styled.div`
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.text.secondary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: ${props => props.theme.spacing.md};
    line-height: 1.3;
`;

export const HealthStatus = styled.div<{ status: 'good' | 'warning' | 'critical' }>`
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.xs};
    font-size: ${props => props.theme.fontSizes.sm};
    font-weight: 500;
    color: ${props => props.theme.colors.status[props.status]};
    margin-bottom: ${props => props.theme.spacing.lg};

    &::before {
        content: '${props => {
            switch (props.status) {
                case 'good':
                    return '✔';
                case 'warning':
                    return '⚠';
                case 'critical':
                    return '✖';
            }
        }}';
        display: flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        border-radius: ${props => props.theme.borderRadius.full};
        background-color: ${props => props.theme.colors.status[props.status]};
        color: ${props => props.theme.colors.text.white};
        font-size: 11px;
        font-weight: bold;
    }
`;

export const RatioSection = styled.div`
    margin-bottom: ${props => props.theme.spacing.lg};
`;

export const RatioLabel = styled.div`
    font-size: ${props => props.theme.fontSizes.sm};
    font-weight: 500;
    color: ${props => props.theme.colors.text.secondary};
    margin-bottom: ${props => props.theme.spacing.xs};
`;

export const RatioProgress = styled.div`
    height: 10px;
    background-color: ${props => props.theme.colors.background.gray};
    border-radius: ${props => props.theme.borderRadius.full};
    overflow: hidden;
    margin-bottom: ${props => props.theme.spacing.xs};
`;

export const RatioFill = styled.div<{ percentage: number }>`
    height: 100%;
    width: ${props => props.percentage}%;
    background: linear-gradient(90deg,
        ${props => props.theme.colors.accent.green} 0%,
        ${props => props.theme.colors.accent.yellow} 50%,
        ${props => props.theme.colors.accent.red} 100%);
    transition: width ${props => props.theme.transitions.fast};
    );
    border-radius: ${props => props.theme.borderRadius.full};
    transitions: width ${props => props.theme.transitions.slow};
    position: relative;

    &::after {
        content: '';
        position: absolute;
        right: -2px;
        top: 50%;
        transform: translateY(-50%);
        width: 4px;
        height: 4px;
        background-color: ${props => props.theme.colors.text.white};
        border-radius: ${props => props.theme.borderRadius.full};
    }
`;

export const RatioText = styled.div<{ secondary?: boolean }>`
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.secondary 
        ? props.theme.colors.text.secondary 
        : props.theme.colors.text.primary};
    font-weight: ${props => props.secondary ? 400 : 500};
    margin-top: ${props => props.secondary ? '2px' : '0'};
`;

export const NextIncomeSection = styled.div`
    padding-top: ${props => props.theme.spacing.md};
    border-top: 1px solid ${props => props.theme.colors.background.gray};
`;

export const NextIncomeLabel = styled.div`
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.text.secondary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: ${props => props.theme.spacing.xs};
`;

export const NextIncomeDays = styled.div`
    font-size: ${props => props.theme.fontSizes.xl};
    font-weight: 700;
    color: ${props => props.theme.colors.text.primary};
    margin-bottom: ${props => props.theme.spacing.xs};
`;

export const NextIncomeDetails = styled.div`
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.text.secondary};
    line-height: 1.4;
`;