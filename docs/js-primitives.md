---
id: js-primitives
title: Primitives
sidebar_label: Primitives
---

## Numbers

Note that all numbers must be casted to a `f64` since these are the only types of numbers that a JS engine supports

```rust
fn js_number(mut cx: FunctionContext) -> JsResult<JsNumber> {
    // Either use function context to create number
    let number = cx.number(23 as f64);
    // or use JsNumber struct
    let number = JsNumber::new(&mut cx, 23);
    Ok(number)
}
```

Other primitives follow a similar pattern:

## Strings

```rust
// --snip--
let string = cx.string("foobar");
let string = JsString::new(&mut cx, "foobar");
// --snip--
```

## Booleans

```rust
// --snip--
let boolean = cx.boolean(true);
let boolean = JsBoolean::new(&mut cx, true);
// --snip--
```

## Undefined

```rust
// --snip--
let undefined = cx.undefined();
let undefined = JsUndefined::new(&mut cx);
// --snip--
```

## Null

```rust
// --snip--
let null = cx.null();
let null = JsNull::new(&mut cx);
// --snip--
```
