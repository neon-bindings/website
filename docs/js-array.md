---
id: js-array
title: Using JsArray
sidebar_label: Using JsArray
---

Here is a simple example of converting a rust `Vec` to a JS `Array` using `JsArray`:

```rust
fn convert_vec_to_array(mut cx: FunctionContext) -> JsResult<JsArray> {
    let vec = Vec::with_capacity(100);

    // Create the JS array
    let js_array = JsArray::new(&mut cx, res.len() as u32);

    // Iterate over the rust Vec and map each value in the Vec to the JS array
    for (i, obj) in mapped.iter().enumerate() {
        let _ = array.set(&mut cx, i as u32, *obj);
    }

    Ok(array)
}

register_module!(mut cx, {
    cx.export_function("convert_vec_to_array", convert_vec_to_array)
});
```