import React from "react"
import styled, { css } from "styled-components"
import { Container } from "./common"
import { Link } from "gatsby"
import Theme from "../styles/theme"
import {useLocation} from "@reach/router";

export const StyledFooter = styled.footer`
  max-width: 100%;
  padding: 20px 0;
  z-index: 700;
  position: relative;
  font-size: .9em;
  margin-top: 50px;
`

export const FooterContainer = styled(Container)`
  text-align: right;
  line-height: 1.1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Copyright = styled.p`
  margin: 0;
`

export const StyledNav = styled.nav`
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    display: inline-block;
    margin-right: 25px;

    &:last-child {
      margin-right: 0;
    }
  }

  span {
    cursor: default;
    color: ${Theme.layout.darkColor};
  }
`

const LinkStyle = css`
  color: ${Theme.layout.darkColor};
  text-decoration: none;
`

export const FooterMenuItem = styled.a`
  ${LinkStyle}
`

export const FooterMenuLink = styled(Link)`
  ${LinkStyle}
`

const Footer = ({ menu, owner }) => {
  const { pathname } = useLocation()

  return (
    <StyledFooter>
      <FooterContainer>
        <StyledNav>
          <ul>
            {menu.map((item, index) => (
              <li key={index}>
                {/* Links to RSS and Sitemap are handled
                  differently (for now) since they're technically external links */}
                {["/rss.xml", "/sitemap.xml"].indexOf(item.path) >= 0
                  ? <FooterMenuItem href={item.path} rel={`noopener noreferrer`}>{item.name}</FooterMenuItem>
                  : item.path === pathname
                    ? <span>{item.name}</span>
                    : <FooterMenuLink to={item.path}>{item.name}</FooterMenuLink>
                }
              </li>
            ))}
          </ul>
        </StyledNav>
        <div>
          <Copyright>
            <strong>{owner}</strong>&nbsp;&copy; {new Date().getFullYear()}
          </Copyright>
        </div>
      </FooterContainer>
    </StyledFooter>
  )
}

export default Footer
