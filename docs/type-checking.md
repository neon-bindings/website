---
id: type-checking
title: Type Checking
sidebar_label: Type Checking
---

## Upcasting

Safely upcast a handle to a supertype.

This method does not require an execution context because it only copies a handle.

## Downcasting

Attempts to downcast a handle to another type, which may fail. A failure to downcast does not throw a JavaScript exception, so it's OK to continue interacting with the JS engine if this method produces an `Err` result.

```rust
cx.number(17).downcast();
cx.number(17).downcast_or_throw();
```

## Checking Types

Test whether this value is an instance of the given type.

```rust
let v: Handle<JsValue> = cx.number(17).upcast();
v.is_a::<JsString>(); // false
v.is_a::<JsNumber>(); // true
v.is_a::<JsValue>();  // true
```