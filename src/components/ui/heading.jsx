import React from "react"
import styled from "styled-components"
import Theme from "../../styles/theme"

export const Heading = ({ tag, children }) => {
  const Htag = `h${tag}`
  const StyledHtag = styled(Htag)`
    color: ${Theme.layout.darkColor};
    margin: 1.5em 0 .5em;
    line-height: 1.1;
  `
  return <StyledHtag>{children}</StyledHtag>
}

export default Heading
