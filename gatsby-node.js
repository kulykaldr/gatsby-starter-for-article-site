const slugify = require("slugify")
const { paginate } = require("gatsby-awesome-pagination")

exports.createPages = async ({ graphql, actions: { createPage }, reporter }) => {
  const postsPerPage = 5 // TO DO: add to config

  const result = await graphql(`
    query {
      pages: allMdx(
        filter: { fileAbsolutePath: { regex: "/(\\/pages\\/).*.(md|mdx)/" } }
      ) {
        edges {
          node {
            frontmatter {
              title
              heading
              description
              path
            }
            body
          }
        }
      }
      posts: allMdx(
        filter: { fileAbsolutePath: { regex: "/(posts)/.*\\\\.(md|mdx)$/" } }
        sort: { fields: frontmatter___created, order: DESC }
      ) {
        edges {
          node {
            id
            headings {
              depth
            }
            frontmatter {
              title
              heading
              description
              path
              categories
              excerpt
              created
              createdPretty: created(formatString: "DD MMMM, YYYY", locale: "ru")
              updated
              updatedPretty: created(formatString: "DD MMMM, YYYY", locale: "ru")
              featuredImage {
                childImageSharp {
                  sizes(maxWidth: 500, quality: 70) {
                    base64
                    aspectRatio
                    src
                    srcSet
                    sizes
                  }
                }
              }
            }
            body
          }
        }
      }
      categories: allCategories {
        edges {
          node {
            name
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic(result.errors)
  }

  const categories = []
  const posts = result.data.posts.edges.map(node => node.node)
  const pages = result.data.pages.edges.map(node => node.node)
  const categoriesYml = result.data.categories.edges.map(node => node.node).map(c => c.name) || []

  // Create your paginated pages
  paginate({
    createPage, // The Gatsby `createPage` function
    items: posts, // An array of objects
    itemsPerPage: postsPerPage, // How many items you want per page
    pathPrefix: "/", // Creates pages like `/blog`, `/blog/2`, etc
    component: require.resolve(`./src/templates/posts-page.jsx`), // Just like `createPage()`
  })

  // Create a route for every single post (located in `content/posts`)
  posts.forEach(post => {
    if (post.frontmatter.categories) {
      categories.push(...post.frontmatter.categories)
    }

    createPage({
      path: post.frontmatter.path,
      component: require.resolve(`./src/templates/post.jsx`),
      context: {
        postId: post.id,
      },
    })
  })

  // Create a route for every single page (located in `content/pages`)
  pages.forEach(page => {
    createPage({
      path: page.frontmatter.path,
      component: require.resolve(`./src/templates/page.jsx`),
      context: {
        page,
      },
    })
  })

  const uniqCategories = [...new Set(categories)].concat(categoriesYml)

  uniqCategories.forEach(category => {
    const slugified = slugify(category, { lower: true })

    paginate({
      createPage, // The Gatsby `createPage` function
      items: posts.filter(post => post.frontmatter.categories.includes(category)), // An array of objects
      itemsPerPage: postsPerPage, // How many items you want per page
      pathPrefix: `/${slugified}`, // Creates pages like `/blog`, `/blog/2`, etc
      component: require.resolve(`./src/templates/category.jsx`), // Just like `createPage()`
      context: {
        category,
      },
    })
  })
}
