---
layout: default
tags: Books
---
##重置样式,rest.css
针对html4：[Eric Meyer_Reset.css_v2.0](http://meyerweb.com/eric/tools/css/reset/)  
针对html5：[normallize.css](http://necolas.github.com/normalize.css/)  
目前使用的：[Twitter的reset.less](https://github.com/twitter/bootstrap/blob/master/less/reset.less)  

##媒体查询
####按条件加载
    <link rel="stylesheet" media="screen and (orientation: portrait) and (min-width: 800px), projection" href="800wide-portrate-screen.css" />
可供媒体查询检测的特性：width/height/device-width/device-height/orientation/aspect-ratio/device-aspect-ratio/color/resolution/
上述特性都可以加min/max进行修饰
####在css文件中判断
    @media screen and (max-width: 500px){}
写在其内的css仅当满足条件的时候才会生效

##用em替换px
默认文字大小1em=16px;