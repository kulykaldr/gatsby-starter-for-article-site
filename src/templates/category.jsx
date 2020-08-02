import React from "react"
import Layout from "../components/layout"
import {graphql} from "gatsby"
import SEO from "../components/seo"
import CardGrid from "../components/card-grid"
import Pagination from "../components/pagination"
import styled from "styled-components"
import Theme from "../styles/theme"
import useSiteMetadata from "../hooks/use-site-metadata"

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

const CategoryTemplate = ({data, pageContext}) => {
  let category = data.category
  const posts = data.posts.edges.map((node) => node.node)
  const {title, description} = useSiteMetadata()
  const {previousPagePath, nextPagePath, humanPageNumber, numberOfPages} = pageContext

  if (!category && posts.length > 0) {
    category = {
      name: posts[0].frontmatter.categories[0],
      description: null,
    }
  }

  return (
    <Layout>
      <SEO
        title={humanPageNumber > 1
          ? `${category.name} - Страница ${humanPageNumber} из ${numberOfPages} | ${title}`
          : `${category.name} | ${title}`}
        description={humanPageNumber > 1
          ? `${category.description} - Страница ${humanPageNumber} из ${numberOfPages} | ${description}`
          : `${category.description} | ${description}`}
        type={`CollectionPage`}
      />
      <TitleCategory>{category.name}</TitleCategory>
      {humanPageNumber === 1 && category.description ?
        <DescriptionCategory>{category.description}</DescriptionCategory> : null}
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
          fields {
            slug
          }
          frontmatter {
            heading
            categories
            excerpt
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
