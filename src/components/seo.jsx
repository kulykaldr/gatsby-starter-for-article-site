import React from "react"
import { Helmet } from "react-helmet"
import { graphql, useStaticQuery } from "gatsby"
import url from "url"
import {useLocation} from "@reach/router";

const SEO = ({
  title,
  description,
  lang = "ru-RU",
  publishedAt,
  updatedAt,
  isArticle = false,
  categories = [],
  type = `Article`,
  image,
}) => {
  const { pathname } = useLocation()
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          siteUrl
          description
          author
        }
      }
    }
  `)
  const metadata = site.siteMetadata
  const siteTitle = title ? `${title} | ${metadata.title}` : metadata.title
  const metaDescription = description ? description : metadata.description
  const metaImage = image ? `${metadata.siteUrl}${image}` : null
  const canonical = url.resolve(metadata.siteUrl, pathname)

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={siteTitle}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `og:title`,
          content: siteTitle,
        },
        {
          name: `og:type`,
          content: isArticle ? `article` : `website`,
        },
        {
          name: `og:description`,
          content: metaDescription,
        },
        {
          name: `og:url`,
          content: canonical,
        },
        {
          name: `og:locale`,
          content: `ru_RU`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:title`,
          content: siteTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(
        publishedAt
          ? [
              {
                name: `article:published_time`,
                content: publishedAt,
              },
            ]
          : [],
        updatedAt
          ? [
              {
                name: `article:modified_time`,
                content: updatedAt,
              },
            ]
          : [],
        categories.length > 0
          ? [
              {
                name: `twitter:label2`,
                content: `Filed under`,
              },
              {
                name: `twitter:data2`,
                content: categories[0],
              },
            ]
          : [],
        metaImage
          ? [
              {
                name: `og:image`,
                content: metaImage,
              },
              {
                name: `twitter:image`,
                content: metaImage,
              },
            ]
          : []
      )}
    >
      <script type={`application/ld+json`}>{`
        {
          "@context": "https://schema.org/",
          "@type": "${type}",
          "author": {
            "@type": "Person",
            "name": "${metadata.author}"
          },
          "headline": "${siteTitle}",
          "url": "${canonical}",
          ${publishedAt ? `"datePublished": "${publishedAt}",` : ``}
          ${updatedAt ? `"datePublished": "${updatedAt}",` : ``}
          ${
            metaImage
              ? `"image": {
            "@type": "ImageObject",
            "url": "${metaImage}",
            "width": "1000",
            "height": "520"
          },`
              : ``
          }
          "publisher": {
            "@type": "Organization",
            "name": "${metadata.title}"
          },
          "description": "${metaDescription}",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "${metadata.siteUrl}"
          }
        }
      `}</script>
    </Helmet>
  )
}

export default SEO
