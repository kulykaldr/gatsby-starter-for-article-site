import React from "react"
import Navigation from "./navigation"
import Branding from "./branding"
import { Container } from "./common"

const Header = ({ title, subtitle, menu, search = true }) => {
  return (
    <Container>
      <Branding title={title} subtitle={subtitle}/>
      <Navigation title={title} menu={menu} showSearch={search}/>
    </Container>
  )
}

export default Header
