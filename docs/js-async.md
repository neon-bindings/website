---
id: js-async
title: JS Async
sidebar_label: JS Async
---

```rust
fn async_method(call: Call) -> JsResult<JsUndefined> {
	let fn_handle = call.arguments.get(call.scope, 1).unwrap();
	let arg_handle = call.arguments.get(call.scope, 0).unwrap();

	if let Some(function) = fn_handle.downcast::<JsFunction>() {

		let args: Vec<Handle<JsValue>> = vec![arg_handle];
		let _ = function.call(call.scope, JsNull::new(), args);
	}

	Ok(JsUndefined::new())
}

register_module!(m, {
	try!(m.export("async_method", async_method));
	Ok(())
});
```