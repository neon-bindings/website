---
id: sdl2-guide
title: SDL2 Binding (WIP)
sidebar_label: SDL2 Binding (WIP)
---

**This doc is currently a work in progress**

For now, reference this snippet, taken <a href="https://github.com/neon-bindings/neon/issues/354#issuecomment-417346932" target="_blank">from this comment:</a>

```rust
// lib.rs
#[macro_use]
extern crate neon;
extern crate sdl2;

use neon::context::Context;
use neon::types::{JsNumber, JsUndefined};

use sdl2::pixels::Color;
use sdl2::render::WindowCanvas;

pub struct Canvas(WindowCanvas);

declare_types! {
	pub class JsCanvas for Canvas {
		init(mut cx) {
			let sdl_context = sdl2::init()
				.or_else(|err| cx.throw_error(err.to_string()))?;

			let video_subsystem = sdl_context.video()
				.or_else(|err| cx.throw_error(err.to_string()))?;

			let window = video_subsystem.window("rust-sdl2 demo", 800, 600)
				.position_centered()
				.build()
				.or_else(|err| cx.throw_error(err.to_string()))?;

			let mut canvas = window.into_canvas().build()
				.or_else(|err| cx.throw_error(err.to_string()))?;

			canvas.set_draw_color(Color::RGB(0, 255, 255));
			canvas.clear();
			canvas.present();

			Ok(Canvas(canvas))
		}

		method set_draw_color(mut cx) {
			let r = cx.argument::<JsNumber>(0)?.value() as u8;
			let g = cx.argument::<JsNumber>(1)?.value() as u8;
			let b = cx.argument::<JsNumber>(2)?.value() as u8;

			let color = Color::RGB(r, g, b);
			let mut this = cx.this();

			cx.borrow_mut(&mut this, |mut canvas| canvas.0.set_draw_color(color));

			Ok(JsUndefined::new().upcast())
		}

		method present(mut cx) {
			let mut this = cx.this();

			cx.borrow_mut(&mut this, |mut canvas| canvas.0.present());

			Ok(JsUndefined::new().upcast())
		}

		method clear(mut cx) {
			let mut this = cx.this();

			cx.borrow_mut(&mut this, |mut canvas| canvas.0.clear());

			Ok(JsUndefined::new().upcast())
		}
	}
}

register_module!(mut cx, {
	cx.export_class::<JsCanvas>("Canvas")?;

	Ok(())
});
```

```js
// index.js
const { Canvas } = require('../native');

function sleep(n) {
	return new Promise(resolve => setTimeout(resolve, n));
}

async function run() {
	const canvas = new Canvas();

	for (let i = 0; i < 1000; i++) {
		const m = i % 255;

		canvas.set_draw_color(m, 64, 255 - m);
		canvas.clear();
		canvas.present();

		await sleep(10);
	}
}

run();
```