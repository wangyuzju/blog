---
layout: default
category: web
title: FIS 学习指南
tags:
- FIS
---
下午参加了公司前端集成解决方案——F.I.S的2.0发布会议，感觉一些feature还是很酷的，用nodejs实现，号称能整合coffee，markdown等多种语言，记录一下学习该工具的笔记。[FIS的官方网站](http://fis.baidu.com/)

#简介
fis根据根目录下面的fis-conf.js配置文件来进行**资源定位**：将资源文件的相对路径替换成线上路径，**内容嵌入**：将一些其他语言编写的文件内容嵌入（如MarkDown），图片文件替换成base64编码等，**依赖声明**：编译中识别文件内标记的对其他资源的依赖声明。

##资源定位
1. [HTML文件](https://github.com/fis-dev/fis/wiki/%E5%9C%A8html%E4%B8%AD%E5%AE%9A%E4%BD%8D%E8%B5%84%E6%BA%90)。识别资源文件的src href属性并进行相应替换
2. [JS文件](https://github.com/fis-dev/fis/wiki/%E5%9C%A8js%E4%B8%AD%E5%AE%9A%E4%BD%8D%E8%B5%84%E6%BA%90)。在JS文件中通过__uri(path)来引用资源。(注意不支持字符串嵌入，只支持函数调用的方式)
3. [CSS文件](https://github.com/fis-dev/fis/wiki/%E5%9C%A8css%E4%B8%AD%E5%AE%9A%E4%BD%8D%E8%B5%84%E6%BA%90)。自动识别css文件、html文件中的style标签内容中url(path)及src=path字段，并将其替换成对应资源的编译后url路径

##资源嵌入
1. [HTML文件](https://github.com/fis-dev/fis/wiki/%E5%9C%A8html%E4%B8%AD%E5%B5%8C%E5%85%A5%E8%B5%84%E6%BA%90)。在资源定位的基础上，对资源路径追加?_inline参数，会将图片变成base64，css/js文件内容插入到文件内，`<!--inline[demo.html]-->`插入其他文本文件内容。
2. [JS文件](https://github.com/fis-dev/fis/wiki/%E5%9C%A8js%E4%B8%AD%E5%B5%8C%E5%85%A5%E8%B5%84%E6%BA%90)。使用__inline()函数嵌入其他文件内容（图片被自动base64）
3. [CSS文件](https://github.com/fis-dev/fis/wiki/%E5%9C%A8css%E4%B8%AD%E5%B5%8C%E5%85%A5%E8%B5%84%E6%BA%90)。

##依赖声明
1. [JS文件](https://github.com/fis-dev/fis/wiki/%E5%9C%A8js%E4%B8%AD%E5%A3%B0%E6%98%8E%E4%BE%9D%E8%B5%96)。识别js文件中的 **require函数**，或者注释中的 **@require字段标记的依赖关系** ，并在生成的map.json文件中的文件记录重的deps属性中，列出所有的依赖关系
2. [CSS文件](https://github.com/fis-dev/fis/wiki/%E5%9C%A8css%E4%B8%AD%E5%A3%B0%E6%98%8E%E4%BE%9D%E8%B5%96)。识别css文件 注释中的@require字段 标记的依赖关系
3. [HTML文件](https://github.com/fis-dev/fis/wiki/%E5%9C%A8html%E4%B8%AD%E5%A3%B0%E6%98%8E%E4%BE%9D%E8%B5%96)。

