const users = [];

const siteConfig = {
  title: 'Neon',
  tagline: 'Fast and Safe Native Node.js Modules',
  url: 'https://amilajack.github.io',
  baseUrl: '/neon-docs/',

  projectName: 'neon-docs',
  organizationName: 'amilajack',
  repoUrl: 'https://github.com/neon-bindings/neon',

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    { doc: 'intro', label: 'Docs' },
    { doc: 'roadmap', label: 'Roadmap' },
    { doc: 'community-content', label: 'Resources' },
    { doc: 'demos', label: 'Demos' },
    { blog: true, label: 'Blog' },
    { page: 'help', label: 'Help' }
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  disableHeaderTitle: true,
  headerIcon: 'logo/text-logo.svg',
  footerIcon: 'logo/text-logo.svg',
  favicon: 'logo/letter-logo.png',

  /* Colors for website */
  colors: {
    primaryColor: '#030C1C',
    secondaryColor: '#030C1C'
  },

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} Amila Welihinda`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'tomorrow'
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
  ogImage: 'logo/text-logo.svg',
  twitterImage: 'logo/text-logo.svg'
};

module.exports = siteConfig;
