---
id: electron
title: Electron
sidebar_label: Electron
---

Neon is a great way to add native functionality to **[Electron](https://electronjs.org)** applications. Since Neon packages build like any normal JavaScript package, they require very little special handling to add to an Electron project.

## Adding a Dependency

The most straightforward way to add a Neon module to your Electron app is to add it to your app's dependencies. For example, if we want to make use of the [`disk-utility`](https://www.npmjs.com/package/disk-utility) library, which is built using Neon, we add it like any other dependency to our `package.json`:

```json
  "dependencies": {
    "disk-utility": "^0.0.2"
  }
```

And that's it! Building and running the Electron app will automatically build the `disk-utility` library's binary module from source, and your app can require the module like any normal JavaScript module:

```javascript
const { dirSize } = require("disk-utility");
```

## Defining a Neon Workspace

If you'd like to define a private Neon module directly within your application's repository, you can leverage _workspaces_, a feature available in all major JavaScript package managers.[^1] [^2] [^3] For this example, we'll use npm, but it should work similarly with Yarn or pnpm.

First, we'll create the Neon module in a subdirectory of the repository:

```sh
npm init neon my-neon-module
```

So our Electron application repository has a layout like this:

```
.
├── index.html
├── main.js
├── my-neon-module
│   ├── Cargo.toml
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json
│   └── src
├── node_modules
├── package-lock.json
└── package.json
```

Next, we'll configure the repository's top-level `package.json` to add `my-neon-module` as a workspace:

```json
  "workspaces": [
    "my-neon-module"
  ],
```

Finally, we build the top level project:

```sh
npm install
```

This results in a symbolic link in `node_modules` pointing to the `my-neon-module` subdirectory, so the Electron application can now require our new module as if it were a dependency:

```javascript
const myNeonModule = require("my-neon-module");
```


[^1]: [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
[^2]: [Yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)
[^3]: [pnpm workspaces](https://pnpm.io/workspaces)
