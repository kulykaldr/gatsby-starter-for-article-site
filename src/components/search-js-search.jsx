import React, { useEffect, useRef, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { navigate, useStaticQuery, graphql } from "gatsby"
import tw, { styled, css } from "twin.macro"
import * as JsSearch from "js-search"
import SmartLink from "../components/ui/smartlink"

export const Search = () => {
  const [ isFocus, setIsFocus ] = useState(false)
  const [ query, setQuery ] = useState("")
  const [ results, setResults ] = useState([])
  const [ selected, setSelected ] = useState(0)
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

  const highlight = (text, words, tag = `em`) => {
    const splitWords = words.replace(/[^\w\sа-яёіїє]|_/gi, $1 => ` ${$1} `)
      .replace(/[.,:;\-'" ]+/g, ' ').trim().split(' ')

    // Global regex to highlight all matches
    for (let word of splitWords) {
      const re = new RegExp(word, 'gi')
      if (re.test(text)) {
        text = text.replace(re, `<${tag}>$&</${tag}>`)
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
        navigate(`${currentSelection.slug}`)
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
    <>
      <SearchOverlay isFocus={isFocus}/>

      <SearchContainer
        className={isFocus ? " focused" : null}
        isFocus={isFocus}
        ref={searchWrapperRef}
      >
        <SearchIcon/>
        <SearchInput
          value={query}
          type={"search"}
          onChange={search}
          onKeyDown={handleKey}
          onClick={enableSearchInput}
          placeholder={"Поиск по сайту"}
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
      </SearchContainer>
    </>
  )
}

export const SearchOverlay = styled.div(({ isFocus }) => [
  tw`fixed top-0 left-0 opacity-0 h-0 bg-black bg-opacity-50 w-full z-30 transition-opacity duration-300`,
  isFocus && tw`opacity-100 h-full`
])

const SearchContainer = styled.div(({ isFocus }) => [
  tw`lg:order-2 flex bg-white bg-opacity-25 p-2 rounded-sm transition-all duration-300 text-gray-400 z-50 absolute`,
  isFocus && tw`bg-white text-gray-800`,
  css`right: .5rem;`,
  isFocus && css`left: .5rem;`
])

const SearchInput = tw.input`
  bg-transparent border-none w-full outline-none pl-2 placeholder-gray-400 focus:placeholder-black
`

export const SearchIcon = tw(FaSearch)`
  self-center w-4 mt-px
`

const ResultsList = styled.ul([
  tw`overflow-hidden overflow-y-auto whitespace-normal list-none m-0 p-0 max-h-screen-1/2`,
  css`
    em {
      ${tw`not-italic bg-yellow-700 bg-opacity-50`}
    }
  `
])

const ResultItem = styled.li(({ selected }) => [
  tw`leading-normal border-solid border-b border-gray-200 hover:bg-gray-200`,
  selected && tw`bg-gray-200`
])

const ResultLink = tw(SmartLink)`
  block p-4 text-gray-800 hover:text-gray-800
`

const ResultTitle = tw.div`
  text-base font-bold my-1
`

export const ResultsContainer = styled.div(({ isFocus }) => [
  tw`hidden absolute bg-white w-full -ml-2 text-gray-800 pt-3`,
  `top: 35px;`,
  isFocus && tw`block`
])
