---
id: arguments
title: Arguments
sidebar_label: Arguments
---

Neon provides built-in mechanisims for accessing the `arguments` object. 

Here is an example of getting the first value of the `arguments` object:

```rust
fn say_hi(mut cx: FunctionContext) -> JsResult<JsValue> {
    let arg0 = cx.argument::<JsValue>(0)?;
    // --snip--
}
```