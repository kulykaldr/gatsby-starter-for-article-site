module.exports = {
  title: 'Обо всем на свете', // Navigation and Site Title
  titleAlt: 'Gatsby Prismic.io', // Title for JSONLD
  description: 'Интересные истории из жизни каждый день',
  headline: 'Writing and publishing content for LekoArts', // Headline for schema.org JSONLD
  url: `https://testio.netlify.com`, // Site url
  siteLanguage: 'ru', // Language Tag on <html> element
  ogLanguage: 'ru_RU', // Facebook Language

  // JSONLD / Manifest
  shortName: 'Обо всем на свете', // shortname for manifest. MUST be shorter than 12 characters
  author: 'KulykAldr', // Author for schemaORGJSONLD
  primaryColor: `#5a80b1`,

  twitter: '', // Twitter Username
  facebook: '', // Facebook Site Name
  googleAnalyticsID: '',

  // Toggle search on site
  search: true,

  // Menus
  topMenu: [
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
}
