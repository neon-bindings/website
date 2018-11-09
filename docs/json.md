---
id: json
title: JSON
sidebar_label: JSON
---

Sometimes you just want to convert a struct in Rust to a `JsObject` and back. This can be done with [neon-serde](https://github.com/GabrielCastro/neon-serde). You will need to install the `neon-serde` and `serde_derive` crates.

For more docs on the `neon-serde` crate, please see its [repo](https://github.com/GabrielCastro/neon-serde) and [docs](https://docs.rs/crate/neon-serde/0.0.3)

First we install the following crates:

```toml
# Cargo.toml
# --snip--
[dependencies]
neon = "0.2.0"
neon-serde = "0.1.1"
serde_derive = "1.0.80"
serde = "1.0.80"
```

Then import the necessary libraries and declare a `User` struct that is marked as deserializable with [serde](https://github.com/serde-rs/serde):

```rust
#[macro_use]
extern crate neon;
#[macro_use]
extern crate neon_serde;
#[macro_use]
extern crate serde_derive;

#[derive(Serialize)]
struct User {
    name: String,
    age: u16,
}
```

## Serializing

We can serialize a Rust struct and convert it to a `JsValue` like so:

```rust
// --snip--
fn serialize_something(mut cx: FunctionContext) -> JsResult<JsValue> {
    let value = AnObject {
        a: 1,
        b: vec![2f64, 3f64, 4f64],
        c: "a string".into()
    };

    let js_value = neon_serde::to_value(&mut cx, &value)?;
    Ok(js_value)
}

register_module!(mut cx, {
    cx.export_function("serialize_something", serialize_something)
});
```

In your `./lib/index.js` you can call your function like so:

```js
const addon = require('../native');
addon.serialize_something();
```

## Deserializing

We need to change the `User` trait to be deserializable as well:

```rust
// --snip--
#[derive(Serialize, Deserialize)]
struct User {
    name: String,
    age: u16,
}
// --snip--
```

Now we can also deserialize a `JsObject` struct and convert it to a `JsValue` like so:

```rust
// --snip--
fn deserialize_something(mut cx: FunctionContext) -> JsResult<JsValue> {
    let arg0 = cx.argument::<JsValue>(0)?;

    let arg0_value: AnObject = neon_serde::from_value(&mut cx, arg0)?;
    println!("{:?}", arg0_value);

    Ok(cx.undefined().upcast())
}

register_module!(mut cx, {
    cx.export_function("serialize_something", serialize_something)?;
    cx.export_function("deserialize_something", deserialize_something)?;
    Ok(())
});
```

In your `./lib/index.js` you can call your function like so:

```js
const addon = require('../native');
addon.deserialize_something();
```

## Macros

`neon-serde` provides some macros for simplifying some of the type signatures of functions. It also handles exporting our functions so we don't have to use the `register_module!` macro manually.

```rs
#[macro_use]
extern crate neon;
#[macro_use]
extern crate neon_serde;
#[macro_use]
extern crate serde_derive;

export! {
    fn say_hello(name: String) -> String {
        format!("Hello, {}!", name)
    }

    fn greet(user: User) -> String {
        format!("{} is {} years old", user.name, user.age)
    }

    fn fibonacci(n: i32) -> i32 {
        match n {
            1 | 2 => 1,
            n => fibonacci(n - 1) + fibonacci(n - 2)
        }
    }
}
```

In our JS we simply import the methods and call the functions. Note that type checks are written for us by the macro:

```js
const addon = require('../native');

// Calling the function with incorrect arguments will fail
// console.log(addon.say_hello());
// fails: TypeError: not enough arguments

console.log(addon.say_hello('john'));
// Hello, john!

// Calling the function with incorrect arguments will fail
// console.log(addon.greet({ name: "afsd" }));
// Error(Msg("missing field `age`"), State { next_error: None, backtrace: None })

console.log(addon.fibonacci(32));
```

## Example

See the [runnable json example](https://github.com/amilajack/neon-examples/tree/master/json)
