import React, { useEffect, useRef, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { navigate, Link, useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import * as JsSearch from "js-search"
import { useLocation } from "@reach/router"

export const Search = () => {
  const [ isFocus, setIsFocus ] = useState(false)
  const [ query, setQuery ] = useState("")
  const [ results, setResults ] = useState([])
  const [ selected, setSelected ] = useState(0)
  const { origin } = useLocation()
  const resultListRef = useRef(null)
  const searchWrapperRef = useRef(null)
  const resultRefs = []

  const data = useStaticQuery(graphql`
    query {
      allMdx {
        edges {
          node {
            id
            excerpt
            fields {
              slug
            }
            frontmatter {
              title
              heading
              description
              categories
            }
          }
        }
      }
    }
  `)

  const highlight = (text, words, tag = `em`, className = null) => {
    const splitWords = words.replace(/[^\w\sа-яёіїє]|_/gi, $1 => ` ${$1} `)
      .replace(/[.,:;\-'" ]+/g, ' ').trim().split(' ')

    // Global regex to highlight all matches
    for (let word of splitWords) {
      const re = new RegExp(word, 'gi')
      if (re.test(text)) {
        if (className) {
          text = text.replace(re, `<${tag} className=${className}>$&</${tag}>`)
        } else {
          text = text.replace(re, `<${tag}>$&</${tag}>`)
        }
      }
    }
    return text
  }

  // Responsible for closing the search dialog when clicked outside the search dialog
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true)
    return () => document.removeEventListener("click", handleClickOutside)
  })

  const handleClickOutside = (event) => {
    if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) {
      setIsFocus(false)
    }
  }

  // The actual search functionality
  const search = (event) => {
    const input = event.target.value
    const pages = data.allMdx.edges.map(node => node.node)

    if (!input || !pages) {
      setQuery(input)
      return setResults([])
    }

    const dataToSearch = new JsSearch.Search("id")
    // Defines a indexing strategy for the data
    // more about it in here https://github.com/bvaughn/js-search#configuring-the-index-strategy

    // default
    dataToSearch.indexStrategy = new JsSearch.PrefixIndexStrategy()
    // this index strategy is built for all substrings matches.
    // dataToSearch.indexStrategy = new JsSearch.AllSubstringsIndexStrategy()
    // this index strategy is built for exact word matches.
    // dataToSearch.indexStrategy = new JsSearch.ExactWordIndexStrategy()


    // Defines the sanitizer for the search to prevent some of the words from being excluded
    dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer()
    /**
     * defines the search index
     * read more in here https://github.com/bvaughn/js-search#configuring-the-search-index
     */
    dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex("id")

    dataToSearch.addIndex([ "frontmatter", "title" ]) // sets the index attribute for the data
    dataToSearch.addIndex([ "frontmatter", "categories" ]) // sets the index attribute for the data
    dataToSearch.addIndex([ "frontmatter", "heading" ]) // sets the index attribute for the data
    dataToSearch.addIndex([ "frontmatter", "description" ]) // sets the index attribute for the data
    dataToSearch.addIndex([ "fields", "slug" ]) // sets the index attribute for the data
    dataToSearch.addIndex([ "excerpt" ]) // sets the index attribute for the data

    dataToSearch.addDocuments(pages) // adds the data to be searched

    setResults(dataToSearch.search(input).map(page => ({
      title: page.frontmatter.title,
      slug: page.fields.slug,
      categories: page.frontmatter.categories,
      description: page.frontmatter.description,
      heading: highlight(page.frontmatter.heading, input, `em`),
      excerpt: highlight(page.excerpt, input, `em`),
    })))

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
          return setIsFocus(false)
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
        setIsFocus(false)
        navigate(`${origin}${currentSelection.slug}`)
        return
      default:
        return
    }
  }

  // Toggle big search input
  const enableSearchInput = () => {
    setIsFocus(true)
  }

  return (
    <SearchContainer>
      <SearchOverlay className={isFocus ? " focused" : null}/>

      <SearchContainer>
        <SearchWrapper
          className={isFocus ? " focused" : null}
          ref={searchWrapperRef}
        >
          <FaSearch/>
          <SearchInput
            value={query}
            type={"search"}
            onChange={search}
            onKeyDown={handleKey}
            onClick={enableSearchInput}
            placeholder={"Поиск по сайту"}
            className={isFocus ? " focused" : null}
          />

          {results.length > 0 &&
          <ResultsContainer isFocus={isFocus}>
            <ResultsList ref={resultListRef}>
              {results.map((item, index) => (
                <ResultItem
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
                  <ResultLink to={item.slug}>
                    {item.categories &&
                    <small>{item.categories.join(", ")}</small>
                    }
                    <ResultTitle dangerouslySetInnerHTML={{ __html: item.heading }}/>
                    <div dangerouslySetInnerHTML={{ __html: item.excerpt }}/>
                  </ResultLink>
                </ResultItem>
              ))}
            </ResultsList>
          </ResultsContainer>
          }
        </SearchWrapper>
      </SearchContainer>
    </SearchContainer>
  )
}

export const SearchContainer = styled.div`
  position: relative;
  z-index: 50;
`

export const SearchInput = styled.input`
  background: transparent;
  border: 0;
  width: 100%;
  outline: 0;
  padding-left: 8px;
  outline-offset: -2px;

  &::placeholder {
    color: hsla(0,0%,100%,.6);
  }

  &.focused {
    &::placeholder {
      color: #000;
    }
  }
`

export const ResultsList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  max-height: 50vh;
  overflow: hidden;
  overflow-y: auto;
  white-space: normal!important;

  em {
    font-style: normal;
    background-color: rgba(226,164,0,.4);
  }
`

export const ResultItem = styled.li`
  line-height: 1.4em;
  border-bottom: 1px solid ${props => props.theme.siteColors.lightGrey};

  ${props => props.selected && `
    background-color: ${props => props.theme.siteColors.lightGrey};
  `};
`

export const ResultLink = styled(Link)`
  display: block;
  padding: 15px;
  color: #000;
`

export const ResultTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  margin: 3px 0 7px;
`

export const ResultsContainer = styled.div`
  display: ${props => props.isFocus ? "block" : "none"};
  position: absolute;
  background-color: #fff;
  width: 100%;
  margin: -8px;
  top: 35px;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  color: #000;
  padding-top: 10px;
`

export const SearchOverlay = styled.div`
  opacity: 0;
  height: 0;
  background-color: rgba(0,0,0,.2);
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 25;
  transition: opacity .25s;

  &.focused {
    opacity: 1;
    height: 100%;
  }
`

export const SearchWrapper = styled.div`
  display: flex;
  background-color: hsla(0,0%,100%,.2);
  padding: 8px;
  border-radius: 3px;
  transition: all .25s;
  width: 180px;
  color: hsla(0,0%,100%,.6);

  svg {
    align-self: center;
    width: 16px;
    min-width: 16px;
  }

  &.focused {
    width: 400px;
    background-color: #fff;
    color: #000;

    @media (max-width: ${props => props.theme.siteBreakpoints.lg}) {
      width: 75vw;
    }
  }

  @media (max-width: ${props => props.theme.siteBreakpoints.lg}) {
      width: 75vw;
  }
`
