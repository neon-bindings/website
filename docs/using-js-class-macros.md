---
id: using-js-class-macros
title: Classes
sidebar_label: Classes
---

**This doc is currently a work in progress**

For now, reference this snippet, taken <a href="https://github.com/neon-bindings/neon/blob/master/test/dynamic/native/src/js/classes.rs" target="_blank">from the tests:</a>

## Simple Example

Let's create a simple struct that our class will use:
```rust
pub struct Employee {
    id: i32,
    name: String,
    // etc ...
}
```

Now let's defines a custom JS class whose instances contain an Employee record:
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

This code binds `JsEmployee` to a Rust type that can create the class at runtime (i.e., the constructor function and prototype object). The init function defines the behavior for allocating the internals during construction of a new instance. The name method shows an example of how you can use `vm::lock` to borrow a reference to the internal Rust data of an instance.

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
```js
const { Employee } = require('./native');

const lumbergh = new Employee(9001, "Bill Lumbergh");
console.log(lumbergh.name()); // Bill Lumbergh
```

Since the methods on `Employee` expect this to have the right binary layout, they check to make sure that they aren’t being called on an inappropriate object type. This means you can’t segfault Node by doing something like:

```js
Employee.prototype.name.call({});
```

This safely throws a `TypeError` exception just like methods from other native classes like `Date` or `Buffer` do.

## Advanced Example

```rust
use neon::prelude::*;

pub struct User {
  id: i32,
  first_name: String,
  last_name: String,
  email: String,
}

type Unit = ();

declare_types! {
  pub class JsPanickyAllocator for Unit {
    init(_) {
      panic!("allocator panicking")
    }
  }

  pub class JsPanickyConstructor for Unit {
    init(_) {
      Ok(())
    }

    call(_) {
      panic!("constructor call panicking")
    }

    constructor(_) {
      panic!("constructor panicking")
    }
  }

  pub class JsUser for User {
    init(mut cx) {
      let id = cx.argument::<JsNumber>(0)?;
      let first_name: Handle<JsString> = cx.argument::<JsString>(1)?;
      let last_name: Handle<JsString> = cx.argument::<JsString>(2)?;
      let email: Handle<JsString> = cx.argument::<JsString>(3)?;

      Ok(User {
        id: id.value() as i32,
        first_name: first_name.value(),
        last_name: last_name.value(),
        email: email.value(),
      })
    }

    method get(mut cx) {
      let attr: String = cx.argument::<JsString>(0)?.value();

      let this = cx.this();

      match &attr[..] {
        "id" => {
          let id = {
            let guard = cx.lock();
            let user = this.borrow(&guard);
            user.id
          };
          Ok(cx.number(id).upcast())
        },
        "first_name" => {
          let first_name = {
            let guard = cx.lock();
            let user = this.borrow(&guard);
            user.first_name.clone()
          };
          Ok(cx.string(&first_name).upcast())
        },
        "last_name" => {
          let last_name = {
            let guard = cx.lock();
            let user = this.borrow(&guard);
            user.last_name.clone()
          };
          Ok(cx.string(&last_name).upcast())
        },
        "email" => {
          let email = {
            let guard = cx.lock();
            let user = this.borrow(&guard);
            user.email.clone()
          };
          Ok(cx.string(&email).upcast())
        },
        _ => cx.throw_type_error("property does not exist")
      }
    }

    method panic(_) {
      panic!("User.prototype.panic")
    }
  }
}
```