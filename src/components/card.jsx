import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import Theme from "../styles/theme"
import Img from "gatsby-image"

export const StyledCard = styled(Link)`
  display: block;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 1px #e6e6e6, 0 2px 4px #e6e6e6;
  transition: .5s all;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &:hover {
    transform: translate3d(0, -5px, 0);
    box-shadow: 0 1px 1px #ccc, 0 4px 4px #ccc;

    h2 {
    transition: .5s all;
      color: ${Theme.layout.linkColorHover};
    }
  }
`

export const StyledArticle = styled.article`
  display: inline-block;
  width: 100%;

  @media (max-width: ${Theme.breakpoints.sm}) {
    grid-area: unset !important;
  }
`

export const FeaturedImage = styled(Img)`
  background-position: center;
  background-size: cover;
  max-width: 100%;
  width: 100%;
  border-top-left-radius: 3px;

  ${props => props.halfImage ? `
    width: 50%;
    float: left;
    margin-right: 30px;
    height: 320px;

    @media (max-width: ${Theme.breakpoints.md}) {
      width: 100%;
      float: none;
      height: 200px;
    }
  ` : `
    ${props => props.compact ? `
      height: 120px;
      max-height: 120px;
  ` : `
      height: 200px;
      max-height: 200px;
    `};
  `};

`

export const CardContent = styled.section`
  padding: ${props => props.compact ? "10px" : "40px"};

  p {
    margin: 15px 0;
  }

  h2 {
    font-size: 1.2em;
  }
`

export const CardMeta = styled.section`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: .8em;
  opacity: .8;
  line-height: 1em;
`

export const CardTitle = styled.h2`
  margin: 0;
  padding: 0;
  color: ${Theme.layout.linkColor};
`

export const Card = ({
                       title,
                       meta,
                       path,
                       featuredImage,
                       content,
                       halfImage = false,
                       compact = false,
                       style,
                       children,
                     }) => (
  <StyledArticle style={style}>
    <StyledCard to={path}>
      {(featuredImage && featuredImage.fluid) &&
      <FeaturedImage fixed={featuredImage.fluid} halfImage={halfImage}/>
      }
      {(featuredImage && featuredImage.sizes) &&
      <FeaturedImage sizes={featuredImage.sizes} halfImage={halfImage}/>
      }
      <CardContent compact={compact}>
        {children}
        <header>
          {meta &&
          <CardMeta>
            {meta.category && <>{meta.category}</>}
            {meta.time &&
            <time dateTime={meta.time}>{meta.timePretty}</time>
            }
          </CardMeta>
          }
          {title &&
          <CardTitle>{title}</CardTitle>
          }
        </header>
        {content &&
        <p dangerouslySetInnerHTML={{ __html: content }}/>
        }
      </CardContent>
    </StyledCard>
  </StyledArticle>
)
