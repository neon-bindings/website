---
id: primitive-types
title: Primitive Types
sidebar_label: Primitive Types
---

## Numbers

The [`Context::number()`](https://docs.rs/neon/latest/neon/context/trait.Context.html#method.number) method constructs a JavaScript number from any Rust number compatible with the [`f64`](https://doc.rust-lang.org/std/primitive.f64.html) type. This includes both integers and floating-point numbers, so you can conveniently construct a JavaScript number from a literal number:

```rust
let i: Handle<JsNumber> = cx.number(42);
let f: Handle<JsNumber> = cx.number(3.14);
```

For types that aren't implicitly convertible to `f64`, you can cast a number with Rust's [`as`](https://doc.rust-lang.org/std/keyword.as.html) operator:

```rust
let size: usize = std::mem::size_of::<u128>();
let n = cx.number(size as f64)
```

## Strings

The [`Context::string()`](https://docs.rs/neon/latest/neon/context/trait.Context.html#method.string) method constructs a JavaScript string from a reference to a Rust string.

```rust
let s: Handle<JsString> = cx.string("foobar");
```

## Booleans

```rust
// --snip--
let boolean = cx.boolean(true);
// --snip--
```

## Undefined

```rust
// --snip--
let undefined = cx.undefined();
// --snip--
```

## Null

```rust
// --snip--
let null = cx.null();
// --snip--
```
