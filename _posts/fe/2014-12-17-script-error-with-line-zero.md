---
layout: default
title: window.onerror 回调中的 Script Error line 0 报错分析
category: fe
tags: bugfix
---
在监控前端页面报错的时候，希望通过 window 的 onerror 事件来获取报错的内容，文件名<del>以及代码所在行</dev>(线上代码一般都是压缩了因此没啥用)。

遗憾的是想要通过这种方法获取非本域下的 js 文件的报错时，得到的永远是`Script Error`，空的文件名和0的行号，因为浏览器的Same Origin Policy。当另外一个域下的 js 报错时，拿到的永远是 Script Error。

[Webkit dispatchErrorEvent 同源限制源代码](http://trac.webkit.org/browser/branches/chromium/648/Source/WebCore/dom/ScriptExecutionContext.cpp?rev=77122#L301)，如下所示
![Webkit dispatchErrorEvent 同源限制源代码](http://labs.hellofe.com/upload/image/blog/92/e5/bf/f8c503706d9e272f7acd4fa1a3.png)

[Firefox dispatchErrorEvent 同源限制源代码](http://mxr.mozilla.org/mozilla-beta/source/dom/base/nsJSEnvironment.cpp#316)

## 为什么要限制报错信息？

假如有个 script 标签：`<script src="yourbank.com/index.html">`，如果这个页面没有屏蔽报错信息，那么可能返回的信息是"Welcome Fred..."或者"Please Login ...", 于是当用户访问 A 页面时，就可以拿到用户在B 页面的一些敏感数据。


## 解决方案
那么，怎么样才能绕开同源策略得到正确的报错信息呢？设置 js 文件的 `Access-Control-Allow-Origin: *` 响应头，同时引用文件的时候加上 crossorigin 属性， 如`script.crossOrigin = 'crossorigin'`，就能拿到正确的报错信息，如下所示
![cross origin onerror 获取跨域报错信息示意图](http://labs.hellofe.com/upload/image/blog/52/a7/c9/2abe38605e26e633957c6a3356.png)


## 参考链接

+ [http://stackoverflow.com/questions/5913978/cryptic-script-error-reported-in-javascript-in-chrome-and-firefox](http://stackoverflow.com/questions/5913978/cryptic-script-error-reported-in-javascript-in-chrome-and-firefox)
+ [window.error “Script error”问题跟进](http://www.webryan.net/2012/12/something-about-window-onerror-script-error/)
+ [Script error](http://errors.totorojs.org/wiki/script-error)
