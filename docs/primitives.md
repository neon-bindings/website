---
id: primitives
title: Primitives
sidebar_label: Primitives
---

[Examples](https://github.com/neon-bindings/examples/tree/legacy/primitives)

## Numbers

Note that all numbers must be casted to a `f64` since these are the only types of numbers that a JS engine supports

```rust
fn js_number(mut cx: FunctionContext) -> JsResult<JsNumber> {
    // Either use function context to create number
    let number = cx.number(23 as f64);
    // or use JsNumber struct
    Ok(number)
}
```

Other primitives follow a similar pattern:

## Strings

```rust
// --snip--
let string = cx.string("foobar");
// --snip--
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
