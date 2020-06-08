import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Theme from "../styles/theme"

const PaginationWrapper = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  /*margin-top: 4em;*/
  justify-content: space-between;
  width: 100%;
  max-width: 770px;
  margin: 0px auto;

  @media (max-width: ${Theme.breakpoints.md}) {
    width: 90%;
  }
`

const PageBtn = styled(Link)`
  border-radius: 3px;
  background-color: ${Theme.layout.darkColor};
  border: 1px solid ${Theme.layout.darkColor};
  color: ${Theme.layout.backgroundColor};
  padding: 8px 20px;
  min-width: 140px;
  transition: background-color .5s;

  &:hover {
    background-color: ${Theme.layout.backgroundColor};
    color: ${Theme.layout.darkColor};
    border: 1px solid ${Theme.layout.darkColor};
  }
`

const PreviousBtn = styled(PageBtn)`
  order: 1;
  @media (max-width: ${Theme.breakpoints.sm}) {
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

  @media (max-width: ${Theme.breakpoints.sm}) {
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
  @media (max-width: ${Theme.breakpoints.sm}) {
    order: 1;
    width: 100%;
    text-align: center;
  }
`

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
