import React from "react"
import Heading from "../../components/ui/heading"
import { StyledContent } from "../../components/render-mdx"

const PostPagePreview = ({ entry, getAsset, widgetFor }) => {
  const data = entry.getIn([ 'data' ]).toJS()

  if (data) {
    const featuredImage = data.featuredImage && getAsset(data.featuredImage)
    return (
      <StyledContent style={{ margin: "0 20px 0 20px" }}>
        {data.heading && <Heading tag={1}>{data.heading}</Heading>}
        {featuredImage && <img src={featuredImage} alt=""/>}
        <div>{widgetFor('body')}</div>
      </StyledContent>
    )
  } else {
    return <div>Загрузка...</div>
  }
}

export default PostPagePreview
