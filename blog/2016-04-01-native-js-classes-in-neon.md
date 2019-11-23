---
title: Native JS Classes in Neon
author: Dave Herman
categories:
  - Rust
  - Node
  - Neon
  - Classes
---

⚠️ This article contains references to an outdated version of neon ⚠️

Last weekend I [landed a PR](https://github.com/rustbridge/neon/pull/58) that adds support for defining custom native classes in [Neon]({{ site.baseurl }}{% post_url 2015-12-23-neon-node-rust %}). This means you can create JavaScript objects that internally wrap---and [own](https://doc.rust-lang.org/book/ownership.html)---a Rust data structure, along with methods that can safely access the internal Rust data.

As a quick demonstration, suppose you have an `Employee` struct defined in Rust:

```rust
pub struct Employee {
    id: i32,
    name: String,
    // etc ...
}
```

<!--more-->

You can expose this to JS with the new `declare_types!` macro:

```rust
declare_types! {

    /// JS class wrapping Employee records.
    pub class JsEmployee for Employee {

        init(call) {
            let scope = call.scope;
            let id = try!(try!(call.arguments.require(scope, 0)).check::<JsInteger>());
            let name = try!(try!(call.arguments.require(scope, 1)).to_string());
            // etc ...
            Ok(Employee {
                id: id.value() as i32,
                name: name.value(),
                // etc ...
            })
        }

        method name(call) {
            let scope = call.scope;
            let this: Handle<JsEmployee> = call.arguments.this(scope);
            let name = try!(vm::lock(this, |employee| {
                employee.name.clone()
            });
            Ok(try!(JsString::new_or_throw(scope, &name[..])).upcast())
        }
    }

};
```

This defines a custom JS class whose instances contain an `Employee` record. It binds `JsEmployee` to a Rust type that can create the class at runtime (i.e., the constructor function and prototype object). The `init` function defines the behavior for allocating the internals during construction of a new instance. The `name` method shows an example of how you can use `vm::lock` to borrow a reference to the internal Rust data of an instance.

From there, you can extract the constructor function and expose it to JS, for example by exporting it from a native module:

```rust
register_module!(m, {
    let scope = m.scope;
    let class = try!(JsEmployee::class(scope));       // get the class
    let constructor = try!(class.constructor(scope)); // get the constructor
    try!(m.exports.set("Employee", constructor));     // export the constructor
});
```

Then you can use instances of this type in JS just like any other object:

```javascript
const { Employee } = require('./native');

const lumbergh = new Employee(9001, "Bill Lumbergh");
console.log(lumbergh.name()); // Bill Lumbergh
```

Since the methods on `Employee` expect `this` to have the right binary layout, they check to make sure that they aren't being called on an inappropriate object type. This means you can't segfault Node by doing something like:

```javascript
Employee.prototype.name.call({});
```

This safely throws a TypeError exception just like methods from other native classes like `Date` or `Buffer` do.

Anyway, that's a little taste of user-defined native classes. More docs work to do!
