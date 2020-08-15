import React from "react"
import styled from "styled-components"

export const Heading = ({ tag, children, ...otherProps }) => {
  const Htag = `h${tag}`
  const StyledHtag = styled(Htag)`
    color: ${props => props.theme.siteColors.darkColor};
    margin: 1.5em 0 .5em;
    line-height: 1.1;
  `
  return <StyledHtag {...otherProps}>{children}</StyledHtag>
}

export default Heading
