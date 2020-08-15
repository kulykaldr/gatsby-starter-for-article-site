import { graphql, useStaticQuery } from "gatsby"

const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      allConfigsJson {
        edges {
          node {
            siteTitle
            siteDescription
            siteUrl
            siteAuthor
            siteLanguage
            sitePostsPerPage
            siteSearch
            siteCategories {
              description
              name
            }
            siteTopMenu {
              text
              url
            }
            siteFooterMenu {
              text
              url
            }
            siteSocialLinks {
              text
              url
            }
          }
        }
      }
    }
  `)

  return data.allConfigsJson.edges[0].node
}

export default useSiteMetadata
