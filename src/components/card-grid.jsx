import React from "react"
import { Card } from "./card"

const CardGrid = ({ posts }) => (
  posts.map((post, index) => (
    <Card
      title={post.frontmatter.title}
      path={post.frontmatter.path}
      featuredImage={post.frontmatter.featuredImage ? post.frontmatter.featuredImage.childImageSharp : null}
      content={post.frontmatter.excerpt}
      key={index}
      meta={
        {
          time: post.frontmatter.created,
          timePretty: post.frontmatter.createdPretty,
          category: post.frontmatter.categories.length > 0 ? post.frontmatter.categories[0] : null,
        }
      }
      // style={{ gridArea: index === 0 ? "latest" : undefined }}
      // halfImage={index === 0}
      halfImage={true}
    />
  ))
)

export default CardGrid
