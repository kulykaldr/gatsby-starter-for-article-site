import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {MDXRenderer} from "gatsby-plugin-mdx"
import styled from "styled-components"
import Spoiler from "../components/ui/spoiler"
import Blockquote from "../components/ui/blockquote"
import {MDXProvider} from "@mdx-js/react"
import useSiteMetadata from "../hooks/use-site-metadata"
import {useLocation} from "@reach/router"
import Theme from "../styles/theme"

const StyledPage = styled.div`
  padding: 0 40px 40px 40px;

  border-right: 1px #e5eff5 solid;
  border-left: 1px #e5eff5 solid;
  background-color: #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.03), 0 3px 46px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-width: 100%;

  p {
    font-size: 16px;
    margin-bottom: 20px;
    word-wrap: break-word;
  }

  ol, ul {
    margin: 1.7em 0 1.8em 1em;
    padding: 0;
    list-style: none;
  }

  @media (max-width: ${Theme.breakpoints.md}) {
    margin: 1.5em 0 1.5em 0;
  }

  @media (max-width: ${Theme.breakpoints.sm}) {
    padding: 0 20px 20px 20px;
  }

  ol {
    counter-reset: point;
  }

  ul li {
    &:before {
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      background-color: ${Theme.layout.primaryColor};
      margin: 0 22px 0 -30px;
    }
  }

  ol li {
    border-color: ${Theme.layout.primaryColor};

    &:before {
      content: counter(point);
      counter-increment: point 1;
      display: inline-block;
      width: 24px;
      height: 24px;
      margin: 0 13px 0 -40px;
      text-align: center;
      border: 2px solid ${Theme.layout.primaryColor};
      border-radius: 50%;
    }
  }

  li {
    list-style: none;
    padding-left: 40px;
    margin: .7em 0;
  }

  li > a,
  p > a {
    color: ${Theme.layout.p};
    transition: color 0.5s;

    &:hover {
      color: ${Theme.layout.linkColorHover};
    }
  }

  pre {
    margin: 30px 0;
  }

  h2, h3, h4, h5, h6 {
    margin: 1.5em 0 .5em;
    line-height: 1.1;
  }

  code[class*="language-text"] {
    padding: 5px;
  }

  p > img {
    max-width: 100%;
    border-radius: 0.3em;
    margin: 30px 0;
  }

  hr {
    border-top: 1px solid #ececec;
    border-bottom: 0;
    margin-top: 44px;
    margin-bottom: 40px;
  }
`

const PageTitle = styled.h1`
  margin: 0;
  padding-top: 40px;

  @media (max-width: ${Theme.breakpoints.sm}) {
    padding-top: 20px;
  }
`

const shortcodes = {spoiler: Spoiler, blockquote: Blockquote}

const PageTemplate = ({
                        pathContext,
                      }) => {
  const page = pathContext.page
  const metadata = useSiteMetadata()
  const {pathname} = useLocation()

  return (
    <Layout>
      <SEO
        title={page.frontmatter.title}
        description={page.frontmatter.description}
        type={"Article"}
      />
      <StyledPage>
        <article>
          <PageTitle>{page.frontmatter.heading}</PageTitle>
          <MDXProvider components={shortcodes}>
            <MDXRenderer className={`post`}>{page.body}</MDXRenderer>
          </MDXProvider>
        </article>
        <meta itemScope itemProp="mainEntityOfPage" itemType="https://schema.org/WebPage"
              itemID={`${metadata.siteUrl}${pathname}`} content={page.frontmatter.heading}/>
        <meta itemProp="dateModified" content={page.frontmatter.updated}/>
        <meta itemProp="datePublished" content={page.frontmatter.created}/>
      </StyledPage>
    </Layout>
  )
}

export default PageTemplate
