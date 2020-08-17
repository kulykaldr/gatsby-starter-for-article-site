import React from "react"
import styled, { ThemeProvider } from "styled-components"
import GlobalStyle from "../styles/global-style"
import Header from "./header"
import Footer from "./footer"
import { Grid } from "./common"
import Sidebar from "./sidebar"
import useSiteMetadata from "../hooks/use-site-metadata"
import useSiteTheme from "../hooks/use-site-theme"

const Layout = ({ children, showSidebar = true }) => { // TODO: showSidebar add to netlify cms Post config
  const metadata = useSiteMetadata()
  const siteTheme = useSiteTheme()

  return (
    <ThemeProvider theme={siteTheme}>
      <GlobalStyle/>

      <Header
        title={metadata.siteTitle}
        subtitle={metadata.siteDescription}
      />

      <HomeContainer showSidebar={showSidebar}>
        <main>{children}</main>
        {showSidebar &&
        <SidebarContainer itemScope itemType="http://schema.org/WPSideBar">
          <Sidebar/>
        </SidebarContainer>
        }
      </HomeContainer>

      <Footer
        menu={metadata.siteFooterMenu}
        owner={metadata.siteTitle}
      />
    </ThemeProvider>
  )
}

export default Layout

const HomeContainer = styled(Grid)`
  display: grid;
  grid-template-columns: ${props => props.showSidebar ? `minmax(0, 1fr) .40fr` : `minmax(0,1fr) `};
  grid-column-gap: 20px;

  @media (max-width: ${props => props.theme.siteBreakpoints.lg}) {
    grid-template-columns: minmax(0,1fr);
  }
`

const SidebarContainer = styled.aside`
  margin-top: 20px;

  @media (max-width: ${props => props.theme.siteBreakpoints.sm}) {
    margin-left: 0;
    margin-top: 0;
  }

  @media (max-width: ${props => props.theme.siteBreakpoints.md}) {
    margin-left: 0;
    margin-top: 0;
  }

  @media (max-width: ${props => props.theme.siteBreakpoints.lg}) {
    margin-left: 0;
    margin-top: 0;
  }

  @media (max-width: ${props => props.theme.siteBreakpoints.xl}) {
    width: 100%;
    margin-top: 20px;
  }
`
