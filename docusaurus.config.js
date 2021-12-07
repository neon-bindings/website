const CORE_REPO_URL = "https://github.com/neon-bindings/neon";

module.exports = {
  customFields: {
    coreRepoUrl: CORE_REPO_URL,
  },
  title: "Neon",
  tagline: "Electrify your Node with the power of Rust!",
  url: "https://neon-bindings.com",
  baseUrl: "/",
  favicon: "logo/letter-logo.png",
  organizationName: "neon-bindings",
  projectName: "website",
  scripts: ["/asciinema/asciinema-player.js"],
  stylesheets: [
    "/asciinema/asciinema-player.css",
    "/asciinema/asciinema-theme.css",
  ],
  themeConfig: {
    colorMode: {
      defaultMode: "light",
      disableSwitch: true,
      respectPrefersColorScheme: true,
    },
    hideOnScroll: true,
    navbar: {
      title: "Neon",
      logo: {
        alt: "Neon Logo",
        src: "logo/letter-logo-alpha.png",
      },
      items: [
        { position: "left", to: "docs/introduction", label: "Docs" },
        {
          position: "left",
          label: "API Reference",
          href: "https://docs.rs/neon",
        },
        {
          position: "left",
          items: [
            { label: "GitHub", href: CORE_REPO_URL },
            {
              label: "Slack",
              href: "https://rust-bindings-slackin.herokuapp.com",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/rustneon",
            },
          ],
          label: "Community",
        },
        { position: "left", to: "blog", label: "Blog" },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Introduction",
              to: "docs/introduction",
            },
            {
              label: "Examples",
              to: "https://github.com/neon-bindings/examples/tree/main#table-of-contents",
            },
            {
              label: "API Reference",
              to: "https://docs.rs/neon",
            },
          ],
        },
        {
          title: "Community",
          items: [
            // @TODO
            // {
            //   label: 'User Showcase',
            //   to: 'user-showcase'
            // },
            {
              label: "GitHub",
              to: CORE_REPO_URL,
            },
            {
              label: "Help",
              to: "https://rust-bindings-slackin.herokuapp.com",
            },
            {
              label: "Twitter",
              to: "https://twitter.com/rustneon",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "blog",
            },
          ],
        },
      ],
      logo: {
        alt: "Neon Logo",
        src: "logo/text-logo.svg",
      },
      copyright: `Copyright © ${new Date().getFullYear()} The Neon Contributors`,
    },
    prism: {
      additionalLanguages: ["rust", "toml"],
    },
    algolia: {
      // "Search only api key". Safe to keep this public
      apiKey: "bfa6bb4b57d4fa853c0358ee9b195146",
      indexName: "amilajack_neon",
    },
    googleAnalytics: {
      trackingID: "UA-130626950-1",
    },
    gtag: {
      trackingID: "UA-130626950-1",
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
        },
      },
    ],
  ],
};
