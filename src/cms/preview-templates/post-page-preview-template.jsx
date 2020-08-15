import React from "react"
import { ThemeProvider } from "styled-components"
import Heading from "../../components/ui/heading"
import GlobalStyle from "../../styles/global-style"
import { StyledContent } from "../../components/render-mdx"
import siteConfig from "../../../content/configs/site-config.json"

const PostPagePreview = ({ entry, getAsset, widgetFor }) => {
  const data = entry.getIn([ 'data' ]).toJS()

  if (data) {
    const featuredImage = data.featuredImage && getAsset(data.featuredImage)
    return (
      <ThemeProvider theme={siteConfig}>
        <StyledContent style={{ margin: "0 20px 0 20px" }}>
          <GlobalStyle/>
          {data.heading && <Heading tag={1}>{data.heading}</Heading>}
          {featuredImage && <img src={featuredImage} alt=""/>}
          <div>{widgetFor('body')}</div>
        </StyledContent>
      </ThemeProvider>
    )
  } else {
    return <div>Загрузка...</div>
  }
}

export default PostPagePreview
