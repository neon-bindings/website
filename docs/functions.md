---
id: functions
title: Functions
sidebar_label: Functions
---

Neon's main way of connecting Rust and JavaScript is by allowing you to define **[functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)** that are implemented in Rust.

## Defining Functions

A Neon function looks and acts to JavaScript like a regular JavaScript function, but its behavior is written in Rust. Creating a Neon function requires first defining a Rust function of type `fn(FunctionContext) -> JsResult<T>` where `T` can be any type that implements the [`Value`](https://docs.rs/neon/latest/neon/types/trait.Value.html) trait:

```rust
fn hello(mut cx: FunctionContext) -> JsResult<JsString> {
    Ok(cx.string("hello"))
}
```

The `cx` argument is a [`FunctionContext`](https://docs.rs/neon/latest/neon/context/type.FunctionContext.html), which provides the Neon function with access to the JavaScript runtime. The [`JsResult`](https://docs.rs/neon/latest/neon/result/type.JsResult.html) result type indicates that a Neon function may throw a JavaScript error. In this example, we just construct a string and return it, so we immediately wrap the outcome in an `Ok` result. A more involved Neon function might call other functions or interact with objects in ways that could end up triggering errors.

The most common way to define a Neon function from `hello` is to export it from our module using [`ModuleContext::export_function()`](https://docs.rs/neon/latest/neon/context/struct.ModuleContext.html#method.export_function):

```rust
#[neon::main]
pub fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("hello", hello)?;
    Ok(())
}
```

Notice that the `main` function also returns a result, because it can trigger JavaScript errors. In this code, calling the `export_function()` method could potentially throw an error since it's interacting with the module object. We use Rust's [`?` operator](https://doc.rust-lang.org/reference/expressions/operator-expr.html#the-question-mark-operator) to return early and propagate any errors that get thrown.

A JavaScript module can then call the `hello` function by importing from the Neon module:

```javascript
const { hello } = require('./index');

console.log(hello()); // prints "hello"!
```

## Accessing Arguments

A Neon function can access its arguments by calling [`FunctionContext::argument()`](https://docs.rs/neon/latest/neon/context/struct.CallContext.html#method.argument):

```rust
fn create_pair(mut cx: FunctionContext) -> JsResult<JsObject> {
    let x: Handle<JsValue> = cx.argument(0)?;
    let y: Handle<JsValue> = cx.argument(1)?;

    let obj = cx.empty_object();

    obj.set(&mut cx, "x", x)?;
    obj.set(&mut cx, "y", y)?;

    Ok(obj)
}
```

## Checking Argument Types

You can conveniently check the type of a Neon function argument and cast it to the corresponding Rust type by choosing a more specific type than `JsValue`. This example constructs an object representing metadata about a book, first checking the first two arguments to be strings and the third argument to be a number:

```rust
fn create_book(mut cx: FunctionContext) -> JsResult<JsObject> {
    let title = cx.argument::<JsString>(0)?;
    let author = cx.argument::<JsString>(1)?;
    let year = cx.argument::<JsNumber>(2)?;

    let obj = cx.empty_object();

    obj.set(&mut cx, "title", title)?;
    obj.set(&mut cx, "author", author)?;
    obj.set(&mut cx, "year", year)?;

    Ok(obj)
}

#[neon::main]
pub fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("createBook", create_book)?;
    Ok(())
}
```

If any of the checks fails, the `createBook` function throws a [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError):

```javascript
const { createBook } = require('./index');

try {
  createBook(null, null, null);
} catch (e) {
  console.log(e); // TypeError
}
```

## Optional Arguments

The [`FunctionContext::argument_opt()`](https://docs.rs/neon/latest/neon/context/struct.CallContext.html#method.argument_opt) method makes it possible to extract an optional argument. This example creates an entry in a resume's job history, where the end year may not be present (indicating the person's current job):

```rust
fn create_job(mut cx: FunctionContext) -> JsResult<JsObject> {
    let company = cx.argument::<JsString>(0)?;
    let title = cx.argument::<JsString>(1)?;
    let start_year = cx.argument::<JsNumber>(2)?;
    let end_year = cx.argument_opt(3);

    let obj = cx.empty_object();

    obj.set(&mut cx, "company", company)?;
    obj.set(&mut cx, "title", title)?;
    obj.set(&mut cx, "startYear", start_year)?;

    if let Some(end_year) = end_year {
        obj.set(&mut cx, "endYear", end_year)?;
    } else {
        let null = cx.null();
        obj.set(&mut cx, "endYear", null)?;
    }

    Ok(obj)
}
```

## Calling Functions

You can call a JavaScript function from Rust with [`JsFunction::call()`](https://docs.rs/neon/latest/neon/types/struct.JsFunction.html#method.call). This example extracts the [`parseInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt) function and calls it on a string:

```rust
let func = cx.global().get::<JsFunction, _, _>(&mut cx, "parseInt")?;
let s = cx.string("2022");
let result = func.call_with(&cx).arg(s).apply(&mut cx)?;
//                       `this`, ^^^, `args` are also available.
```

There is a lower level variant of writing `func` variable using `downcast_or_throw` function. 
```rust
let func = cx
    .global()
    .get_value(&mut cx, "parseInt")?
    .downcast_or_throw::<JsFunction, _>(&mut cx)?;
```


## Calling Constructor Functions

You can call a JavaScript function as a constructor, as if with the [`new`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new) operator, with [`JsFunction::construct()`](https://docs.rs/neon/latest/neon/types/struct.JsFunction.html#method.construct). This example extracts the [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL) constructor and invokes it with a URL string:

```rust
let ctor = cx.global().get::<JsFunction, _, _>(&mut cx, "URL")?;
let url: Handle<JsString> = cx.string("https://neon-bindings.com");
let result = ctor.construct_with(&cx).arg(url).apply(&mut cx)?;
```
