import React from 'react'
import Heading from "../../components/ui/heading"
import GlobalStyle from "../../styles/global-style"

const PostPreview = ({ entry, getAsset, widgetFor }) => {
  const data = entry.getIn(['data']).toJS()

  if (data) {
    const featuredImage = getAsset(data.featuredImage)

    return (
      <div style={{margin: "0 20px 0 20px"}}>
        <GlobalStyle/>
        {data.heading && <Heading tag={1}>{data.heading}</Heading>}
        {featuredImage && <img src={featuredImage} alt=""/>}
        <div>{widgetFor('body')}</div>
      </div>
    )
  } else {
    return <div>Загрузка...</div>
  }
}

export default PostPreview
