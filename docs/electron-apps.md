---
id: electron-apps
title: Electron Apps
sidebar_label: Electron Apps
---

Neon can be great for adding native functionality to Electron apps. This guide will walk you through a simple example of adding a Neon dependency to an Electron app. To see the whole example you can look at the [full demo](https://github.com/neon-bindings/examples/tree/master/guides/electron-apps/simple-app).

For the most part, using a Neon package in Electron is as straightforward as adding it to the `package.json` dependencies. However, Electron does bring its own requirements with it for building native modules.

**We are working on adding Neon support to [electron-rebuild](https://github.com/electron/electron-rebuild)**, so you'll be able to just drop Neon dependencies into your app like any other. For now, there's a tool called [electron-build-env](https://github.com/dherman/electron-build-env) that you can use for building any Neon dependencies of your Electron app.

In the meantime, we can use Neon modules in an Electron app with just a few lines of configuration in our `package.json`.

## Setup Electron
```bash
# Clone the Quick Start repository
git clone https://github.com/electron/electron-quick-start

# Go into the repository
cd electron-quick-start
```

## Adding a Neon Dependency

First let's add a dependency on a simple Neon module, `neon-hello`, which is already published in npm:

```bash
npm install neon-hello
```

## Adding the Build Dependencies

Next, we need the `neon-cli` and `electron-build-env` packages in order to build `neon-hello`. Since they're only needed for building, we can add them as development dependencies:

```bash
npm install electron-build-env neon-cli --save-dev
```

## Creating a Build Script

Finally, we'll add a script to build the Neon dependency:

```json
"scripts": {
    // ...
    "build": "electron-build-env neon build neon-hello"
    // ...
}
```

This step uses the `electron-build-env` tool to configure the environment properly to build for Electron.

## That's It!

We can then build a production release of the `neon-hello` module:

```shell
npm run build
```

we should have a working Electron app. You can try out the [full working demo](https://github.com/neon-bindings/examples/tree/master/guides/electron-apps/simple-app) by building it and running:

```shell
npm start
```
