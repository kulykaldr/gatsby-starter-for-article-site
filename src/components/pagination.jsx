import React from "react"
import styled from "styled-components"
import SmartLink from "../components/ui/smartlink"

const Pagination = ({ humanPageNumber, numberOfPages, previousPagePath, nextPagePath }) => {

  return (
    <PaginationWrapper>
      {previousPagePath ? (
        <PreviousBtn to={previousPagePath}>‹ Предыдущая</PreviousBtn>
      ) : (
        <Spacer className="previous"/>
      )}

      {numberOfPages > 1 && <PageInfo>
        Страница {humanPageNumber} из {numberOfPages}
      </PageInfo>}

      {nextPagePath ? (
        <NextBtn to={nextPagePath}>Следующая ›</NextBtn>
      ) : (
        <Spacer className="next"/>
      )}
    </PaginationWrapper>
  )
}

export default Pagination

const PaginationWrapper = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  /*margin-top: 4em;*/
  justify-content: space-between;
  width: 100%;
  max-width: 770px;
  margin: 0 auto;

  @media (max-width: ${props => props.theme.siteBreakpoints.md}) {
    width: 90%;
  }
`

const PageBtn = styled(SmartLink)`
  border-radius: 3px;
  background-color: ${props => props.theme.siteColors.darkColor};
  border: 1px solid ${props => props.theme.siteColors.darkColor};
  color: ${props => props.theme.siteColors.backgroundColor};
  padding: 8px 20px;
  min-width: 140px;
  transition: background-color .5s;

  &:hover {
    background-color: ${props => props.theme.siteColors.backgroundColor};
    color: ${props => props.theme.siteColors.darkColor};
    border: 1px solid ${props => props.theme.siteColors.darkColor};
  }
`

const PreviousBtn = styled(PageBtn)`
  order: 1;
  @media (max-width: ${props => props.theme.siteBreakpoints.sm}) {
    order: 2;
  }
`

const NextBtn = styled(PageBtn)`
  order: 3;
`

const Spacer = styled.span`
  display: block;
  min-width: 140px;

  &.previous {
    order: 1;
  }

  &.next {
    order: 3;
  }

  @media (max-width: ${props => props.theme.siteBreakpoints.sm}) {
    display: none;

    &.previous {
      order: 2;
    }

    &.next {
      order: 3;
    }
  }
`

const PageInfo = styled.span`
  order: 2;
  padding: 1em 0;
  @media (max-width: ${props => props.theme.siteBreakpoints.sm}) {
    order: 1;
    width: 100%;
    text-align: center;
  }
`
