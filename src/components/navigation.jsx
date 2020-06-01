import React from "react"
import {Search} from "./search"
import styled from "styled-components"
import {Container} from "./common"
import Theme from "../styles/theme"
import {Link} from "gatsby"

export const NavContainer = styled.div`
  z-index: 1000;
  background-color: ${Theme.layout.primaryColor};
  /*position: sticky;
  top: 0;*/
  box-shadow: 0 0 3px rgba(0,0,0,.03), 0 3px 46px rgba(0,0,0,.07);
`

export const Nav = styled(Container)`
  display: flex;
  position: relative;
`

export const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  white-space: nowrap;

  @media (max-width: ${Theme.breakpoints.sm}) {
    width: 90%;
  }
`

export const NavMenu = styled.ul`
  align-self: center;
  list-style-type: none;
  margin: 0;
  padding: 0;

  ${props => props.mobile && `
    @media (max-width: ${Theme.breakpoints.sm}) {
      width: 80%;
      overflow-x: auto;
      overflow-y: hidden;
      mask-image: linear-gradient(to right, transparent, #000 25px, #000 90%, transparent);
    }
  `}
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

export const SearchContainer = styled.ul`
  align-self: center;
  position: relative;
  padding-right: 20px;

  @media (max-width: ${Theme.breakpoints.xl}) {
    padding-right: 0px;
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

const Navigation = ({menu, showSearch = true, location}) => (
  <NavContainer>
    <Nav>
      <NavWrapper>
        <NavMenu mobile={true}>
          {menu.map((item, index) => (
            <NavMenuItem key={index}>
              {
                item.path === location.pathname
                  ? <span>{item.name}</span>
                  : <NavLink to={item.path} key={index} activeClassName='active'>{item.name}</NavLink>
              }
            </NavMenuItem>
          ))}
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
)


export default Navigation
