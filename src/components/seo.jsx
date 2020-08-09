import React from "react"
import {Helmet} from "react-helmet"
import url from "url"
import {useLocation} from "@reach/router"
import useSiteMetadata from "../hooks/use-site-metadata"
import useLogo from "../hooks/use-logo"

const SEO = ({
               title,
               description,
               publishedAt,
               updatedAt,
               isArticle = false,
               type = `Article`,
               image,
               categories = ''
             }) => {
  const {pathname} = useLocation()
  const metadata = useSiteMetadata()
  const logo = useLogo()
  const siteTitle = title ? title : metadata.title
  const metaDescription = description ? description : metadata.description
  const metaImage = image ? `${metadata.siteUrl}${image}` : null
  const canonical = url.resolve(metadata.siteUrl, pathname)
  const social = Object.values(metadata.social).filter(item => item.length > 0).map(item => `"${item}"`).join(', ')

  return (
    <Helmet
      htmlAttributes={{siteLanguage: metadata.siteLanguage}}
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
          content: metadata.siteLanguage.replace("-", "_"),
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
        metaImage
          ? [
            {
              name: `og:image`,
              content: metaImage,
            },
            {
              name: `og:image:alt`,
              content: metaDescription,
            },
            {
              name: `twitter:image`,
              content: metaImage,
            },
            {
              name: `twitter:image:alt`,
              content: metaDescription,
            },
          ]
          : []
      )}
    >
      <script type={`application/ld+json`}>{`
        {
          "@context": "https://schema.org/",
          "@graph": [
            {
              "@type": ["Person", "Organization"],
              "@id": "${metadata.siteUrl}/#personid",
              "name": "${metadata.author}",
              ${logo.src ? `"image": {
                "@type": "ImageObject",
                "@id": "${metadata.siteUrl}/#personlogo",
                "inLanguage": "${metadata.siteLanguage}",
                "url": "${metadata.siteUrl}${logo.src}",
                "caption": "${metadata.author}"
              },` : ``}
              ${logo.src ? `"logo": {"@id": "${metadata.siteUrl}/#personlogo"},` : ``}
              "description": "${metaDescription}",
              ${social.length > 0 ? `"sameAs": [${social}]` : ``}
            }, {
              "@type": "WebSite",
              "@id": "${metadata.siteUrl}/#website",
              "url": "${metadata.siteUrl}/",
              "name": "${metadata.title}",
              "description": "${metadata.description}",
              "publisher": {"@id": "${metadata.siteUrl}/#personid"},
              "inLanguage": "${metadata.siteLanguage}"
            }, {
              "@type": "WebPage",
              "@id": "${metadata.siteUrl}/#webpage",
              "url": "${metadata.siteUrl}${pathname}/",
              "name": "${title}",
              "isPartOf": {"@id": "${metadata.siteUrl}/#website"},
              ${image ? `"primaryImageOfPage": {"@id": "${metadata.siteUrl}/#primaryimage"},` : ``}
              ${type === "CollectionPage" || type === "Article"
                ? `"breadcrumb": {"@id": "${metadata.siteUrl}${pathname}/#breadcrumb"},` : ``}
              "about": {"@id": "${metadata.siteUrl}/#personid"},
              ${publishedAt ? `"datePublished": "${publishedAt}",` : ``}
              ${updatedAt ? `"dateModified": "${updatedAt}",` : ``}
              "description": "${metaDescription}",
              "inLanguage": "${metadata.siteLanguage}",
              "potentialAction": [{"@type": "ReadAction", "target": ["${metadata.siteUrl}${pathname}/"]}]
            }${image ? `, {
              "@type": "ImageObject",
              "@id": "${metadata.siteUrl}/#primaryimage",
              "inLanguage": "${metadata.siteLanguage}",
              "url": "${metadata.siteUrl}${image}",
              "width": 1000,
              "height": 520
            }` : ``}${type === "CollectionPage" ? `, {
              "@type": "CollectionPage",
              "@id": "${metadata.siteUrl}${pathname}#webpage",
              "url": "${metadata.siteUrl}${pathname}/",
              "name": "${title}",
              "isPartOf": {"@id": "${metadata.siteUrl}/#website"},
              "description": "${metaDescription}",
              "breadcrumb": {"@id": "${metadata.siteUrl}${pathname}/#breadcrumb"},
              "inLanguage": "${metadata.siteLanguage}"
            }` : ``}${type === "CollectionPage" || type === "Article" ? `, {
              "@type": "BreadcrumbList",
              "@id": "${metadata.siteUrl}${pathname}/#breadcrumb",
              "itemListElement":
                [{
                  "@type": "ListItem",
                  "position": 1,
                  "item": {
                  "@type": "WebPage",
                  "@id": "${metadata.siteUrl}/#webpage",
                  "url": "${metadata.siteUrl}/",
                  "name": "Главная страница"}
                }, {
                  "@type": "ListItem",
                  "position": 2,
                  "item": {
                    "@type": "WebPage",
                    "@id": "${metadata.siteUrl}${pathname}/",
                    "url": "${metadata.siteUrl}${pathname}/",
                    "name": "${title}"
                  }
                }]
            }` : ``}${type === "Article" ? `, {
              "@type": "Article",
              "@id": "${metadata.siteUrl}${pathname}/#article",
              "isPartOf": {"@id": "${metadata.siteUrl}${pathname}/#webpage"},
              "author": {"@id": "${metadata.siteUrl}/#personid"},
              "headline": "${title}",
              ${publishedAt ? `"datePublished": "${publishedAt}",` : ``}
              ${updatedAt ? `"dateModified": "${updatedAt}",` : ``}
              "mainEntityOfPage": {"@id": "${metadata.siteUrl}${pathname}/#webpage"},
              "publisher": {"@id": "${metadata.siteUrl}/#personid"},
              "image": {"@id": "${metadata.siteUrl}${pathname}/#primaryimage"},
              ${categories ? `"articleSection": "${categories}",` : ``}
              "inLanguage": "${metadata.siteLanguage}"
            }` : ``}
          ]
        }
      `}</script>
    </Helmet>
  )
}

export default SEO
