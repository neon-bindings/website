---
id: js-object
title: Using JsObject
sidebar_label: Using JsObject
---

Here is a simple example of converting a rust `Struct` to a JS `Object` using `JsObject`:

```rust
struct Foo {
    pub bar: u64,
    pub baz: String
}

fn convert_struct_to_js_object(mut cx: FunctionContext) -> JsResult<JsObject> {
    let foo = Foo {
        bar: 1234,
        baz: "baz".to_string()
    };
    let object = JsObject::new(&mut cx);
    let js_string = cx.string(&foo.baz);
    let js_number = cx.number(foo.bar as f64);
    object.set(&mut cx, "myStringProperty", js_string).unwrap();
    object.set(&mut cx, "myNumberProperty", js_number).unwrap();
    Ok(object)
}

register_module!(mut cx, {
    cx.export_function("convert_struct_to_js_object", convert_struct_to_js_object)
});
```