import React, {useState} from "react"
import styled from "styled-components"
import Theme from "../../styles/theme"

const SpoilerBox = styled.div`
  background: ${Theme.layout.lightGrey};
  border-left: 2px solid ${Theme.layout.primaryColor};
  margin: 15px 0;
`

const SpoilerTitle = styled.div`
  position: relative;
  cursor: pointer;
  padding: 15px 30px 15px 20px;

  &:after {
    transition: all .3s ease;
    position: absolute;
    top: 48%;
    right: 10px;
    font-size: 18px;
    margin-top: -5px;
    color: #5a80b1;
    content: "\\f078";
    font: normal normal normal 14px/1 FontAwesome;
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
      </SpoilerTitle>
      <SpoilerBody open={isOpen}>{children}</SpoilerBody>
    </SpoilerBox>
  )
}

export default Spoiler

