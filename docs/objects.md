---
id: objects
title: Objects
sidebar_label: Objects
---

Most types of data in JavaScript are considered **[objects](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics)**. (In fact, everything that isn't a [primitive type](primitive-types) is an object type.) In Neon, all object types implement the [`Object`](https://docs.rs/neon/latest/neon/object/trait.Object.html) trait, which allows you interact with an object's properties.

The JavaScript [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) class, sometimes referred to as "vanilla objects" or "simple objects," is one of the most common ways to construct objects in JavaScript, and is available to Neon through the [`JsObject`](https://docs.rs/neon/latest/neon/types/struct.JsObject.html) type.

## Creating Objects

The [`Context::empty_object()`](https://docs.rs/neon/latest/neon/context/trait.Context.html#method.empty_object) method creates a new `JsObject`:

```rust
let obj: Handle<JsObject> = cx.empty_object();
```

## Getting Properties

The [`Object::get()`](https://docs.rs/neon/latest/neon/object/trait.Object.html#method.get) method accesses a property of an object at runtime:

```rust
// Create an empty object:
let obj: Handle<JsObject> = cx.empty_object();

// Get the `toString` property of the object:
let prop: Handle<JsValue> = obj.get(&mut cx, "toString")?;
```

Notice that this example extracts the `toString` property from an empty object, which will typically be _inherited_ from the object's [prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain).

## Setting Properties

The [`Object::set()`](https://docs.rs/neon/latest/neon/object/trait.Object.html#method.set) method sets a property of an object at runtime:

```rust
let obj = cx.empty_object();
let age = cx.number(35);

obj.set(&mut cx, "age", age)?;
```

## Converting Rust data to JavaScript

Here is a simple example of converting a Rust `struct` to a JavaScript object. First, let's define a Rust type describing, say, about a book in a library catalog:

```rust
struct Book {
    pub title: String,
    pub author: String,
    pub year: u64,
}
```

To copy a `Book` into a JavaScript object, we'll define a conversion function. Just for fun and to make it a little more idiomatically Rusty, we'll define it as a method of the `Book` type:

```rust
impl Book {
    fn to_object(&self, mut cx: FunctionContext) -> JsResult<JsObject> {
        let obj = cx.empty_object();

        let title = cx.string(self.title);
        obj.set(&mut cx, "title", title)?;

        let author = cx.string(self.author);
        obj.set(&mut cx, "author", author)?;

        let year = cx.number(self.year);
        obj.set(&mut cx, "year", year)?;

        Ok(obj)
    }
}
```

Let's walk through the implementation a step at a time. The `to_object` method takes a reference to `self` and a runtime context. Next, it constructs a new empty JavaScript object, which will serve as the result, converts each of the fields to a [primitive type](primitive-types) and sets the relevant property on the object to its value. Finally, the method returns the new object, wrapped in an `Ok` value to signal success.

One thing worth noticing about this function is that it doesn't use anything specific about the `FunctionContext` type other than the generic methods of the [`Context`](https://docs.rs/neon/latest/neon/context/trait.Context.html) trait. To make our function even more powerful, we can make it _generic_ and accept any implementation of `Context`:

```rust
impl Book {
    fn to_object(&self, mut cx: impl Context) -> JsResult<JsObject> {
        // same as before...
    }
}
```
