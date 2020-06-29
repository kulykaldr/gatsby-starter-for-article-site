import { graphql, useStaticQuery } from "gatsby"

const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
          author
          search
          siteLanguage
          ogLanguage
          topMenu {
            name
            path
          }
          footerMenu {
            name
            path
          }
          social {
            twitter
            facebook
            instagram
            vk
            ok
            github
            reddit
            youtube
            telegram
          }
        }
      }
    }
  `)

  return data.site.siteMetadata
}

export default useSiteMetadata
