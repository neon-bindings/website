---
id: js-primitives
title: Primitives
sidebar_label: Primitives
---

## Numbers

```rust
fn js_number(mut cx: FunctionContext) -> JsResult<JsNumber> {
    let number = cx.number(23 as f64);
    Ok(number)
}
```

## Strings

```rust
fn js_string(mut cx: FunctionContext) -> JsResult<JsString> {
    let string = cx.string("foobar");
    Ok(string)
}
```

## Booleans

```rust
fn js_boolean(mut cx: FunctionContext) -> JsResult<JsBoolean> {
    let boolean = cx.boolean(true);
    Ok(boolean)
}
```
