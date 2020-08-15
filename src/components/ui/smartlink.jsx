import React from "react"
import { Link as GatsbyLink } from "gatsby"
import styled from "styled-components"

/*
 * Used to dynamically swap CMS links with appropriate Gatsby links
 * Adapted from:
 * https://www.gatsbyjs.org/docs/gatsby-link/#use-link-only-for-internal-links
 */

export const SmartLink = ({ children, to, activeClassName, ...other }) => {
  // This assumes that any internal link (intended for Gatsby)
  // will start with one slash or a hash tag
  // eslint-disable-next-line
  const internal = /^\/(?![\/#])/.test(to)

  // Use Gatsby Link for internal links, and <a> for others
  return internal ? (
    <StyledGatsbyLink to={to} activeClassName={activeClassName} {...other}>
      {children}
    </StyledGatsbyLink>
  ) : (
    <StyledLink href={to} {...other}>
      {children}
    </StyledLink>
  )
}

const StyledGatsbyLink = styled(GatsbyLink)`
  color: ${props => props.theme.siteColors.primaryColor};
  transition: color 0.5s;

  &:hover {
    color: ${props => props.theme.siteColors.linkColorHover};
  }
`

const StyledLink = styled.a`
  color: ${props => props.theme.siteColors.primaryColor};
  transition: color 0.5s;

  &:hover {
    color: ${props => props.theme.siteColors.linkColorHover};
  }
`
