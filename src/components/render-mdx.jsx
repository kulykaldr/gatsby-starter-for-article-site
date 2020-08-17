import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"
import Spoiler from "./ui/spoiler"
import Attention from "./ui/attention"
import Heading from "./ui/heading"
import { SmartLink } from "./ui/smartlink"

export const components = {
  Spoiler,
  Attention,
  h1: props => <Heading tag={1} {...props} />,
  h2: props => <Heading tag={2} {...props} />,
  h3: props => <Heading tag={3} {...props} />,
  h4: props => <Heading tag={4} {...props} />,
  h5: props => <Heading tag={5} {...props} />,
  h6: props => <Heading tag={6} {...props} />,
  a: props => <SmartLink {...props} />,
  blockquote: props => <Attention type="" {...props}/>
}

const RenderMdx = ({ children, ...props }) => (
  <StyledContent itemProp="articleBody" {...props}>

    {children &&
    <MDXProvider components={components}>
      <MDXRenderer>{children}</MDXRenderer>
    </MDXProvider>}

  </StyledContent>
)

export default RenderMdx

export const StyledContent = styled.div`
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

  ol {
    counter-reset: point;
  }

  li {
    list-style: none;
    padding-left: 40px;
    margin: .7em 0;
  }

  ul li {
    &:before {
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      background-color: ${props => props.theme.siteColors.primaryColor};
      margin: 0 22px 0 -30px;
    }
  }

  ol li {
    border-color: ${props => props.theme.siteColors.primaryColor};

    &:before {
      content: counter(point);
      counter-increment: point 1;
      display: inline-block;
      width: 24px;
      height: 24px;
      margin: 0 13px 0 -40px;
      text-align: center;
      border: 2px solid ${props => props.theme.siteColors.primaryColor};
      border-radius: 50%;
    }
  }

  pre {
    margin: 30px 0;
  }

  code[class*="language-text"] {
    padding: 5px;
  }

  p > img {
    max-width: 100%;
    border-radius: 0.3em;
    display: block;
    margin: 30px auto;
  }

  hr {
    border-top: 1px solid #ececec;
    border-bottom: 0;
    margin-top: 44px;
    margin-bottom: 40px;
  }
`
