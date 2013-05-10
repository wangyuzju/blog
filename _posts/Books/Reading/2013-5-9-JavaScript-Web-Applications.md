---
layout: default
tags: Reading
title: 基于MVC的JavaScript Web富应用开发
doubanID: 10733304
---
#CH1 MVC和类

#CH2 事件和监听
##window.onload和DOMContentLoaded
window.onload是页面所有资源（图像，CSS等）加载完毕才会触发，DOMContentLoaded则是
当DOM构建完成时触发。jQuery增加的ready()函数就是在后者不可用时，使用前者，主流
类库的处理方法[参见这里](http://varnow.org/?p=77)。
##$.delegate()实现事件委托
使用事件委托的方式，在事件注册时候增加的子元素也能触发事件回调。
##$.trigger()可以触发自定义事件
使用$.bind()注册自定义事件的回调函数之后，使用$.trigger()触发自定义事件，
自定义事件会沿着DOM数做冒泡
##其他
还介绍了发布者/订阅者模式

#CH3 模型和数据
模型应当从视图和控制器中解耦出来，与数据操作和行为相关的逻辑都应当放入模型中，通过
命名空间进行管理。
##ORM 对象关系映射
ORM（Object-relational mapper）可以用来做数据管理及用作模型，使用ORM可以将模型和
远程服务捆绑在一起，任何模型实例的变化都会在后台发起AJAX请求。使用ORM来抽象JS数据
类型，通过添加自定义的函数和属性来增强基础数据的功能，比如数据验证，监听，数据
持久化及服务器端回调处理，以提高代码重用率。
###原型继承
`Object.create(originObject)`,返回新对象的原型为传入的这个参数对象，其原理如下：


    if (typeof Object.create != "function"){
        Object.create = function(o){
            function F(){};
            F.prototype = o;
            return new F();
        };
    }

[原型继承的实现](https://gist.github.com/wangyuzju/5554859)