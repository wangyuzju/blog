---
layout: default
title: 移动设备Web开发小记
category: test
tags:
  -FE
  -Mobile
---
#关于touchstart和gesturechange
##知识点回顾
1. 第一根手指放下，触发touchstart
2. 第二根手指放下，触发gesturestart 
3. 触发第二根手指的touchstart 
4. 立即触发gesturechange 
5. 手指移动，持续触发gesturechange
6. 第二根手指提起，触发gestureend
7. 触发第二根手指的touchend 
8. **触发touchstart**！多根手指在屏幕上，提起一根，会刷新一次全局touch！重新触发第一根手指的touchstart
8. 提起第一根手指，触发touchend 

##碰到的坑
由于我同时需要touchstart和gesturechange事件来绑定不同的操作，因此就在touchstart中设置了
一个延时，然后在gesturechange中clear掉延时句柄，但是测试结果是有时有效有时无效，原来在
gesturechange事件中，会触发多次touchstart，而我只是在gestutechange中进行了clearTimeout，
其实是应该在touchstart中也clearTimeout一下，这样就顺利解决了该问题。

**有人说**：那你干嘛不直接用click事件？因为采用了Kinetic的框架，在移动设备上不会触发click
事件，真是囧，估计是开发人员为了避免touchstart和ckick事件重复触发，而直接阻止掉了事件的冒泡。
--其实我想说的是这些事件都是由这个框架框架的一个canvas物理引擎所模拟的，人家并没有实现
touchstart 事件到click事件的冒泡。。。

