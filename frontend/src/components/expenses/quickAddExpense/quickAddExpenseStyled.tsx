import styled from 'styled-components';

export const QuickAddSection = styled.div`
    background-color: ${props => props.theme.colors.accent.red};
    padding: ${props => props.theme.spacing.lg};
    margin-bottom: ${props => props.theme.spacing.xl};
    border: 1px solid ${props => props.theme.colors.status.expense};

    ${props => props.theme.mediaQueries.mobile} {
        padding: ${props => props.theme.spacing.md};
        margin-bottom: ${props => props.theme.spacing.lg};
    }
`;

export const QuickAddTitle = styled.h3`
    margin-bottom: ${props => props.theme.spacing.sm};
    color: ${props => props.theme.colors.status.expense};
    font-size: ${props => props.theme.fontSizes.xl};
    font-weight: 600;
`;

export const FormRow = styled.div`
    display: flex;
    gap: ${props => props.theme.spacing.md};
    margin-bottom: ${props => props.theme.spacing.md};

    ${props => props.theme.mediaQueries.mobile} {
        flex-direction: column;
        gap: ${props => props.theme.spacing.sm};
    }
`;

export const FormGroup = styled.div`
    flex: 1;
    min-width: 200px;

    ${props => props.theme.mediaQueries.mobile} {
        min-width: 100%;
    }
`;

export const Label = styled.label`
    display: block;
    margin-bottom: ${props => props.theme.spacing.xs};
    font-weight: 400;
    font-size: ${props => props.theme.fontSizes.base};
    color: ${props => props.theme.colors.text.primary};
`;

export const Input = styled.input`
    width: 100%;
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.sm};
    border: 1px solid ${props => props.theme.colors.background.gray};
    font-size: ${props => props.theme.fontSizes.base};
    background-color: ${props => props.theme.colors.background.main};
    transition: all ${props => props.theme.transitions.fast};
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: ${props => props.theme.colors.primary};
        box-shadow: 0 0 0 2px ${props => props.theme.colors.secondary};
    }
    &::placeholder {
        color: ${props => props.theme.colors.text.secondary};
    }
    &:hover {
        border-color: ${props => props.theme.colors.primary};
    }
    &[type="number"] {
        -moz-appearance: textfield;
    }
    &[type="number"]::-webkit-outer-spin-button,
    &[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

export const Select = styled.select`
    width: 100%;
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.sm};
    border: 1px solid ${props => props.theme.colors.background.gray};
    font-size: ${props => props.theme.fontSizes.base};
    color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.background.main};
    transition: all ${props => props.theme.transitions.fast};
    cursor: pointer;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: ${props => props.theme.colors.primary};
        box-shadow: 0 0 0 2px ${props => props.theme.colors.secondary};
    }
    &:hover {
        border-color: ${props => props.theme.colors.primary};
    }
    option {
        padding: ${props => props.theme.spacing.xs};
        color: ${props => props.theme.colors.primary};
    }
`;

export const ActionButtons = styled.div`
    display: flex;
    gap: ${props => props.theme.spacing.sm};

    ${props => props.theme.mediaQueries.mobile} {
        flex-direction: column;
    }
`;

export const Button = styled.button`
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
    border: none;
    font-weight: 400;
    font-size: ${props => props.theme.fontSizes.base};
    cursor: pointer;
    transition: all ${props => props.theme.transitions.fast};
    font-family: ${props => props.theme.fonts.primary};

    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.text.white};

    &:hover {
        transform: translateY(-2px);
        box-shadow: ${props => props.theme.shadows.md};
        background-color: ${props => props.theme.colors.primary};
        filter: brightness(1.05);
    }

    &:active {
        transform: translateY(0);
        box-shadow: ${props => props.theme.shadows.sm};
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }

    ${props => props.theme.mediaQueries.mobile} {
        width: 100%;
        padding: ${props => props.theme.spacing.md};
    }
`;