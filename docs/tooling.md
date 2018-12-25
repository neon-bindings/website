---
id: tooling
title: Tooling
sidebar_label: Tooling
---

Here is a list of tooling configuration for Neon projects

## `.travis.yml`

This `.travis.yml` config tests against multiple node versions, tests against macOS and Linux, and installs Rust

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
```

## `.editorconfig`

This `.editorconfig` follows the JS convention of using 2 spaces for indenting JS files. It also follows the Rust convention by indending Rust files with 4 spaces.

```
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false

[*.rs]
indent_style = space
indent_size = 4

[*.toml]
indent_style = space
indent_size = 4
```
