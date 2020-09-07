import React from "react"
import { Link as GatsbyLink } from "gatsby"
import tw from 'twin.macro'

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

export default SmartLink

const styledLink = `text-primary transition-colors duration-500 hover:text-secondary`

const StyledGatsbyLink = tw(GatsbyLink)`
  ${styledLink}
`

const StyledLink = tw.a`
  ${styledLink}
`
