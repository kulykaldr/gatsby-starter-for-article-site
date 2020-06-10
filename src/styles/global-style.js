import { createGlobalStyle } from "styled-components"
import Theme from "./theme"
import styledNormalize from "styled-normalize"
import * as prismStyle from "prismjs/themes/prism-okaidia.css"

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}
  ${prismStyle}

  html {
    box-sizing: border-box;
    scroll-behavior: smooth;
    background-color: ${Theme.layout.backgroundColor};
  }

  body {
    font-family: ${Theme.fonts.base};
    line-height: 1.5;
  }

  * {
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${Theme.fonts.heading};
    outline: none;
  }

  a {
    color: ${Theme.layout.primaryColor};
    text-decoration: none;
  }

  .gatsby-highlight {
    max-width: 100% !important;
  }

  .gatsby-highlight-code-line {
    background-color: #353631;
    display: block;
    margin-right: -1em;
    margin-left: -1em;
    padding-right: 1em;
    padding-left: 0.75em;
  }
`

export default GlobalStyle
