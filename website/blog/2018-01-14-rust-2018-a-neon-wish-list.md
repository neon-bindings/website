---
title: "#Rust2018: A Neon Wish List"
author: Dave Herman
---

⚠️ This article contains references to an outdated version of neon ⚠️

While I've been thoroughly enjoying the Rust community's spirited [#Rust2018 blog-fest](https://blog.rust-lang.org/2018/01/03/new-years-rust-a-call-for-community-blogposts.html), I wasn't really thinking of participating myself until [Julia Evans](http://jvns.ca) pointed out [the leadership wants to hear from everyone](https://twitter.com/b0rk/status/952370352759418880)---even if I might not have anything especially new to add. So here's my little wish list for Rust in 2018.

Since I'm not in Rust's leadership, I don't have to worry about synthesizing some grand narrative for the whole of Rust. So I'll just focus on a few things that would be personally useful to me. In particular, I'll stick to topics that would be helpful for my [Neon](https://www.neon-bindings.com) project, a set of bindings for writing native Node extension modules in Rust.

<!--more-->

# Stabilize `impl trait`

The most challenging part of keeping Neon's design manageable is the annotation burden. Neon provides a safe API for managing handles into Node's JavaScript garbage collector, and to do this, it requires passing around a "handle scope" parameter everywhere, which tracks the lifetimes of handles. There are a few flavors of handle scopes, which means helper functions in Neon projects often end up with some pretty hairy signatures:

```rust
fn get_foo_bar<'a, S: Scope<'a>>(scope: &mut S, obj: Handle<'a, JsObject>) -> JsResult<'a, JsValue> {
    // extract the `obj.foo` property and check that it's an object
    let foo = obj.get(scope, "foo")?.check::<JsObject>()?;
    // extract the `obj.foo.bar` property
    let bar = foo.get(scope, "bar")?;
    Ok(bar)
}
```

I would love for Neon users to be able to combine lifetime elision and the [`impl trait`](https://github.com/rust-lang/rust/issues/34511) shorthand syntax to write something like:

```rust
fn get_foo_bar(scope: &mut impl Scope, obj: Handle<JsObject>) -> JsResult<JsValue> {
    // ...
}
```

(With an upcoming [cleanup of the core Neon API](https://github.com/dherman/rfcs-1/blob/vm-two-point-oh/text/vm-2.0.md), the details of this would change a bit, but `impl trait` would be just as appealing.)

# Syntactic abstraction for error propagation

I adore the `?` syntax, but it's not enough! Expressions like `Ok(bar)` in the above example are an indication that we don't have a complete abstraction layer in the syntax for error propagation. I find it particularly galling when I have to see `Ok(())`. It's dipping down into an unnecessary abstraction layer, distracting the core logic of the function with mechanical details of the representation of Rust's control flow protocols.

I'm excited about the discussions around ["catching functions"](https://internals.rust-lang.org/t/pre-rfc-catching-functions/6505). I think we can get to a sweet spot where we have an abstraction layer in the syntax that never exposes the `Result` type for error handling, while still explicitly annotating every point that may throw (thanks to `?` syntax, and by contrast to exceptions). The above examples might look something like:

```rust
fn get_foo_bar(scope: &mut impl Scope, obj: Handle<JsObject>) -> Handle<JsValue> catch JsException {
    let foo = obj.get(scope, "foo")?.check::<JsObject>()?;
    let bar = foo.get(scope, "bar")?;
    return bar;
}
```

# Make cargo more extendable

Like `xargo` and `wargo`, Neon comes with a command-line tool that wraps cargo's behavior in order to abstract away a bunch of build configuration details. I'm proud of this abstraction, because it makes building native modules in Node far easier than they are with C++. But I would much rather Neon programmers could use cargo directly, calling all their usual familiar commands like `cargo build` and `cargo run`.

To support this, Neon will need a handful of extension points that don't exist today:

- The ability to extend the memoization logic with extra environmental information (e.g. which version of Node is being built for and the values of some Node-specific environment variables).
- Post-build hooks, so I can generate the final DLL and put it in the right directory.
- The ability to add default build flags (for example, on macOS, `neon build` actually calls `cargo rustc` with some extra low-level linking flags).
- Project templates for `cargo new`.

Being able to write

```shell
$ cargo new --template=neon my-first-neon-project
$ cd my-first-neon-project
$ cargo run
```

would be so amazing.

# Neon is about welcoming JS programmers

I promised no narrative, but there is a common thread here. I started the Neon project because I thought it would make a great bridge between the JavaScript and Rust communities. All of the topics in this post are about facilitating that connection:

- Neon forces JS programmers to get more explicit about working with the garbage collector than they normally have to, so making that as lightweight as possible makes falling into native code less of a steep cliff.
- JS is a language with exceptions, so making the protocol for emulating exceptions in Rust as ergonomic as possible will make Rust a better environment for JS programmers.
- And just as Node projects have a workflow oriented around `npm`, giving Neon projects a standard `cargo`-based workflow will feel familiar and pleasant to Node programmers.

My dream is that Neon can serve as a gateway welcoming JS programmers into Rust and systems programming for years to come. The more we smoothe the path between them, the more people we invite into our community.
