---
id: version-0.2.0-arguments
title: Arguments
sidebar_label: Arguments
original_id: arguments
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
    let arg0 = cx.argument::<JsFunction>(0)?.value();
    // --snip--
}
```

## Asserting Argument Types

```rust
pub fn foo(mut cx: FunctionContext) -> JsResult<JsUndefined> {
    cx.check_argument::<JsString>(0)?;
    cx.check_argument::<JsNumber>(1)?;
    Ok(cx.undefined())
}
```

Now in our `./lib/index.js`:

```js
const { foo } = require('../native');
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

This is a simple example of getting the length of `arguments`

```rust
pub fn get_args_len(mut cx: FunctionContext) -> JsResult<JsNumber> {
    let args_length = cx.len();
    println!("{}", args_length);
    Ok(cx.number(args_length))
}

register_module!(mut cx, {
    cx.export_function("getArgsLen", get_args_len)
});
```

Now in our `./lib/index.js` we add the following:

```js
// ./lib/index.js
const { getArgsLen } = require('../native');
getArgsLen() // 0
getArgsLen(1) // 1
getArgsLen(1, 'foobar') // 2
```

## Options for Arguments

Produces the `i`th argument, or `None` if `i` is greater than or equal to `self.len()`.

```rust
pub fn args_opt(mut cx: FunctionContext) -> JsResult<JsNumber> {
    match cx.argument_opt::<JsString>(10000)? {
        Some(arg) => {
            println!"The 10000th argument is {}", arg);
        },
        None => panic!("10000th argument does not exist, out of bounds!")
    }
    Ok(cx.undefined())
}
```
