import { graphql, useStaticQuery } from "gatsby"

const useLogo = () => {
  const data = useStaticQuery(graphql`
    query {
      file(sourceInstanceName: { eq: "assets" }, name: { eq: "logo" }) {
        childImageSharp {
          fluid(maxWidth: 300, quality: 75) {
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

export default useLogo
