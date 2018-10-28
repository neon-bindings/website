---
id: roadmap
title: Roadmap
sidebar_label: Roadmap
---

## N-API

#### What is [N-NAPI](https://nodejs.org/api/n-api.html)?

> It is independent from the underlying JavaScript runtime (ex V8) and is maintained as part of Node.js itself. This API will be Application Binary Interface (ABI) stable across versions of Node.js. It is intended to insulate Addons from changes in the underlying JavaScript engine and allow modules compiled for one major version to run on later major versions of Node.js without recompilation

See [N-NAPI](https://nodejs.org/api/n-api.html) for more details

Currently Neon uses the `v8` API for all JS interaction with the JS runtime. Migrating to N-API would give us the following:

- ABI stability
- Remove dependency on `node-gyp`

## And Many More Things!
