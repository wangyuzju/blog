---
layout: default
title: 学习Node addon开发
category: NodeJS
tags: 
- C/C++
- NodeJS
---
跟着[node-addon-examples](https://github.com/rvagg/node-addon-examples)学习node addon开发～

# 基础
+ 可以直接创建并使用一个Value，比如`Local<Value> foo = String::New("bar");`然后引用foo，或者直接在需要调用的地方写`Local<Value>::New(String::New("bar"));`，两者的效果是一致的

## 开发中遇到的问题
+ 用node-gyp编译的时候报错； 'error: ‘FunctionCallbackInfo’ does not name a type'， 切换系统的node版本为v 0.11之后即可
+ 编译出来的Node输出了源代码。估计是之前调试lib/module.js文件的时候console.log出来了加载过来的内容，但是反复排查后发现所有的console代码都已经去掉了，查看git历史记录的时候发现了被我移动到src目录下的(之前便于查看)`node_natives.h`文件，想到会不会是**该文件的缓存**导致的？删除之后重新编译了下果然OK了，再把其中的ASCII码解码成JS源代码，果然有缓存的console!

# hello world
{% highlight C++ %}
/**
 * C++ 实现JS函数的两种情况
 */
// 用于V8内部, JS的C++实现
// Arguments继承自FunctionCallbackInfo类
// 参见http://bespin.cz/~ondras/html/classv8_1_1Arguments.html
Handle<Value> hello(const Arguments args){
    // 操作符[]取Local<Value>型的参数（JS中的参数）具有如下公共成员函数
    V8_INLINE (int Length() const)
 	V8_INLINE (Local< Value > operator[](int i) const)
 	V8_INLINE (Local< Function > Callee() const)
 	V8_INLINE (Local< Object > This() const)
 	V8_INLINE (Local< Object > Holder() const)
 	V8_INLINE (bool IsConstructCall() const)
 	V8_INLINE (Local< Value > Data() const)
 	V8_INLINE (Isolate *GetIsolate() const)
 	V8_INLINE (ReturnValue< T > GetReturnValue() const)
}
// Handle<Object> target
target->Set(String::NewSymbol("greet"), func_tmpl->GetFunction());

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// 上面的写法是Node v0.10之前的API， 下面的写法是Node v0.11之后的API
// node-gyp采用可执行的node版本来进行编译处理，之前Node是v0.10.22
// 因此无法通过编译，报错error: ‘FunctionCallbackInfo’ does not name a type
/**
 * v8::FunctionCallbackInfo 是类模板，用于处理各种类型
 * 参考：
 *  + template<class a_type> class a_class {} 
 *    http://www.cprogramming.com/tutorial/templates.html
 *  + http://www.learncpp.com/cpp-tutorial/143-template-classes/
 */
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

