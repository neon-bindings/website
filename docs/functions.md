---
id: functions
title: Functions
sidebar_label: Functions
---

## This
```rust
pub fn require_object_this(mut cx: FunctionContext) -> JsResult<JsUndefined> {
    let this = cx.this();
    let this = this.downcast::<JsObject>().or_throw(&mut cx)?;
    let t = cx.boolean(true);
    this.set(&mut cx, "modified", t)?;
    Ok(cx.undefined())
}
```