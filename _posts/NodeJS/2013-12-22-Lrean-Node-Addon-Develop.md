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
// Arguments继承自FunctionCallbackInfo类，参见http://bespin.cz/~ondras/html/classv8_1_1Arguments.html
Handle<Value> hello(const Arguments args){

}
// Handle<Object> target
target->Set(String::NewSymbol("greet"), func_tmpl->GetFunction());

// 用于C++，嵌入V8
void Print(const v8::FunctionCallbackInfo<v8::Value>& args) {
 
}
// global = v8::ObjectTemplate::New();
global->Set(v8::String::New("version"), v8::FunctionTemplate::New(Version));
{% endhighlight %}

# function arguments




Fabolous-Breathe

# V8中的异常
通过ThrowException函数抛出异常的实例，异常实例通过异常对象Exception的五个成员函数生成，分别为`RangeError`, `ReferenceError`, `SynctaxError`, `TypeError`, `Error`，抛出异常的方法如下

{% highlight c++ %}
ThrowException(Exception::TypeError(String::New("xxx")));
{% endhighlight %}

