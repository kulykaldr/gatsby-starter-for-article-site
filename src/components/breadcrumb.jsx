import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import Theme from "../styles/theme"
import slugify from "slugify"

const Breadcrumb = ({ crumb = "" }) => {
  const categoryPath = `/${slugify(crumb, { lower: true })}`

  return (
    <BreadcrumbStyled itemScope itemType="http://schema.org/BreadcrumbList">
      <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
        <Link to={`/`} itemProp="item">
          <span itemProp="name">Главная</span>
        </Link>
        <meta itemProp="position" content="0"/>
      </span>

      {crumb && <span>»</span>}

      {crumb && <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
        <Link to={categoryPath} itemProp="item">
        <span itemProp="name">{crumb}</span>
        </Link>
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

  @media (max-width: ${Theme.breakpoints.sm}) {
    padding-left: 20px;
    padding-right: 20px;
  }

  a {
    color: ${Theme.layout.primaryColorLighter};

    &:hover {
      text-decoration: underline;
    }
  }

  span {
    margin: 1px;
  }
`
