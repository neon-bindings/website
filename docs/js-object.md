---
id: js-object
title: Objects
sidebar_label: Objects
---

`JsObject`'s are used to create objects on the JS heap. `JsObject` structs have two methods: `get` and `set`:

### `.get()`

`get` is used to get a property of a JS object at runtime:

```rust
// --snip--
let js_object = JsObject::new(&mut cx);
js_object
    .get(&mut cx, "myProperty")?
    .downcast::<JsFunction>()
    .or_throw(&mut cx)?;
// --snip--
```

`.downcast` will attempt to cast the proerty to a `JsFunction`. `.or_throw()` will error if downcasting the propety is not possible.

### `.set()`

`.set()` requres a `FunctionContext`, the name of the property you want to set, and the value you want to set the property to:

```rust
let js_object = JsObject::new(&mut cx);
let js_string = cx.string("foobar");

js_object.set(&mut cx, "myProperty", js_string)?;
```

`.` will attempt to cast the proerty to a `JsFunction`. `.or_throw()` will error if downcasting the propety is not possible.

## Mapping a `struct` to a `JsObject`

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
