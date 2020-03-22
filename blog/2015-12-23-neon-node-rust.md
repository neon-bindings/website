---
title: "Neon: Node + Rust = 💖"
author: Dave Herman
categories:
  - Rust
  - Node
  - Neon
---

⚠️ This article contains references to an outdated version of neon ⚠️

If you're a JavaScript programmer who's been intrigued by Rust's [_hack without fear_](http://blog.rust-lang.org/2015/08/14/Next-year.html) theme---making systems programming safe and fun---but you've been waiting for inspiration, I may have something for you! I've been working on [Neon](https://github.com/dherman/neon), a set of APIs and tools for **making it super easy to write native Node modules in Rust**.

<!--more-->

**TL;DR:**

  * [Neon](https://github.com/dherman/neon) is an API for writing fast, crash-free native Node modules in Rust;
  * Neon enables Rust's parallelism with guaranteed thread safety;
  * [Neon-cli](https://github.com/dherman/neon-cli) makes it easy to create a Neon project and get started; and finally...
  * Help wanted!

## I Can Rust and So Can You!

I wanted to make it as easy as possible to get up and running, so I built [neon-cli](https://github.com/dherman/neon-cli), a command-line tool that lets you generate a complete Neon project skeleton with one simple command and build your entire project with nothing more than the usual `npm install`.

If you want to try building your first native module with Neon, **it's super easy**: install [neon-cli](https://github.com/dherman/neon-cli) with `npm install -g neon-cli`, then create, build, and run your new project:

```
% neon new hello
...follow prompts...
% cd hello
% npm install
% node -e 'require("./")'
```

If you don't believe me, I made a [screencast](https://raw.githubusercontent.com/dherman/neon-cli/master/screencast.gif), so you _know_ I'm legit.

## I Take Thee at thy Word

To illustrate what you can do with Neon, I created a little [word counting demo](https://github.com/dherman/wc-demo). The demo is simple: read in the complete plays of Shakespeare and count the total number of occurrences of the word "thee". First I tried implementing it in pure JS. The top-level code splits the corpus into lines, and sums up the counts for each line:

```javascript
function search(corpus, search) {
  var ls = lines(corpus);
  var total = 0;
  for (var i = 0, n = ls.length; i < n; i++) {
    total += wcLine(ls[i], search);
  }
  return total;
}
```

Searching an individual line involves splitting the line up into word and matching each word against the search string:

```javascript
function wcLine(line, search) {
  var words = line.split(' ');
  var total = 0;
  for (var i = 0, n = words.length; i < n; i++) {
    if (matches(words[i], search)) {
      total++;
    }
  }
  return total;
}
```

The rest of the details are pretty straightforward but definitely [check out the code](https://github.com/dherman/wc-demo/blob/master/lib/search.js)---it's small and self-contained.

On my laptop, running the algorithm across all the plays of Shakespeare usually takes about 280 -- 290ms. Not hugely expensive, but slow enough to be optimizable.

## Fall Into our Rustic Revelry

One of the amazing things about Rust is that highly efficient code can still be remarkably compact and readable. In the [Rust version of the algorithm](https://github.com/neon-bindings/examples/blob/master/word-counting/native/src/lib.rs), the code for summing up the counts for all the lines looks pretty similar to the JS code:

```rust
let mut total = 0;
for word in line.split(' ') {
    if matches(word, search) {
        total += 1;
    }
}
total // in Rust you can omit `return` for a trailing expression
```

In fact, that same code can be written at a higher level of abstraction _without losing performance_, using iteration methods like [`filter`](http://doc.rust-lang.org/std/iter/trait.Iterator.html#method.filter) and [`fold`](http://doc.rust-lang.org/std/iter/trait.Iterator.html#method.fold) (similar to [`Array.prototype.filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) and [`Array.prototype.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) in JS):

```rust
line.split(' ')
    .filter(|word| matches(word, search))
    .fold(0, |sum, _| sum + 1)
```

In my quick experiments, that even seems to shave a few milliseconds off the total running time. I think this is a nice demonstration of the power of Rust's [zero-cost abstractions](http://blog.rust-lang.org/2015/05/11/traits.html), where idiomatic and high-level abstractions produce the same or sometimes even better performance (by making additional optimizations possible, like eliminating bounds checks) than lower-level, more obscure code.

On my machine, the simple Rust translation runs in about 80 -- 85ms. Not bad---about 3x as fast just from using Rust, and in roughly the same number of lines of code (60 in JS, 70 in Rust). By the way, I'm being approximate here with the numbers, because this isn't a remotely scientific benchmark. My goal is just to demonstrate that you _can_ get significant performance improvements from using Rust; in any given situation, the particular details will of course matter.

## Their Thread of Life is Spun

We're not done yet, though! Rust enables something even cooler for Node: we can easily and safely parallelize this code---and I mean [without the night-sweats and palpitations usually associated with multithreading](http://blog.rust-lang.org/2015/04/10/Fearless-Concurrency.html). Here's a quick look at the top level logic in the Rust implementation of the demo:

```rust
let total = vm::lock(buffer, |data| {
    let corpus = data.as_str().unwrap();
    let lines = lines(corpus);
    lines.into_iter()
         .map(|line| wc_line(line, search))
         .fold(0, |sum, line| sum + line)
});
```

The `vm::lock` API lets Neon safely expose the raw bytes of a Node `Buffer` object (i.e., a typed array) to Rust threads, by preventing JS from running in the meantime. And Rust's concurrency model makes programming with threads _actually fun_.

To demonstrate how easy this can be, I used [Niko Matsakis's new Rayon crate](http://smallcultfollowing.com/babysteps/blog/2015/12/18/rayon-data-parallelism-in-rust/) of beautiful data parallelism abstractions. Changing the demo to use Rayon is as simple as replacing the `into_iter`/`map`/`fold`/ lines above with:

```rust
lines.into_par_iter()
     .map(|line| wc_line(line, search))
     .sum()
```

Keep in mind, Rayon wasn't designed with Neon in mind---its generic primitives match the iteration protocols of Rust, so Neon was able to just pull it off the shelf.

With that simple change, on my two-core MacBook Air, the demo goes from about 85ms down to about 50ms.

## Bridge Most Valiantly, with Excellent Discipline

I've worked on making the integration as seamless as possible. From the Rust side, Neon functions follow a simple protocol, taking a `Call` object and returning a JavaScript value:

```rust
fn search(call: Call) -> JS<Integer> {
    let scope = call.scope;
    // ...
    Ok(Integer::new(scope, total))
}
```

The `scope` object safely tracks handles into V8's garbage-collected heap. The Neon API uses the Rust type system to guarantee that your native module can't crash your app by mismanaging object handles.

From the JS side, loading the native module is straightforward:

```javascript
var myNeonModule = require('neon-bridge').load();
```

## Wherefore's this Noise?

I hope this demo is enough to get people interested. Beyond the sheer fun of it, I think the strongest reasons for using Rust in Node are performance and parallelism. As the Rust ecosystem grows, it'll also be a way to give Node access to cool Rust libraries. Beyond that, I'm hoping that Neon can make a nice abstraction layer that just makes writing native Node modules less painful. With projects like [node-uwp](https://github.com/microsoft/node-uwp) it might even be worth exploring evolving Neon towards a JS-engine-agnostic abstraction layer.

There are lots of possibilities, but [I need help!](https://github.com/dherman/neon) If you want to get involved, I've created a [community slack](http://rustbridge.slack.com) (grab an invite from [the Slackin app](https://rust-bindings-slackin.herokuapp.com)) and a `#neon` IRC channel on [Mozilla IRC](https://wiki.mozilla.org/IRC) (`irc.mozilla.org`).

## A Quick Thanks

There's a ton of fun exploration and work left to do but I couldn't have gotten this far without huge amounts of help already: [Andrew Oppenlander's blog post](https://github.com/oppenlander/oppenlanderme/blob/master/public/articles/rust-ffi.md) got me off the ground, Ben Noordhuis and Marcin Cieślak helped me wrestle with V8's tooling, I picked up a few tricks from Nathan Rajlich's [evil genius code](https://github.com/TooTallNate/node-bindings/blob/master/bindings.js), Adam Klein and Fedor Indutny helped me understand the V8 API, Alex Crichton helped me with compiler and linker arcana, Niko Matsakis helped me with designing the safe memory management API, and Yehuda Katz helped me with the overall design.

You know what this means? [**Maybe you can help too!**](https://github.com/dherman/neon)
