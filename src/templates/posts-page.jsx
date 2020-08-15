import React from "react"
import Layout from "../components/layout"
import {Grid} from "../components/common"
import styled from "styled-components"
import {graphql} from "gatsby"
import SEO from "../components/seo"
import Theme from "../styles/theme"
import Pagination from "../components/pagination"
import CardGrid from "../components/card-grid"
import useSiteMetadata from "../hooks/use-site-metadata"

const PostsPageTemplate = ({data, pageContext}) => {
  const posts = data.allPosts.edges.map((node) => node.node)
  const {title, description} = useSiteMetadata()
  const {previousPagePath, nextPagePath, humanPageNumber, numberOfPages} = pageContext

  return (
    <Layout>
      <SEO
        type={`WebSite`}
        title={humanPageNumber > 1 ? `${title} - Страница ${humanPageNumber} из ${numberOfPages}` : null}
        description={humanPageNumber > 1 ? `${description} | Страница ${humanPageNumber} из ${numberOfPages}` : null}
      />

      <PostsContainer>
        <CardGrid posts={posts} halfImage={true}/>
        <Pagination
          previousPagePath={previousPagePath}
          nextPagePath={nextPagePath}
          humanPageNumber={humanPageNumber}
          numberOfPages={numberOfPages}
        />
      </PostsContainer>
    </Layout>
  )
}

export default PostsPageTemplate

export const PostsPageQuery = graphql`
  query postsPageQuery($skip: Int!, $limit: Int!){
    allPosts: allMdx (
      filter: { frontmatter: {
        templateKey: { eq: "post" }
        draft: { eq: false }
      } }
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
            createdPretty: created(formatString: "DD MMMM YYYY", locale: "ru")
            updated
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 500, quality: 75) {
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

const PostsContainer = styled(Grid)`
  margin-left: 0;
  margin-right: 0;
  margin-top: 30px;

  @media (max-width: ${Theme.breakpoints.sm}) {
    article {
      margin-bottom: 30px;
    }
  }
`
