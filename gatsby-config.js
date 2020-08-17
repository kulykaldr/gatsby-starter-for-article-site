require("dotenv").config()
const siteConfig = require('./content/configs/site-config.json')

module.exports = {
  siteMetadata: {
    siteUrl: siteConfig.siteUrl,
    title: siteConfig.siteTitle,
    description: siteConfig.siteDescription
  },
  plugins: [
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/images`,
        name: 'uploads',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: 'assets',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'posts',
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'pages',
        path: `${__dirname}/content/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'configs',
        path: `${__dirname}/content/configs`,
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-sharp`,
      options: {
        // The option defaults to true
        checkSupportedExtensions: false,
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sitemap`,
    'gatsby-transformer-json',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: siteConfig.siteTitle,
        short_name: siteConfig.siteDescription,
        start_url: `/`,
        background_color: siteConfig.siteColors.primaryColor,
        theme_color: siteConfig.siteColors.primaryColor,
        display: `minimal-ui`,
        icon: `${__dirname}/content/assets/favicon.png`
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          // gatsby-remark-relative-assets must go before gatsby-remark-assets
          'gatsby-remark-relative-images',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1200,
              linkImagesToOriginal: false,
              withWebp: true,
              quality: 75
            },
          },
          'gatsby-remark-responsive-iframe',
          'gatsby-remark-copy-linked-files',
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "nofollow noopener noreferrer"
            }
          },
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              icon: false
            }
          },
          'gatsby-remark-prismjs',
        ],
      },
    },
    // Reminder (https://github.com/gatsbyjs/gatsby/issues/15486#issuecomment-509405867)
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-images`],
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID
      }
    },
    {
      resolve: `gatsby-plugin-feed-mdx`,
      options: {
        feeds: [
          {
            serialize: ({ query: { allMdx } }) => {
              return allMdx.edges.map(edge => {
                const siteUrl = siteConfig.siteUrl
                const frontmatter = edge.node.frontmatter
                const slug = siteUrl + (frontmatter.slug || edge.node.fields.slug)

                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: frontmatter.created,
                  url: slug,
                  guid: slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___created] },
                  filter: { frontmatter: {
                    templateKey: { eq: "post" }
                    draft: { eq: false }
                  } }
                ) {
                  edges {
                    node {
                      html
                      excerpt
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        slug
                        created
                      }
                    }
                  }
                }
              }
              `,
            output: `/rss.xml`,
            title: `RSS Feed`
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Roboto`,
            variants: [`400`, `700`, `900`]
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: siteConfig.siteUrl,
        sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.jsx`,
        manualInit: true,
      },
    },
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ].filter(Boolean)
}
