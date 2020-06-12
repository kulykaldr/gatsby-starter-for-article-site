import React, {useState} from "react"
import {Search} from "./search"
import styled from "styled-components"
import {Container} from "./common"
import Theme from "../styles/theme"
import {Link} from "gatsby"
import {useLocation} from "@reach/router"
import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'

export const NavContainer = styled.div`
  background-color: ${Theme.layout.primaryColor};
  box-shadow: 0 0 3px rgba(0,0,0,.03), 0 3px 46px rgba(0,0,0,.07);

  @media (max-width: ${Theme.breakpoints.lg}) {
    display: ${props => props.isActive ? "block" : "none"};
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

  @media (max-width: ${Theme.breakpoints.lg}) {
    display: block;
  }
`

export const NavMenu = styled.ul`
  align-self: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
`

export const NavMenuItem = styled.li`
  cursor: pointer;
  display: inline-block;
  border: 0;
  background: transparent;
  outline: none;
  text-decoration: none;

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

  @media (max-width: ${Theme.breakpoints.lg}) {
    display: block;
    border-bottom: 1px solid rgba(255,255,255,.2);
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

  @media (max-width: ${Theme.breakpoints.lg}) {
    display: block;
  }
`

export const SearchContainer = styled.ul`
  align-self: center;
  position: relative;
  padding-right: 20px;

  @media (max-width: ${Theme.breakpoints.xl}) {
    padding-right: 0px;
  }

  @media (max-width: ${Theme.breakpoints.lg}) {
    display: none;
  }
`

export const ToggleSearchButton = styled.button`
  cursor: pointer;
  color: #fff;
  opacity: .8;
  background: none;
  outline: none;
  border: 0;
  transition: opacity .5s;

  &:hover {
    opacity: 1;
    background: rgba(255,255,255,.1);
  }
`

const Navigation = ({menu, showSearch = true}) => {
  const {pathname} = useLocation()
  const [isActive, setIsActive] = useState(false)

  // Toggles the Menu
  const toggleMobileMenu = () => setIsActive(!isActive)

  return (
    <>
      <HamburgerButton onClick={toggleMobileMenu} className={isActive ? " active" : null}>
        <span/>
      </HamburgerButton>
      <NavContainer isActive={isActive}>
        <Nav>
          <NavWrapper>
            <NavMenu>
              <SlideDown>
              {menu.map((item, index) => (
                <NavMenuItem key={index}>
                  {
                    item.path === pathname
                      ? <span>{item.name}</span>
                      : <NavLink to={item.path} key={index} activeClassName='active'>{item.name}</NavLink>
                  }
                </NavMenuItem>
              ))}
              </SlideDown>
            </NavMenu>
            <SearchContainer>
              {showSearch &&
              <NavMenu>
                <Search/>
              </NavMenu>
              }
            </SearchContainer>
          </NavWrapper>
        </Nav>
      </NavContainer>
    </>
  )
}


export default Navigation
