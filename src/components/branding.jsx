import React from "react"
import { styled, theme } from "twin.macro"
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
  background-color: ${theme`colors.gray.100`};
  z-index: 20;

  @media (max-width: ${theme`screens.xl`}) {
    padding: 20px 80px 20px 0;
  }
`

const LogoWrapper = styled.div`
  margin-right: 20px;
`

const LogoImage = styled(Img)`
  max-width: 300px;
  max-height: 100px;
  min-width: 100px;

  @media (max-width: ${theme`screens.sm`}) {
    max-width: 80px;
    max-height: 80px;
  }
`

const SiteTitle = styled.h1`
  font-size: 28px;
  margin: 0;
  line-height: 1.1;
  font-weight: 900;
  color: ${theme`colors.primary.default`};
  white-space: nowrap;
  cursor: default;

  @media (max-width: ${theme`screens.lg`}) {
    font-size: 18px;
    white-space: inherit;
  }
`

const Subtitle = styled.p`
  color: ${theme`colors.gray.900`};
  opacity: .8;
  line-height: 1.2;
  margin: 0;
  font-size: 16px;
  cursor: default;

  @media (max-width: ${theme`screens.sm`}) {
    font-size: 14px;
  }
`

const HomeLink = styled(SmartLink)`
  font-size: 28px;
  margin: 0;
  line-height: 1.1;
  font-weight: 900;
  color: ${theme`colors.primary.default`};
  white-space: nowrap;

  &:hover {
    color: ${theme`colors.primary.default`};
  }

  @media (max-width: ${theme`screens.lg`}) {
    font-size: 18px;
    white-space: inherit;
  }
`
