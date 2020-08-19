import React from "react"
import styled from "styled-components"
import slugify from "slugify"
import SmartLink from "../components/ui/smartlink"

const Breadcrumb = ({ crumb = "" }) => {
  const categoryPath = `/${slugify(crumb, { lower: true })}`

  return (
    <BreadcrumbStyled itemScope itemType="http://schema.org/BreadcrumbList">
      <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
        <SmartLink to={`/`} itemProp="item">
          <span itemProp="name">Главная</span>
        </SmartLink>
        <meta itemProp="position" content="0"/>
      </span>

      {crumb && <span>»</span>}

      {crumb && <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
        <SmartLink to={categoryPath} itemProp="item">
        <span itemProp="name">{crumb}</span>
        </SmartLink>
        <meta itemProp="position" content="0"/>
        </span>}
    </BreadcrumbStyled>
  )
}

export default Breadcrumb

const BreadcrumbStyled = styled.div`
  font-size: 80%;
  color: #999;
  padding-top: 20px;

  @media (max-width: ${props => props.theme.siteBreakpoints.sm}) {
    padding-left: 20px;
    padding-right: 20px;
  }

  a {
    color: ${props => props.theme.siteColors.primaryColorLighter};

    &:hover {
      text-decoration: underline;
    }
  }

  span {
    margin: 1px;
  }
`
