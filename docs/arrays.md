---
id: arrays
title: Arrays
sidebar_label: Arrays
---

JavaScript **[arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** are [objects](objects) that support storing properties indexed by integers. Neon exposes access to this class through the [`JsArray`](https://docs.rs/neon/latest/neon/types/struct.JsArray.html) type.

## Creating Arrays

The easiest way to create a new array is through the [`Context::empty_array()`](https://docs.rs/neon/latest/neon/context/trait.Context.html#method.empty_array) method:

```rust
let a: Handle<JsArray> = cx.empty_array();
```

This is the equivalent of writing:
```javascript
const a = [];
```
or
```javascript
const a = new Array();
```
in JavaScript.

## Indexed Properties

You can get and set _indexed properties_ of an array, i.e., properties with integer property keys, with the [`Object::get()`](https://docs.rs/neon/latest/neon/object/trait.Object.html#method.get) and [`Object::set()`](https://docs.rs/neon/latest/neon/object/trait.Object.html#method.set) methods:

```rust
let a = cx.empty_array();

let s = cx.string("hello!");

a.set(&mut cx, 0, s)?;

let v: Handle<JsValue> = a.get(&mut cx, 1)?;
```

This is equivalent to the JavaScript code:

```javascript
const a = [];

const s = "hello!";

a[0] = s;

const v = a[1];
```

## Extending an Array

The length of a JavaScript array is one more than its largest property index, which can be determined by calling the [`JsArray::len()`](https://docs.rs/neon/latest/neon/types/struct.JsArray.html#method.len) method. You can extend the length of array by adding a property at that index:

```rust
let len = array.len(&mut cx)?;
array.set(&mut cx, len, value)?;
```

This is equivalent to the JavaScript code:

```javascript
const len = array.length;
array[len] = value;
```

## Converting a Rust Vector to an Array

An iterable Rust data structure such as `Vec` can be converted to a JavaScript array by looping over the elements. The [`JsArray::new()`](https://docs.rs/neon/latest/neon/types/struct.JsArray.html#method.new) method can be used to preallocate enough capacity for the number of elements.

```rust
fn vec_to_array<'cx, C: Context<'cx>>(vec: &Vec<String>, cx: &mut C) -> JsResult<'cx, JsArray> {
    let a = JsArray::new(cx, vec.len());

    for (i, s) in vec.iter().enumerate() {
        let v = cx.string(s);
        a.set(cx, i as u32, v)?;
    }

    Ok(a)
}
```

## Converting a JavaScript Array to a Vector

The [`JsArray::to_vec()`](https://docs.rs/neon/latest/neon/types/struct.JsArray.html#method.to_vec) method makes it easy to convert a JavaScript array to a Rust vector:

```rust
let vec: Vec<Handle<JsValue>> = arr.to_vec(&mut cx);
```
