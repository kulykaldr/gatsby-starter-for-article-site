import React, {useState} from "react"
import {Search} from "./search-js-search"
import styled from "styled-components"
import {Container} from "./common"
import Theme from "../styles/theme"
import {Link} from "gatsby"
import {useLocation} from "@reach/router"
import 'react-slidedown/lib/slidedown.css'

export const NavContainer = styled.div`
  background-color: ${Theme.layout.primaryColor};
  box-shadow: 0 0 3px rgba(0,0,0,.03), 0 3px 46px rgba(0,0,0,.07);
  min-height: 60px;
  display: flex;

  &.active {
    box-shadow: none;
  }
`

export const Nav = styled(Container)`
  display: flex;
  position: relative;

  @media (max-width: ${Theme.breakpoints.lg}) {
    padding: 0;
  }
`

export const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  white-space: nowrap;

  @media (max-width: ${Theme.breakpoints.sm}) {
    justify-content: center;
  }
`

export const NavMenu = styled.ul`
  align-self: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
  padding-left: 0;
  flex: 1 1;
  overflow-x: hidden;
  overflow-y: hidden;

  @media (max-width: ${Theme.breakpoints.sm}) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: ${Theme.layout.primaryColorDarker};
    z-index: -1;
    transition: .3s ease-in-out;
    transform: scale(.9);
    display: flex;
    justify-content: center;

    &.active {
      transform: scale(1);
      top: 100%;
    }
  }
`

export const SearchMenu = styled.ul`
  align-self: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
  padding-left: 0;
  padding-right: 20px;

  @media (max-width: ${Theme.breakpoints.sm}) {
    padding-right: 0;
  }
`

export const NavMenuItem = styled.li`
  display: inline-block;

  span {
    cursor: default;
    color: #fff;
    padding: 18px;
    transition: all .5s;
    height: 100%;
    display: block;
    opacity: 1;
    background: rgba(255,255,255,.1);
  }
`

export const NavLink = styled(Link)`
  color: #fff;
  opacity: .8;
  padding: 18px;
  transition: all .5s;
  height: 100%;
  display: block;

  &:hover {
    opacity: 1;
    background: rgba(255,255,255,.1);
  }

  &.active {
    opacity: 1;
    background: rgba(255,255,255,.1);
  }
`

/*
const HamburgerButton = styled.div`
  display: none;
  position: absolute;
  top: 26px;
  right: 20px;
  width: 38px;
  height: 28px;
  padding-top: 8px;
  border-top: 4px solid ${Theme.layout.primaryColor};
  border-bottom: 4px solid ${Theme.layout.primaryColor};
  transition: all .3s ease;

  &.active {
    height: 20px;
    padding-top: 4px;
    opacity: .5;
    filter: "alpha(opacity=50)";
  }

  span {
    display: block;
    height: 4px;
    background: ${Theme.layout.primaryColor};
  }

  @media (max-width: ${Theme.breakpoints.sm}) {
    display: block;
  }
`
*/

const BurgerButton = styled.div`
  position: absolute;
  top: 26px;
  right: 20px;
  display: none;
  flex-shrink: 0;
  width: 3em;
  height: 3em;
  padding: 0;
  cursor: pointer;
  transition: .2s;
  border: none;
  background: 0 0;
  font-size: 12px;

  @media (max-width: ${Theme.breakpoints.sm}) {
    display: block;
  }

  .burger-lines,
  .burger-lines:before,
  .burger-lines:after
  {
    content: "";
    position: absolute;
    width: 100%;
    height: .25em;
    transition: top .2s .2s,left .1s,transform .2s,background-color .2s .1s;
    pointer-events: none;
    border-radius: .25em;
    background-color: ${Theme.layout.primaryColor};
  }

  .burger-lines {
    top: 50%;
    margin-top: -.125em;

    &:before {
      top: 1em;
      left: 1em;
      width: 2em;
    }

    &:after {
      top: -1em;
      left: 0;
      width: 2em;
    }
  }

  &.active {
    .burger-lines {
      background-color: initial;

      &:before,
      &:after
      {
        top: 0;
        left: .5em;
        transition: background-color .2s,top .2s,left .2s,transform .2s .15s;
      }

      &:before {
        transform: rotate(-45deg);
      }

      &:after {
        transform: rotate(45deg);
      }
    }
   }

`

const Navigation = ({menu, showSearch = true}) => {
  const {pathname} = useLocation()
  const [isActive, setIsActive] = useState(false)

  // Toggles the Menu
  const toggleMobileMenu = () => setIsActive(!isActive)

  return (
    <>
      <BurgerButton onClick={toggleMobileMenu} className={isActive ? " active" : null}>
        <div className={"burger-lines"}/>
      </BurgerButton>
      <NavContainer className={isActive ? " active" : null}>
        <Nav>
          <NavWrapper>
            <NavMenu
              className={isActive ? " active" : null}
            >
              {menu.map((item, index) => (
                <NavMenuItem key={index}>
                  {
                    item.path === pathname
                      ? <span>{item.name}</span>
                      : <NavLink to={item.path} key={index} activeClassName='active'>{item.name}</NavLink>
                  }
                </NavMenuItem>
              ))}
            </NavMenu>
            {showSearch &&
            <SearchMenu>
                <Search/>
            </SearchMenu>
            }
          </NavWrapper>
        </Nav>
      </NavContainer>
    </>
  )
}


export default Navigation
