import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import tw, { styled } from "twin.macro"
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
    ${tw`text-base mb-3`};
  }

  ol, ul {
    ${tw`my-4 ml-4 list-none`};
  }

  ol {
    counter-reset: point;
  }

  li {
    ${tw`pl-10 my-2`};
  }

  ul li {
    &:before {
      content: '';
      ${tw`inline-block w-2 h-2 bg-primary mr-6 -ml-8`};
    }
  }

  ol li {
    ${tw`border-primary`};

    &:before {
      content: counter(point);
      counter-increment: point 1;
      ${tw`inline-flex w-6 h-6 text-center border-2 border-primary rounded-full
        justify-center items-center mr-6 -ml-12`};
    }
  }

  pre {
    ${tw`my-8`};
  }

  code[class*="language-text"] {
    ${tw`p-2`};
  }

  p > img {
    ${tw`block max-w-full rounded m-8 mx-auto`};
  }

  hr {
    border-top: 1px solid #ececec;
    border-bottom: 0;
    margin-top: 44px;
    margin-bottom: 40px;
  }
`
