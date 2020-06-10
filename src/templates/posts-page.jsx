import React from "react"
import Layout from "../components/layout"
import {Grid} from "../components/common"
import styled from "styled-components"
import {graphql} from "gatsby"
import SEO from "../components/seo"
import Theme from "../styles/theme"
import Pagination from "../components/pagination"
import CardGrid from "../components/card-grid"

const PostsContainer = styled(Grid)`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  /*grid-template-areas: "latest latest" ". .";*/
  width: 100%;
  margin-left: 0;
  margin-right: 0;
  margin-top: 30px;

  @media (max-width: ${Theme.breakpoints.sm}) {
    display: block;
    padding: 0;

    article {
      margin-bottom: 30px;
    }
  }
`

const PostsPageTemplate = ({data, pageContext}) => {
  const posts = data.allPosts.edges.map((node) => node.node)

  return (
    <Layout>
      <SEO type={`WebSite`}/>

      <PostsContainer>
        <CardGrid posts={posts} siteMeta={data.site.siteMetadata}/>
        <Pagination
          previousPagePath={pageContext.previousPagePath}
          nextPagePath={pageContext.nextPagePath}
          humanPageNumber={pageContext.humanPageNumber}
          numberOfPages={pageContext.numberOfPages}
        />
      </PostsContainer>
    </Layout>
  )
}

export default PostsPageTemplate

export const PostsPageQuery = graphql`
  query postsPageQuery($skip: Int!, $limit: Int!){
    allPosts: allMdx(
      filter: { fileAbsolutePath: { regex: "/(posts)/.*\\\\.(md|mdx)$/" } }
      sort: { fields: frontmatter___created, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            path
            categories
            excerpt
            created
            createdPretty: created(formatString: "DD MMMM YYYY", locale: "ru")
            featuredImage {
              childImageSharp {
                sizes(maxWidth: 500, quality: 75) {
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
    site {
      siteMetadata {
        siteUrl
        title
      }
    }
  }
`
