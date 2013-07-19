---
layout: default
titile: 学习使用Smarty
category: web
tags:
  Smarty
---
#简介
Smarty的所有语法都用`{}`包裹，`{*  *}`注释内容。

#变量
+ `$`符号是变量的开始，类似php的语法规则，但是用`{$foo.bar}`来代替`{$foo['bar']}`，`{$foo.$bar}`来代替`{$foo[$bar]}`。注意PHP中的hash是数组型的`array('key' => 'value')`。
+ `{#foo#}`和`{$smarty.config.foo}`一样，读取配置文件中的foo变量值
+ 系统变量比如`_SERVER _GET _SESSION`可以通过$smarty.server类似的方式读取
+ 双引号内的\$var会被识别

##变量过滤器
过滤器可以通过在变量后加\|实现，如果过滤函数可接受参数，则在函数用加\:param实现。**所有php函数都可以作为过滤器**。比如`| upper`,`| truncate:40`,`| date_format:"%Y/%m/%d"`。


#函数
每一个smarty语句不是输出变量值就是输出函数调用的结果，函数调用的语法为`{函数名 参数1=值1 参数2=值2 ...}`，常见的有include函数带file变量，insert函数带file，title变量等。

+ default 设定默认值，当变量的值为null或者空字符串时，显示default值（默认空白变量会报错）。可以设定多个default filter来实现多个默认值，如`{$jsonError|default:$tplData.error|default:0}`，当前两者都为空时显示默认值0.
+ escape 转意变量，默认会转义成html的转义字符，可以指定htmlall, url, javascript, mail等

##内置函数
+ capture: `{capture name="foo"}xxx{/capture}`将该标签内的内容存放到指定的变量名foo中，可以通过`{$foo}`或者`{$smarty.capture.foo}`访问该变量，进而判断是否需要输出，避免直接输出到HTML文件中
+ config_load: 后接配置文件名，载入配置文件中的变量值，可通过`{#foo#}`读取
+ foreach: `{foreach from=$var key=bar item=foo}`循环数组$var，将其键和值分别作为bar、foo迭代。
+ assign: `{assign var="foo" value="bar"}`设定名为foo的变量的值为bar
