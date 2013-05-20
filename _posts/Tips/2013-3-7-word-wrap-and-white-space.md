---
layout: default
title: CSS3中word-wrap, word-break和white-space设定对排版的影响
category: tips
---
##word-wrap
+ normal -- 超长的英文长度大于box的宽度时会撑破box伸展到box外
+ break-word -- 超长英文大于box的宽度时，其碰到box边缘会自动折行显示 \[截断英文单词需要下面的word-break属性\]

##word-break
+ normal -- word-break取值为normal时，和word-wrap值为normal一样的效果，超长英文文本宽度大于box的宽度时会撑破box伸展出去
+ break-all -- 可以强行截断英文单词，达到词内换行效果
+ keep-all -- 不允许字断开

##实际应用中
最好是行内换行而不应该是词内换行，
    //对单词换行
    word-wrap:break-word; 
    overflow:hidden;

##white-space
+ normal -- 默认：空白处会被浏览器忽略
+ pre -- 空白处会被浏览器保留，类似于`<pre>`，不会进行自然换行
+ nowrap -- 不换行，除非碰到`<br/>`
+ pre-line -- 合并空白符序列，但保留换行符`<cr>`，相当于在pre的基础上合并空格
+ pre-wrap -- 相当于pre，但是会进行自然换行
+ inherit
