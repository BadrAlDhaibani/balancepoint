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

export const BalanceAmount = styled.div`
    font-size: ${props => props.theme.fontSizes['4xl']};
    font-weight: 600;
    color: ${props => props.theme.colors.text.primary};
    margin-bottom: ${props => props.theme.spacing.xs};
    line-height: 1.2;

    ${props => props.theme.mediaQueries.mobile} {
        font-size: ${props => props.theme.fontSizes['2xl']};
    }
`;

export const BalanceLabel = styled.div`
    font-size: ${props => props.theme.fontSizes.base};
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
    font-size: ${props => props.theme.fontSizes.lg};
    font-weight: 500;
    margin-bottom: ${props => props.theme.spacing.lg};
    text-transform: uppercase;

    &::before {
        content: '';
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        background-image: ${props => props.theme.icons.status[props.status]};
        background-size: 30px 30px;
        background-repeat: no-repeat;
        background-position: center;
    }
`;

export const HealthStatusLabel = styled.span`
    color: ${props => props.theme.colors.text.secondary};
`

export const HealthStatusValue = styled.span<{ status: 'good' | 'warning' | 'critical' }>`
    color: ${props => props.theme.colors.status[props.status]};
`

export const RatioSection = styled.div`
    margin-bottom: ${props => props.theme.spacing.lg};
`;

export const RatioLabel = styled.div`
    font-size: ${props => props.theme.fontSizes.lg};
    font-weight: 500;
    text-transform: uppercase;
    color: ${props => props.theme.colors.text.secondary};
    margin-bottom: ${props => props.theme.spacing.xs};
`;

export const RatioProgress = styled.div`
    height: 20px;
    background-color: ${props => props.theme.colors.background.gray};
    overflow: hidden;
    margin-bottom: ${props => props.theme.spacing.xs};
`;

export const RatioFill = styled.div<{ percentage: number }>`
    height: 100%;
    width: ${props => props.percentage}%;
    background-color: ${props => {
        const percentage = props.percentage;
        if (percentage <= 100/3) {
            return props.theme.colors.status.critical; // Red for 0%-1/3
        } else if (percentage <= 200/3) {
            return props.theme.colors.status.warning; // Yellow for 1/3-2/3
        } else {
            return props.theme.colors.status.good; // Green for 2/3-100%
        }
    }};
    transition: width ${props => props.theme.transitions.slow}, background-color ${props => props.theme.transitions.slow};
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
        content: '${props => Math.round(props.percentage)}%';
        font-size: ${props => props.theme.fontSizes.xs};
        font-weight: 600;
        color: ${props => props.theme.colors.text.white};
        white-space: nowrap;
    }
`;

export const RatioGap = styled.div<{ percentage: number }>`
    height: 100%;
    width: ${props => 100 - props.percentage}%;
    background-color: ${props => props.theme.colors.background.gray};
    display: flex;
    align-items: center;
    justify-content: center;
    
    &::before {
        content: '${props => Math.round(100 - props.percentage)}%';
        font-size: ${props => props.theme.fontSizes.xs};
        font-weight: 600;
        color: ${props => props.theme.colors.text.secondary};
        white-space: nowrap;
    }
`;

export const RatioText = styled.div`
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.text.secondary};
    font-weight: 400;
    margin-top: -2px;
`;

export const NextIncomeSection = styled.div`
    padding-top: ${props => props.theme.spacing.md};
    border-top: 1px solid ${props => props.theme.colors.background.gray};
`;

export const NextIncomeLabel = styled.div`
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.text.secondary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

export const NextIncomeDays = styled.div`
    font-size: ${props => props.theme.fontSizes['3xl']};
    font-weight: 700;
    color: ${props => props.theme.colors.text.primary};

    ${props => props.theme.mediaQueries.mobile} {
        font-size: ${props => props.theme.fontSizes.xl};
    }
`;

export const NextIncomeDetails = styled.div`
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.text.secondary};
    line-height: 1.4;
`;