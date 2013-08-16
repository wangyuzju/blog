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
its constructor‘s "prototype" property.通过构造函数创建的对象的prototype会指向构造函数的prototype，prototype之间可以传递组成prototype链
+ 构造函数自身不会共享prototype内的属性（例如只有Array.prototype.push而无法通过Array.push访问到prototype中的方法和属性4.2.1）

