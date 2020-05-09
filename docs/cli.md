---
id: cli
title: Command Line Interface (CLI)
sidebar_label: Command Line Interface (CLI)
---

## `neon new <project-name>`

Initialize a new Neon project in a new directory. For example, running `neon new foobar` will create a new directory called `foobar` and will add all the necessary neon boilerplate inside the directory.

## `neon build [--release]`

Create a dev (unoptimized) build with neon. Similar to `cargo build`. Passing `--release` flag will create a production build.

## `neon clean`

Clean the previous builds of neon. Similar to `cargo clean`.

## `neon version`

Get the current version of `neon-cli`.

## `neon help`

List all the commands of `neon`.
