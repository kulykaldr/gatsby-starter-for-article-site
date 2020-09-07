import React from "react"
import tw, { css, styled } from 'twin.macro'

let lastId = 0

function newId (prefix = 'id') {
  lastId++
  return `${prefix}${lastId}`
}

const Spoiler = ({ title, children, isOpen = false }) => (
  <StyledSpoiler>
    <StyledInput type="checkbox" id={newId()} defaultChecked={isOpen} />
    <StyledLabel htmlFor={`id${lastId++}`}>{title}</StyledLabel>

    <StyledContent>{children}</StyledContent>
  </StyledSpoiler>
)

const StyledSpoiler = styled.div([
  tw`text-gray-800 overflow-hidden rounded-md shadow my-6`,
  css`
    input:checked {
      + label {
        ${tw`bg-gray-300`}
        &::after {
          ${tw`origin-bottom transform rotate-90`}
        }
      }
      ~ div {
        max-height: 100vh;
        padding: 1em;
      }
    }
  `
])

const StyledInput = styled.input([
  tw`absolute opacity-0`,
  css`
    z-index: -1;
  `
])

const StyledLabel = styled.label([
  tw`flex justify-between p-4 bg-gray-200 text-base font-medium cursor-pointer hover:bg-gray-300`,
  tw`transition-all duration-300`,
  tw`after:(w-4 h-4 text-center text-xl text-primary transition-all duration-300)`,
  css`
    ::after {
      content: '\\276F';
    }
  `
])

const StyledContent = styled.div([
  tw`px-4 transition-all duration-300 bg-gray-200`,
  css`
    max-height: 0;
  `
])

export default Spoiler
