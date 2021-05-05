---
id: arrays
title: Arrays
sidebar_label: Arrays
---

[Examples](https://github.com/neon-bindings/examples/tree/legacy/arrays)

## Converting from `Vec` to `JsArray`

Here is a simple example of converting a Rust `Vec` to a JS `Array` using `JsArray`:

```rust
fn convert_vec_to_array(mut cx: FunctionContext) -> JsResult<JsArray> {
    let vec: Vec<String> = Vec::with_capacity(100);

    // Create the JS array
    let js_array = JsArray::new(&mut cx, vec.len() as u32);

    // Iterate over the Rust Vec and map each value in the Vec to the JS array
    for (i, obj) in vec.iter().enumerate() {
        let js_string = cx.string(obj);
        js_array.set(&mut cx, i as u32, js_string).unwrap();
    }

    Ok(js_array)
}
```

## Converting from `JsArray` to `Vec`

Converting to `JsArray` to `Vec` is pretty straightforward:

```rust
fn convert_js_array_to_vec(mut cx: FunctionContext) -> JsResult<JsNumber> {
    // Take the first argument, which must be an array
    let js_arr_handle: Handle<JsArray> = cx.argument(0)?;
    // Convert a JsArray to a Rust Vec
    let vec: Vec<Handle<JsValue>> = js_arr_handle.to_vec(&mut cx)?;
    // Return the length of the Vec to JS
    Ok(cx.number(vec.len() as f64))
}
```

## Returning an empty element

```rust
pub fn return_js_array(mut cx: FunctionContext) -> JsResult<JsArray> {
    Ok(cx.empty_array())
}
```

## Adding elements to an array

This is an example of adding a number to a `JsArray`

```rust
pub fn return_js_array_with_number(mut cx: FunctionContext) -> JsResult<JsArray> {
    let array: Handle<JsArray> = JsArray::new(&mut cx, 1);
    let n = cx.number(9000.0);
    array.set(&mut cx, 0, n)?;
    Ok(array)
}
```

And this is an example of adding a string to a `JsArray`

```rust
pub fn return_js_array_with_string(mut cx: FunctionContext) -> JsResult<JsArray> {
    let array: Handle<JsArray> = JsArray::new(&mut cx, 1);
    let s = cx.string("hello node");
    array.set(&mut cx, 0, s)?;
    Ok(array)
}
```

## `ArrayBuffer`

Neon also provides support for the ES6 [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) as through the [`JsArrayBuffer`](https://docs.rs/neon/*/neon/prelude/struct.JsArrayBuffer.html) struct. It has the same constructor and methods as `JsArray`

## Node `Buffer`

The Node Buffer type is also supported by Neon through the [`JsBuffer`](https://docs.rs/neon/*/neon/prelude/struct.JsBuffer.html) struct. It as the same constructor and methods as `JsArray`

#### Runnable Example

For a working example of using Node's `Buffer` class with Neon, see the [`sharing-binary-data` example](https://github.com/neon-bindings/examples/tree/legacy/sharing-binary-data). You can get started with it by running the following commands:

```bash
git clone https://github.com/neon-bindings/examples
git checkout legacy
cd sharing-binary-data
npm install
```
