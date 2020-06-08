import React from "react"
import styled from "styled-components"
import Theme from "../../styles/theme"

const BlockquoteWrapper = styled.blockquote`
  position: relative;
  margin: 35px -40px 35px -40px;
  padding: 10px 20px;
  border-left: 2px solid ${Theme.layout.primaryColor}!important;
  background: #f5f4f1;

  &.quote, &.check, &.danger, &.info, &.warning {
    border-left: none!important;
    border-radius: 0 6px 6px 0;
    padding: 20px 30px 20px 70px;
    text-rendering: auto;

    &:before {
      font: normal normal normal 14px/1 FontAwesome;
      font-size: 30px;
      position: absolute;
      left: 20px;
      margin-top: -15px;
      top: 50%;
    }
  }

  @media (max-width: ${Theme.breakpoints.md}) {
    margin: 20px -20px 20px -20px;
  }

  &.quote {
    background-color: #eff4f5;

    &:before {
      content: "\\f10d";
      color: #425d9d;
      top: 25px;
    }
  }

  &.check {
    background-color: #def9e5;

    &:before {
      content: "\\f058";
      color: #34bc58;
    }
  }

  &.danger {
    background-color: #ffe3db;

    &:before {
      content: "\\f057";
      color: #ff6547;
    }
  }

  &.info {
    background-color: #e3f1f4;

    &:before {
      content: "\\f059";
      color: #3da2e0;
    }
  }

  &.warning {
    background-color: #fff4d4;

    &:before {
      content: "\\f06a";
      color: #f58128;
    }
  }
`

const Blockquote = ({children, className}) => (
  <BlockquoteWrapper className={className}>
    {children}
  </BlockquoteWrapper>
)

export default Blockquote
