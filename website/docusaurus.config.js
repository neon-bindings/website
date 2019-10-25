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
        src: 'logo/letter-logo.png'
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
        alt: 'Neon Logo',
        src: 'logo/text-logo.svg'
      },
      copyright: `Copyright © ${new Date().getFullYear()} Neon Bindings`
    },
    algolia: {
      // "Search only api key". Safe to keep this public
      apiKey: 'bfa6bb4b57d4fa853c0358ee9b195146',
      indexName: 'amilajack_neon'
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js')
        },
        googleAnalytics: {
          trackingID: 'UA-130626950-1'
        }
      }
    ]
  ]
};
