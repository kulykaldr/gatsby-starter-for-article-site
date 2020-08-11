import React, {useState} from "react"
import {Search} from "./search-js-search"
import styled from "styled-components"
import {Container} from "./common"
import Theme from "../styles/theme"
import {Link} from "gatsby"
import {useLocation} from "@reach/router"
import SlideToggle from "react-slide-toggle"

const Navigation = ({menu, showSearch = true}) => {
  const {pathname} = useLocation()
  const [toggleEvent, setToggleEvent] = useState(0)
  const [isActive, setActive] = useState(false)

  // Toggles the Menu
  const onToggle = () => {
    setToggleEvent(Date.now())
    setActive(!isActive)
  }

  return (
    <>
      <BurgerButton onClick={onToggle} className={isActive ? " active" : null}>
        <div className={"burger-lines"}/>
      </BurgerButton>
      <NavContainer>
        <NavWrapper>
          <NavMenu>
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
      </NavContainer>

      <MobileMenuContainer>
        <SlideToggle
          duration={800}
          toggleEvent={toggleEvent}
          collapsed
        >
          {({setCollapsibleElement, progress}) => (
            <MobileMenu ref={setCollapsibleElement}>
              <div
                style={{
                  transform: `translateY(${Math.round(20 * (-1 + progress))}px)`
                }}
              >
                {menu.map((item, index) => (
                  <MobileMenuItem key={index}>
                    {
                      item.path === pathname
                        ? <span>{item.name}</span>
                        : <NavLink to={item.path} key={index} activeClassName='active'>{item.name}</NavLink>
                    }
                  </MobileMenuItem>
                ))}
              </div>
            </MobileMenu>
          )}
        </SlideToggle>
      </MobileMenuContainer>
    </>
  )
}


export default Navigation

export const NavContainer = styled.nav`
  background-color: ${Theme.layout.primaryColor};
  box-shadow: 0 0 3px rgba(0,0,0,.03), 0 3px 46px rgba(0,0,0,.07);
  min-height: 60px;
  display: flex;
`

export const NavWrapper = styled(Container)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  white-space: nowrap;
  position: relative;

  @media (max-width: ${Theme.breakpoints.lg}) {
    padding: 0;
  }

  @media (max-width: ${Theme.breakpoints.lg}) {
    justify-content: center;
  }
`

export const NavMenu = styled.ul`
  align-self: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
  flex: 1 1;
  overflow-x: hidden;
  overflow-y: hidden;

  @media (max-width: ${Theme.breakpoints.lg}) {
    display: none;
  }
`

export const SearchMenu = styled.ul`
  align-self: center;
  list-style-type: none;
  margin: 0;
  padding: 0 20px 0 0;

  @media (max-width: ${Theme.breakpoints.lg}) {
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

const MobileMenuContainer = styled.div`
  position: relative;
  overflow: hidden;
  z-index: -1;
  margin-top: -1px;
  width: 100%;
  margin-right: 20px;

  /*
  Slide animation styles

  You may need to add vendor prefixes for transform depending on your desired browser support.
  */

  .slide-enter {
    transform: translateY(-100%);
    transition: .7s cubic-bezier(0, 1, 0.5, 1);
  }

  .slide-enter-active {
      transform: translateY(0%);
  }

  .slide-exit {
    transform: translateY(0%);
    transition: .7s ease-in-out;
  }

  .slide-exit-active {
      transform: translateY(-100%);
  }
`

const MobileMenu = styled.ul`
  margin: 0;
  padding: 0;
  background-color: ${Theme.layout.primaryColor};
`

const MobileMenuItem = styled(NavMenuItem)`
  display: block;
  border-bottom: 1px solid rgba(255,255,255,.2);
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

  @media (max-width: ${Theme.breakpoints.lg}) {
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
