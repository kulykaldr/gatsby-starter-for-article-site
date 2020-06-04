import React, { useEffect } from "react"
import tocbot from "tocbot"
import styled from "styled-components"

const Spoiler = styled.div`
  margin-top: 40px;
  margin-bottom: 40px;
  border-radius: 5px;
  overflow: hidden;

  input + label::before {
    content: "►";
    margin-right: 12px;
    font-weight: bold;
  }

  input:checked + label::before {
    content: "▼";
    margin-right: 12px;
    font-weight: bold;
  }

  input {
    display: none;
  }

  input + label, .spoiler_body {
    padding: 15px 30px;
    font-weight: 700;
    font-size: 1.1em;

    background-color: #f2f5f9;
    width: 100%;
    display: block;
  }

  input + label + .spoiler_body {
    display: none;
  }

  input:checked + label + .spoiler_body {
    display: block;
  }
`

const StyledNav = styled.nav`
  padding: 20px;
  background-color: #f2f5f9;

  .toc-list {
    margin: 0;
    padding: 0;

    .toc-list {
      padding-left: 17px;
      padding-top: 10px;
    }
  }

  .toc-list-item {
    line-height: 1.2em;
    padding-bottom: 10px;

    &:last-child {
      padding-bottom: 0;
    }
  }

  .toc-link {
    color: #808080;
    text-decoration: none;
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
    <Spoiler>
      <input type="checkbox" id="toc1"/>
      <label htmlFor="toc1">
        Содержание
      </label>
      <div className="spoiler_body">
        <StyledNav className={`toc`}/>
      </div>
    </Spoiler>
  )
}

export default Toc
