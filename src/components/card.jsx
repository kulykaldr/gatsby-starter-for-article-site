import React from "react"
import styled from "styled-components"
import {Link} from "gatsby"
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
  color: ${Theme.layout.darkColor};

  &:hover {
    transform: translate3d(0, -5px, 0);
    box-shadow: 0 1px 1px #ccc, 0 4px 4px #ccc;
  }
`

export const StyledArticle = styled.div`
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
      height: 200px;
      max-height: 200px;
  `};
`

export const CardHeader = styled.header`
  padding: 20px;
 `

export const CardContent = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  padding: 10px;
`

export const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: .8em;
  opacity: .8;
  line-height: 1em;
`

export const CardTitle = styled.div`
  font-size: ${({compact}) => compact ? '16px' : '18px'};
  font-weight: 700;
  margin: 0;
  padding: 0;
  color: ${Theme.layout.darkColor};
`

export const Card = ({
                       title,
                       meta,
                       path,
                       featuredImage,
                       content,
                       halfImage = false,
                       compact = false,
                     }) => (
  <StyledArticle itemType="http://schema.org/BlogPosting">
    <StyledCard to={path} itemProp="url">
      {(featuredImage && featuredImage.fluid) &&
      <FeaturedImage
        fixed={featuredImage.fluid}
        halfImage={halfImage}
        alt={title}
        itemProp="image"
      />
      }
      {(featuredImage && featuredImage.sizes) &&
      <FeaturedImage
        sizes={featuredImage.sizes}
        halfImage={halfImage}
        itemProp="image"
        alt={title}
      />
      }

      <CardHeader>
        {meta &&
        <CardMeta>
          {meta.category && <span itemProp="articleSection">{meta.category}</span>}
          {meta.time &&
          <time dateTime={meta.time} itemProp="datePublished">{meta.timePretty}</time>
          }
        </CardMeta>
        }
        {title &&
        <CardTitle compact={compact} itemProp="headline">{title}</CardTitle>
        }
      </CardHeader>
      {content &&
      <CardContent dangerouslySetInnerHTML={{__html: content}} itemProp="articleBody"/>
      }

    </StyledCard>
    <meta itemScope="" itemProp="mainEntityOfPage" itemType="https://schema.org/WebPage"
          itemID={path} content={title}/>
    <meta itemProp="dateModified" content={meta.time}/>
    <div itemProp="publisher" itemType="https://schema.org/Organization">
      <meta itemProp="name" content={meta.siteTitle}/>
      <meta itemProp="telephone" content={meta.siteTitle}/>
      <meta itemProp="address" content={meta.siteUrl}/>
    </div>
  </StyledArticle>
)
