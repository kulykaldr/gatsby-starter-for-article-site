import React from "react"
import styled from "styled-components"
import { graphql, Link, useStaticQuery, withPrefix } from "gatsby"
import Theme from "../styles/theme"
import Img from "gatsby-image"

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

const SiteTitle = styled.div`
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
  color: ${Theme.layout.lightGray};
  line-height: 1.2;
  margin: 0;
  font-size: 16px;
  cursor: default;

  @media (max-width: ${Theme.breakpoints.sm}) {
    font-size: 14px;
  }
`

const HomeLink = styled(Link)`
  color: ${Theme.layout.primaryColor};
  text-decoration: none;
  align-self: center;
`

const Branding = ({ title, subtitle, location }) => {
  const logo = useStaticQuery(graphql`
    query {
      file(sourceInstanceName: { eq: "images" }, name: { eq: "logo" }) {
        childImageSharp {
          fluid(maxWidth: 300, quality: 90) {
            ...GatsbyImageSharpFluid
            ...GatsbyImageSharpFluidLimitPresentationSize
          }
        }
      }
    }
  `)

  const isHomepage = location.pathname === withPrefix("/")

  return (
    <BrandingWrapper>
      <LogoWrapper>
        {isHomepage
          ? <LogoImage fluid={logo.file.childImageSharp.fluid} alt={title}/>
          : <HomeLink to={`/`}>
            <LogoImage fluid={logo.file.childImageSharp.fluid} alt={title}/>
          </HomeLink>
        }
      </LogoWrapper>

      <div>
        <SiteTitle>
          {isHomepage
            ? <span>{title}</span>
            : <HomeLink to={`/`}>{title}</HomeLink>
          }
        </SiteTitle>

        <Subtitle>{subtitle}</Subtitle>
      </div>
    </BrandingWrapper>
  )
}

export default Branding
