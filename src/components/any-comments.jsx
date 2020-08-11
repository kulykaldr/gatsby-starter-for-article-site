import React, {useEffect} from "react"
import styled from "styled-components"

const AnyComments = () => {
  useEffect(() => {
    const AnyComment = window.AnyComment || []
    AnyComment.Comments = []
    AnyComment.Comments.push({
      root: "anycomment-app",
      app_id: 1096,
      track_get_params: true,
      language: "ru"
    })
    window.AnyComment = AnyComment

    const s = document.createElement("script")
    s.type = "text/javascript"
    s.async = true
    s.src = "https://cdn.anycomment.io/assets/js/launcher.js"
    const sa = document.getElementsByTagName("script")[0]
    sa.parentNode.insertBefore(s, s.nextSibling)
  }, [])

  return (
    <>
      <CommentTitle>
        Комментарии:
      </CommentTitle>
      <div id="anycomment-app"/>
    </>
  )
}

export default AnyComments

const CommentTitle = styled.div`
  font-size: 1.3em;
  font-weight: 700;
  margin: 15px 0 20px;
`
