---
id: publishing
title: Publishing
sidebar_label: Publishing
---

Publishing native modules is a critical part of native modules. The user of a native node module that is compatible with the architecture of their machine. Tthe Node community has devised two solutions for this:

### 1. Upload and downloading native compiled modules 

Library authors can compile the native module to all multiple targets (windows, macOS, linux) and then upload those targets. Users of the module will then download these targets.

### 2. Shipping compiling native modules

Another solution is shipping all the compiled native code targets with the npm module. In other words, this means publishing the package with the windows, macOS, and linux binaries. This solution is considered more secure that the approach of uploading and download modules because they prevent users of a module from [wormhole attacks](https://www.kb.cert.org/vuls/id/319816/).
