import { graphql, useStaticQuery } from "gatsby"

const useAvatar = () => {
  const data = useStaticQuery(graphql`
    query {
      file(sourceInstanceName: { eq: "assets" }, name: { eq: "avatar" }) {
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
  `)

  return data.file ? data.file.childImageSharp.fluid : ''
}

export default useAvatar
