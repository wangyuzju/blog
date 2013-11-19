---
layout: default
title: Shell编程技巧与陷阱
category: linux
tags:
- Shell
---

# 读取输入

    cat >  hello.sh<<END

读取用户输入，直到碰到END（自定义终止符号）


+ tee 将输入输出到屏幕，并且写入到后面跟的文件中去（**用于保存中间数据**）
+ 管道永远连接标准输出
+ 使用\\来对长Shell语句进行换行
