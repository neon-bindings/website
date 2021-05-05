---
id: word-counting
title: Word Counting
sidebar_label: Word Counting
---

In this tutorial, we're going to recreate the [word counting demo Dave Herman gave in his talk about neon](https://youtu.be/jINMIAicaS0?t=789).

First start by creating a new project with `neon-cli`:

```bash
neon new hello
cd hello
npm install # OR `yarn install`
node -e 'require("./")'
```

When installing the dependencies, npm will run `neon build --release` and build a release build of our code in `./native`.

## I Take Thee at thy Word

To illustrate what you can do with Neon, we will a little word counting demo. The demo is simple: read in the complete plays of Shakespeare and count the total number of occurrences of the word “thee”. First lets implement this demo in pure JS. The top-level code splits the corpus into lines, and sums up the counts for each line:

```js
function search(corpus, search) {
  const ls = lines(corpus);
  const total = 0;
  for (let i = 0, n = ls.length; i < n; i++) {
    total += wcLine(ls[i], search);
  }
  return total;
}
```

Searching an individual line involves splitting the line up into word and matching each word against the search string:

```js
function wcLine(line, search) {
  const words = line.split(' ');
  const total = 0;
  for (let i = 0, n = words.length; i < n; i++) {
    if (matches(words[i], search)) {
      total++;
    }
  }
  return total;
}
```

The rest of the details are pretty straightforward but definitely check out the code—it’s small and self-contained.

## Fall Into our Rustic Revelry

One of the amazing things about Rust is that highly efficient code can still be remarkably compact and readable. In the Rust version of the algorithm, the code for summing up the counts for all the lines looks pretty similar to the JS code:

```rust
let mut total = 0;
for word in line.split(' ') {
    if matches(word, search) {
        total += 1;
    }
}
total // in Rust you can omit `return` for a trailing expression
```

In fact, that same code can be written at a higher level of abstraction without losing performance, using iteration methods like filter and fold (similar to Array.prototype.filter and Array.prototype.reduce in JS):

```rust
line.split(' ')
    .filter(|word| matches(word, search))
    .fold(0, |sum, _| sum + 1)
```

In my quick experiments, that even seems to shave a few milliseconds off the total running time. I think this is a nice demonstration of the power of Rust’s zero-cost abstractions, where idiomatic and high-level abstractions produce the same or sometimes even better performance (by making additional optimizations possible, like eliminating bounds checks) than lower-level, more obscure code.

On my machine, the simple Rust translation runs in about 80 – 85ms. Not bad—about 3x as fast just from using Rust, and in roughly the same number of lines of code (60 in JS, 70 in Rust). By the way, I’m being approximate here with the numbers, because this isn’t a remotely scientific benchmark. My goal is just to demonstrate that you can get significant performance improvements from using Rust; in any given situation, the particular details will of course matter.

## Their Thread of Life is Spun

We’re not done yet, though! Rust enables something even cooler for Node: we can easily and safely parallelize this code—and I mean without the night-sweats and palpitations usually associated with multithreading. Here’s a quick look at the top level logic in the Rust implementation of the demo:

```rust
let total = cx.borrow(&buffer, |data| {
    let corpus = str::from_utf8(data.as_slice()).ok().unwrap();
    wc_parallel(&lines(corpus), search)
});
```

The `cx.borrow` API lets Neon safely expose the raw bytes of a Node Buffer object (i.e., a typed array) to Rust threads, by preventing JS from running in the meantime. And Rust’s concurrency model makes programming with threads actually fun.

To demonstrate how easy this can be, I used Niko Matsakis’s new Rayon crate of beautiful data parallelism abstractions. Changing the demo to use Rayon is as simple as replacing the into_iter/map/fold/ lines above with:

```diff
+   lines.into_par_iter()
      .map(|line| wc_line(line, search))
      .sum()
```

Keep in mind, Rayon wasn’t designed with Neon in mind—its generic primitives match the iteration protocols of Rust, so Neon was able to just pull it off the shelf.

With that simple change, on my two-core MacBook Air, the demo goes from about 85ms down to about 50ms.

## Bridge Most Valiantly, with Excellent Discipline

I’ve worked on making the integration as seamless as possible. From the Rust side, Neon functions follow a simple protocol, taking a Call object and returning a JavaScript value:

```rust
fn search(mut cx: FunctionContext) -> JsResult<JsNumber> {
    // ...
    Ok(cx.number(total))
}
```

`cx`, a `FunctionContext` struct, safely tracks handles into V8’s garbage-collected heap. The Neon API uses the Rust type system to guarantee that your native module can’t crash your app by mismanaging object handles.

From the JS side, loading the native module is straightforward:

```js
const myNeonModule = require('neon-bridge').load();
```

## Wherefore’s this Noise?

I hope this demo is enough to get people interested. Beyond the sheer fun of it, I think the strongest reasons for using Rust in Node are performance and parallelism. As the Rust ecosystem grows, it’ll also be a way to give Node access to cool Rust libraries. Beyond that, I’m hoping that Neon can make a nice abstraction layer that just makes writing native Node modules less painful. With projects like node-uwp it might even be worth exploring evolving Neon towards a JS-engine-agnostic abstraction layer.

There are lots of possibilities, but I need help! If you want to get involved, I’ve created a community slack (grab an invite from the Slackin app) and a #neon IRC channel on Mozilla IRC (irc.mozilla.org).

## Source

Here is the [source code](https://github.com/neon-bindings/examples/tree/legacy/word-counting) for this guide.
