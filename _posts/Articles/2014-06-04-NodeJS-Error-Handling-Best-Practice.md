---
layout: default
title: Nodejs异常处理最佳实践
categoriy: Articles
---

# 程序错误 VS 可控错误



# 严格定义函数处理的类型，不匹配的输入抛出异常
+ 对用户输入的类型判断越多，越容易出错
+ 随时可以使函数接受更多的参数，但是如果一开始十分宽泛，后面要严格的话就会导致兼容性问题
+ 不鼓励使用`domains`和`uncaughtException`，因为任何可控错误都可以通过callback或EventEmitter进行处理。


# 书写函数的建议

## 1. 明确函数功能
1. 需要的参数
2. 每个参数的类型
3. 关于参数的额外要求（比如必须是合法的IP地址）
4. 可能会产生的错误
5. 产生错误的方式
6. 返回值

## 2. 使用Error（子）对象定义所有错误
通过name和message和stack属性提供准确的错误信息

## 3. 使用Error的name属性区分错误
