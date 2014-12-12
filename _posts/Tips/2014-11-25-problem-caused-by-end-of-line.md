---
layout: default
title: LF 和 LRLF 与正则表达式造成的坑 
category: Tips
tags: bugfix
---

最近接手的一个项目里面判断 AMD 模块是 define 还是 require 用到了这么一个表达式：

    var isRequire = contents.search(/require\s*\(\s*\[(.|\r\n)*\],\s*function\s*\(/gi)!=-1;
  
各位看官有没有发现其中可能存在的问题？

随着入口文件依赖的模块增多，果断进行了换行重新排版，结果“重排”之后的构建工具失败了..., 对比历史文件，发现原始文件的换行符是 CRLF，而新文件的换行符却是 LF（因为用了 [editorconfig](http://editorconfig.org/)，所以我的编辑器的配置都是统一的）。

反复排查发现就是这里的判断出了问题，明明我写的是 require, 却被识别为非 require. 自然后面的处理会出问题。

仔细一看才发现这里对换行符的判断使用了`\r\n`，这样一来unix 和 mac 下的换行`\n`就因为缺少了`\r`导致识别失效，加上`\n`分支之后程序正常运行，而原来的同学用的是**windous**系统并不会暴露这个问题。


## 总结
1. 项目统一使用 editorconfig 工具配置编码和格式，确保跨平台不出问题
2. 使用正则表达式匹配换行符的时候，要考虑不同平台下的情况，综合使用 `\n` 和 `\r\n`。

## PS
The Carriage Return (CR) character (0x0D, \r) moves the cursor to the beginning of the line without advancing to the next line. This character is used as a new line character in **Commodore and Early Macintosh operating systems** (OS-9 and earlier).

The Line Feed (LF) character (0x0A, \n) moves the cursor down to the next line without returning to the beginning of the line. This character is used as a new line character in **UNIX based systems** (Linux, Mac OSX, etc)

The End of Line (EOL) sequence (0x0D 0x0A, \r\n) is actually two ASCII characters, a combination of the CR and LF characters. It moves the cursor both down to the next line and to the beginning of that line. This character is used as a new line character in most other non-Unix operating systems including **Microsoft Windows**, Symbian OS and others.
