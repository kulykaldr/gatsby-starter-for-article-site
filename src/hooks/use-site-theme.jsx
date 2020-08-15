import { graphql, useStaticQuery } from "gatsby"

const useSiteTheme = () => {
  const data = useStaticQuery(graphql`
    query {
      allConfigsJson {
        edges {
          node {
            siteColors {
              backgroundColor
              darkColor
              lightGrey
              linkColorHover
              primaryColor
              primaryColorDarker
              primaryColorLighter
            }
            siteComponents {
              containerWidth
              logoWidth
            }
            siteBreakpoints {
              lg
              md
              sm
              xl
              xs
            }
            siteFonts {
              base
              heading
            }
          }
        }
      }
    }
  `)

  return data.allConfigsJson.edges[0].node
}

export default useSiteTheme
