import React from "react"
import { CacheProvider } from "@emotion/core"
import createCache from "@emotion/cache"
import weakMemoize from "@emotion/weak-memoize"

const memoizedCreateCacheWithContainer = weakMemoize(container => {
  return createCache({ container })
})

export default Component => props => {
  const iframe = document.querySelector("#nc-root iframe")
  const iframeHeadElem = iframe && iframe.contentDocument.head

  if (!iframeHeadElem) {
    return null
  }

  return (
    <CacheProvider value={memoizedCreateCacheWithContainer(iframeHeadElem)}>
      <Component {...props} />
    </CacheProvider>
  )
}
