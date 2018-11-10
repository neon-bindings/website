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
foo(); // fails
foo(12); // fails
foo('foobar'); // fails
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
getArgsLen(); // 0
getArgsLen(1); // 1
getArgsLen(1, 'foobar'); // 2
```

## Optional Arguments

Produces the `i`th argument, or `None` if `i` is greater than or equal to `self.len()`.

```rust
pub fn args_opt(mut cx: FunctionContext) -> JsResult<JsNumber> {
    match cx.argument_opt(0) {
        Some(arg) => {
            // Throw if the argument exist and it cannot be downcasted
            // to a number
            let num = arg.downcast::<JsNumber>().or_throw(&mut cx)?.value();
            println!("The 0th argument is {}", num);
        },
        None => panic!("0th argument does not exist, out of bounds!")
    }
    Ok(cx.undefined())
}
```

## Default Values

Handling default values is similar to handling **Optional Arguments**:

```rust
// --snip--

pub fn default_args(mut cx: FunctionContext) -> JsResult<JsUndefined> {
    let age = match cx.argument_opt(0) {
        Some(arg) => arg.downcast::<JsNumber>().or_throw(&mut cx)?.value(),
        // Default to 12 if no value is given
        None => 12 as f64
    };

    let name = match cx.argument_opt(1) {
        Some(arg) => arg.downcast::<JsString>().or_throw(&mut cx)?.value(),
        // Default to 12 if no value is given
        None => "John Doe".to_string()
    };

    println!("i am {} years old and my name is {}", age, name);

    Ok(cx.undefined())
}

// --snip--
```

```js
const { defaultArgs } = require('../native');

defaultArgs(); // i am 12 years old and my name is John Doe
defaultArgs(22); // i am 22 years old and my name is John Doe
defaultArgs(22, 'Jane Doe'); // i am 22 years old and my name is Jane Doe
```
