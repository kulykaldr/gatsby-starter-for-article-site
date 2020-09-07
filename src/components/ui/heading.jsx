import React from "react"
import tw, { styled } from "twin.macro"

export const Heading = ({ tag, children, ...otherProps }) => {
  const Htag = `h${tag}`
  const StyledHtag = styled(Htag)([
    tw`text-gray-800 mt-4 mb-2 leading-tight font-semibold`,
    tag === 1 && tw`text-4xl`,
    tag === 2 && tw`text-3xl`,
    tag === 3 && tw`text-2xl`,
    tag === 4 && tw`text-xl`,
    tag === 5 && tw`text-lg`,
    tag === 6 && tw`text-base`,
  ])

  return <StyledHtag {...otherProps}>{children}</StyledHtag>
}

export default Heading
