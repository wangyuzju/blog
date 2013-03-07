---
layout: default
title: 配置Intellij中碰到的一些问题
category: Tips
---
##IDEA自动去掉行尾的空格 yy频道25131776
这个功能本来挺好的，但是在写Markdown的时候，行尾的空格是有作用的，Strip trailing spaces关键字打进去都找不到相关的配置项，最后是通过save
找到的，Editor里面的other里面Strip trailing spaces on Save：\[None/ALL/Modefied lines\]

