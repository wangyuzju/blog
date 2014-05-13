---
layout: default
title: 监测DOM内容变化
category: Web
tags: FE
---

开发jquery异步加载插件——asyncModule.js的调试功能的时候，发现append到父元素下的调试dom因为模块内部js调用了父元素的html()方法而被移除，因此需要在调用html()方法之后再进行调试dom append的操作。

解决方法：

# 修改jQuery的html方法

```
(function($) {
    var oldHtml = $.fn.html;
    $.fn.html = function()
    {
        var ret = oldHtml.apply(this, arguments);

        //trigger your event.
        this.trigger("change");

        return ret;
    };
})(jQuery);
```
通过在html()方法完成时，派发一个事件

# DOMCharacterDataModified event
当插入的元素是字符时，会触发该事件，但是当插入dom例如 `e.innerHTML = "<span>hello world!</span>"` 时，则不会触发该事件

# DOM MutationObserver
```
// select the target node
var target = document.querySelector('#some-id');
 
// create an observer instance
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        console.log(mutation.type);
    });    
});
 
// configuration of the observer:
var config = { attributes: true, childList: true, characterData: true }
 
// pass in the target node, as well as the observer options
observer.observe(target, config);
 
// later, you can stop observing
observer.disconnect();
```
当DOM完成变化，会触发回调并传入发生的变化列表（属性arrtibutes、子元素childList、?characterData）

[参考链接](http://hacks.mozilla.org/2012/05/dom-mutationobserver-reacting-to-dom-changes-without-killing-browser-performance/)
