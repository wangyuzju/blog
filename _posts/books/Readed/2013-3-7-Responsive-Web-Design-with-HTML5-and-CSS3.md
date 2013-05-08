---
layout: default
title: 响应式Web设计
tags: Readed
doubanID: 20390374
---

#重置样式,rest.css
针对html4：[Eric Meyer_Reset.css_v2.0](http://meyerweb.com/eric/tools/css/reset/)  
针对html5：[normallize.css](http://necolas.github.com/normalize.css/)  
目前使用的：[Twitter的reset.less](https://github.com/twitter/bootstrap/blob/master/less/reset.less)  

#媒体查询
####按条件加载
    <link rel="stylesheet" media="screen and (orientation: portrait) and (min-width: 800px), projection" href="800wide-portrate-screen.css" />
可供媒体查询检测的特性：width/height/device-width/device-height/orientation/aspect-ratio/device-aspect-ratio/color/resolution/
上述特性都可以加min/max进行修饰
####在css文件中判断
    @media screen and (max-width: 500px){}
写在其内的css仅当满足条件的时候才会生效

#用em替换px
默认文字大小1em=16px;

#实现无障碍站点：添加role属性
-application 定义网页应用
-banner 定义一个站点级别的区域，如头部和logo
-complementary 对页面主要区域进行补充说明的区域
-contentinfo 定义页面主要内容相关的信息区域，如页脚的网站版权信息区域
-form
-main 定义页面的主体内容
-navigation 定义导航链接
-search 定义一个用于搜索的区域

#快速而有效的CSS技巧
多栏布局`-webkit-column-width: xxem; //指定每一栏的宽度，内容会分栏显示`
`-webkit-column-gap: xxem; //分栏间隙` `-webkit-column-rule:      //分栏样式`
详细的配置还有很多很多  

#CSS3中新增加的选择器
    /*属性选择器*/
    img[alt^='value'] //具有alt属性，且以value开头
    img[alt*='value'] //具有alt属性，且包含value
    img[alt$='value'] //具有alt属性，且以value结尾
    /*伪类选择器(自身)，和js中的firstChild不同(孩子节点)*/
    li:first-child    //第一个li元素 
    li:last-child     //最后一个li元素
    li:nth-child(*)   //*:even/odd/X/Xn+x/【从1开始计数】
    li.test:nth-of-type(*) //选择符合条件的类名为test的列表项
    li:not(.test)     //选择不是test类名的li
    /* 伪元素 使用::来和伪类区分 */
    li::first-line
    li::first-letter

#RGBA和HSLA来设定颜色
+ 使用RGBA可以#不改变子元素的opacity#，而直接设置opacity的话，会使其子元素也透明
+ HSL(360色环中的一个分布，饱和度，亮度)



