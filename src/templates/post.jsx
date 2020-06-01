import React, { createRef } from "react"
import Layout from "../components/layout"
import styled from "styled-components"
import Img from "gatsby-image"
import ReadingProgress from "../components/reading-progress"
import Theme from "../styles/theme"
import { graphql, Link } from "gatsby"
import slugify from "slugify"
import Comments from "../components/comments"
import SEO from "../components/seo"
import { MDXRenderer } from "gatsby-plugin-mdx"

const PostContent = styled.div`
  border-right: 1px #e5eff5 solid;
  border-left: 1px #e5eff5 solid;
  background-color: #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.03), 0 3px 46px rgba(0, 0, 0, 0.1);
  z-index: 10;
  /*width: 1035px;*/
  max-width: 100%;

  li > a,
  p > a {
    color: ${Theme.layout.linkColor};
    border-bottom: 2px ${Theme.layout.linkColor} solid;
  }

  pre {
    margin: 30px 0;
  }

  blockquote {
    border-left: 4px ${Theme.layout.primaryColor} solid;
    background-color: ${Theme.layout.backgroundColor};
    margin: 30px 0;
    padding: 5px 20px;
    border-radius: 0.3em;
  }

  h3::before,
  h4::before,
  h5::before,
  h6::before {
    display: block;
    content: " ";
    height: 90px;
    margin-top: -90px;
    visibility: hidden;
  }

  h2 {
    border-top: 1px solid #ececec;
    margin-top: 44px;
    padding-top: 40px;
    line-height: 1.2;
  }

  code[class*="language-text"] {
    padding: 5px;
  }

  p > img {
    max-width: 100%;
    border-radius: 0.3em;
    margin: 30px 0;
  }

  hr {
    border-top: 1px solid #ececec;
    border-bottom: 0;
    margin-top: 44px;
    margin-bottom: 40px;
  }

  .gatsby-resp-image-link {
    margin: 30px 0;
    max-width: 100%;

    .gatsby-resp-image-image {
      border-radius: 0.3em;
    }
  }
`

const PostHeader = styled.header`
  padding: 40px;

  @media (max-width: ${Theme.breakpoints.sm}) {
    padding: 20px;
  }
`

const FeaturedImage = styled(Img)`
  border-radius: 0;

  @media (max-width: ${Theme.breakpoints.xl}) {
    margin-left: -1px;
    margin-right: -1px;
  }
`

const StyledPost = styled.section`
  padding: 40px;

  @media (max-width: ${Theme.breakpoints.sm}) {
    padding: 20px;
  }
`

const PostMeta = styled.section`
  display: flex;
  justify-content: space-between;
  opacity: 0.8;
  font-size: 0.9em;
`

const PostTitle = styled.h1`
  margin: 0;
  padding: 0;
`

const PostFooter = styled.footer`
  background-color: #fafafa;
  font-size: 0.8em;
  color: #666;
  padding: 40px;
  line-height: 1em;

  p {
    margin: 5px 0;
  }
`

const PostTemplate = ({
                        data,
                        location,
                      }) => {
  const post = data.post
  const readingProgressRef = createRef()

  return (
    <>
      <ReadingProgress
        target={readingProgressRef}
        color={Theme.layout.primaryColor}
      />
      <Layout location={location}>
        <SEO
          location={location}
          title={post.frontmatter.title}
          publishedAt={post.frontmatter.created}
          updatedAt={post.frontmatter.updated}
          categories={post.frontmatter.categories}
          description={post.frontmatter.excerpt}
          image={
            post.frontmatter.featuredImage
              ? post.frontmatter.featuredImage.childImageSharp.sizes.src
              : null
          }
        />
        <PostContent>
          <article className={`post`} ref={readingProgressRef}>
            <PostHeader>
              <PostMeta>
                {post.frontmatter.categories.length > 0 && (
                  <Link
                    to={`/${slugify(post.frontmatter.categories[0], {
                      lower: true,
                    })}`}
                  >
                    {post.frontmatter.categories[0]}
                  </Link>
                )}
                <time dateTime={post.frontmatter.created}>
                  {post.frontmatter.createdPretty}
                </time>
              </PostMeta>
              <PostTitle>{post.frontmatter.title}</PostTitle>
            </PostHeader>
            {post.frontmatter.featuredImage && (
              <FeaturedImage
                sizes={post.frontmatter.featuredImage.childImageSharp.sizes}
              />
            )}
            <StyledPost>
              <MDXRenderer className={`post`}>{post.body}</MDXRenderer>
            </StyledPost>
            <PostFooter>
              <p>
                Опубликовано &nbsp;{" "}
                <time dateTime={post.frontmatter.created}>
                  {post.frontmatter.createdPretty}
                </time>
              </p>
              {post.frontmatter.updated !== post.frontmatter.created && (
                <p>
                  Последний раз редактировалось {" "}
                  <time dateTime={post.frontmatter.updated}>
                    {post.frontmatter.updatedPretty}
                  </time>
                </p>
              )}
            </PostFooter>
          </article>
        </PostContent>

        <Comments/>
      </Layout>
    </>
  )
}

export default PostTemplate

export const query = graphql`
  query ($postId: String!) {
    post: mdx(id: { eq: $postId }) {
      headings {
        depth
      }
      frontmatter {
        title
        path
        categories
        excerpt
        created
        createdPretty: created(formatString: "DD MMMM, YYYY", locale: "ru")
        updated
        updatedPretty: created(formatString: "DD MMMM, YYYY", locale: "ru")
        featuredImage {
          childImageSharp {
            sizes(maxWidth: 800, quality: 75) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
      body
    }
  }
`
