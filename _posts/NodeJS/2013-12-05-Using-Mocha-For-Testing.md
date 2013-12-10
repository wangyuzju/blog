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
  mocha支持**BDD**， **TDD**， **exports**三种流行的测试接口，默认采用BDD
  
  exports 实际上就是BDD，只是写法上省略了describe, it关键字
  
参考：

+ [TDD 和 BDD 的区别](http://joshldavis.com/2013/05/27/difference-between-tdd-and-bdd/)

## BDD(Behavior Drive Development)
### describe(intro, fn)
  describe函数主要用于将要测试的内容包在一起，便于分组查看，在函数参数中可以嵌套使用describe
  
### it(desc, fn)
  **it**是mocha测试的核心，其内的函数如果抛出了任何异常，都会被it捕获，提示测试失败

### before() 
before语句写在it()语句之前，在it内部写before是无效的。

beforeEach对后续的每个it()语句生效
### after()
mocha 中的after在完成测试之后自动执行，对于异步测试，也就是手动调用done()函数表明测试完成才执行。
### beforeEach()
### afterEach()

# 输出格式
设定--reporter(-R)参数来控制mocha的输出内容和样式
## dot 
默认样式，点列出测试文件，只显示总测试结果
## spec
将测试文件中的描述语句也呈现出来
## nyan
一个火车头～
## tap
纯文字，是Test-Anything-Protocol的消费者
## landing
以飞机降落的模型，直观展示测试失败位置
## list
类似于spec，但是将层级关系展开，不如spec直观
## progress
## json



# 使用实例

+ [使用Cakefile构建mocha自动化测试](http://www.danneu.com/posts/14-setting-up-mocha-testing-with-coffeescript-node-js-and-a-cakefile/)
+ [使用mocha对基于Node.JS的服务器端CoffeeScript进行测试并通过jscoverage生成覆盖率报告](http://programus.github.io/blog/2012/05/26/coffee-mocha-coverage-node-under-windows/)

# 使用Makefile来实现mocha测试

上文用的是Cakefile，但是相对来说，不如Makefile来得通用，看了下Makefile的语法，感觉清晰不少，express、connect等框架也是用的Makefile，于是尝试使用Makefile来实现自动化测试

## Tips
+ 规则后面的指令前需使用Tab，不能使用空格
+ 如果规则名和目录下文件名重名（比如test），则会报`make: 'test' is up to date.`错误。解决办法是**设置.PONEY参数**，在其中指定重名的规则，如`.PONEY: test`。 参考[Makefile中的PONEY](http://hi.baidu.com/crazii_chn/item/fe088491f78f2134326eeb3c)
+ 在指令前面加@，不输出指令内容，便于查看整洁干净的测试的结果
