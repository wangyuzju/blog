---
layout: default
titile: CSS定义文档学习笔记
category: web
tags:
  CSS
---
[参考页面](http://www.w3.org/TR/CSS1/)

    今天组内大神祥鹏展示了一下他深厚的CSS功底：子元素设置百分比的margin-top值是以什么为参考的？<del>这必然是父元素的高度吧？</del>可实际上是父元素的宽度。。。囧，由此大神强烈推荐了W3C的CSS规范，因此有了本文。

#一些笔记
+ **子元素继承的，是父元素的绝对值，而不是百分比值**，比如一个div的font-size为10px,line-height设置为120%(12px)，则子元素从父元素继承过来的行高是12px，而不是120%

#Formatting model
+ 隐藏的元素不会出现在盒模型内
+ padding继承background属性
+ **margin永远是透明**的，因此父元素的背景会透出来
+ 从格式化模型角度看只有block层级和inline类型的两种元素

##block-level
display具有**block**和**list-item**属性的元素、**float的元素**是block-level的元素

###竖直方向的布局
+ 竖直方向的margin值会自动合并，取较大的那个值（因为大部分情况下自动合并看上去更好，更接近设计者的意图）
+ 如果父元素没有设置padding或者border，第一个子元素的margin-top会被自动合并成0（即此时margin无效！<del>PS:此时好像会将父元素往下撑开，到时候求教一下同事。设置了父元素的padding之后，margin生效了</del>**[根据规范](http://www.hicss.net/do-not-tell-me-you-understand-margin/)，一个盒子如果没有上补白(padding-top)和上边框(border-top)，那么这个盒子的上边距会和其内部文档流中的第一个子元素的上边距重叠。**）
+ 

