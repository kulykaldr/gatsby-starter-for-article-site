import React from "react"
import Navigation from "./navigation"
import Branding from "./branding"
import { Container } from "./common"
import styled from "styled-components"
import Theme from "../styles/theme"

const MobHamburger = styled.div`
  position: absolute;
  top: 26px;
  right: 20px;
  width: 38px;
  height: 28px;
  padding-top: 8px;
  border-top: 4px solid ${Theme.layout.primaryColor};
  border-bottom: 4px solid ${Theme.layout.primaryColor};
  transition: all .3s ease;

  .active {
    height: 20px;
    padding-top: 4px;
    opacity: .5;
    filter: "alpha(opacity=50)"
  }

  span {
    display: block;
    height: 4px;
    background: ${Theme.layout.primaryColor}
  }

  @media (max-width: ${Theme.breakpoints.md}) {
    display:none
  }
`

const Header = ({ title, subtitle, menu, search = true, location }) => {
  return (
    <Container>
      <Branding title={title} subtitle={subtitle} location={location}/>
      <Navigation title={title} menu={menu} showSearch={search} location={location}/>
    </Container>
  )
}

export default Header
