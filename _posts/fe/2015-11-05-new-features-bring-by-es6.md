---
layout: default
title: ES6 中的一些新特性
category: fe
tags: null
---

随着 nodejs 和 iojs 的合并，[原生支持 ECMAScript2015(ES6)](https://nodejs.org/en/docs/es6/) 的特性让人看到了ES6在实际运用的良好条件。而浏览器端，则有类似于 [Babel](https://babeljs.io/repl/) 之类的编译器，将 ES6 转换为 ES5 供普通浏览器使用，尤其是移动端基本上都支持ES5。本文记录ES6中的一些新特性

# Block-Scope
+ let 声明的变量仅在 `{ }` 内部可见
+ 声明在 `{  }` 内的函数对外不可见

# Arrow Function
+ `v => v + 1`, `(v, i) => v + i` 可声明单行表达式函数
+ `v => {  }` 可声明多行函数
+ lexically binds the this value (does not bind its own **this, arguments, super, or new.target**)
 
# Extened Parameter Handling
+ `function(x, y = 10, z = 20){  }`
+ `function(x, y, ...a)` 此时多余的参数变量会被放在数组a中
+ `f(...params)` 会将参数params进行拆分，数组变成每个元素，字符串变成每个字符 [--es_staging]

# test save
