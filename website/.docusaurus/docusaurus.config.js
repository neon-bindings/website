export default {
  "plugins": [],
  "themes": [],
  "customFields": {},
  "themeConfig": {
    "navbar": {
      "title": "Neon",
      "logo": {
        "alt": "Neon Logo",
        "src": "logo/text-logo.svg"
      },
      "links": [
        {
          "to": "docs/intro",
          "label": "Docs"
        },
        {
          "href": "https://github.com/neon-bindings/examples#table-of-contents",
          "label": "Examples"
        },
        {
          "href": "/api/neon/",
          "label": "API"
        },
        {
          "to": "docs/learning-resources",
          "label": "Resources"
        },
        {
          "to": "docs/roadmap",
          "label": "Roadmap"
        },
        {
          "to": "blog",
          "label": "Blog"
        },
        {
          "href": "https://github.com/neon-bindings/neon",
          "label": "GitHub"
        }
      ]
    },
    "footer": {
      "style": "dark",
      "links": [],
      "logo": {
        "alt": "Neon Logo",
        "src": "logo/text-logo.svg"
      },
      "copyright": "Copyright © 2019 Neon Bindings"
    },
    "algolia": {
      "apiKey": "bfa6bb4b57d4fa853c0358ee9b195146",
      "indexName": "amilajack_neon"
    }
  },
  "title": "Neon",
  "tagline": "Fast and Safe Native Node.js Modules",
  "url": "https://neon-bindings.com",
  "baseUrl": "/",
  "favicon": "logo/letter-logo.png",
  "organizationName": "neon-bindings",
  "projectName": "website",
  "presets": [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          "sidebarPath": "/Users/amila/Documents/Projects/neon-site/website/sidebars.js"
        },
        "googleAnalytics": {
          "trackingID": "UA-130626950-1"
        }
      }
    ]
  ]
};