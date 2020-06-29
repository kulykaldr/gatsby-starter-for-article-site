import { graphql, useStaticQuery } from "gatsby"

const useAvatar = () => {
  const data = useStaticQuery(graphql`
    query {
      file(sourceInstanceName: { eq: "images" }, name: { eq: "avatar" }) {
        childImageSharp {
          sizes(maxWidth: 500, quality: 75) {
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

  return data.file ? data.file.childImageSharp.sizes : ''
}

export default useAvatar
