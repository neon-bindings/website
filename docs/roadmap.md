---
id: roadmap
title: Roadmap
sidebar_label: Roadmap
---

To see what's in progress, see [our RFC's](https://github.com/neon-bindings/rfcs/pulls)

## N-API

#### What is [N-NAPI](https://nodejs.org/api/n-api.html)?

> It is independent from the underlying JavaScript runtime (ex V8) and is maintained as part of Node.js itself. This API will be Application Binary Interface (ABI) stable across versions of Node.js. It is intended to insulate Addons from changes in the underlying JavaScript engine and allow modules compiled for one major version to run on later major versions of Node.js without recompilation

See [nodejs.org/api/n-api](https://nodejs.org/api/n-api.html) for more details

Currently Neon uses the `v8` API for all JS interaction with the JS runtime. Migrating to N-API would give us the following:

- ABI stability
- Remove dependency on `node-gyp`

## Cross Compilation Flags

Currently, Neon only supports building for the host target. We are looking to add support for compiling to multiple targets, similar to how Cargo lets you do this:

```bash
# Cargo
cargo build --target i686-pc-windows-msvc
# Neon
neon build --target i686-pc-windows-msvc
```

See the [issue ticket](https://github.com/neon-bindings/rfcs/issues/16)

## JS Standard Library Integration

This includes supporting more erganomic Neon APIs for JS APIs. One of these API's, for example, is the `Date` API. While it is possible to use the JS `Date` object in Neon, the methods for using it low level. We plan to add a higher level API for the `Date` object and other basic standard library objects in JS including the following: `RegEx`, `TypedArray`, `Promise`, and other objects.

Here's an example of how you could instantiate a JS `Date` object in Neon with the higher level API:

```rust
let date: Handle<JsDate> = JsDate::now(scope)?;
let time: SystemTime = date.as_time();
```

To learn more, see these RFC's:

* [Date API](https://github.com/neon-bindings/rfcs/blob/26f10abccf49dd880449f043868b0968b137096a/text/0000-date-api.md)
* [stdlib API](https://github.com/neon-bindings/rfcs/issues/10)

## Threadsafe Callbacks on Main Thread

The main motivation of this is to provide a way to schedule the execution of JavaScript from any (Rust) thread. While `neon::Task` allows to perform a background task and call a JavaScript callback after it's completion, there is currently no way to propagate the progress of a task to JavaScript.

[See the RFC](https://github.com/geovie/rfcs/blob/0f1963c1010253408229f5d0d3ee0cc7049765fa/text/0000-threadsafe-callback.md) for more details
