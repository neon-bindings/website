---
id: introduction
title: Introduction
sidebar_label: Introduction
---

Welcome to Neon! This documentation should help you get up and running quickly, as well as learn useful techniques for making the most of Neon. If you’re looking for reference material, you might want to try the [API documentation](https://docs.rs/neon).

## What is Neon?

Neon is a library and toolchain for embedding [Rust](https://www.rust-lang.org/en-US/) in your [Node.js](https://nodejs.org) apps and libraries.

## Why Neon?

With Neon, you can create native Node modules like you might in C or C++, but with none of the fear and headaches associated with unsafe systems programming. Embedding Rust in Node can be useful for many reasons:

- Raw performance
- Threads and parallel programming
- Access to Rust’s [package ecosystem](https://crates.io)
- Access to native OS-specific libraries

Neon also works hard to make creating native modules easy, with a convenient command-line interface and workflow built around sensible project conventions. This eliminates a lot of the usual hassle of building native Node modules.

## Where Do I Start?

The best place to go next is the [Quick Start guide](quick-start.md), which will help you get Neon installed on your system. From there, try out the [Hello, World! guide](hello-world.md) to write your first native Node module with Neon!
