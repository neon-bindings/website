---
id: functions
title: Functions
sidebar_label: Functions
---

[Examples](https://github.com/neon-bindings/examples/tree/legacy/functions)

## This

In order to call methods on `cx.this`, it must be downcasted to a `JsObject`. For more on [type checking section](type-checking.md#downcasting) for more details

```rust
pub fn require_object_this(mut cx: FunctionContext) -> JsResult<JsUndefined> {
    let this = cx.this();
    // Downcast `this` so .set can be called on it
    let this = this.downcast::<JsObject>().or_throw(&mut cx)?;
    let t = cx.boolean(true);
    // Equivalent to  `this.modified = true` in JS
    this.set(&mut cx, "modified", t)?;
    Ok(cx.undefined())
}
```

## Calling JS Functions

Here we define a JS function that takes a function as the `0`th argument and calls that function. `f.call` takes a `FunctionContext`, the context to call the function from (in this case `null`), and `arguments`

```rust
pub fn call_js_function(mut cx: FunctionContext) -> JsResult<JsNumber> {
    let f = cx.argument::<JsFunction>(0)?;
    let args: Vec<Handle<JsNumber>> = vec![cx.number(16.0)];
    let null = cx.null();
    f.call(&mut cx, null, args)?.downcast::<JsNumber>().or_throw(&mut cx)
}
```

## Constructing JS Functions

```rust
pub fn construct_js_function(mut cx: FunctionContext) -> JsResult<JsNumber> {
    let f = cx.argument::<JsFunction>(0)?;
    let zero = cx.number(0.0);
    let o = f.construct(&mut cx, vec![zero])?;
    let get_utc_full_year_method = o.get(&mut cx, "getUTCFullYear")?.downcast::<JsFunction>().or_throw(&mut cx)?;
    let args: Vec<Handle<JsValue>> = vec![];
    get_utc_full_year_method.call(&mut cx, o.upcast::<JsValue>(), args)?.downcast::<JsNumber>().or_throw(&mut cx)
}
```

## Returning Functions

```rust
pub fn return_js_function(mut cx: FunctionContext) -> JsResult<JsFunction> {
    JsFunction::new(&mut cx, add1)
}
```
