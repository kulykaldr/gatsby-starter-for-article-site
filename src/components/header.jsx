import React from "react"
import Navigation from "./navigation"
import Branding from "./branding"
import styled from "styled-components"
import Theme from "../styles/theme";

const HeaderContainer = styled.header`
  position: relative;
  z-index: 20;
  width: ${Theme.components.container.width};
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;

  @media (max-width: ${Theme.breakpoints.xl}) {
    padding: 0 20px;
  }
`

const Header = ({title, subtitle, menu, search = true}) => {
  return (
    <HeaderContainer itemScope itemType="http://schema.org/WPHeader">
      <Branding title={title} subtitle={subtitle}/>
      <Navigation title={title} menu={menu} showSearch={search}/>
    </HeaderContainer>
  )
}

export default Header
