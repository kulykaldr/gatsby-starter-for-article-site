import { styled, theme } from "twin.macro"

export const Container = styled.div`
  width: 1160px;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;

  @media (max-width: ${theme`screens.xl`}) {
    padding: 0 20px;
  }
`;

export const Grid = styled(Container)`
  display: grid;
  grid-template-columns: repeat(${props => props.columns ? props.columns : 1}, 1fr);
  grid-gap: 30px;

  @media (max-width: ${theme`screens.sm`}) {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
`;
