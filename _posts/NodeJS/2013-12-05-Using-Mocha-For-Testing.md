---
layout: default
title: 使用mocha进行CoffeeScript代码测试
category: Program
tags: 
  NodeJS
  mocha
  CoffeeScript
---

mocha看上去相当不错的样子，想到开发大型系统。调用API的时候难免会出问题，这个时候要是有自动测试程序的话就会非常容易排查出问题。

注意事项：

+ mocha会自动查找当前目录下的test子目录，对起test子目录进行测试。
+ mocha默认不支持coffee，需要加--compilers coffee:coffee-script才能正常使用。

# 语法介绍

## describe(intro, fn)
  describe函数主要用于将要测试的内容包在一起，便于分组查看，在函数参数中可以嵌套使用describe
  
## it(desc, fn)
  **it**是mocha测试的核心，其内的函数如果抛出了任何异常，都会被it捕获，提示测试失败
  
# 使用实例

+ [使用Cakefile构建mocha自动化测试](http://www.danneu.com/posts/14-setting-up-mocha-testing-with-coffeescript-node-js-and-a-cakefile/)
