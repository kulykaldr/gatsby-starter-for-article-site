import React, {createRef} from "react"
import Layout from "../components/layout"
import styled from "styled-components"
import Img from "gatsby-image"
import ReadingProgress from "../components/reading-progress"
import Theme from "../styles/theme"
import {graphql, Link} from "gatsby"
import slugify from "slugify"
import Comments from "../components/comments"
import SEO from "../components/seo"
import {MDXRenderer} from "gatsby-plugin-mdx"
import {MDXProvider} from "@mdx-js/react"
import Toc from "../components/toc"
import Spoiler from "../components/ui/spoiler"
import Blockquote from "../components/ui/blockquote"

const PostContent = styled.div`
  border-right: 1px #e5eff5 solid;
  border-left: 1px #e5eff5 solid;
  background-color: #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.03), 0 3px 46px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-width: 100%;

  p {
    font-size: 16px;
    margin-bottom: 20px;
    word-wrap: break-word;
  }

  ol, ul {
    margin: 1.7em 0 1.8em 1em;
    padding: 0;
    list-style: none;
  }

  @media (max-width: ${Theme.breakpoints.md}) {
    margin: 1.5em 0 1.5em 0;
  }

  ol {
    counter-reset: point;
  }

  ul li {
    &:before {
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      background-color: ${Theme.layout.primaryColor};
      margin: 0 22px 0 -30px;
    }
  }

  ol li {
    border-color: ${Theme.layout.primaryColor};

    &:before {
      content: counter(point);
      counter-increment: point 1;
      display: inline-block;
      width: 24px;
      height: 24px;
      margin: 0 13px 0 -40px;
      text-align: center;
      border: 2px solid #425d9d;
      border-color: ${Theme.layout.primaryColor};
      border-radius: 50%;
    }
  }

  li {
    list-style: none;
    padding-left: 40px;
    margin: .7em 0;
  }

  li > a,
  p > a {
    color: ${Theme.layout.p};
    transition: color 0.5s;

    &:hover {
      color: ${Theme.layout.linkColorHover};
    }
  }

  pre {
    margin: 30px 0;
  }

  h2, h3, h4, h5, h6 {
    margin: 1.5em 0 .5em;
    line-height: 1.1;
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
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 40px;

  @media (max-width: ${Theme.breakpoints.sm}) {
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
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

const shortcodes = { spoiler: Spoiler, blockquote: Blockquote }

const PostTemplate = ({
                        data,
                      }) => {
  const post = data.post
  const readingProgressRef = createRef()

  return (
    <>
      <ReadingProgress
        target={readingProgressRef}
        color={Theme.layout.primaryColor}
      />
      <Layout>
        <SEO
          title={post.frontmatter.title}
          publishedAt={post.frontmatter.created}
          updatedAt={post.frontmatter.updated}
          categories={post.frontmatter.categories}
          description={post.frontmatter.description}
          image={
            post.frontmatter.featuredImage
              ? post.frontmatter.featuredImage.childImageSharp.sizes.src
              : null
          }
        />
        <PostContent>
          <article ref={readingProgressRef}>
            <PostHeader>
              <PostMeta>
                {post.frontmatter.categories.length > 0 && (
                  <div>
                    Рубрика:&nbsp;{" "}
                    <Link
                      to={`/${slugify(post.frontmatter.categories[0], {
                        lower: true,
                      })}`}
                    >
                      {post.frontmatter.categories[0]}
                    </Link>
                  </div>
                )}
                <time dateTime={post.frontmatter.created}>
                  {post.frontmatter.createdPretty}
                </time>
              </PostMeta>
              <PostTitle>{post.frontmatter.heading}</PostTitle>
            </PostHeader>
            {post.frontmatter.featuredImage && (
              <FeaturedImage
                sizes={post.frontmatter.featuredImage.childImageSharp.sizes}
              />
            )}
            <StyledPost className={`post`}>
              <Toc tableOfContents={post.tableOfContents}/>
              <MDXProvider components={shortcodes}>
                <MDXRenderer>{post.body}</MDXRenderer>
              </MDXProvider>
            </StyledPost>
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
        heading
        description
        created
        createdPretty: created(formatString: "DD MMMM, YYYY", locale: "ru")
        updated
        updatedPretty: created(formatString: "DD MMMM, YYYY", locale: "ru")
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
      body
      tableOfContents
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
