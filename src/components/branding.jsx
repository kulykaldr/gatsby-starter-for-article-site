import React from "react"
import styled from "styled-components"
import { withPrefix } from "gatsby"
import Img from "gatsby-image"
import { useLocation } from "@reach/router"
import useLogo from "../hooks/use-logo"
import SmartLink from "../components/ui/smartlink"

const Branding = ({ title, subtitle }) => {
  const logo = useLogo()

  const { pathname } = useLocation()
  const isHomepage = pathname === withPrefix("/")

  return (
    <BrandingWrapper>
      <LogoWrapper>
        {isHomepage
          ? <LogoImage fluid={logo} alt={title}/>
          : <HomeLink to={`/`}>
            <LogoImage fluid={logo} alt={title}/>
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

const BrandingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  background-color: ${props => props.theme.siteColors.backgroundColor};
  z-index: 20;

  @media (max-width: ${props => props.theme.siteBreakpoints.xl}) {
    padding: 20px 80px 20px 0;
  }
`

const LogoWrapper = styled.div`
  margin-right: 20px;
  width: ${props => props.theme.siteComponents.logoWidth};
`

const LogoImage = styled(Img)`
  max-width: 300px;
  max-height: 100px;
  min-width: 100px;

  @media (max-width: ${props => props.theme.siteBreakpoints.sm}) {
    max-width: 80px;
    max-height: 80px;
  }
`

const SiteTitle = styled.h1`
  font-size: 28px;
  margin: 0;
  line-height: 1.1;
  font-weight: 900;
  color: ${props => props.theme.siteColors.primaryColor};
  white-space: nowrap;
  cursor: default;

  @media (max-width: ${props => props.theme.siteBreakpoints.lg}) {
    font-size: 18px;
    white-space: inherit;
  }
`

const Subtitle = styled.p`
  color: ${props => props.theme.siteColors.darkColor};
  opacity: .8;
  line-height: 1.2;
  margin: 0;
  font-size: 16px;
  cursor: default;

  @media (max-width: ${props => props.theme.siteBreakpoints.sm}) {
    font-size: 14px;
  }
`

const HomeLink = styled(SmartLink)`
  font-size: 28px;
  margin: 0;
  line-height: 1.1;
  font-weight: 900;
  color: ${props => props.theme.siteColors.primaryColor};
  white-space: nowrap;

  @media (max-width: ${props => props.theme.siteBreakpoints.lg}) {
    font-size: 18px;
    white-space: inherit;
  }
`
