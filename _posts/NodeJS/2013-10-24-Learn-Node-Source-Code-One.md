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
process对象中的大部分属性都是使用c++实现的，在node.cc(2300-2514)中的`void SetupProcessObject()`函数中定义。process在C++中是一个JS对象(ObjectTemplate类型对象o\_tmpl的实例，通过o\_tmpl->NewInstance()生成)，并作为参数传入到Node的初始化JS代码的数组格式——node\_native("src/node.js")中去，可以在"build/src/node_natives.h"目录下查看(./configure && make -j 3)。

####参考
+ src/node.cc:2546-2603`void Load()`
+ src/node_javascript.cc:39-41`Handle<String> MainSource()`

node_natives.h源代码示例

    namespace node {
        const char node_native[] = {47, 47, 32, 67, 112 ......}  // "src/node.js"
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
    // using v8::String::NewFromOneByte to genarate String type for Handle

## 核心的process.binding
1. 通过`env->binding_cache_object()`获取已加载模块的缓存列表，如果存在，就返回该模块的JS对象
2. 否则，通过Set `env->module_load_list_array()`返回的对象的属性，添加待加载的模块名字到process.moduleLoadList对象中
3. 通过`get_builtin_module(*module_v)`获得模块
4. 通过`mod->register_context_func(exports, unused, env->context());`加载模块到exports对象中去，并使用`cache->Set("xxx", exports);`设定xxx模块的缓存对象exports。
5. 通过`args.GetReturnValue().Set(exports);`，将exports对象(加载的模块)作为process.binding的结果返回

