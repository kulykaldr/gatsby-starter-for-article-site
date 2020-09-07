import React from "react"
import { graphql } from "gatsby"
import { styled, theme } from "twin.macro"
import Layout from "../components/layout"
import SEO from "../components/seo"
import CardGrid from "../components/card-grid"
import Pagination from "../components/pagination"
import useSiteMetadata from "../hooks/use-site-metadata"

const CategoryTemplate = ({ data, pageContext }) => {
  const posts = data.posts.edges.map((node) => node.node)
  const { siteTitle, siteDescription, siteShowSidebar } = useSiteMetadata()
  const {
    previousPagePath, nextPagePath, humanPageNumber, numberOfPages,
    categoryName, categoryDescription
  } = pageContext

  return (
    <Layout showSidebar={siteShowSidebar}>
      <SEO
        title={humanPageNumber > 1
          ? `${categoryName} - Страница ${humanPageNumber} из ${numberOfPages} | ${siteTitle}`
          : `${categoryName} | ${siteTitle}`}
        description={humanPageNumber > 1
          ? `${categoryDescription} - Страница ${humanPageNumber} из ${numberOfPages} | ${siteDescription}`
          : `${categoryDescription} | ${siteDescription}`}
        type={`CollectionPage`}
      />
      <TitleCategory>{categoryName}</TitleCategory>
      {humanPageNumber === 1 && categoryDescription ?
        <DescriptionCategory>{categoryDescription}</DescriptionCategory> : null}
      <CardGrid posts={posts} halfImage={true}/>
      <Pagination
        previousPagePath={previousPagePath}
        nextPagePath={nextPagePath}
        humanPageNumber={humanPageNumber}
        numberOfPages={numberOfPages}
      />
    </Layout>
  )
}

export default CategoryTemplate

export const query = graphql`
  query ($categoryName: String!, $skip: Int!, $limit: Int!) {
    posts: allMdx(
      filter: {
        frontmatter: {
          categories: { eq: $categoryName }
          templateKey: { eq: "post" }
          draft: { eq: false }
        }
      }
      sort: { fields: frontmatter___created, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          excerpt
          frontmatter {
            heading
            slug
            categories
            created
            createdPretty: created(formatString: "DD MMMM, YYYY", locale: "ru")
            updated
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 800, quality: 75) {
                  base64
                  aspectRatio
                  src
                  srcSet
                  sizes
                }
              }
            }
          }
        }
      }
    }
  }
`

const TitleCategory = styled.h1`
  padding-left: 20px;
`

const DescriptionCategory = styled.p`
  margin-bottom: 25px;
  font-size: .95em;
  line-height: 1.4;
  background: #f3f3f3;
  padding: 10px 20px;
  color: ${theme`colors.gray.900`};
`
