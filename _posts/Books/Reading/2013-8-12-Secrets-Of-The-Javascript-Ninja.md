---
layout: default
tags: Reading
title: Secrets of the javascript ninja 读书笔记
doubanID: 3176860
---
齐伟老师的JS分享干货多多，使我顿时感觉到了和大神之间的差距，花点时间好好都下这本书，网上评价不错

#实现对象数组
    var a = {length: 0}
    Array.prototype.push.call(a, 'hello');  //return 1 the length of a 
    Array.prototype.push.call(a, 'world!'); //return 2 the length of a

##简单的类数组对象管理器
    var elems = {
      length: 0,
      add: function(elem){
        Array.prototype.push.call(this, elem);
      },
      gather: function(id){
        this.add(document.getElementById(id));
      }
    };

#基于length属性的函数重载
