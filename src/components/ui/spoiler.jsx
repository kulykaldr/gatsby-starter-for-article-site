import React, {useState} from "react"
import styled from "styled-components"
import Theme from "../../styles/theme"
import {FaChevronDown} from "react-icons/fa"
import SlideToggle from "react-slide-toggle"

const Spoiler = ({title, children}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [toggleEvent, setToggleEvent] = useState(0)

  // Toggles the spoiler
  const toggleSpoiler = () => {
    setIsOpen(!isOpen)
    setToggleEvent(Date.now())
  }

  return (
    <SpoilerBox>
      <SpoilerTitle onClick={toggleSpoiler} open={isOpen}>
        {title}
        <FaChevronDown/>
      </SpoilerTitle>

      <SpoilerBody>
        <SlideToggle
          duration={800}
          toggleEvent={toggleEvent}
          collapsed={false}
        >
          {({setCollapsibleElement, progress}) => (
            <div
              ref={setCollapsibleElement}
              style={{
                transform: `translateY(${Math.round(20 * (-1 + progress))}px)`
              }}
            >
              {children}
            </div>
          )}
        </SlideToggle>
      </SpoilerBody>
    </SpoilerBox>
  )
}

export default Spoiler

const SpoilerBox = styled.div`
  background: ${Theme.layout.lightGrey};
  border-left: 2px solid ${Theme.layout.primaryColor};
  margin: 15px 0;

  /*
  Slide animation styles

  You may need to add vendor prefixes for transform depending on your desired browser support.
  */

  .slide-enter {
    transform: translateY(-100%);
    transition: .7s cubic-bezier(0, 1, 0.5, 1);
  }

  .slide-enter-active {
      transform: translateY(0%);
  }

  .slide-exit {
    transform: translateY(0%);
    transition: .7s ease-in-out;
  }

  .slide-exit-active {
      transform: translateY(-100%);
  }
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
  padding: 0 20px 0 20px;
  background: #fbfbfb;
`
