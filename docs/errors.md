---
id: errors
title: Errors
sidebar_label: Errors
---

[Examples](https://github.com/neon-bindings/examples/tree/master/errors)

Neon supports creating and throwing all Error objects in JS. These objects include `Error`, `TypeError`, and `RangeError`. Calling `panic!()` in Neon will throw an `Error` in Node. So `panic!("program errored!")` is equivalent to `throw new Error('program errored!')`. 

## Creating Errors

The `FunctionContext` trait is used to create and throw Errors.

## Catching Errors

Work in Progress
