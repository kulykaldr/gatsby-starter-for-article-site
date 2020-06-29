import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {MDXRenderer} from "gatsby-plugin-mdx"
import styled from "styled-components"
import Spoiler from "../components/ui/spoiler"
import Blockquote from "../components/ui/blockquote"
import {MDXProvider} from "@mdx-js/react"

const StyledPage = styled.section`
  padding: 20px;
`

const shortcodes = {spoiler: Spoiler, blockquote: Blockquote}

const PageTemplate = ({
                        pathContext,
                      }) => {
  const page = pathContext.page

  return (
    <Layout>
      <SEO
        title={page.frontmatter.title}
        description={page.frontmatter.description}
        type={"Article"}
      />
      <StyledPage>
        <article>
          <h1>{page.frontmatter.heading}</h1>
          <MDXProvider components={shortcodes}>
            <MDXRenderer className={`post`}>{page.body}</MDXRenderer>
          </MDXProvider>
        </article>
      </StyledPage>
    </Layout>
  )
}

export default PageTemplate
