import React from "react"
import TopMenu from "./topMenu"
import Branding from "./branding"
import tw from "twin.macro"

const Header = ({ title, subtitle }) => {
  return (
    <HeaderContainer itemScope itemType="http://schema.org/WPHeader">
      <Branding title={title} subtitle={subtitle}/>
      <TopMenu/>
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = tw.header`
  container relative z-20 mx-auto
`
