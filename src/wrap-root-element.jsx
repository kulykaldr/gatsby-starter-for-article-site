import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { components } from "./components/render-mdx"
import { ThemeProvider } from "styled-components"
import useSiteTheme from "./hooks/use-site-theme"
// issue field doesn't render custom components when
// those components are provided in a layout file via`MDXProvider shortcodes
// https://github.com/gatsbyjs/gatsby/issues/20543

export const wrapRootElement = ({ element }) => {
  const siteTheme = useSiteTheme()

  return (
    <ThemeProvider theme={siteTheme}>
      <MDXProvider components={components}>{element}</MDXProvider>
    </ThemeProvider>
  )
}
