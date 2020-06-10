import React from "react"
import styled from "styled-components"
import { graphql, Link, useStaticQuery, withPrefix } from "gatsby"
import Theme from "../styles/theme"
import Img from "gatsby-image"
import {useLocation} from "@reach/router";

const BrandingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 80px 20px 0;

  @media (max-width: ${Theme.breakpoints.xl}) {
    padding: 20px;
  }
`

const LogoWrapper = styled.div`
  margin-right: 20px;
  width: ${Theme.components.logo.width};
`

const LogoImage = styled(Img)`
  max-width: 300px;
  max-height: 100px;
  min-width: 100px;

  @media (max-width: ${Theme.breakpoints.sm}) {
    max-width: 80px;
    max-height: 80px;
  }
`

const SiteTitle = styled.h1`
  font-size: 28px;
  margin: 0;
  line-height: 1.1;
  font-weight: 900;
  color: ${Theme.layout.primaryColor};
  white-space: nowrap;
  cursor: default;

  @media (max-width: ${Theme.breakpoints.lg}) {
    font-size: 18px;
    white-space: inherit;
  }
`

const Subtitle = styled.p`
  color: ${Theme.layout.darkColor};
  opacity: .8;
  line-height: 1.2;
  margin: 0;
  font-size: 16px;
  cursor: default;

  @media (max-width: ${Theme.breakpoints.sm}) {
    font-size: 14px;
  }
`

const HomeLink = styled(Link)`
  font-size: 28px;
  margin: 0;
  line-height: 1.1;
  font-weight: 900;
  color: ${Theme.layout.primaryColor};
  white-space: nowrap;

  @media (max-width: ${Theme.breakpoints.lg}) {
    font-size: 18px;
    white-space: inherit;
  }
`

const Branding = ({ title, subtitle }) => {
  const logo = useStaticQuery(graphql`
    query {
      file(sourceInstanceName: { eq: "images" }, name: { eq: "logo" }) {
        childImageSharp {
          sizes(maxWidth: 300, quality: 75) {
            base64
            aspectRatio
            src
            srcSet
            sizes
          }
        }
      }
    }
  `)

  const { pathname } = useLocation()
  const isHomepage = pathname === withPrefix("/")

  return (
    <BrandingWrapper>
      <LogoWrapper>
        {isHomepage
          ? <LogoImage sizes={logo.file.childImageSharp.sizes} alt={title}/>
          : <HomeLink to={`/`}>
            <LogoImage sizes={logo.file.childImageSharp.sizes} alt={title}/>
          </HomeLink>
        }
      </LogoWrapper>

      <div>
          {isHomepage
            ? <SiteTitle>{title}</SiteTitle>
            : <HomeLink to={`/`}>{title}</HomeLink>
          }


        <Subtitle>{subtitle}</Subtitle>
      </div>
    </BrandingWrapper>
  )
}

export default Branding
