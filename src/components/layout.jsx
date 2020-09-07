import React from "react"
import tw from "twin.macro"

import Header from "./header"
import Footer from "./footer"
import Sidebar from "./sidebar"
import useSiteMetadata from "../hooks/use-site-metadata"

const Layout = ({ children, showSidebar = true }) => {
  const metadata = useSiteMetadata()

  return (
    <>
      <Header
        title={metadata.siteTitle}
        subtitle={metadata.siteDescription}
      />

      <HomeContainer showSidebar={showSidebar}>
        <MainContent>{children}</MainContent>
        {showSidebar && <Sidebar/>}
      </HomeContainer>

      <Footer
        menu={metadata.siteFooterMenu}
        owner={metadata.siteTitle}
      />
    </>
  )
}

export default Layout

const HomeContainer = tw.div`
  container mx-auto lg:grid xl:grid-cols-4 xl:col-gap-6
`

const MainContent = tw.main`
  container col-span-3
`
