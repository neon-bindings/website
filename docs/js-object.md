---
id: js-object
title: Using JsObject
sidebar_label: Using JsObject
---

Here is a simple example of converting a rust `Struct` to a JS `Object` using `JsObject`:

```rust
struct Foo {
    pub bar: u64
    pub baz: String
}

fn convert_vec_to_object(mut cx: FunctionContext) -> JsResult<JsArray> {
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