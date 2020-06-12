import React, {useState} from "react"
import styled from "styled-components"
import Theme from "../../styles/theme"
import {FaChevronDown} from "react-icons/fa"
import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'

const SpoilerBox = styled.div`
  background: ${Theme.layout.lightGrey};
  border-left: 2px solid ${Theme.layout.primaryColor};
  margin: 15px 0;
`

const SpoilerTitle = styled.div`
  position: relative;
  cursor: pointer;
  padding: 15px 30px 15px 20px;

  svg {
    transition: all .3s ease;
    position: absolute;
    top: 48%;
    right: 10px;
    font-size: 18px;
    margin-top: -5px;
    color: #5a80b1;
    transform: ${props => props.open ? "rotate(180deg)" : "rotate(0deg)"};
  }
`

const SpoilerBody = styled.div`
  display: ${props => props.open ? "block" : "none"};
  padding: 20px;
  background: #fbfbfb;
  transform: all .5s ease-in-out;
`

const Spoiler = ({title, children}) => {
  const [isOpen, setIsOpen] = useState(false)

  // Toggles the spoiler
  const toggleSpoiler = () => setIsOpen(!isOpen)

  return (
    <SpoilerBox>
      <SpoilerTitle onClick={toggleSpoiler} open={isOpen}>
        {title}
        <FaChevronDown/>
      </SpoilerTitle>
      <SpoilerBody open={isOpen}>
        <SlideDown>
          {children}
        </SlideDown>
      </SpoilerBody>
    </SpoilerBox>
  )
}

export default Spoiler

