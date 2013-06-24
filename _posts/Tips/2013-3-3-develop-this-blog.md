---
layout: default
title: 开发本博客中碰到的一些问题
category: tips
tags: 
- jekyll
---
#若干个a标签直接连在一起并且设置了float之后会导致全部选中问题
在<a> link </a>文字内部加上空格，就可以解决

#开发过程中发现对nav元素(header的第一个子元素)设置的margin-top会撑开header的margin-top
>一个盒子如果没有上补白(padding-top)和上边框(border-top)，那么这个盒子的上边距会和其内部文档流中的第一个子元素的上边距重叠。

而我的header也正是**没有设置padding-top和border-top**，原来如此，怪不得在nav之前加个其他元素再设置margin-top就不会这样了  
参看这篇博文[不要告诉我你懂margin](http://www.hicss.net/do-not-tell-me-you-understand-margin/)

#代码的高亮功能
+ 采用了google-code-pretty这一js脚本，调用prettyPrint()来实现
+ 原理：`<pre/code class="prettyprint linenums">`或者`<?prettify?>`加在MarkDown的代码之前，
生成一个`<!--?prettify?-->`的注释。遗憾的是在我这里不行，为啥？因为我的markdown解析引擎自动
的在代码块外生成了`<div class="highlight"><pre><code></code></pre></div>`这个hightlight
的wrap块，导致在md文件中写`<??>`的方式不行**而且现在的md parse engine连`<??>`都无法解析为注释**
+ 最终解决方案：通过js，找出具有`pre\>code`结构的code，加上'prettyprint linenums'的className
+ linenums默认为5行显示一次，那是因为pretty.css里面将每四个的list-style都设置为了none，改成decimal就好了

#代码缩进的问题（3.15）
自从加上两google-code-pretty之后，就对网站的代码高亮寄予了很大的期望，坑爹的是，今天发现写
的code**居然无法缩进**？一开始还以为是我的markdown parse engine又出了问题，然后转到天外
天blog看了下，发现它没啥问题啊，晕倒。最后才想到，会不会是引用了别的网站的code的样式表的缘故，
果然,white-space: pre-line;自动去掉了空格，改成white-space: pre;就OK了

#本地无page.path变量的解决(6.24)
考虑到开发一个博客到github编辑页面的插件，了解每篇文章的文件路径是很重要的，查阅了jekyll帮助文档发现可以从`{{ page.path }}`中获得某文件的路径信息，但是在本地的测试环境中，并没有该变量。stack overflow上提到的[写一个jekyll扩展来实现](http://stackoverflow.com/questions/13243469/how-can-a-jekyll-page-access-its-filename)，于是在`_plugins/path.rb`文件中加入了相应的代码，测了一下，本地果然可以了。但是github pages是不支持plugin的，经过测试,page.path变量在部署到github上的文件中是可以访问的！

**总结**：github pages上的jekyll环境并不是原生的jekyll程序环境，前者不支持插件扩展，但是默认提供了一些额外的功能，比如获取文件路径的变量page.path
