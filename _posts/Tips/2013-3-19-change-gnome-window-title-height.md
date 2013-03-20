---
layout: default
title: 修改Gnome窗口标题高度 + fedora18更新后要点
category: Tips
---
#按住alt+F2输入r就可以完成Gnome界面重启

本来是想用yum安装node的，结果发现fedora18发布了，而且从17更新过去非常便捷，只需要
`sudo fedup --network 18`就可以了，用上了fedora18之后，发现原来设置的窗口最大化时自动隐藏
标题栏的功能没有了，google了一下找到解决方法：

#修改对应的主题文件
默认的是：/usr/share/themes/Adwaita/metacity-1/metacity-theme-3.xml

##将标题栏填充高度设置为0
找到所有的`title_vertical_pad value="0~9"`改成`value="0"`这样标题栏看上去就没那么高了

##设置最大化时隐藏标题栏
找到

    <frame_geometry name=”max” title_scale=”medium” parent=”normal” 
    rounded_top_left=”false” rounded_top_right=”false”>

改成

    <frame_geometry name=”max” title_scale=”medium” parent=”normal” 
    rounded_top_left=”false” rounded_top_right=”false” has_title=”false”>

并且在下面几行中找到`<distance name=”title_vertical_pad” value=”9″/>`，将value改成0即可

##最终设置
仅仅隐藏标题栏会导致残留，索性把填充高度也去掉了，这样窗口标题栏看起来要窄一些，但**效果还不错**

##参考
[Fedora 16的Gnome3个人配置笔记[3月7日更新]](http://imobile365.com/articles/6331)

#fedora18更新后注意事项
##防火墙不再是iptables
因此我的主机的web服务就无法被访问了，删除掉防火墙就好了`sudo yum remove firewalld`