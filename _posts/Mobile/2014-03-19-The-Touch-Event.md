---
layout: default
title: 基于触摸事件实现移动端浏览器效果增强
category: Mobile
---

原文参考 [Variation of e.touches, e.targetTouches and e.changedTouches](http://stackoverflow.com/questions/7056026/variation-of-e-touches-e-targettouches-and-e-changedtouches) 

We have the following lists:

+ touches: A list of information for every finger currently touching the screen
+ targetTouches: Like touches, but is filtered to only the information for finger touches that started out within the same node
+ changedTouches: A list of information for every finger involved in the event (see below) To better understand what might be in these lists, let’s go over some examples quickly
They vary in the following pattern:

1. When I put a finger down, all three lists will have the same information. It will be in changedTouches because putting the finger down is what caused the event
2. When I put a second finger down, touches will have two items, one for each finger. targetTouches will have two items only if the finger was placed in the same node as the first finger. changedTouches will have the information related to the second finger, because it’s what caused the event
3. If I put two fingers down at exactly the same time, it’s possible to have two items in changedTouches, one for each finger
4. If I move my fingers, the only list that will change is changedTouches and will contain information related to as many fingers as have moved (at least one).
5. When I lift a finger, it will be removed from touches, targetTouches and will appear in changedTouches since it’s what caused the event
6. Removing my last finger will leave touches and targetTouches empty, and changedTouches will contain information for the last finger


[Touch对象的方法参考](https://developer.mozilla.org/en-US/docs/Web/API/Touch): Touch.clientX/Touch.clientY/Touch.force
/Touch.identifier/Touch.pageX/Touch.pageY/Touch.radiusX/Touch.radiusY/Touch.rotationAngle/Touch.screenX/Touch.screenY


