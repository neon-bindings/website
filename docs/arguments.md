---
id: arguments
title: Arguments
sidebar_label: Arguments
---

Neon provides built-in mechanisims for accessing the `arguments` object. 

Arguments can be passed from JS to Rust and be of any type. It is useful to assert that certain values are certain types.

## Calling Functions by Indexes

We first start by defining a function and exporting it by the name of `sayHi`:

```rust
fn say_hi(mut cx: FunctionContext) {}

register_module!(mut cx, {
    cx.export_function("sayHi", say_hi)
});
```

The following code takes the first argument passed to the `sayHi` function and throws if it cannot be cast to a function

```rust
fn say_hi(mut cx: FunctionContext) -> JsResult<JsFunction> {
    let arg0 = cx.argument::<JsFunction>(0)?;
    // --snip--
}
```

## Checking Arguments

```rust
pub fn foo(mut cx: FunctionContext) -> JsResult<JsUndefined> {
    cx.check_argument::<JsString>(0)?;
    cx.check_argument::<JsNumber>(1)?;
    Ok(cx.undefined())
}
```
Now in our `./lib/index.js`:
```js
const { foo } = require('../native);
foo();             // fails
foo(12);           // fails
foo('foobar');     // fails
foo('foobar', 12); // passes!
```

## Getting the Value of an Argument

```rust
fn add1(mut cx: FunctionContext) -> JsResult<JsNumber> {
    // Attempt to cast the first argument to a JsNumber. Then
    // get the value if cast is successul
    let x = cx.argument::<JsNumber>(0)?.value();
    Ok(cx.number(x + 1.0))
}

register_module!(mut cx, {
    cx.export_function("add1", add1)
});
```

## Getting the Number of Arguments

```js
function foo() {
    
}
```

```rust
// --snip--
let args_length = cx.len();
// --snip--
```