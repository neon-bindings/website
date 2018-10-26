const users = [];

const siteConfig = {
  title: 'Neon',
  tagline: 'Rust bindings for writing safe and fast native Node.js modules',
  url: 'https://amilajack.github.io',
  baseUrl: '/neon-docs/',

  projectName: 'neon-docs',
  organizationName: 'amilajack',

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc: 'intro', label: 'Guides'},
    {page: 'help', label: 'Help'},
    {blog: true, label: 'Blog'},
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: 'img/docusaurus.svg',
  footerIcon: 'img/docusaurus.svg',
  favicon: 'img/favicon.png',

  /* Colors for website */
  colors: {
    primaryColor: '#A00',
    secondaryColor: '#030c1c',
  },

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} Amila Welihinda`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  algolia: {
    // "Search only api key". Safe to keep this public
    apiKey: 'bfa6bb4b57d4fa853c0358ee9b195146',
    indexName: 'amilajack_neon'
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/docusaurus.png',
  twitterImage: 'img/docusaurus.png'
};

module.exports = siteConfig;
