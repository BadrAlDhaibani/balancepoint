import styled from 'styled-components';

export const PageContainer = styled.div`
    margin-left: 200px;
    margin-top: 80px;
    padding: ${props => props.theme.spacing.xl};
    flex: 1;
    min-height: calc(100vh - 80px);

    ${props => props.theme.mediaQueries.tablet} {
        margin-left: 180px;
        padding: ${props => props.theme.spacing.lg};
    }

    ${props => props.theme.mediaQueries.mobile} {
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

    ${props => props.theme.mediaQueries.mobileAndTablet} {
        grid-template-columns: 1fr;
        gap: ${props => props.theme.spacing.lg};
    }

    ${props => props.theme.mediaQueries.mobile} {
        gap: ${props => props.theme.spacing.md};
        margin-bottom: ${props => props.theme.spacing.lg};
    }
`;

export const FullWidthCard = styled.div`
    background-color: ${props => props.theme.colors.background.card};
    padding: ${props => props.theme.spacing.lg};
    height: fit-content;

    ${props => props.theme.mediaQueries.mobile} {
        padding: ${props => props.theme.spacing.md};
    }
`;