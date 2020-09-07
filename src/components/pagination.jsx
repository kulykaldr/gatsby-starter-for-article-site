import React from "react"
import { styled, theme } from "twin.macro"
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

  @media (max-width: ${theme`screens.md`}) {
    width: 90%;
  }
`

const PageBtn = styled(SmartLink)`
  border-radius: 3px;
  background-color: ${theme`colors.gray.900`};
  border: 1px solid ${theme`colors.gray.900`};
  color: ${theme`colors.gray.100`};
  padding: 8px 20px;
  min-width: 140px;
  transition: background-color .5s;

  &:hover {
    background-color: ${theme`colors.gray.100`};
    color: ${theme`colors.gray.900`};
    border: 1px solid ${theme`colors.gray.900`};
  }
`

const PreviousBtn = styled(PageBtn)`
  order: 1;
  @media (max-width: ${theme`screens.sm`}) {
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

  @media (max-width: ${theme`screens.sm`}) {
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
  @media (max-width: ${theme`screens.sm`}) {
    order: 1;
    width: 100%;
    text-align: center;
  }
`
