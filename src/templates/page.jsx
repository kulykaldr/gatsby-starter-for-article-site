import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {MDXRenderer} from "gatsby-plugin-mdx"
import styled from "styled-components"
import Spoiler from "../components/ui/spoiler";
import Blockquote from "../components/ui/blockquote";
import {MDXProvider} from "@mdx-js/react";

const StyledPage = styled.section`
  padding: 20px;
`

const shortcodes = {Spoiler, blockquote: Blockquote}

const PageTemplate = ({
                        pathContext,
                        location,
                      }) => {
  const page = pathContext.page

  return (
    <Layout location={location}>
      <SEO
        title={page.frontmatter.title}
        description={page.frontmatter.excerpt}
        location={location}
      />
      <StyledPage>
        <article>
          <h1>{page.frontmatter.title}</h1>
          <MDXProvider components={shortcodes}>
            <MDXRenderer className={`post`}>{page.body}</MDXRenderer>
          </MDXProvider>
        </article>
      </StyledPage>
    </Layout>
  )
}

export default PageTemplate
