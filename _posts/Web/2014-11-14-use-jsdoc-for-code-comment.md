---
layout: default
title: 使用 JSDOC 来规范代码注释
category: Web
tags: javascript
---
代码的注释其实是比较重要又容易被忽视的环节，正好最近接手的项目可能需要进行重构，于是决定从注释开始，采用 JSDOC 来完善注释。

## 
+ JSDoc 的目的是为 JS 应用或者框架建立 API 文档，它假定你希望为 namespaces，classes，methods，method parameters 这些事情生成文档。
+ JSDoc 必须要紧位于需要建立文档的代码前，且以`/**`开头，其余的任何形式和位置的注释都是无效的（**因此必须要对需要输出到文档中方法添加`/**`标记**）

## 针对模块的注释
[http://usejsdoc.org/howto-commonjs-modules.html](http://usejsdoc.org/howto-commonjs-modules.html)
### CommonJS Module (node)
在文件顶部使用@module 标记，jsdoc 会自动识别挂载到 exports 对象上去的属性，包括`module.exports = ` 和 `exports = `两种方式。

### 注释 AMD 模块（requirejs）
1. 使用 @exports 注明返回的对象
2. 在第一行使用 @module 注明模块名字 xxx，然后再在返回的对象上使用 @alias module:xxx

```
define('my/shirt', function () {
   /**
    * A module representing a shirt.
    * @exports my/shirt
    * @version 1.0
    */
    var shirt = {

        /** A property of the module. */
        color: "black",

        /** @constructor */
        Turtleneck: function(size) {
            /** A property of the class. */
            this.size = size;
        }
    };

    return shirt;
});

/**
 * A module representing a jacket.
 * @module jacket
 */
define('jacket', function () {
    /**
     * @constructor
     * @alias module:jacket
     */
    var exports = function() {
    }

    /** Open and close your Jacket. */
    exports.prototype.zip = function() {
    }

    return exports;
});
```

## 一些注意事项
+ 


主要参考的是 [Gooogle javascript code style](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml?showone=Comments#Comments)

Google 不推荐使用下列的 tag：

+ <del>@argument</del> => @param
+ <del>@link</del> => @see
+ @augments Indicate this class uses another class as its "base."
+ @borrows 注明把另一个类的成员当成该类的成员
+ @class 和 @constructor 类似，但是允许后面跟上类的描述，而后者只是标明函数是一个构造函数，介绍是单独出来的
+ @constant 常亮
+ @constructs 
+ @default 指明变量的默认值
+ @event 标示具有相同名字的事件触发时，该函数会被调用
+ @example 使用举例，=> @description
+ @field 标示一个对象为非函数，即使它是一个函数
+ @function 标示一个对象为函数，（因为使用函数返回一个对象时，无法区分是对象还是函数）
+ @ignore 让 jsDoc 忽略该变量
+ @inner 类似于@private，是一个函数内部定义的函数
+ @memberOf  标示一个变量引用了一个类的成员
+ @name 强制覆盖 name 属性
+ @namespace 
+ @property
+ @public
+ @requires
+ @returns
+ @since
+ @static
+ @version

PS: [A list of every tag](https://code.google.com/p/jsdoc-toolkit/wiki/TagReference)
