---
layout: default
title: bash编程的一些注意点
category: tips
---
##写了个[product.sh][1]花了几个小时,真是坑
[1]: {{site.url}}/product.sh
总结了一下，有如下几点需要注意：

+ sh中变量的命名 var=xxx，=左右不能出现空格，变量的引用$var
+ 用eval来执行字符串指令，直接$cmd会将\>等符号转义
+ 推荐[Advanced Bash-Scripting](http://tldp.org/LDP/abs/html/)
+ **sh里面空格要严格**:例如取反，if \[ ! -e $file \],这里!前后要留空，不然都会报错！
