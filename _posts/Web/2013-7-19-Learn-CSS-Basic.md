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

**概念**：可替换元素 -- 一个元素的内容由该元素的属性替换（比如IMG元素由其src属性所指向的图片替换）。可以想象可替换元素具有自己的大小，如果width属性设定为auto则该元素使用自带的大小，不然会根据设定值进行大小调整（可替换元素有block-level和inline元素）

##block-level
display具有**block**和**list-item**属性的元素、**float的元素**是block-level的元素

###竖直方向自动格式化
+ 竖直方向的margin值会自动合并，取较大的那个值（因为大部分情况下自动合并看上去更好，更接近设计者的意图）
+ 如果父元素没有设置padding或者border，第一个子元素的margin-top会被自动合并成0（即此时margin无效！<del>PS:此时好像会将父元素往下撑开，到时候求教一下同事。设置了父元素的padding之后，margin生效了</del>**[根据规范](http://www.hicss.net/do-not-tell-me-you-understand-margin/)，一个盒子如果没有上补白(padding-top)和上边框(border-top)，那么这个盒子的上边距会和其内部文档流中的第一个子元素的上边距重叠。**）

###水平方向自动格式化
+ 水平方向的margin不会发生自动合并
+ 元素默认的宽度是auto，如果不是可替换元素（没有自带大小参数），UA自动计算该元素的width属性使得其width、padding、margin值的和等于父元素的宽度。可替换元素则使用自带的大小
+ width,margin-left,margin-right这三个属性若只有一个设定为auto，那么那个属性就会尽量最大（比如设置具有固定宽度的DIV的margin-left为auto，那么该元素就会向右布局，[类似float: right的效果](http://jsfiddle.net/7yv5b/)）默认margin-right设置为auto，所以类似float: left的效果
+ 对行内元素和float元素设置值为auto的margin，会被当成0

##浮动元素
+ 使用float属性会使元素脱离文档流，并具有block-level的格式（例如设置一个img的float: left属性，会使该图片向左移动直到它碰到另一个block-level元素的margin/border/padding）
自然文档流会在右侧排布。**浮动元素的margin/border/padding都会保留，不会自动合并**，

##行高
+ 非可替换inline元素（没有默认大小）上下的border和margin不会撑开行高，如果设置的行高过小，那么文字会出现在下一行上
+ 可替换inline元素（比如img）会自动撑开行高