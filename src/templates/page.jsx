import React from "react"
import { styled, theme } from "twin.macro"
import Layout from "../components/layout"
import SEO from "../components/seo"
import useSiteMetadata from "../hooks/use-site-metadata"
import RenderMdx from "../components/render-mdx"
import Heading from "../components/ui/heading"
import Breadcrumb from "../components/breadcrumb";

const PageTemplate = ({ pathContext }) => {
  const page = pathContext.page
  const metadata = useSiteMetadata()

  return (
    <Layout showSidebar={metadata.siteShowSidebar || page.showSidebar}>
      <SEO
        title={page.frontmatter.title}
        description={page.frontmatter.description}
        type={"Article"}
      />
      <StyledPage>
        <Breadcrumb />

        <article>
          <Heading tag={1}>{page.frontmatter.heading}</Heading>
          <RenderMdx>{page.body}</RenderMdx>
        </article>
        <meta itemScope itemProp="mainEntityOfPage" itemType="https://schema.org/WebPage"
              itemID={`${metadata.siteUrl}${page.fields.slug}`} content={page.frontmatter.heading}/>
        <meta itemProp="dateModified" content={page.frontmatter.updated}/>
        <meta itemProp="datePublished" content={page.frontmatter.created}/>
      </StyledPage>
    </Layout>
  )
}

export default PageTemplate

const StyledPage = styled.div`
  padding: 0 40px 40px 40px;
  border-right: 1px #e5eff5 solid;
  border-left: 1px #e5eff5 solid;
  background-color: #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.03), 0 3px 46px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-width: 100%;

  @media (max-width: ${theme`screens.md`}) {
    margin: 1.5em 0 1.5em 0;
  }

  @media (max-width: ${theme`screens.sm`}) {
    padding: 0 20px 20px 20px;
  }
`

