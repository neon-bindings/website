---
id: using-js-class-macros
title: Classes
sidebar_label: Classes
---

For now, reference this snippet, taken <a href="https://github.com/neon-bindings/neon/blob/master/test/dynamic/native/src/js/classes.rs" target="_blank">from the tests:</a>

## Basics

Let's create a simple struct that our class will use:

```rust
pub struct Employee {
    // Rust struct properties map to JS class properties
    id: i32,
    name: String
}
```

Now let's defines a custom JS class whose instances contain an Employee record. `init` is the constructor for the `JsEmployee` object. The methods that we define are prefixed with `method`. So if we want our JS object to have a method called `alertUser`, our method signature would be `method alertUser(mut cx) {`. All methods need to return types of the `JsValue` so we will need to `upcast` them. Because of this requirement, a method like the following would fail:

❌ This will not work

```rust
method talk(mut cx) {
    Ok(cx.string("How are you doing?"))
}
```

✅ But this will work:

```rust
method talk(mut cx) {
    Ok(cx.string("How are you doing?").upcast())
}
```

### Defining the `constructor`

Now let's define our class. `init` will construct the class:

```rust
// --snip--
declare_types! {
    /// JS class wrapping Employee records.
    pub class JsEmployee for Employee {
        init(mut cx) {
            let id = cx.argument::<JsNumber>(0)?.value();
            let name: String = cx.argument::<JsString>(1)?.value();

            Ok(Employee {
                id: id as i32,
                name: name,
            })
        }
    }
}

// Export the class
register_module!(mut m, {
    // <JsEmployee> tells neon what class we are exporting
    // "Employee" is the name of the export that the class is exported as
    m.export_class::<JsEmployee>("Employee")?;
    Ok(())
});
```

### Adding Methods

Now let's add some methods to our class:

```rust
// --snip--
init(mut cx) {
    let id = cx.argument::<JsNumber>(0)?.value();
    let name: String = cx.argument::<JsString>(1)?.value();

    Ok(Employee {
        id: id as i32,
        name: name,
    })
}

method name(mut cx) {
    let this = cx.this();
    let name = {
        let guard = cx.lock();
        this.borrow(&guard).name
    };
    println!("{}", &name);
    Ok(cx.undefined().upcast())
}

method greet(mut cx) {
    let this = cx.this();
    let msg = {
        let guard = cx.lock();
        let greeter = this.borrow(&guard);
        format!("Hi {}!", greeter.name)
    };
    println!("{}", &msg);
    Ok(cx.string(&msg).upcast())
}

method askQuestion(mut cx) {
    println!("{}", "How are you?");
    Ok(cx.undefined().upcast())
}
// --snip--
```

Then you can use instances of this type in JS just like any other object:

```js
const { Employee } = require('../native');

console.log(new addon.Employee()); // fails: TypeError: not enough arguments

const john = new addon.Employee('John');
john.name(); // John
john.greet(); // Hi John!
john.askQuestion(); // How are you?
```

Since the methods on `Employee` expect this to have the right binary layout, they check to make sure that they aren’t being called on an inappropriate object type. This means you can’t segfault Node by doing something like:

```js
Employee.prototype.name.call({});
```

This safely throws a `TypeError` exception just like methods from other native classes like `Date` or `Buffer` do.

### Getting and Setting Class Properties

```rust
// --snip--
let this = cx.this();
// Downcast the object so we can call .get and .set
let this = this.downcast::<JsObject>().or_throw(&mut cx)?;
let is_raining = this
  .get(&mut cx, "raining")?
  .downcast::<JsBoolean>().or_throw(&mut cx)?
  .value();
if is_raining {
  let t = cx.boolean(false);
  this.set(&mut cx, "shouldGoOutside", t)?;
}
// --snip--
```

### Handling Methods That Take Multiple Types

Sometimes you may want your function to handle arguments that can be of multiple types. Here's an example showing just that:

```rust
// --snip--
method introduce(mut cx) {
    let name_or_age = cx.argument::<JsValue>(0)?;

    if name_or_age.is_a::<JsString>() {
        let name = name_or_age
            .downcast::<JsString>()
            .or_throw(&mut cx)?
            .value();
        println!("Hi, this is {}", name);
    } else if name_or_age.is_a::<JsNumber>() {
        let age = name_or_age
            .downcast::<JsNumber>()
            .or_throw(&mut cx)?
            .value();
        println!("Her birthday is on the {}th", age);
    } else {
        panic!("Name is not a string and age is not a number");
    }

    Ok(cx.undefined().upcast())
}
// --snip--
```

```js
const addon = require('../native');

const john = new addon.Employee(0, 'Lisa');
john.introduce('Mary'); // Hi, this is Mary
john.introduce(12); // Her birthday is on the 12th
```

## Advanced Example

```rust
#[macro_use]
extern crate neon;

use neon::prelude::*;

pub struct User {
    id: i32,
    first_name: String,
    last_name: String,
    email: String,
}

type Unit = ();

declare_types! {
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
register_module!(mut m, {
    m.export_class::<JsUser>("User")
});
```
