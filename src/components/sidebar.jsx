import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import tw from "twin.macro"
import slugify from "slugify"
import {FaAngleRight} from "react-icons/fa"
import CardGrid from "./card-grid"
import useSiteMetadata from "../hooks/use-site-metadata"
import SmartLink from "../components/ui/smartlink"

const Sidebar = () => {
  const metadata = useSiteMetadata()
  const categories = metadata.siteCategories.map(item => item.name)

  const data = useStaticQuery(graphql`
    query {
      posts: allMdx(
        filter: { frontmatter: {
          templateKey: { eq: "post" }
          draft: { eq: false }
        } }
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
    }
  `)

  const posts = data.posts.edges
    .map((node) => node.node)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)

  return (
    <SidebarWrapper itemScope itemType="http://schema.org/WPSideBar">
      <SidebarTitle>Рубрики</SidebarTitle>
      <CategoriesList>
        {categories.map(category =>
          <CategoriesListItem key={category}>
            <CategoriesListIcon/>
            <SmartLink to={`/${slugify(category, { lower: true })}`}>{category}</SmartLink>
          </CategoriesListItem>)
        }
      </CategoriesList>

      <SidebarTitle>Рекомендуем почитать</SidebarTitle>
      <CardGrid posts={posts} count={3} compact={true}/>
      <StickyContent>
        Sticky SideBar Content
      </StickyContent>
    </SidebarWrapper>
  )
}

export default Sidebar

const SidebarWrapper = tw.aside`
  mt-10 w-full xl:col-span-1
`

const SidebarTitle = tw.div`
  text-lg font-bold px-4 pb-3 mb-3 border-primary-darker border-b-2 border-solid
`

const StickyContent = tw.div`
  sticky top-0 mt-4
`

const CategoriesList = tw.ul`
    list-none p-0 mb-4
`

const CategoriesListItem = tw.li`
  flex py-2 pl-4 items-center
`

const CategoriesListIcon = tw(FaAngleRight)`
  text-gray-500 text-xs
`
