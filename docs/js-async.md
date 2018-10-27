---
id: js-async
title: Async
sidebar_label: Async
---

```rust
fn async_method(cx: Call) -> JsResult<JsUndefined> {
	let arg_handle = cx.argument::<JsValue>(cx, 0)?;
	let fn_handle = cx.argument::<JsFunction>(1)?;

	let args: Vec<Handle<JsValue>> = vec![arg_handle];
	let _ = function.call(&mut cx, cx.null(), args);

	Ok(cx.undefined())
}

register_module!(m, {
	try!(m.export("async_method", async_method));
	Ok(())
});
```