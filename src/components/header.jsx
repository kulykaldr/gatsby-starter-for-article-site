import React from "react"
import Navigation from "./navigation"
import Branding from "./branding"
import {Container} from "./common"
import styled from "styled-components"

const HeaderContainer = styled(Container)`
  position: relative;
  z-index: 20;
`

const Header = ({title, subtitle, menu, search = true}) => {
  return (
    <HeaderContainer>
      <Branding title={title} subtitle={subtitle}/>
      <Navigation title={title} menu={menu} showSearch={search}/>
    </HeaderContainer>
  )
}

export default Header
