import React, { createRef } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import slugify from "slugify"
import styled from "styled-components"
import { useLocation } from "@reach/router"
import ReadingProgress from "../components/reading-progress"
import Layout from "../components/layout"
import AnyComments from "../components/any-comments"
import SEO from "../components/seo"
import CardGrid from "../components/card-grid"
import Breadcrumb from "../components/breadcrumb"
import useSiteMetadata from "../hooks/use-site-metadata"
import RenderMdx from "../components/render-mdx"
import { SmartLink } from "../components/ui/smartlink"
import Heading from "../components/ui/heading"
import Toc from "../components/toc"

const PostTemplate = ({ data }) => {
  const post = data.post
  const readingProgressRef = createRef()
  const categoryPath = `/${slugify(post.frontmatter.categories[0], { lower: true })}`
  const { pathname } = useLocation()
  const metadata = useSiteMetadata()

  return (
    <>
      <Layout showSidebar={metadata.siteShowSidebar || post.showSidebar}>
        <ReadingProgress target={readingProgressRef}/>
        <SEO
          title={post.frontmatter.title}
          publishedAt={post.frontmatter.created}
          updatedAt={post.frontmatter.updated}
          description={post.frontmatter.description}
          image={
            post.frontmatter.featuredImage
              ? post.frontmatter.featuredImage.childImageSharp.fluid.src
              : null
          }
          type={"Article"}
          categories={post.frontmatter.categories.join(",")}
        />
        <StyledPost itemScope itemType="http://schema.org/Article">
          <Breadcrumb crumb={post.frontmatter.categories[0]}/>

          <article ref={readingProgressRef}>
            <PostHeader>
              <Heading tag={1} itemProp="headline">{post.frontmatter.heading}</Heading>

              <PostMeta>
                {post.frontmatter.categories.length > 0 && (
                  <div>
                    Рубрика:&nbsp;{" "}
                    <SmartLink to={categoryPath}>
                      {post.frontmatter.categories[0]}
                    </SmartLink>
                  </div>
                )}
                <time dateTime={post.frontmatter.created} itemProp="datePublished">
                  {post.frontmatter.createdPretty}
                </time>
              </PostMeta>
            </PostHeader>

            {post.frontmatter.featuredImage && (
              <FeaturedImage
                fluid={post.frontmatter.featuredImage.childImageSharp.fluid}
                itemProp="image"
              />
            )}
            <Toc/>
            <RenderMdx className={`post`}>{post.body}</RenderMdx>
          </article>
        </StyledPost>

        {post.related && post.related.length > 0 &&
        <BlockWrapper>
          <RelatedPostsTitle>
            Еще материалы по этой теме
          </RelatedPostsTitle>
          <CardGrid posts={post.related} columns={2} halfImage={false} count={6} random={true}/>
        </BlockWrapper>}
        <meta itemScope itemProp="mainEntityOfPage" itemType="https://schema.org/WebPage"
              itemID={`${metadata.siteUrl}${pathname}`} content={post.frontmatter.heading}/>
        <meta itemProp="dateModified" content={post.frontmatter.updated}/>
        <meta itemProp="datePublished" content={post.frontmatter.created}/>
        <BlockWrapper>
          <AnyComments/>
        </BlockWrapper>
      </Layout>
    </>
  )
}

export default PostTemplate

export const query = graphql`
  query ($postId: String!) {
    post: mdx(id: { eq: $postId }) {
      frontmatter {
        title
        categories
        heading
        description
        created
        createdPretty: created(formatString: "DD MMMM, YYYY", locale: "ru")
        updated
        updatedPretty: created(formatString: "DD MMMM, YYYY", locale: "ru")
        showSidebar
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
      body
      related {
        fields {
          slug
        }
        frontmatter {
          title
          categories
          heading
          created
          createdPretty: created(formatString: "DD MMMM, YYYY", locale: "ru")
          updated
          updatedPretty: created(formatString: "DD MMMM, YYYY", locale: "ru")
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
`

export const StyledPost = styled.div`
  padding: 0 40px 40px 40px;
  border-right: 1px #e5eff5 solid;
  border-left: 1px #e5eff5 solid;
  background-color: #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.03), 0 3px 46px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-width: 100%;

  @media (max-width: ${props => props.theme.siteBreakpoints.md}) {
    margin: 1.5em 0 1.5em 0;
  }

  @media (max-width: ${props => props.theme.siteBreakpoints.sm}) {
    padding: 0 20px 20px 20px;
  }
`

export const PostHeader = styled.header`
  padding-bottom: 20px;
`

export const FeaturedImage = styled(Img)`
  border-radius: 0;

  @media (max-width: ${props => props.theme.siteBreakpoints.xl}) {
    margin-left: -1px;
    margin-right: -1px;
  }
`

export const PostMeta = styled.section`
  display: flex;
  justify-content: space-between;
  opacity: 0.8;
  font-size: 0.9em;
`

export const BlockWrapper = styled.div`
  border-right: 1px #e5eff5 solid;
  border-left: 1px #e5eff5 solid;
  background-color: #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.03), 0 3px 46px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-width: 100%;
  padding: 41px;
  margin: 1.5em 0 1.5em 0;

  @media (max-width: ${props => props.theme.siteBreakpoints.md}) {
    margin: 1.1em 0 1.1em 0;
  }

  @media (max-width: ${props => props.theme.siteBreakpoints.sm}) {
    padding: 21px;
  }
`

export const RelatedPostsTitle = styled.div`
  font-size: 1.5em;
  font-weight: 700;
  text-align: center;
  margin: 1.5em 0 .5em;
  line-height: 1.1;
`
