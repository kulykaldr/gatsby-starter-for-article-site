import { graphql, useStaticQuery } from "gatsby"

const useLogo = () => {
  const data = useStaticQuery(graphql`
    query {
      file(sourceInstanceName: { eq: "images" }, name: { eq: "logo" }) {
        childImageSharp {
          sizes(maxWidth: 300, quality: 75) {
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

export default useLogo
