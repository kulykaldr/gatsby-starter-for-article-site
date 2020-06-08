import React, {useEffect} from "react"
import tocbot from "tocbot"
import styled from "styled-components"
import Spoiler from "./ui/spoiler"

const StyledNav = styled.nav`
  padding: 20px;

  .toc-list {
    margin: 0;
    padding: 0;
    /*list-style-type: none;*/

    .toc-list {
      padding-left: 17px;
      padding-top: 10px;
    }
  }

  .toc-list-item {
    line-height: 1.2em;
    padding-bottom: 10px;
    padding-left: 10px;
    margin: 0;

    &:last-child {
      padding-bottom: 0;
    }
  }
`

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
    });

    return () => tocbot.destroy()
  });

  return (
    <Spoiler title={`Содержание`}>
      <StyledNav className={`toc`}/>
    </Spoiler>
  )
}

export default Toc
