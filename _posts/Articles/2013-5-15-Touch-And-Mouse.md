---
layout: default
title: Touch And Mouse - Together Again For The First Time
category: Articles
---
毕设项目中关于touch和click踩了几个坑，挖到一篇好文，拜读一下
[原文链接](http://www.html5rocks.com/en/mobile/touchandmouse/)

#同时支持Touch和Mouse
##一次触摸发生的事件
1. touchstart -- 手指放在DOM元素上
2. touchmove -- 手指在DOM元素上移动
3. touchend -- 手指离开DOM元素
4. mouseover
5. mousemove
6. mousedown
7. mouseup
8. click

设备需要300ms时间来处理touch事件，因此直接通过click事件在移动设备上绑定事件是不合适的
可以在touch事件中，调用e.preventDefault()方法阻止mouse事件触发（但是会阻止所有浏览器默认的
动作，比如滚动等等）

##Mousemove事件不会被Touch触发
因此点击拖拽类的插件在移动设备上不一定行得通，使用Range元素来实现拖拽条吧。

##Touchmove和Mousemove不是同一件事情
touch事件的target总是开始touch的元素上，不会变化，而mousemove事件的target是当前鼠标下的元素，会变化
