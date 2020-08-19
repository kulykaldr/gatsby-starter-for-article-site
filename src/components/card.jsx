import React from "react"
import styled from "styled-components"
import Theme from "../styles/theme"
import Img from "gatsby-image"
import useSiteMetadata from "../hooks/use-site-metadata"
import useLogo from "../hooks/use-logo"
import SmartLink from "../components/ui/smartlink"

export const Card = ({
                       heading,
                       meta,
                       slug,
                       featuredImage,
                       content,
                       halfImage = false,
                       compact = false,
                     }) => {
  const metadata = useSiteMetadata()
  const logo = useLogo()

  return (
    <StyledCard itemScope itemType="http://schema.org/BlogPosting">
      {(featuredImage && featuredImage.fluid) &&
      <SmartLink to={slug}>
        <FeaturedImage
          fluid={featuredImage.fluid}
          compact={compact}
          halfImage={halfImage}
          alt={heading}
          itemProp="image"
        />
      </SmartLink>
      }

      <CardHeader>
        {meta &&
        <CardMeta>
          {meta.category &&
            <span itemProp="isPartOf">{meta.category}</span>
          }
          {meta.timeCreated &&
            <time dateTime={meta.timeCreated} itemProp="datePublished">{meta.timePretty}</time>
          }
        </CardMeta>
        }
        {heading &&
        <CardTitle compact={compact} itemProp="name">
          <SmartLink to={slug} rel="bookmark" itemProp="url">
            <span itemProp="headline">{heading}</span>
          </SmartLink>
        </CardTitle>
        }
      </CardHeader>
      {content && !compact &&
      <CardContent dangerouslySetInnerHTML={{__html: content}} itemProp="articleBody"/>
      }

      <meta itemProp="author" content={metadata.siteAuthor}/>
      <meta itemScope itemProp="mainEntityOfPage" itemType="https://schema.org/WebPage"
            itemID={`${metadata.siteUrl}${slug}`} content={heading}/>
      <meta itemProp="datePublished" content={meta.timeCreated}/>
      <meta itemProp="dateModified" content={meta.timeUpdated}/>
      <div itemProp="publisher" itemScope itemType="https://schema.org/Organization">
        <div itemProp="logo" itemScope itemType="https://schema.org/ImageObject" style={{display: "none"}}>
          <img itemProp="url image" src={logo.src} alt={metadata.siteTitle}/>
        </div>
        <meta itemProp="name" content={metadata.siteTitle}/>
        <meta itemProp="telephone" content={metadata.siteTitle}/>
        <meta itemProp="address" content={metadata.siteUrl}/>
      </div>
    </StyledCard>
  )
}

export const StyledCard = styled.div`
  display: inline-block;
  width: 100%;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 1px #e6e6e6, 0 2px 4px #e6e6e6;
  transition: .5s all;
  height: 100%;
  overflow: hidden;
  color: ${Theme.layout.darkColor};

  &:hover {
    transform: translate3d(0, -5px, 0);
    box-shadow: 0 1px 1px #ccc, 0 4px 4px #ccc;
  }

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

  ${props => props.halfImage && !props.compact ? `
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

  a {
    color: ${Theme.layout.primaryColor};
    transition: color .5s;

    &:hover {
      color: ${Theme.layout.linkColorHover};
    }
  }
`
