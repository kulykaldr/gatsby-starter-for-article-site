import React, { useState } from "react"
import { Search } from "./search-js-search"
import { useLocation } from "@reach/router"
import tw, { styled, css } from "twin.macro"
import useSiteMetadata from "../hooks/use-site-metadata"
import SmartLink from "../components/ui/smartlink"

const TopMenu = () => {
  const { pathname } = useLocation()
  const [ isActive, setActive ] = useState(false)
  const { siteTopMenu } = useSiteMetadata()

  return (
    <TopMenuContainer>
      <HamburgerButton onClick={() => setActive(!isActive)}
                       className={`hamburger hamburger--spin ${isActive ? 'is-active' : null}`}
                       data-target="#navigation">
        <span className="hamburger-box">
          <span className="hamburger-inner"/>
        </span>
      </HamburgerButton>

      <Search/>

      <NavMenuContainer id={"navigation"} isActive={isActive}>
        <NavMenu>
          {siteTopMenu.map((item, index) => (
            <>
              {
                item.path === pathname
                  ? <NavSpan key={index}>{item.text}</NavSpan>
                  : <NavLink to={item.url} key={index} activeClassName='active'>{item.text}</NavLink>
              }
            </>
          ))}
        </NavMenu>
      </NavMenuContainer>
    </TopMenuContainer>
  )
}

export default TopMenu

const TopMenuContainer = styled.nav([
  tw`flex bg-blue-800 p-2 flex-wrap overflow-hidden`,
  css`
    /*
     * Tasty CSS-animated hamburgers
     * https://github.com/jonsuh/hamburgers
     * https://codepen.io/shushik81/pen/xxVqaJR
     */
    .hamburger {
      cursor: pointer;
      transition-property: opacity, filter;
      transition-duration: 0.15s;
      transition-timing-function: linear;
      font: inherit;
      color: inherit;
      text-transform: none;
      background-color: transparent;
      border: 0;
      margin: 0;
      overflow: visible;
    }

    .hamburger,
    .hamburger.is-active {
      opacity: 0.7;
    }

    .hamburger:hover,
    .hamburger.is-active:hover {
      opacity: 1;
    }

    .hamburger.is-active .hamburger-inner,
    .hamburger.is-active .hamburger-inner::before,
    .hamburger.is-active .hamburger-inner::after {
      background-color: #fff;
    }

    .hamburger-box {
      width: 30px;
      height: 24px;
      display: inline-block;
      position: relative;
    }

    .hamburger-inner {
      display: block;
      top: 50%;
      margin-top: -2px;
    }

    .hamburger-inner,
    .hamburger-inner::before,
    .hamburger-inner::after {
      width: 30px;
      height: 4px;
      background-color: #fff;
      border-radius: 4px;
      position: absolute;
      transition-property: transform;
      transition-duration: 0.15s;
      transition-timing-function: ease;
    }
    .hamburger-inner::before,
    .hamburger-inner::after {
      content: "";
      display: block;
    }
    .hamburger-inner::before {
      top: -10px;
    }
    .hamburger-inner::after {
      bottom: -10px;
    }

    /*
      * Spin
    */
    .hamburger--spin .hamburger-inner {
      transition-duration: 0.22s;
      transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }

    .hamburger--spin .hamburger-inner::before {
      transition: top 0.1s 0.25s ease-in, opacity 0.1s ease-in;
    }

    .hamburger--spin .hamburger-inner::after {
      transition: bottom 0.1s 0.25s ease-in,
        transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }

    .hamburger--spin.is-active .hamburger-inner {
      transform: rotate(225deg);
      transition-delay: 0.12s;
      transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    .hamburger--spin.is-active .hamburger-inner::before {
      top: 0;
      opacity: 0;
      transition: top 0.1s ease-out, opacity 0.1s 0.12s ease-out;
    }

    .hamburger--spin.is-active .hamburger-inner::after {
      bottom: 0;
      transform: rotate(-90deg);
      transition: bottom 0.1s ease-out,
        transform 0.22s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1);
    }
  `
])

const NavMenuContainer = styled.div(({ isActive }) => [
  tw`w-full lg:inline-flex lg:w-auto transition-all duration-500 lg:max-h-screen`,
  css`max-height: 0;`,
  isActive && css`max-height: 100vh;`
])

const NavMenu = styled.div([
  tw`flex flex-col items-start lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center lg:h-auto`
])

const linkStyle = `lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center
                  justify-center hover:bg-blue-900 hover:text-white`

export const NavSpan = styled.div([
  tw`${linkStyle}`
])

export const NavLink = styled(SmartLink)([
  tw`${linkStyle}`
])

const HamburgerButton = styled.button([
  tw`flex p-2 rounded lg:hidden hover:bg-blue-900 hover:text-white outline-none`,
])
