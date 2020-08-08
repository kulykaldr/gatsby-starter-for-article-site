module.exports = {
  pathPrefix: '/', // Note: it must *not* have a trailing slash.

  title: 'Обо всем на свете', // Navigation and Site Title
  description: 'Интересные истории из жизни каждый день',
  url: `https://gatsby-starter-kulykaldr.netlify.app`, // Site url
  siteLanguage: 'ru-RU', // Language Tag on <html> element
  ogLanguage: 'ru_RU', // Facebook Language

  // JSONLD / Manifest
  shortName: 'Обо всем на свете', // shortname for manifest. MUST be shorter than 12 characters
  author: 'KulykAldr', // Author for schemaORGJSONLD
  primaryColor: `#5a80b1`,
  social: {
    twitter: 'https://twitter.com',
    facebook: 'https://facebook.com',
    instagram: '',
    vk: '',
    ok: '',
    github: '',
    reddit: '',
    youtube: '',
    telegram: '',
  },

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
