import React from "react"
import GlobalStyle from "../styles/global-style"
import { graphql, useStaticQuery } from "gatsby"
import Header from "./header"
import Footer from "./footer"
import { Grid } from "./common"
import Theme from "../styles/theme"
import Sidebar from "./sidebar"
import styled from "styled-components"

const Layout = ({ children, showSidebar = true }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          topMenu {
            name
            path
          }
          footerMenu {
            name
            path
          }
          search
        }
      }
    }
  `)

  return (
    <>
      <GlobalStyle/>

      <Header
        menu={data.site.siteMetadata.topMenu}
        search={data.site.siteMetadata.search}
        title={data.site.siteMetadata.title}
        subtitle={data.site.siteMetadata.description}
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
        menu={data.site.siteMetadata.footerMenu}
        owner={data.site.siteMetadata.title}
      />
    </>
  )
}

export default Layout

const HomeContainer = styled(Grid)`
  display: grid;
  grid-template-columns: ${props => props.showSidebar ? `minmax(0, 1fr) .40fr` : `minmax(0,1fr) `};
  grid-column-gap: 20px;

  @media (max-width: ${Theme.breakpoints.lg}) {
    grid-template-columns: minmax(0,1fr);
  }
`

const SidebarContainer = styled.aside`
  margin-top: 20px;

  @media (max-width: ${Theme.breakpoints.sm}) {
    margin-left: 0;
    margin-top: 0;
  }

  @media (max-width: ${Theme.breakpoints.md}) {
    margin-left: 0;
    margin-top: 0;
  }

  @media (max-width: ${Theme.breakpoints.lg}) {
    margin-left: 0;
    margin-top: 0;
  }

  @media (max-width: ${Theme.breakpoints.xl}) {
    width: 100%;
    margin-top: 20px;
  }
`
