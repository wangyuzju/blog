---
layout: default
title: 学习Node addon开发
category: NodeJS
tags: 
- C/C++
- NodeJS
---
跟着[node-addon-examples](https://github.com/rvagg/node-addon-examples)学习node addon开发～

# hello world
{% highlight C++ %}
/**
 * C++ 实现JS函数的两种情况
 */
// 用于V8内部, JS的C++实现
Handle<Value> hello(const Arguments args){

}
// Handle<Object> target
target->Set(String::NewSymbol("greet"), func_tmpl->GetFunction());

// 用于C++，嵌入V8
void Print(const v8::FunctionCallbackInfo<v8::Value>& args) {
 
}
// global = v8::ObjectTemplate::New();
global->Set(v8::String::New("version"), v8::FunctionTemplate::New(Version));
{% endhightlight %}
# function arguments




Fabolous-Breathe
