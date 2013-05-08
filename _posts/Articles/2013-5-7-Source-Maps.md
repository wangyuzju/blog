---
layout: default
title: Source Maps 101
category: Articles
---
[原文链接](http://net.tutsplus.com/tutorials/tools-and-tips/source-maps-101/)

Source Maps：找出正式代码和开发代码之间的映射关系

#什么是Source Maps？
在编译正式代码的时候，将开发代码所在的行号信息保存到source map中去，当在正式代码中查询时，
会返回其所在开发代码的真实位置信息。（需要浏览器支持）

#如何使用Source Maps
1. 在压缩代码的同时，产生Source Maps文件（例如test.js，会生成test.js.map），同时在压缩后
的代码中加入引用Source Maps的URL，如`//@ sourceMappingURL=test.js.map`
2. 支持Source Maps的浏览器在Source面板会根据Source Maps文件自动引用原来的JS文件
3. 使用的压缩代码出错会自动**在原始代码的基础上报错**
4. 在引入的原始文件中设置的断点会生效(**昨晚测试的时候会出问题，但是今天OK了**)

#CoffeeScript中使用Source Maps
**注意**：文中编译Coffeescript的时候，官方的coffeescript程序还不支持Source Map，因此使用
了重写Coffee编译器的第三方NPM（coffee-script-redux）来生成Source Map文件，但是文中又没有
用后者编译CoffeeScript生成JS，感觉不妥当。\[连IDEA的帮助文档也是用coffee-script-redux\]  
**注意**：CoffeeScript 1.6.1之后就支持Source Map了，因此就没有必要适用这一
号称“更好的Coffee编译器”的coffee-script-redux项目来生成Source Map文件了，直接
`coffee -cm source`就OK了


#Source Maps工作原理
参看[阮一峰的博文](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)

