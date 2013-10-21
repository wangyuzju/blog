---
layout: default
title: ECMASCript 规范详解
category: program
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
+ tokens：除了空白，注释，行终止符之外的传递给语法分析程序的输入元素。由reserved words(保留字), identifiers(标识符/变量名), literals(null, true/false, number, string, regEx), punctuators of the ECMAScript language(操作符) 组成
+ ES程序的源代码首先被转换成输入元素（tokens，行终止符，注释，空白）。从左往右扫描源代码并使下一个输入的元素具有尽量长的字符长度。
+ 除法和正则表达式都是/符号开头，当除法操作符或者除法赋值（/=）被允许的时候，/被判定为除法符号（InputElementDiv  symbol），其他情况下，被判定为正则表达式符号（InputElementRegExp symbol）。举个例子如下：
<pre><code>
    a = b 
    /hi/g.exec(c).map(d); 
</code></pre>
换行符后的第一个非空白/非注释元素是/，因此允许除法和除法赋值，所以行末不会自动添加;，上面的例子被当成`a = b / hi / g.exec(c).map(d);`处理。会报错，而不是出现无法判断除号还是正则表达式的两难情况
+ 行截止符号：`<LF>` `<CR>` `<LS>` `<PS>` 都属于正则表达式的\s

##分号(semicolon)的自动插入
+ 解析到一个**无法继续构成当前语法**的token(offending token)时，如果这个oToken和上一个token隔了换行符，或者这个oToken是}，那么会自动在这个oToken之前加上分号。**也就是说**：{}作为代码段包裹时，其中的最后一条语句，或者有换行符时(*且该token不被需要时，return就属于特例*)
+ 解析到可以继续构成当前语法，但是不满足使用条件的token(restricted token)。例如a ++之间不能有换行符，虽然a和++这两个token可以完成语法解析，但是之间的换行符限制了该语法的构建，此时会自动添加分号变成`a;\n++`（`++\na`则不属于restricted token, 可以正常运行）。类似的有return, break, continue, throw。这些语句后面跟的表达式必须跟在同一行，不然会报错。
+ 到达文档流末尾了还无法解析得到正常的程序，自动添加;

#Chapter 8 Type
##对象是各种属性的集合
+ 数据属性。关联各种类型的ES value、布尔值等
+ 访问属性。可以是访问函数、布尔值的集合
+ 内部属性。没有key，无法直接通过ES操作符访问，只是为了规范而存在

###数据属性的特性：
+ Value: ES中的数据类型
+ Writable: Value是否可变
+ Enumberable: 在for-in循环中是否可列出
+ Configurable: 该属性是否可删除、转换成其他类型(accessor property)、改变上述Attribuate

###访问器的特性：
+ Get: 取值方法
+ Set: 赋值方法
+ Enumberable
+ Configurable

#一些测试
+ [关于Object.defineOwnProperty / Object.defineOwnproperties](http://jsfiddle.net/ym67q/)

