---
layout: default
title: 谁动了JSON.stringify ?
category: fe
tags: bugfix
---

最近碰到一个比较恶心的 case，客户引了 prototoype.js 的库在 Object, Array 等原型链和对象上扩展了很多方法，
导致 Object.keys 和 JSON.stringify 的结果都产生了异常... 

## Object.keys 
该方法被复写导致的 ‘TypeError: Property description must be an object: undefined’ 错误：
```
if (Object.keys) {
  Object.keys(supplier).forEach(function(property) {
    Object.defineProperty(receiver, property, Object.getOwnPropertyDescriptor(supplier, property));
  });
}
```
上面这段代码，存在什么问题？看起来没有任何问题，其实最大的问题在于 Object.keys 有可能被复写。

> 当 Object.keys 被用 `for ... in` 遍历对象来实现，而且没有加 hasOwnProperty 来过滤掉继承过来的属性时，问题就来了：
Object.getOwnPropertyDescriptor 获取一个对象不存在的属性时返回 undefined，直接传给 Object.defineProperty 就会报
TypeError: Property description must be an object: undefined 错误

## JSON.stringify
```
JSON.stringify(value[, replacer [, space]])
```
### 参数说明

replacer : 

1. function --> 被序列化的值的每个属性都会经过该函数的转换和处理
2. array --> 只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中

space：指定缩进用的空白字符串

### 注意事项
如果一个被序列化的对象拥有 toJSON 方法，那么该 toJSON 方法就会覆盖该对象默认的序列化行为

> 在涉及到重要数据使用 JSON.stringify 时，一定要判断 Object, Array 等对象的原型链上是不是被挂了 toJSON 方法，
不然很有可能导致结果异常
