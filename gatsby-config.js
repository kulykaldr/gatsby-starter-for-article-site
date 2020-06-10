const website = require('./config/website')

module.exports = {
  siteMetadata: {
    title: website.title,
    description: website.description, // TO DO: add to config
    siteUrl: website.url, // TO DO: add to config
    author: website.author,
    menu: [ // TO DO: add to config
      {
        name: 'Главная',
        path: '/'
      },
      {
        name: 'Контакты',
        path: '/kontakty'
      },
      {
        name: 'О нас',
        path: '/o-nas'
      },
    ],
    footerMenu: [ // TO DO: add to config
      {
        name: 'Политика конфиденциальности',
        path: '/politika-konfidencialnosti'
      },
      {
        name: 'RSS',
        path: '/rss.xml'
      },
      {
        name: 'Карта сайта',
        path: '/sitemap.xml'
      }
    ],
    search: false,
  },
  plugins: [
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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
          name: website.title,
          short_name: `Интересные истории из жизни каждый день`,
          start_url: `/`,
          background_color: website.primaryColor,
          theme_color: website.primaryColor,
          display: `minimal-ui`,
          icon: `${__dirname}/content/images/favicon.png`
        }
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
        name: 'images',
        path: `${__dirname}/content/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'content',
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: `gatsby-transformer-yaml`,
      options: {
        typeName: `Categories`
      }
    },
    // {
    //   resolve: `gatsby-plugin-lunr`,
    //   options: {
    //     languages: [
    //       {
    //         name: 'en'
    //       },
    //       {
    //         name: 'ru'
    //       }
    //     ],
    //     fields: [
    //       {name: 'title', store: true, attributes: {boost: 20}},
    //       {name: 'content', store: true},
    //       {name: 'categories', store: true},
    //       {name: 'excerpt', store: true},
    //       {name: 'path', store: true}
    //     ],
    //     resolvers: {
    //       mdx: {
    //         title: node => node.frontmatter.title,
    //         content: node => node.rawBody,
    //         categories: node => node.frontmatter.categories,
    //         excerpt: node => node.frontmatter.excerpt,
    //         path: node => node.frontmatter.path
    //       }
    //     }
    //   }
    // },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1200,
              linkImagesToOriginal: false,
              withWebp: true,
            },
          },
          {resolve: 'gatsby-remark-prismjs'},
          {resolve: 'gatsby-remark-responsive-iframe'},
          {resolve: 'gatsby-remark-copy-linked-files'},
          {resolve: 'gatsby-remark-smartypants'},
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
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/src/pages`
      }
    },
    {
      resolve: `gatsby-plugin-feed-mdx`,
      options: {
        query: `
            {
              site {
                siteMetadata {
                  title
                  description
                  siteUrl
                  site_url: siteUrl
                }
              }
            }
          `,
        feeds: [
          {
            serialize: ({query: {site, allMdx}}) => {
              return allMdx.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.excerpt,
                  date: edge.node.frontmatter.created,
                  url: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                  guid: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                  custom_elements: [{"content:encoded": edge.node.html}],
                })
              })
            },
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___created] },
                  filter: { fileAbsolutePath: { regex: "/(posts)/.*\\\\.(md|mdx)$/" } }
                ) {
                  edges {
                    node {
                      html
                      frontmatter {
                        title
                        excerpt
                        path
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
        host: website.url,
        sitemap: `${website.url}/sitemap.xml`,
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
  ].filter(Boolean)
};
