import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"

const StyledPage = styled.section`
  padding: 20px;
`

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
          <MDXRenderer>{page.body}</MDXRenderer>
        </article>
      </StyledPage>
    </Layout>
  )
}

export default PageTemplate
