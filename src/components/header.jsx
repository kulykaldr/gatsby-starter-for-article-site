import React from "react"
import TopMenu from "./topMenu"
import Branding from "./branding"
import styled from "styled-components"

const Header = ({ title, subtitle }) => {
  return (
    <HeaderContainer itemScope itemType="http://schema.org/WPHeader">
      <Branding title={title} subtitle={subtitle}/>
      <TopMenu/>
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.header`
  position: relative;
  z-index: 20;
  width: ${props => props.theme.siteComponents.containerWidth};
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;

  @media (max-width: ${props => props.theme.siteBreakpoints.xl}) {
    padding: 0 20px;
  }
`
