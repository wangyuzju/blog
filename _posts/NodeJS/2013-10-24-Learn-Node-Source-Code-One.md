---
layout: default
title: NodeJS源码详解——process对象
category: nodejs
tags:
- C++
- NodeJS
---
简单学习了Google的V8之后，决定开始学习NodeJS源代码的一个系列。

# process对象
process对象中的大部分属性都是使用c++实现的，在node.cc(2300-2514)中的`void SetupProcessObject()`函数中定义。process在C++中是一个JS对象(ObjectTemplate类型对象o\_tmpl的实例，通过o\_tmpl->NewInstance()生成)，并作为参数传入到Node的初始化JS代码——node\_native中去，可以在"build/src/node_natives.h"目录下查看(./configure && make -j 3)，包括"src/node.js", "lib/*.js";

####参考
+ src/node.cc:2546-2603`void Load()`
+ src/node_javascript.cc:39-41`Handle<String> MainSource()`

node_natives.h源代码示例

    namespace node {
        const char node_native[] = {47, 47, 32, 67, 112 ......}
        const char console_native[] = {47, 47, 32, 67, 112 ......}
        const char buffer_native[] = {47, 47, 32, 67, 112 ......}
        .....
    }
    struct _native {  const char* name;  const char* source;  size_t source_len;};
    static const struct _native natives[] = {
        { "node", node_native, sizeof(node_native)-1 },
        { "dgram", dgram_native, sizeof(dgram_native)-1 },
        { "console", console_native, sizeof(console_native)-1 },
        { "buffer", buffer_native, sizeof(buffer_native)-1 },
        ....
    }

## 核心的process.binding
