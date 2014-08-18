---
layout: default
title: 编码风格最实践
category: Web
tags:
- CodeStyle
---

## 使用 CoffeeLint 
参考[github的JS编码规范](https://github.com/styleguide/javascript)， 使用[coffeelint](http://www.coffeelint.org/)来进行代码风格校验。


新版的coffeelint会自动选择配置文件（自动遍历需要lint的文件所在的目录树，查找coffeelint.json文件， 或者带有`coffeelintConfig`属性的package.json文件， 如果没有找到，或者是从stdin进行lint，则从用户home目录查找coffeelint.json文件）


### 与Sublime Text 3 配合使用
依赖一款叫做SublimeLinter的插件，其有一个 SublimeLinter-coffeelint 插件。可能需要做如操作：

+ 同时使用
