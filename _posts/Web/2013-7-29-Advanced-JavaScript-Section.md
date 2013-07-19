---
layout: default
title: JavaScript的一些高级使用
category: web
tags:
  JS
---
读到寒冬的博客[《在浏览器的背后》](http://www.cnblogs.com/winter-cn/archive/2013/05/21/3091127.html)，文中提到的词法分析和语法分析的部分，涉及到了一个js函数声明的一个很高端的应用

#闭包在函数声明中的运用
    var dataState = function dataState(c){
      if(c=="<") {
        return tagOpenState;
      }
      else {
        emitToken(c);
        return dataState;
      }
    };

dataState是一个函数发生器，能够返回另外一个函数或者自身。看一下整个[词法分析器的Gist代码](https://gist.github.com/wintercn/5618683)，就会发现其精妙之处