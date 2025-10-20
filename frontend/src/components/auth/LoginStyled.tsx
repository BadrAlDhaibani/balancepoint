import styled from 'styled-components';

export const AuthContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: ${props => props.theme.colors.background.main};
    padding: ${props => props.theme.spacing.lg};
`;

export const AuthCard = styled.div`
    background-color: ${props => props.theme.colors.background.card};
    padding: ${props => props.theme.spacing.xl};
    border-radius: ${props => props.theme.borderRadius.lg};
    box-shadow: ${props => props.theme.shadows.lg};
    width: 100%;
    max-width: 400px;
`;

export const Logo = styled.h1`
    font-size: ${props => props.theme.fontSizes['3xl']};
    font-weight: 700;
    color: ${props => props.theme.colors.primary};
    text-align: center;
    margin-bottom: ${props => props.theme.spacing.md};
`;

export const Title = styled.h2`
    font-size: ${props => props.theme.fontSizes.xl};
    font-weight: 400;
    color: ${props => props.theme.colors.text.primary};
    text-align: center;
    margin-bottom: ${props => props.theme.spacing.xl};
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.spacing.lg};
`;

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.spacing.xs};
`;

export const Label = styled.label`
    font-size: ${props => props.theme.fontSizes.base};
    color: ${props => props.theme.colors.text.primary};
    font-weight: 500;
`;

export const Input = styled.input`
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    border: 1px solid ${props => props.theme.colors.background.gray};
    border-radius: ${props => props.theme.borderRadius.sm};
    font-size: ${props => props.theme.fontSizes.base};
    background-color: ${props => props.theme.colors.background.main};
    transition: all ${props => props.theme.transitions.fast};

    &:focus {
        outline: none;
        border-color: ${props => props.theme.colors.primary};
        box-shadow: 0 0 0 2px ${props => props.theme.colors.secondary};
    }

    &::placeholder {
        color: ${props => props.theme.colors.text.secondary};
    }
`;

export const Button = styled.button`
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.text.white};
    border: none;
    border-radius: ${props => props.theme.borderRadius.sm};
    font-size: ${props => props.theme.fontSizes.base};
    font-weight: 600;
    cursor: pointer;
    transition: all ${props => props.theme.transitions.fast};

    &:hover {
        transform: translateY(-2px);
        box-shadow: ${props => props.theme.shadows.md};
        filter: brightness(1.05);
    }

    &:active {
        transform: translateY(0);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
    }
`;

export const ErrorMessage = styled.div`
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    background-color: ${props => props.theme.colors.accent.red};
    color: ${props => props.theme.colors.status.critical};
    border-radius: ${props => props.theme.borderRadius.sm};
    font-size: ${props => props.theme.fontSizes.sm};
    text-align: center;
`;

export const LinkText = styled.p`
    text-align: center;
    font-size: ${props => props.theme.fontSizes.base};
    color: ${props => props.theme.colors.text.secondary};
    margin-top: ${props => props.theme.spacing.lg};

    a {
        color: ${props => props.theme.colors.primary};
        font-weight: 600;
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }
    }
`;