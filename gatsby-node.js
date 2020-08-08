const slugify = require("slugify")
const { paginate } = require("gatsby-awesome-pagination")
const { createFilePath } = require("gatsby-source-filesystem")
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

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
            fields {
              slug
            }
            frontmatter {
              path
              categories
            }
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
      path: post.fields.slug,
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

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby assets

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

//Hook into the createSchemaCustomization API
//This hook runs after all our nodes have been created
exports.createSchemaCustomization = ({ actions, schema }) => {
  //The createTypes action allows us to create custom types
  //and modify existing ones
  const { createTypes } = actions

  // Create our schema customizations
  const typeDefs = [
    // Replace "sanity_post" with your _typename of your post type
    "type Mdx implements Node { related: [Mdx] }",
    schema.buildObjectType({
      name: "Mdx",
      fields: {
        related: {
          type: "[Mdx]",
          //The resolve field is called when your page query looks for related posts
          //Here we can query our data for posts we deem 'related'
          //Exactly how you do this is up to you
          //I'm querying purely by category
          //But you could pull every single post and do a text match if you really wanted
          //(note that might slow down your build time a bit)
          //You could even query an external API if you needed
          resolve: async (source, args, context) => {
            //source is the current (post) object
            //context provides some methods to interact with the data store

            //Map a simple array of category IDs from our source object
            //In my data each category in the array is an object with a _id field
            //We're just flattening that to an array of those _id values
            //E.g. categories = ["1234", "4567", "4534"]
            const categories = source.frontmatter.categories

            //If this post has no categories, return an empty array
            if (!categories) return []

            //Query the data store for posts in our target categories
            const posts = await context.nodeModel.runQuery({
              query: {
                filter: {
                  fileAbsolutePath: { regex: "/(posts)/.*\\.(md|mdx)$/" },
                  //We're filtering for categories that are sharedby our source node
                  frontmatter: {
                    categories: { in: categories }
                  },
                  //Dont forget to exclude the current post node!
                  id: { ne: source.id },
                },
              },
              //Change this to match the data type of your posts
              //This will vary depending on how you source content
              type: "Mdx",
            })

            //Gatsby gets unhappy if we return "null" here
            //So check the result and either return an array of posts,
            //or an empty array
            return posts && posts.length ? posts : []
          },
        },
      },
    }),
  ]

  createTypes(typeDefs)
}
//
// exports.onCreateWebpackConfig = ({ actions }) => {
//   actions.setWebpackConfig({
//     // While fs is never used in MDX, Babel brings it along anyway.
//     // So in this case, you can add code to your gatsby-node.js file
//     // that prevents fs from getting bundled up for the client.
//     // https://github.com/gatsbyjs/gatsby/issues/24815
//     node: {
//       fs: 'empty'
//     }
//   })
// }
