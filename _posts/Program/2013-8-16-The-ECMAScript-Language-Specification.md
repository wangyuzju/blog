---
layout: default
title: ECMASCript 规范详解
category: Program
tags:
- ECMAScript
---
[ECMAScript-Language-Specification](http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf) 工欲善其事，必先利其器，winter大神，我来了～

#语言概述
+ primitive values ：Undefined, Null, Boolean, Number, String
+ Every object created by a constructor has an implicit reference (called the object‘s prototype) to the value of 
its constructor‘s "prototype" property.通过构造函数创建的对象的`__proto__`属性会指向构造函数的prototype，prototype之间可以传递组成prototype链。
+ `new Constructor() == Object.create(Constructor.prototype)` Object.create方法接受第一个参数为返回的新对象`__proto__`属性的引用对象，第二个参数为新建对象默认的属性，相当于Object.defineProperties接受的参数。参考链接[Object.create](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
+ 构造函数自身不会共享prototype内的属性（例如只有Array.prototype.push而无法通过Array.push访问到prototype中的方法和属性4.2.1）

#一些定义
+ Boolean Object, String Object, Number Object, 由对应的构造函数通过new操作符，并传入相应的参数返回来的对象，这些对象具有内部属性，该属性的值的类型是对应的变量类型，这些对象可以通过执行不带new的构造函数返回其内部属性的值，如`String(new String('a')) === 'a'`,注意这里是全等，因为`==`会自动将两边的表达式进行值转换，`'a' == new String('a')`也是成立的，但事实上前者是String value后者是String Object。
+ Number type包括所有的Number values，NaN，和正负infinity
