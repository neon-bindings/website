---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
---

This guide will help you get your system set up for building Neon projects. If you already have everything installed and are looking to write your first Neon code, try the [Hello, World!](../hello-world/) guide.

## Install Node

Neon requires Node.js and supports **all versions since the most recent LTS release**. If you don't already have Node.js installed, or don't have a supported version, go to the [Node.js web site](https://nodejs.org/) for installation instructions.

## Install Rust

Neon requires Rust for development and supports **all versions of Rust since 1.15**. If you don't already have Rust installed, or don't have a supported version, go to the [Rust web site](https://www.rust-lang.org/install.html) for installation instructions.

## Install Node Build Tools

Neon depends on Node's plugin build tools, which have a few additional system requirements. These dependencies have different installation steps on different operating systems.

### Windows
<div id="windows-installation-instructions" class="toggle toggle-disabled">

The easiest and recommended way to set up a Windows development environment is with the `windows-build-tools` package. In a PowerShell or command prompt run as Administrator, run the following step:

```shell
C:\> npm install --global --production windows-build-tools
```

This installs all the system dependencies unobtrusively, without conflicting with any software already installed on your system.

#### Advanced: Manual setup
<div class="toggle toggle-disabled">

Alternatively, you can set up the Windows development environment manually instead of using `windows-build-tools`. **You do not need to do this if you used the recommended setup process above.**

  * On Windows Vista or Windows 7, install the [.NET Framework 4.5.1](http://www.microsoft.com/en-us/download/details.aspx?id=40773).
  * Install the Visual C++ Build Environment with one of the following options:
    1. Install the [Visual C++ Build Tools](http://landinghub.visualstudio.com/visual-cpp-build-tools) using the _Default Install_ option.
    1. Install [Visual Studio](https://www.visualstudio.com/products/visual-studio-community-vs) (or modify an existing installation) and select _Common Tools for Visual C++_ during setup.
  * Install [Python 2.7](https://www.python.org/downloads/) (Python 3 is **not** supported).
  * Run the following commands:

```shell
C:\> npm config set python python2.7
C:\> npm config set msvs_version 2015
```
</div>
</div>

<script>
$(function() {
  if (navigator.platform.startsWith("Win")) {
    $('#windows-installation-instructions').toggleClass('toggle-disabled');
  }
})
</script>

### macOS
<div id="macos-installation-instructions" class="toggle toggle-disabled">

The development dependencies for macOS are:

  * Python 2.7 (Python 3 is **not** supported)
  * [Xcode](https://developer.apple.com/xcode/download/)
  * Install the _Command Line Tools_ via Xcode under the menu _Xcode &rarr; Preferences &rarr; Downloads_.
</div>

<script>
$(function() {
  if (navigator.platform.startsWith("Mac"))
    $('#macos-installation-instructions').toggleClass('toggle-disabled');
})
</script>

### Generic
<div id="generic-installation-instructions" class="toggle toggle-disabled">

The generic Unix development dependencies are:

  * Python 2.7 (Python 3 is **not** supported)
  * `make`
  * A proper C/C++ compiler toolchain, like [GCC](https://gcc.gnu.org/)

Most modern Unix systems, like Linux or FreeBSD, should have the required development dependencies installed already.
</div>

<script>
$(function() {
  if (!navigator.platform.startsWith("Win") && !navigator.platform.startsWith("Mac"))
    $('#generic-installation-instructions').toggleClass('toggle-disabled');
})
</script>

## Install the Neon CLI

Finally, use `npm` to install the Neon command-line toolchain.

```shell
npm install --global neon-cli
```

You can verify your Neon installation by running

```shell
neon version
```

from a shell, which should print out the version of Neon you just installed.