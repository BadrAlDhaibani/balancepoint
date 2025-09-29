import styled from 'styled-components';

export const PageContainer = styled.div`
    margin-left: 200px; /*accounting for fixed sidebar*/
    margin-top: 80px;
    padding: ${props => props.theme.spacing.xl};
    flex: 1;
    min-height: calc(100vh - 80px);

    @media (max-width: 768px) {
        margin-left: 0;
        margin-top: 60px;
        padding: ${props => props.theme.spacing.md};
    }
`;

export const ContentGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${props => props.theme.spacing.xl};
    margin-bottom: ${props => props.theme.spacing.xl};

    @meda (max-width: 1024px) {
        grid-template-columns: 1fr;
        gap: ${props => props.theme.spacing.lg};
    }
`;

export const FullWidthCard = styled.div`
    background-color: ${props => props.theme.colors.background.card};
    padding: ${props => props.theme.spacing.lg};
    height: fit-content;

    @media (max-wdith: 768px){
        padding: ${props => props.theme.spacing.md};
    }
`;