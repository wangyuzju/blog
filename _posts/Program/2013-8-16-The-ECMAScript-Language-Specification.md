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

#Chapter 6 Source Text
在ES中，注释中出现的转义字符不会进行解析，不会导致注释被截断（JAVA中注释会被转义序列截断）

#Chapter 7  Lexical Conventions 
##Summary
+ ES程序的源代码首先被转换成输入元素（tokens，行终止符，注释，空白）。从左往右扫描源代码并使下一个输入的元素的字符序列具有更长的字符。
+ 除法和正则表达式都是/符号开头，当除法操作符或者除法赋值（/=）被允许的时候，/被判定为除法符号（InputElementDiv ），其他情况下，被判定为正则表达式符号（InputElementRegExp symbol）。举个例子如下：
<code>
    a = b 
    /hi/g.exec(c).map(d); 
</code>
换行符后的第一个非空白/非注释元素是/，因此允许除法和除法赋值，所以行末不会自动添加;，上面的例子被当成`a = b / hi / g.exec(c).map(d);`处理。会报错，而不是出现无法判断除号还是正则表达式的两难情况
+ 

+ 
