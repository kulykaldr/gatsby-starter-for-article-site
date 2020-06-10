import React from "react"
import styled from "styled-components"
import Theme from "../../styles/theme"
import {
  FaQuoteLeft,
  FaCheckCircle,
  FaTimesCircle,
  FaQuestionCircle,
  FaExclamationCircle
} from "react-icons/fa"

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

    svg {
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

    svg {
      color: #425d9d;
      top: 25px;
    }
  }

  &.check {
    background-color: #def9e5;

    svg {
      color: #34bc58;
    }
  }

  &.danger {
    background-color: #ffe3db;

    svg {
      color: #ff6547;
    }
  }

  &.info {
    background-color: #e3f1f4;

    svg {
      color: #3da2e0;
    }
  }

  &.warning {
    background-color: #fff4d4;

    svg {
      color: #f58128;
    }
  }
`

const Blockquote = ({children, className}) => {
  if (className === "quote") {

  }

  return (
    <BlockquoteWrapper className={className}>
      {className === "quote" && <FaQuoteLeft/>}
      {className === "check" && <FaCheckCircle/>}
      {className === "danger" && <FaTimesCircle/>}
      {className === "info" && <FaQuestionCircle/>}
      {className === "warning" && <FaExclamationCircle/>}
      {children}
    </BlockquoteWrapper>
  )
}

export default Blockquote
