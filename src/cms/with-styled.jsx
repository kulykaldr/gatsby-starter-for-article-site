import React from "react"
import { StyleSheetManager } from "styled-components"

// This component from
// https://github.com/netlify/netlify-cms/issues/793
export default Component => props => {
  const iframe = document.querySelector("#nc-root iframe")
  const iframeHeadElem = iframe && iframe.contentDocument.head

  if (!iframeHeadElem) {
    return null
  }

  return (
    <StyleSheetManager target={iframeHeadElem}>
      <Component {...props} />
    </StyleSheetManager>
  )
}
