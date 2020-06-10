import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Card } from "./card"
import styled from "styled-components"
import Theme from "../styles/theme"

const FeaturedPosts = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 30px;

  @media (max-width: ${Theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${Theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const SidebarTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  padding-left: 10px;
  margin-bottom: 20px;
  border-bottom: 2px solid ${Theme.layout.primaryColor};
`

const StickyContent = styled.div`
  position: sticky;
  top: 30px;
`;

const Sidebar = () => {
  const featuredPosts = useStaticQuery(graphql`
    query {
      posts: allMdx(
        filter: { fileAbsolutePath: { regex: "/(posts)/.*\\\\.(md|mdx)$/" } }
        sort: { fields: frontmatter___created, order: DESC }
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              path
              categories
              created
              createdPretty: created(
                formatString: "DD MMMM, YYYY"
                locale: "ru"
              )
              excerpt
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
    }
  `)
  const posts = featuredPosts.posts.edges
    .map((node) => node.node)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)

  return (
    <>
      <SidebarTitle>Рубрики</SidebarTitle>
      <div>

      </div>
      <SidebarTitle>Рекомендуем</SidebarTitle>
      <FeaturedPosts>
        {posts.map((post, index) => (
          <Card
            title={post.frontmatter.title}
            featuredImage={post.frontmatter.featuredImage.childImageSharp}
            path={post.frontmatter.path}
            key={index}
            compact={true}
            meta={{
              time: post.frontmatter.created,
              timePretty: post.frontmatter.createdPretty,
              category:
                post.frontmatter.categories.length > 0
                  ? post.frontmatter.categories[0]
                  : null,
            }}
          />
        ))}
      </FeaturedPosts>
      <StickyContent>
        Sticky SideBar Content
      </StickyContent>
    </>
  )
}

export default Sidebar
