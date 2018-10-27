---
id: using-async-tasks
title: Async Tasks
sidebar_label: Async Tasks
---

Tasks let you execute asynchronous background tasks that run in the Node thread pool. Behind the scenes, Neon is using N-API's microtasks API. Microtasks are the backing implementation of Promises and Callbacks in a JS Engine. For more on microtasks, see ["Tasks, microtasks, queues and schedules"](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)

Let's look at a very minimal implementation of an async task:

```rust
use neon::prelude::*;

struct BackgroundTask;

impl Task for BackgroundTask {
    type Output = i32;
    type Error = String;
    type JsEvent = JsNumber;

    fn perform(&self) -> Result<Self::Output, Self::Error> {
        Ok(17)
    }

    fn complete(self, mut cx: TaskContext, result: Result<Self::Output, Self::Error>) -> JsResult<Self::JsEvent> {
        Ok(cx.number(result.unwrap()))
    }
}

pub fn perform_async_task(mut cx: FunctionContext) -> JsResult<JsUndefined> {
    let f = cx.argument::<JsFunction>(0)?;
    BackgroundTask.schedule(f);
    Ok(cx.undefined())
}

register_module!(mut cx, {
    cx.export_function("performAsyncTask", perform_async_task)
});
```

### Output
The task's result type, which is sent back to the main thread to communicate a successful result back to JavaScript.

### Error

The task's error type, which is sent back to the main thread to communicate a task failure back to JavaScript.

### JsEvent

The type of JavaScript value that gets produced to the asynchronous callback on the main thread after the task is completed.

### Perform

Perform the task, producing either a successful `Output` or an unsuccessful `Error`. This method is executed in a background
thread as part of libuv's built-in thread pool.

### Complete

Convert the result of the task to a JavaScript value to be passed to the asynchronous callback. This method is executed on the main
thread at some point after the background task is completed.

### `.schedule(f)`

Schedule a task to be executed on a background thread. `callback` should have the following signature:
```js
function callback(err, value) {}
```

## Calling Async Tasks

Now lets look at how we would schudle async task using the `BackgroundTask` struct we created:

```js
const { performAsyncTask } = require('../native');

// Iterate 10,0000 times in background thread
performAsyncTask((err, value) => {
    let count = 10;
    for (let i = 0; i < 100000; i++) {
        count++;
    }
    console.log(count, 'first sum from background thread');
});

// Iterate 10 times
let count = 10;
for (let i = 0; i < 10; i++) {
    count++;
}
console.log(count, 'second sum from main thread');
```

If you run this code you will get the following results:
```
20 'second sum from main thread'
100010 'first sum from background thread'
```

If `performAsyncTask()` were executed syncronously then the background thread would finish running before the main thread finishes and the results would be:
```
100010 'first sum from background thread'
20 'second sum from main thread'
```

## Handling Failing Tasks

If we wanted our previous example to throw an error we could simple replace the `perform` and `complete` methods with the following:

```rust
// --snip--
fn perform(&self) -> Result<Self::Output, Self::Error> {
    Err(format!("I am a failing task"))
}

fn complete(self, mut cx: TaskContext, result: Result<Self::Output, Self::Error>) -> JsResult<Self::JsEvent> {
    cx.throw_error(&result.unwrap_err())
}
// --snip--
```

## Promises

If we wanted to wrap our task around a promise, we could do that like so:

```js
// ./lib/index.js
const { performAsyncTask } = require('../native');

// Iterate 10,0000 times in background thread
const promisePerformAsyncTask = () => {
    return new Promise((resolve, reject) => {
        performAsyncTask((err, res) => {
            let count = 10;
            for (let i = 0; i < 100000; i++) {
                count++;
            }
            console.log(count, 'first sum from background thread');
        });
    });
};
```

## Runnable Example

For another example of tasks, you can clone and run [neon-bigint-task](https://github.com/dherman/neon-bigint-task):

```bash
git clone https://github.com/dherman/neon-bigint-task.git
cd neon-bigint-task
neon build
```

This example computes the `100000`th fibonacci number on a background thread while keeping the main thread free