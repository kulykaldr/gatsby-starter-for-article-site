import React, {useEffect} from "react"
import tocbot from "tocbot"
import tw, { styled, css } from "twin.macro"
import Spoiler from "./ui/spoiler"

const Toc = () => {
  useEffect(() => {
    tocbot.init({
      tocSelector: `.toc`,
      contentSelector: `.post`,
      headingSelector: `h2,h3,h4,h5,h6`,
      scrollSmooth: true,
      scrollSmoothDuration: 1,
      activeLinkClass: ' ',
      orderedList: false,
    })

    return () => tocbot.destroy()
  })

  return (
    <Spoiler title={`Содержание статьи`} isOpen={true}>
      <StyledNav className={`toc`}/>
    </Spoiler>
  )
}

export default Toc

const StyledNav = styled.nav([
  tw`pl-5`,
  css`
    .toc-list {
      ${tw`leading-7`}
        .toc-list {
          ${tw`pl-4`}
        }
    }

    .toc-list-item {
      ${tw`before:(text-primary-lighter text-xs mr-1)`}
      &::before {
        content: '\\276F';
      }
    }
  `,
])
