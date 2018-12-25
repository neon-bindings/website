---
id: publishing
title: Publishing
sidebar_label: Publishing
---

Publishing native modules is a critical part of native modules. The user of a native node module that is compatible with the architecture of their machine. Tthe Node community has devised two solutions for this:

### 1. Upload and downloading native compiled modules 

[Example](https://github.com/amilajack/disk-utility)

Library authors can compile the native module to all multiple targets (windows, macOS, linux) and then upload those targets. Users of the module will then download these targets.

To implement this solution, add the following `.travis.yml` to the root directory of your project:

```yaml
os:
  - osx
  - linux

language: node_js

node_js:
  - node
  - 10
  - 9
  - 8

cache: cargo

before_install:
  # Install Rust and Cargo
  - curl https://sh.rustup.rs -sSf > /tmp/rustup.sh
  - sh /tmp/rustup.sh -y
  - export PATH="$HOME/.cargo/bin:$PATH"
  - source "$HOME/.cargo/env"
  # Install NPM packages
  - node -v
  - npm -v
  - npm install

script:
  - npm test
  # Publish when using '[publish binary]' keywords
  - COMMIT_MESSAGE=$(git log --format=%B --no-merges -n 1 | tr -d '\n')
  - if [[ ${COMMIT_MESSAGE} =~ "[publish binary]" ]]; then yarn upload-binary || exit 0; fi;
```

Then add the following lines to your `package.json` to tell NPM to only publish the `lib` directory and the `native/index.node` file. Make sure to change the `type` and `url` properties in the `repository` object:

```json
  "repository": {
    "type": "git",
    "url": "git+https://github.com/your-username-here/your-project-here.git"
  },
  "files": [
    "native/index.node",
    "lib"
  ],
```

Then install [`node-pre-gyp`](https://github.com/mapbox/node-pre-gyp) and [`node-pre-gyp-github`](https://github.com/bchr02/node-pre-gyp-github). Note that the master branch of `node-pre-gyp` does not work with Neon so you must use a branch of a fork which adds support for Neon:

```bash
# NPM
npm install node-pre-gyp@amilajack/node-pre-gyp#neon-compat
npm install node-pre-gyp-github
# Yarn
yarn add node-pre-gyp@amilajack/node-pre-gyp#neon-compat
yarn add node-pre-gyp-github
```

Then make the following changes to the `scripts` section of your `package.json`:
```diff
- "install": "neon build --release",
+ "install": "node-pre-gyp install --fallback-to-build=false || neon build --release",
+ "package": "node-pre-gyp package",
+ "upload-binary": "node-pre-gyp package && node-pre-gyp-github publish",
```

And finally add the following to the root of your `package.json`:

```json
  "binary": {
    "module_name": "index",
    "host": "https://github.com/your-username-here/your-repo-here/releases/download/",
    "remote_path": "{version}",
    "package_name": "{node_abi}-{platform}-{arch}.tar.gz",
    "module_path": "./native",
    "pkg_path": "."
  },
```

Note: DO NOT replace `{version}` with actual version.

GitHub needs permission to publish releases on your behalf so you'll need to create a Personal Access Token:

1. Go to [Developer Settings](https://github.com/settings/developers)
2. Click `Personal access tokens`
3. Click `Generate new token`
4. Select `"public_repo"` and `"repo_deployment"`
5. Generate Token
6. Copy the key that's generated and set NODE_PRE_GYP_GITHUB_TOKEN environment variable to it. Within your command prompt:

Then add the key to the Travis CI settings of your repo.

1. Open your project on Travis CI
2. Click `More options` dropdown
3. Click `Settings`
4. Go to `Environment Variables` and add `NODE_PRE_GYP_GITHUB_TOKEN` as `Name` and your generated token as the `Value` of your ENV variables

For an **example of a Neon project with publishing capabilities**, see [amilajack/disk-utility](https://github.com/amilajack/disk-utility)
For more details on [`node-pre-gyp-github`'s `README`](https://github.com/bchr02/node-pre-gyp-github) for more details on publishing options

Now you can publish binaries only on a specific commit. To do this you could borrow from the Travis CI idea of commit keywords and add special handling for commit messages with [publish binary]:

```bash
git commit -a -m "[publish binary]"
```

Or, if you don't have any changes to make simply run:

```bash
git commit --allow-empty -m "[publish binary]"
```

Note that these will run the `upload-binary` script, which will package and upload binaries for the current version of the package. A typical workflow of publishing a Neon module would include the following the following:

```bash
git commit -a -m "[publish binary]"
npm publish
```

### 2. Shipping compiling native modules

Another solution is shipping all the compiled native code targets with the npm module. In other words, this means publishing the package with the windows, macOS, and linux binaries. This solution is considered more secure that the approach of uploading and download modules because they prevent users of a module from [wormhole attacks](https://www.kb.cert.org/vuls/id/319816/).

This feature is still a work in progress as the [`neon build --target` feature](https://github.com/neon-bindings/rfcs/issues/16) is a work in progress.
