---
layout: default
title: C语言编程，打好C/C++的基础
category: Program
tags: 
- C
---

掌握了下面的表达式，基本上就能看懂大部分指针和函数了～

{% highlight c %}
char **argv
// argv: pointer to char
int (*daytab)[13]
// daytab: pointer to array[13] of int
int *daytab[13]
// daytab: array[13] of pointer to int
void *comp()
// comp: function returning pointer to void
void (*comp)()
// comp: pointer to function returning void
char (*(*x())[])()
// x: function returning pointer to array[] of pointer to function returning char
char (*(*x[3])())[5]
// x: array[3] of pointer to function returning pointer to array[5] of char
{% endhighlight %}

### links
+ [Everything you need to know about pointers in C](http://boredzo.org/pointers/)
+ [The right-left rule for reading C declarations](http://ieng9.ucsd.edu/~cs30x/rt_lt.rule.html)
