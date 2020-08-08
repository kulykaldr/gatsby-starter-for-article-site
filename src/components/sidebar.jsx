import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import styled from "styled-components"
import Theme from "../styles/theme"
import slugify from "slugify"
import {FaAngleRight} from "react-icons/fa"
import CardGrid from "./card-grid";

const SidebarTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  padding-left: 10px;
  margin-bottom: 20px;
  border-bottom: 2px solid ${Theme.layout.primaryColor};
`

const StickyContent = styled.div`
  position: sticky;
  top: 30px;
  display: initial;

  @media (max-width: ${Theme.breakpoints.lg}) {
    display: none;
  }
`

const CategoriesList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    position: relative;
    padding: 6px 0 6px 25px;
    border-bottom: 1px solid #eee;

    a {
      transition: color 0.5s;

      &:hover {
        color: ${Theme.layout.linkColorHover};
      }
    }

    svg {
      position: absolute;
      top: 11px;
      left: 3px;
      color: #ccc;
      font-size: 14px;
    }
  }
`

const Sidebar = () => {
  const data = useStaticQuery(graphql`
    query {
      posts: allMdx(
        filter: { fileAbsolutePath: { regex: "/(posts)/.*\\\\.(md|mdx)$/" } }
        sort: { fields: frontmatter___created, order: DESC }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              heading
              categories
              created
              createdPretty: created(
                formatString: "DD MMMM, YYYY"
                locale: "ru"
              )
              excerpt
              featuredImage {
                childImageSharp {
                  fluid(maxWidth: 500, quality: 75) {
                    base64
                    aspectRatio
                    src
                    srcSet
                    sizes
                  }
                }
              }
            }
          }
        }
      }
      categories: allCategories {
        edges {
          node {
            name
          }
        }
      }
    }
  `)

  const posts = data.posts.edges
    .map((node) => node.node)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)

  const categories = data.categories.edges.map(node => node.node).map(c => c.name)

  return (
    <>
      <SidebarTitle>Рубрики</SidebarTitle>
      <CategoriesList>
        {categories.map(category =>
          <li key={category}>
            <FaAngleRight/>
            <Link to={`/${slugify(category, { lower: true })}`}>{category}</Link>
          </li>)
        }
      </CategoriesList>

      <SidebarTitle>Рекомендуем почитать</SidebarTitle>
      <CardGrid posts={posts} count={3} compact={true}/>
      <StickyContent>
        Sticky SideBar Content
      </StickyContent>
    </>
  )
}

export default Sidebar
