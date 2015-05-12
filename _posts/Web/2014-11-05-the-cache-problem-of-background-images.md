---
layout: default
title: Chrome 下图片缓存设置导致合图失效问题
category: Web
tags: bugfix
---
开发百度首页的音乐卡片模块时，发现合并之后的图片并没有真正生效，具体表现为：**hover展示同一张大图内的图标时，该大图被重复加载一次**, 其行为表现类似于图片未合并时候的情况，如下图所示：

![大图重复加载图](http://labs.hellofe.com/upload/image/blog/33/4a/35/dd5e580c0187e44a726b64c1e0.png)

一开始因为看到了 Initiator 里面显示的 jquery 还一度以为是 jquery 触发的背景图片重新 load，伟哥还怀疑有 js 隐藏/显示了一个元素导致background 里面的图片重新加载。反复调试没啥结果，有同事反馈在 firefox 下是没有这个问题的。而在我的**Chrome Version 38.0.2125.111**和伟哥的 chrome 上都复现了这个问题。

观察了下图片的每次请求都是200，猜测可能是缓存策略导致的。遂看了下主站cdn 上图片的响应头：

```
Cache-Control:max-age=31104000
Connection:Keep-Alive
Date:Wed, 05 Nov 2014 13:57:02 GMT
ETag:"1798851251"
Expires:Sat, 31 Oct 2015 13:57:02 GMT
Last-Modified:Tue, 04 Nov 2014 10:25:19 GMT
```

对比了出问题的大图的响应头如下所示：

```
Cache-Control:no-store, no-cache, must-revalidate, post-check=0, pre-check=0
Connection:keep-alive
Content-Type:image/png;charset=utf-8
Date:Wed, 05 Nov 2014 13:48:06 GMT
Expires:Thu, 19 Nov 1981 08:52:00 GMT
Pragma:no-cache
```

果然返回的图片没有设置缓存，于是把图片地址替换成本地的 server 进行测试：

```
Cache-Control:public, max-age=0
Connection:keep-alive
Content-Length:15702
Content-Type:image/png
Date:Wed, 05 Nov 2014 14:59:58 GMT
ETag:W/"3d56-394850958"
Last-Modified:Wed, 05 Nov 2014 14:59:56 GMT
```

果然问题解决了，chrome下不再有多余的请求发出。

总结：对于没有设置缓存的大背景图，当原来没有展示的图片需要展示时（如 :hover, show()):

+ **chrome**第一次会发起请求重新加载图片，导致原来大图失效，出现图标闪烁问题。**当二次展示时，不会再重新加载同一张大图**。
+ **ie6**, **firefox**则不会受图片缓存策略影响，正常显示。
