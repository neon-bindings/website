# website

[![Build Status](https://travis-ci.org/neon-bindings/website.svg?branch=master)](https://travis-ci.org/neon-bindings/website)

The website and docs for [neon](https://github.com/neon-bindings/neon)

## Setup

```bash
git clone https://github.com/neon-bindings/website
cd website
yarn
yarn start

# Styles
yarn styles
yarn styles --watch
```

## Contributing

For details, see [the docusarus docs](https://v2.docusaurus.io)

## Updating the Docs

```bash
git clone https://github.com/neon-bindings/neon
cd neon
cargo doc
cp -r target/doc ../static
mv ../static/docs ../static/api
rm -rf neon
```
