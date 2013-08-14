---
layout: default
tags: Reading
title: Secrets of the javascript ninja 读书笔记
doubanID: 3176860
---
齐伟老师的JS分享干货多多，使我顿时感觉到了和大神之间的差距，花点时间好好都下这本书，网上评价不错

#一些基础
+ [assert](http://jsfiddle.net/76fWA/) -- JS可视化测试函数


#chapter 4 Function
##实现对象数组
    var a = {length: 0}
    Array.prototype.push.call(a, 'hello');  //return 1 the length of a 
    Array.prototype.push.call(a, 'world!'); //return 2 the length of a

###简单的类数组对象管理器
    var elems = {
      length: 0,
      add: function(elem){
        Array.prototype.push.call(this, elem);
      },
      gather: function(id){
        this.add(document.getElementById(id));
      }
    };

##基于length属性的函数重载

    function addMethod(object, name, fn) {
      var old = object[name];
      object[name] = function(){
        if (fn.length == arguments.length)
          return fn.apply(this, arguments)
        else if (typeof old == 'function')
        return old.apply(this, arguments);
      };
    }
    
上述函数利用**闭包创建了对重载前函数的引用**，新函数根据传入的参数判断该调用哪个函数（重载之前的还是重载之后的），利用下述代码，就可以对ninja中的whatever方法进行重载，根据传入的参数数量调用不同的函数进行处理

    var ninja = {};
    addMethod(ninja,'whatever',function(){ /* do something */ });
    addMethod(ninja,'whatever',function(a){ /* do something else */ });
    addMethod(ninja,'whatever',function(a,b){ /* yet something else */ });

#chapter 8 Taming threads and timers
##setInterval会丢失
当setInterval触发的时候，如过还有等待执行的之前触发的setInterVal，它们不会叠加，之后只会触发一次。

