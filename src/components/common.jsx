import styled from "styled-components"

export const Container = styled.div`
  width: ${props => props.theme.siteComponents.containerWidth};
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;

  @media (max-width: ${props => props.theme.siteBreakpoints.xl}) {
    padding: 0 20px;
  }
`;

export const Grid = styled(Container)`
  display: grid;
  grid-template-columns: repeat(${props => props.columns ? props.columns : 1}, 1fr);
  grid-gap: 30px;

  @media (max-width: ${props => props.theme.siteBreakpoints.sm}) {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
`;
