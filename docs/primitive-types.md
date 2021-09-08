---
id: primitive-types
title: Primitive Types
sidebar_label: Primitive Types
---

In JavaScript, the **[primitive types](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)** are types of values that aren't objects. This page gives some simple examples of how to construct instances of various JavaScript primitive types, and you can follow the links to more detailed information in the API documentation.

## Numbers

The [`Context::number()`](https://docs.rs/neon/latest/neon/context/trait.Context.html#method.number) method constructs a JavaScript number from any Rust number compatible with the [`f64`](https://doc.rust-lang.org/std/primitive.f64.html) type. This includes both integers and floating-point numbers, so you can conveniently construct a JavaScript number from a literal number:

```rust
let i: Handle<JsNumber> = cx.number(42);
let f: Handle<JsNumber> = cx.number(3.14);
```

For types that aren't implicitly convertible to `f64`, you can explicitly cast a number with Rust's [`as`](https://doc.rust-lang.org/std/keyword.as.html) operator:

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

The [`Context::boolean()`](https://docs.rs/neon/latest/neon/context/trait.Context.html#method.boolean) method constructs a JavaScript Boolean value.

```rust
let b: Handle<JsBoolean> = cx.boolean(true);
```

## Undefined

The [`Context::undefined()`](https://docs.rs/neon/latest/neon/context/trait.Context.html#method.undefined) method constructs a JavaScript `undefined` value.

```rust
let u: Handle<JsUndefined> = cx.undefined();
```

## Null

The [`Context::null()`](https://docs.rs/neon/latest/neon/context/trait.Context.html#method.null) method constructs a JavaScript `null` value.

```rust
let n: Handle<JsNull> = cx.null();
```
