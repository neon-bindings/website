// const users = [
//   {
//     caption: 'Mapbox',
//     image: '/img/mapbox-logo.svg',
//     infoLink: 'https://github.com/mapbox/node-fuzzy-phrase',
//     pinned: true
//   }
// ];

// const siteConfig = {
//   title: 'Neon',
//   tagline: 'Fast and Safe Native Node.js Modules',
//   url: 'https://neon-bindings.com',
//   baseUrl: '/',
//   editUrl: 'https://github.com/neon-bindings/website/blob/master/docs/',

//   projectName: 'website',
//   organizationName: 'neon-bindings',
//   repoUrl: 'https://github.com/neon-bindings/neon',

//   // For no header links in the top nav bar -> headerLinks: [],
//   headerLinks: [
//     { doc: 'intro', label: 'Docs' },
//     {
//       href: 'https://github.com/neon-bindings/examples#table-of-contents',
//       label: 'Examples'
//     },
//     {
//       href: '/api/neon/',
//       label: 'API'
//     },
//     { doc: 'learning-resources', label: 'Resources' },
//     { doc: 'roadmap', label: 'Roadmap' },
//     { page: 'help', label: 'Help' },
//     { blog: true, label: 'Blog' },
//     {
//       href: 'https://github.com/neon-bindings/neon',
//       label: 'GitHub'
//     }
//   ],

//   // If you have users set above, you add it here:
//   users,

//   /* path to images for header/footer */
//   disableHeaderTitle: true,
//   headerIcon: 'logo/text-logo.svg',
//   footerIcon: 'logo/text-logo.svg',
//   favicon: 'logo/letter-logo.png',

//   /* Colors for website */
//   colors: {
//     primaryColor: '#030C1C',
//     secondaryColor: '#030C1C'
//   },

//   // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
//   copyright: `Copyright © ${new Date().getFullYear()} Neon Bindings`,

//   highlight: {
//     // Highlight.js theme to use for syntax highlighting in code blocks.
//     theme: 'tomorrow'
//   },

//   algolia: {
//     // "Search only api key". Safe to keep this public
//     apiKey: 'bfa6bb4b57d4fa853c0358ee9b195146',
//     indexName: 'amilajack_neon'
//   },

//   // Add custom scripts here that would be placed in <script> tags.
//   scripts: ['https://buttons.github.io/buttons.js'],

//   // On page navigation for the current documentation page.
//   onPageNav: 'separate',
//   // No .html extensions for paths.
//   cleanUrl: true,

//   // Open Graph and Twitter card images.
//   ogImage: 'logo/text-logo.svg',
//   twitterImage: 'logo/text-logo.svg',

//   separateCss: ['static/api'],

//   gaTrackingId: 'UA-130626950-1'
// };

// module.exports = siteConfig;

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  title: 'Neon',
  tagline: 'Fast and Safe Native Node.js Modules',
  url: 'https://neon-bindings.com',
  baseUrl: '/',
  favicon: 'logo/letter-logo.png',
  organizationName: 'neon-bindings', // Usually your GitHub org/user name.
  projectName: 'website', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Neon',
      logo: {
        alt: 'Neon Logo',
        src: 'logo/text-logo.svg'
      },
      links: [
        { to: 'docs/intro', label: 'Docs' },
        {
          href: 'https://github.com/neon-bindings/examples#table-of-contents',
          label: 'Examples'
        },
        {
          href: '/api/neon/',
          label: 'API'
        },
        { to: 'docs/learning-resources', label: 'Resources' },
        { to: 'docs/roadmap', label: 'Roadmap' },
        // { page: 'help', label: 'Help' }
        { to: 'blog', label: 'Blog' },
        {
          href: 'https://github.com/neon-bindings/neon',
          label: 'GitHub'
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [],
      logo: {
        alt: 'Facebook Open Source Logo',
        src: 'https://docusaurus.io/img/oss_logo.png'
      },
      copyright: `Copyright © ${new Date().getFullYear()} Facebook, Inc. Built with Docusaurus.`
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js')
        }
        // theme: {
        //   customCss: require.resolve('./src/css/custom.css')
        // }
      }
    ]
  ]
};
