---
layout: default
title: ES6 中的一些新特性
category: fe
tags: null
---

随着 nodejs 和 iojs 的合并，[原生支持 ECMAScript2015(ES6)](https://nodejs.org/en/docs/es6/) 的特性让人看到了ES6在实际运用的良好条件。而浏览器端，则有类似于 [Babel](https://babeljs.io/repl/) 之类的编译器，将 ES6 转换为 ES5 供普通浏览器使用，尤其是移动端基本上都支持ES5。本文记录ES6中的一些新特性



# Block-Scope
+ let 声明的变量仅在 `{ }` 内部可见
+ 声明在 `{  }` 内的函数对外不可见

# Arrow Function
+ `v => v + 1`, `(v, i) => v + i` 可声明单行表达式函数
+ `v => {  }` 可声明多行函数
+ lexically binds the this value (does not bind its own **this, arguments, super, or new.target**)
 
# Extened Parameter Handling
+ `function(x, y = 10, z = 20){  }`
+ `function(x, y, ...a)` 此时多余的参数变量会被放在数组a中
+ `f(...params)` 会将参数params进行拆分，数组变成每个元素，字符串变成每个字符 [--es_staging]

<hr>
## Spread Operator

`...` 作用在数组和对象前面时，执行 spread 运算，具体表现为：
+ 将数组对象展开为函数所需要的参数

```javascript
    Math.max(...[1, 5, 8, 10]) // == Math.max(1, 5, 8, 10)
```
+ 展开数组对象到当前数组中

```javascript
    let cities = ['San Francisco', 'Los Angeles'];
    let places = ['Miami', ...cities, 'Chicago']; // ['Miami', 'San Francisco', 'Los Angeles', 'Chicago']
```

<hr>
## Symbol
symbol 是唯一且不变的数据类型，能作为对象属性的标识符，即作为哈希对象的键值，其使用示例如下

```javascript
var obj = {};

obj[Symbol("a")] = "a";
obj[Symbol.for("b")] = "b";
obj["c"] = "c";
obj.d = "d";

for (var i in obj) {
   console.log(i); // logs "c" and "d"
}

// 
Symbol('foo') === Symbol('foo') // false
Symbol.for('foo') === Symbol('foo') // false
Symbol.for('foo') === Symbol.for('foo') // true
```

<hr>
## Map
Map 是新的数据结构，能对内部含有的值进行`set`, `get`, `search`等操作。最重要的是不像对象哈希那样只
接受字符串作为 key，Map 接受任何类型的 key 且不会将其转换为字符串。其初始化语法如下：

```js
let map = new Map([
    ['name', 'david'],
    [true, 'false'],
    [{}, 'object'],
    [function () {}, 'function']
]);

for (let key of map.keys()) {
    console.log(typeof key);
    // > string, boolean, number, object, function
}

for (let [key, value] of map.entries()) {
    console.log(key, value);
}
```

## WeakMap
WeakMap 对象相比 Map 对象，其key是弱引用的，因此只能是对象，当这个key指向的对象被删除的时候，
这个weakmap里关联的value会被自动清除。在进行一些dom相关的cache时，尤为有用。
