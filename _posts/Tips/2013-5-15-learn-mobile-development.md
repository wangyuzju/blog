---
layout: default
title: 毕设中移动Web开发的一些笔记
category: tips
---
#触摸事件和点击事件
移动设备中，会有touch事件和mouse事件，其发生的顺序如下所示：
touchstart，touchmove，touchend，mouseover，mousemove，mousedown，mouseup，click，
touch事件会占用300ms左右的时间，因此直接通过click时间来支持移动设备是不合适的。
在这个过程中，如果阻止了touch事件（preventDefault()）,那么后续的鼠标事件将不会触发，这样
就可以同时注册touch事件和click事件，但是在touch事件中，调用e.preventdefault()来停止触发
click事件，以避免多次调用。（**注意**：使用zepto.js附带的touch event模块时，在tap事件中
调用e.preventDefault()事件无法阻止click事件的触发，只能直接addEventListener才生效）

#手势事件 gesture event
[参考](http://www.cnblogs.com/pifoo/archive/2011/05/22/webkit-touch-event-3.html)
这个事件是对touch event的更高层的封装，和touch一样，它同样包括
gesturestart(当有两根或多根手指放到屏幕上的时候触发)，
gesturechange(当有两根或多根手指在屏幕上，并且有手指移动的时候触发 )，
gestureend(当倒数第二根手指提起的时候触发，结束gesture)三个事件回调。
事件处理函数中会得到一个GestureEvent类型的参数，它包含了手指的**scale**（两根移动过程中分开的比例
）信息和**rotation**（两根手指间连线转动的角度）信息。 

##分别将两根手指放到屏幕上时触发的事件
1. 第一根手指放下，触发touchstart，除此之外什么都不会发生（请参照第二篇文章，手指提起才会触发
mouse的各事件）
2. 第二根手指放下，触发gesturestart
3. 触发第二根手指的touchstart
4. 立即触发gesturechange
5. 手指移动，持续触发gesturechange，就像鼠标在屏幕上移动的时候不停触发mousemove一样
6. 第二根手指提起，触发gestureend，以后将不会再触发gesturechange
7. 触发第二根手指的touchend
8. 触发touchstart！注意，和第一篇文章里介绍的一样，多根手指在屏幕上，提起一根，会刷新一次全局
touch！重新触发第一根手指的touchstart，这点和苹果官方网站上介绍的不同。
9. 提起第一根手指，触发touchend
