---
id: type-checking
title: Type Checking
sidebar_label: Type Checking
---

If we can declare functions with Rust that can be called from JS then we need to know the type of the argument that was passed to the argument in order to work with in Rust. This is where casting comes into play. **Upcasting** makes a type less specific while **Downcasting** makes a type more specific. A `JsValue`, which represents an arbitrary JS value that we do not know the type of. We can cast this value to something more specific like a `JsNumber` so that we can use it in Rust as if it were a number. Downcasting use useful when we want to pass values back to the JS engine. See the [classes section](classes.md) for more on this.

## Upcasting

Every method of a JS class implicity returns a `JsValue`. No type more or less specific than a `JsValue` can be returned.

For example, the following class method would fail to compile:

```rust
declare_types! {
    /// JS class wrapping Employee records.
    pub class JsEmployee for Employee {
        method talk(mut cx) {
            Ok(cx.string("Hello").upcast())
        }
    }
}
```

Safely upcast a handle to a supertype.
This method does not require an execution context because it only copies a handle.

## Downcasting

Attempts to downcast a handle to another type, which may fail. A failure to downcast does not throw a JavaScript exception, so it's OK to continue interacting with the JS engine if this method produces an `Err` result.

```rust
// --snip
cx.number(17).downcast();
cx.number(17).downcast_or_throw();
// --snip--
```

## Checking Types

Test whether this value is an instance of the given type.

```rust
// --snip--
let v: Handle<JsValue> = cx.number(17).upcast();
v.is_a::<JsString>(); // false
v.is_a::<JsNumber>(); // true
v.is_a::<JsValue>();  // true
// --snip--
```
