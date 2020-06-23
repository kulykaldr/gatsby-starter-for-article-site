import React from "react"
import Layout from "../components/layout"
import {graphql} from "gatsby"
import SEO from "../components/seo"
import CardGrid from "../components/card-grid"
import Pagination from "../components/pagination"
import styled from "styled-components"
import Theme from "../styles/theme"

const TitleCategory = styled.h1`
  padding-left: 20px;
`

const DescriptionCategory = styled.p`
  margin-bottom: 25px;
  font-size: .95em;
  line-height: 1.4;
  background: #f3f3f3;
  padding: 10px 20px;
  color: ${Theme.layout.darkColor};
`

const categoryTemplate = ({
                            data,
                            pageContext,
                          }) => {
  let category = data.category
  const posts = data.posts.edges.map((node) => node.node)

  if (!category && posts.length > 0) {
    category = {
      name: posts[0].frontmatter.categories[0],
      description: null,
    }
  }

  return (
    <Layout>
      <SEO title={category.name} description={category.description} type={`Series`}/>
      <TitleCategory>{category.name}</TitleCategory>
      {pageContext.pageNumber === 0 && category.description ?
        <DescriptionCategory>{category.description}</DescriptionCategory> : null}
      <CardGrid posts={posts} halfImage={true}/>
      <Pagination
        previousPagePath={pageContext.previousPagePath}
        nextPagePath={pageContext.nextPagePath}
        humanPageNumber={pageContext.humanPageNumber}
        numberOfPages={pageContext.numberOfPages}
      />
    </Layout>
  )
}

export default categoryTemplate

export const query = graphql`
  query ($category: String!, $skip: Int!, $limit: Int!) {
    category: categories(name: { eq: $category }) {
      name
      description
    }
    posts: allMdx(
      filter: {
        fileAbsolutePath: { regex: "/(posts)/.*\\\\.(md|mdx)$/" }
        frontmatter: { categories: { eq: $category } }
      }
      sort: { fields: frontmatter___created, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          frontmatter {
            heading
            path
            categories
            excerpt
            created
            createdPretty: created(formatString: "DD MMMM, YYYY", locale: "ru")
            featuredImage {
              childImageSharp {
                sizes(maxWidth: 800, quality: 75) {
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
