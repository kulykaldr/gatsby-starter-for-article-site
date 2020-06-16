import React from "react"
import Navigation from "./navigation"
import Branding from "./branding"
import {Container} from "./common"
import Theme from "../styles/theme"
import styled from "styled-components"

const HeaderContainer = styled(Container)`
  border-bottom: 4px solid ${Theme.layout.lightGrey};
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
