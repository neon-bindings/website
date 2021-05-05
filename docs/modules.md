---
id: modules
title: Modules
sidebar_label: Modules
---

[Examples](https://github.com/neon-bindings/examples/tree/legacy/modules)

In Node, it is common to export values, functions and classes. These data structures can also be exported from Neon modules as well with a few extra steps.

## Exporting Values, Functions, and Classes

Consider the following JS:

```js
// ./my-exports.js
export const foo = 'foo';

export function bar() {}

export class Baz {}
```

The Neon equivalent would be the following:

```rust
// --snip--
fn bar(mut cx: FunctionContext) -> JsResult<JsUndefined> {
    Ok(cx.undefined())
}

pub struct Baz;

declare_types! {
    pub class JsBaz for Baz {
        // --snip--
    }
}

register_module!(mut m, {
    let foo = m.string("foo");
    // Export `foo'
    m.export_value("foo", foo)?;
    // Export the `bar` function
    m.export_function("bar", bar)?;
    // Export the `Baz` class
    m.export_class::<JsBaz>("Baz")?;
    Ok(())
});
```

## Default Exports

:::caution
This section is a work in progress.
:::
