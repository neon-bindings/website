---
id: functions
title: Functions
sidebar_label: Functions
---

## Defining Functions

```rust
fn hello(mut cx: FunctionContext) -> JsResult<JsString> {
    Ok(cx.string("hello"))
}

#[neon::main]
pub fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("hello", hello)?;
    Ok(())
}
```

## Accessing Arguments

```rust
fn create_pair(mut cx: FunctionContext) -> JsResult<JsObject> {
    let x: Handle<JsValue> = cx.argument(0)?;
    let y: Handle<JsValue> = cx.argument(1)?;

    let obj = cx.empty_object();

    obj.set(&mut cx, "x", x)?;
    obj.set(&mut cx, "y", y)?;

    Ok(obj)
}

#[neon::main]
pub fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("createPair", create_pair)?;
    Ok(())
}
```

## Checking Argument Types

```rust
fn create_book(mut cx: FunctionContext) -> JsResult<JsObject> {
    let title = cx.argument::<JsString>(0)?;
    let author = cx.argument::<JsString>(1)?;
    let year = cx.argument::<JsNumber>(2)?;

    let obj = cx.empty_object();

    obj.set(&mut cx, "title", title)?;
    obj.set(&mut cx, "author", author)?;
    obj.set(&mut cx, "year", year)?;

    Ok(obj)
}

#[neon::main]
pub fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("createBook", create_book)?;
    Ok(())
}
```

## Optional Arguments

```rust
fn create_entry(mut cx: FunctionContext) -> JsResult<JsObject> {
    let company = cx.argument::<JsString>(0)?;
    let job = cx.argument::<JsString>(1)?;
    let start_year = cx.argument::<JsNumber>(2)?;
    let end_year = cx.argument_opt(3);

    let obj = cx.empty_object();

    obj.set(&mut cx, "company", company)?;
    obj.set(&mut cx, "job", job)?;
    obj.set(&mut cx, "startYear", start_year)?;

    if let Some(end_year) = end_year {
        obj.set(&mut cx, "endYear", end_year)?;
    }

    Ok(obj)
}

#[neon::main]
pub fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("createEntry", create_entry)?;
    Ok(())
}
```

## Calling Functions

```rust
let global = cx.global();
let func: Handle<JsFunction> = global.get(&mut cx, "parseInt")?;
let null = cx.null();
let s = cx.string(s);
let result = func.call(&mut cx, null, vec![s])?;
```

## Calling Constructor Functions

```rust
let global = cx.global();
let ctor: Handle<JsFunction> = global.get(&mut cx, "URL")?;
let url: Handle<JsString> = cx.string("https://neon-bindings.com");
let result = ctor.construct(&mut cx, vec![url]);
```
