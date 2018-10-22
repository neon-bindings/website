---
id: js-array
title: Using JsArray
sidebar_label: Using JsArray
---

## Converting from Vec to JsArray

Here is a simple example of converting a rust `Vec` to a JS `Array` using `JsArray`:

```rust
fn convert_vec_to_array(mut cx: FunctionContext) -> JsResult<JsArray> {
    let vec: Vec<String> = Vec::with_capacity(100);

    // Create the JS array
    let js_array = JsArray::new(&mut cx, vec.len() as u32);

    // Iterate over the rust Vec and map each value in the Vec to the JS array
    for (i, obj) in vec.iter().enumerate() {
        let js_string = cx.string(obj);
        let _  = js_array.set(&mut cx, i as u32, js_string);
    }

    Ok(js_array)
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