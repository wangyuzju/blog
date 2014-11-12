---
layout: default
title: 《Build Your Own AngularJS》读书笔记
category: Web
tags: 
---


## Scopes And Digest
Angular scopes 本身只是纯的对象。通过 dirty-checking 和执行 digest cycle 使得 scope 具备了监测 scope 中数据变化的能力。

### $watch 和 $digest 实现对象属性监测
$watch 和 $digest 相当于一枚硬币的两面，一起构成了 digest cycle 的核心目的：**反应数据的变化**。

#### $watch
该方法对 scope 绑定一个 watcher，当 scope 发生变化时，watcher 会收到通知，通过传递 watch funtion 和 listener function 给$watch来创建 watcher，前者定义了监测的数据片段，后者是对应的回掉函数。
> 通常使用 watch expression 来代替 watch function 来定义监测的数据片段，比如"user.firstName", Angular 内部会**将这些表达式解析并编译成 watch 函数**（后面会实现这些功能）。

#### $digest
该方法遍历绑定到一个 scope 上的全部的 watcher，依次调用他们的 watch 函数（传入当前 scope 作为第一个参数）和对应的 listener 函数。

通过对比一个 wather 的 watch 函数当前的返回值和上一次的返回值，如果发生变化了，那么该 watcher 就是 dirty 状态，对应的 listener 回掉函数需要被调用(传入 newValue, oldValue, scope 作为参数)。

Angular 通过存储 watchFn/listenerFn 函数的对象(watcher)的 last 属性来记录上一次的返回值

+ 为了区分初始值为 undefined 的情况，在初始化的时候，将该 watcher 的 last 属性指向**内部定义的一个函数**，这样就不会和任何初始值冲突（因为只有当引用了同一个函数时，两个变量才相等，外部变量无法访问到该内部函数也就不会与其相等造成初始值相等冲突）。
+ 为了避免将该内部函数首次作为 oldValue 返回，在调用 listener 的时候会对 oldVlaue 进行判断，如果指向了初始值，则纠正为 newValue 作为 oldValue 返回。

遍历 watcher 的方式看起来挺好，但是当前面的 watcher 关心的值在被 $digest 调用完之后再发生改变（比如在后面的 watcher 的 listener 中改变），则并没有达到 watcher 目的。因此**诞生了 Angular 的 dirty check**(至少遍历全部的 watcher一遍，如果过程中发生了变化，在遍历完后重新再遍历一遍，直到没有改变为止)。

假设有100个 watcher，那么当第一个 watcher 发生变化时，按照上面的方法需要调用200次 watch 函数，Angular 对此进行了优化，记录了最后一次发生改变的 watcher，如果再一次遍历到最后一次发生改变的 watcher 时，说明已经完成了一轮没有 dirty 状态的 check，就可以提前退出而不必等待遍历结束，此时，当遍历到第二遍的第一个watcher 时，发现就是为最后一次发生变化的 watcher，此时就可以退出，而无需检查剩下的99个 watcher，这个时候就只调用了101次。



#### 结论
+ 在 scope 中设置属性本身并不会造成任何性能影响，如果没有 watcher 来监测其属性，是否在 scope 中存储数据没有任何影响。**Angular 并不会遍历 scope 的全部属性**。Angular **遍历的是 scope 中的 watchers**。
+ 在每一个 $digest 过程中, 每一个 watch 函数都会被调用，因此需要注意 watcher 的数量以及 watch 函数的性能。


