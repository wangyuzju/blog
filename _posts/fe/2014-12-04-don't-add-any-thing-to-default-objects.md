---
layout: default
title: 谁动了JSON.stringify ?
category: fe
tags: 
---

## Object.keys

```
if (Object.keys) {
  Object.keys(supplier).forEach(function(property) {
    Object.defineProperty(receiver, property, Object.getOwnPropertyDescriptor(supplier, property));
  });
}
```
上面这段代码，存在什么问题？看起来没有任何问题，其实最大的问题在于 Object.keys 有可能被复写。

> 当 Object.keys 被用 `for ... in` 遍历对象来实现时，而且没有加 hasOwnProperty 来过滤掉
