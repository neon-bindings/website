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
    pub year: u32,
}
```

To copy a `Book` into a JavaScript object, we'll define a conversion function. To make it idiomatically Rusty, let's define it as a [_method_](https://doc.rust-lang.org/book/ch05-03-method-syntax.html) of the `Book` type, so that callers of our API can use a pleasant method call syntax:

```rust
let obj = book.to_object(&mut cx)?;
```

First let's look at the signature of `Book::to_object()`, which we define as a method using Rust's `impl Book` syntax and a `&self` parameter:

```rust
impl Book {
    fn to_object<'cx>(&self, cx: &mut FunctionContext<'cx>) -> JsResult<'cx, JsObject> {
        // ...
    }
}
```

This is our first example using a _[lifetime annotation](https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html)_ `'cx`. This allows the Rust compiler to ensure that our code never accidentally makes an unsafe reference to JavaScript values managed by the Node runtime. Specifically, this signature tells Neon that the result object returned by this function (which has lifetime `'cx`) is managed by the runtime context that was passed in as an argument (which also has that same lifetime `'cx`).

If you've never seen lifetimes before or are not yet confident using them, don't worry! For now, you can use this code as a template, and know that the Rust compiler will keep you safe.

Now here is the full implementation:

```rust
    fn to_object<'cx>(&self, cx: &mut FunctionContext<'cx>) -> JsResult<'cx, JsObject> {
        let obj = cx.empty_object();

        let title = cx.string(&self.title);
        obj.set(cx, "title", title)?;

        let author = cx.string(&self.author);
        obj.set(cx, "author", author)?;

        let year = cx.number(self.year);
        obj.set(cx, "year", year)?;

        Ok(obj)
    }
}
```

Let's walk through the implementation. First, it constructs a new empty JavaScript object, which will serve as the result, converts each of the fields to a [primitive type](primitive-types) and sets the relevant property on the object to its value. Finally, the method returns the new object, wrapped in an `Ok` value to signal success.

One thing worth noticing about this function is that it doesn't use anything specific about the `FunctionContext` type other than the generic methods of the [`Context`](https://docs.rs/neon/latest/neon/context/trait.Context.html) trait. To make our function even more powerful, we can make it _generic_ and accept any implementation of `Context`:

```rust
impl Book {
    fn to_object<'cx>(&self, cx: &mut impl Context<'cx>) -> JsResult<'cx, JsObject> {
        // same as before...
    }
}
```

This allows us to use our method in more places, such as with a [`ModuleContext`](https://docs.rs/neon/latest/neon/context/struct.ModuleContext.html):

```rust
#[neon::main]
pub fn main(mut cx: ModuleContext) -> NeonResult<()> {
    let book = Book {
        title: "Chadwick the Crab".to_string(),
        author: "Priscilla Cummings".to_string(),
        year: 2009,
    };

    let obj = book.to_object(&mut cx)?;
    cx.export_value("chadwick", obj)?;
    Ok(())
}
```
