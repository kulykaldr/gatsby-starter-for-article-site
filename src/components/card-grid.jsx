import React from "react"
import {Card} from "./card"
import styled from "styled-components"

const CardGrid = ({posts, halfImage = false, compact = false, random = false, columns = 1, count = null}) => {
  if (random) {
    posts = posts.sort(() => Math.random() - 0.5)
  }

  if (count && count > 0) {
    posts = posts.slice(0, count)
  }

  return (
    <StyledCardGrid columns={columns}>
      {posts.map((post, index) => (
        <Card
          heading={post.frontmatter.heading}
          slug={post.frontmatter.slug || post.fields.slug}
          featuredImage={post.frontmatter.featuredImage ? post.frontmatter.featuredImage.childImageSharp : null}
          content={post.excerpt}
          compact={compact}
          key={index}
          meta={
            {
              timeCreated: post.frontmatter.created,
              timeUpdated: post.frontmatter.updated,
              timePretty: post.frontmatter.createdPretty,
              category: post.frontmatter.categories.length > 0 ? post.frontmatter.categories[0] : null,
            }
          }

          // style={{ gridArea: index === 0 ? "latest" : undefined }}
          // halfImage={index === 0}
          halfImage={halfImage}
        />
      ))
      }
    </StyledCardGrid>
  )
}

export default CardGrid

const StyledCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${({columns}) => columns ? columns : "1"}, 1fr);
  grid-gap: 30px;

  @media (max-width: ${props => props.theme.siteBreakpoints.sm}) {
    display: block;
  }
`
