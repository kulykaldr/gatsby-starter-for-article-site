import React, { useEffect, useRef, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { NavMenuItem, ToggleSearchButton } from "./navigation"
import { navigate } from "gatsby"

import styled from "styled-components"
import { Link } from "gatsby"
import Theme from "../styles/theme"

export const SearchBox = styled.div`
  display: ${props => props.open ? "block" : "none"};
  position: absolute;
  width: 400px;
  background-color: #fff;
  left: -338px;
  top: 40px;
  border-radius: 5px;
  box-shadow: 0 0 3px rgba(0, 0, 0, .03), 0 3px 46px rgba(0, 0, 0, .1);

  &::before {
    content: " ";
    display: block;
    width: 16px;
    height: 16px;
    background-color: #fff;
    position: absolute;
    top: -8px;
    right: 38px;
    transform: rotate(45deg);

    @media (max-width: ${Theme.breakpoints.sm}) {
      right: 17px;
    }
  }

  @media (max-width: ${Theme.breakpoints.sm}) {
    width: 300px;
    left: -260px;
  }
`

export const SearchInput = styled.input`
  background-color: #fff;
  display: block;
  width: 100%;
  border: 0;
  padding: 15px;
  outline: none;
  border-radius: 5px;
`

export const ResultsTitle = styled.h5`
  padding: 5px 15px;
  background-color: #000;
  margin: 0;
  color: #fff;
`

export const SearchResults = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  max-height: 50vh;
  overflow-y: auto;
  white-space: pre-wrap;
`

export const SearchResult = styled.li`
  line-height: 1.4em;

  ${props => props.selected && `
    background-color: #f2f2f2;
  `};
`

export const ResultLink = styled(Link)`
  display: block;
  padding: 15px;
`
export const ResultTitle = styled.h4`
  margin: 0;
`

export const Search = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [selected, setSelected] = useState(0)
  const inputRef = useRef(null)
  const resultListRef = useRef(null)
  const searchRef = useRef(null)
  const resultRefs = []

  // Responsible for closing the search dialog when clicked outside the search dialog
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true)
    return () => document.removeEventListener("click", handleClickOutside)
  })

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  // The actual search functionality
  // See https://www.gatsbyjs.org/packages/gatsby-plugin-lunr/
  const search = (event) => {
    const input = event.target.value
    if (!input || !(window).__LUNR__ || input === "") {
      setQuery(input)
      return setResults([])
    }
    const lunrIndex = (window).__LUNR__["ru"]
    setResults(lunrIndex.index.search(input + "*").map(({ ref }) => {
      return lunrIndex.store[ref]
    }))
    if (results.length > 0) {
      setSelected(0)
    }
    setQuery(input)
  }

  // Responsible for navigating to results on key presses
  const scrollToResult = (selectIndex) => {
    if (resultListRef.current && resultRefs[selectIndex]) {
      const current = resultRefs[selectIndex]
      resultListRef.current.scrollTop = current.offsetTop - resultListRef.current.offsetTop
    }
  }

  // Key handling to enable key navigation (arrow keys, ...) within the search results
  const handleKey = (event) => {
    const currentSelection = results[selected]

    switch (event.key) {
      case "Escape":
        if (query === "") {
          return setIsOpen(false)
        }
        setSelected(0)
        setResults([])
        return setQuery("")
      case "ArrowDown":
        event.preventDefault()
        scrollToResult(selected + 1)
        return setSelected(selected + 1 >= results.length ? selected : selected + 1)
      case "ArrowUp":
        event.preventDefault()
        scrollToResult(selected - 1)
        return setSelected(selected - 1 >= 0 ? selected - 1 : 0)
      case "PageDown":
        event.preventDefault()
        scrollToResult(selected + 5 <= results.length ? selected + 5 : selected)
        return setSelected(selected + 5 <= results.length ? selected + 5 : results.length - 1)
      case "PageUp":
        event.preventDefault()
        scrollToResult(selected - 5 > 0 ? selected - 5 : 0)
        return setSelected(selected - 5 > 0 ? selected - 5 : 0)
      case "Home":
        event.preventDefault()
        scrollToResult(0)
        return setSelected(0)
      case "End":
        event.preventDefault()
        scrollToResult(results.length - 1)
        return setSelected(results.length - 1)
      case "Enter":
        event.preventDefault()
        setIsOpen(false)
        navigate(`/${currentSelection.path}`)
        return
      default:
        return
    }
  }

  // Toggles the search dialog
  const toggleSearch = () => setIsOpen(!isOpen)

  return (
    <>
      <NavMenuItem>
        <ToggleSearchButton
          role={`button`}
          aria-label={`Toggle search`}
          onClick={toggleSearch}
        >
          <FaSearch/>
        </ToggleSearchButton>
      </NavMenuItem>

      {isOpen &&
      <SearchBox open={isOpen} ref={searchRef}>
        <SearchInput
          placeholder={`Search...`}
          autoFocus={true} // eslint-disable-line
          ref={inputRef}
          value={query}
          onChange={search}
          onKeyDown={handleKey}
        />
        <ResultsTitle>Results ({results.length})</ResultsTitle>
        <SearchResults ref={resultListRef}>
          {results.map((item, index) => (
            <SearchResult
              onMouseOver={() => setSelected(index)}
              onFocus={() => setSelected(index)}
              key={index}
              ref={ref => {
                if (ref) {
                  resultRefs[index] = ref
                }
              }}
              selected={index === selected}
            >
              <ResultLink to={item.path}>
                {item.tags &&
                <small>{item.tags.join(", ")}</small>
                }
                <ResultTitle>{item.title}</ResultTitle>
                {item.excerpt}
              </ResultLink>
            </SearchResult>
          ))}
        </SearchResults>
      </SearchBox>
      }
    </>
  )
}
