---
layout: default
title: 配置Intellij中碰到的一些问题
category: Tips
---
##IDEA自动去掉行尾的空格
这个功能本来挺好的，但是在写Markdown的时候，行尾的空格是有作用的，Strip trailing spaces关键字打进去都找不到相关的配置项，最后是通过save
找到的，Editor里面的other里面Strip trailing spaces on Save：\[None/ALL/Modefied lines\]

##IDEA设置自动编译less文件
[参考](https://github.com/damao/Intellij-IDEA-F2E/wiki/Compile-Less-to-CSS-with--IntelliJ-IDEA)  
安装**LESS CSS Complier**插件，并且在设置选项中的LESS Profiles一项设置好要编译的目录和
编译好之后的目标文件夹(可以选择是否压缩)，这样下次在自动保存相应目录下面的.less文件的时候，就
会自动编译到对应的目录中去，非常方便。在底部左侧可以看到LESS CSS Complier的输出信息。