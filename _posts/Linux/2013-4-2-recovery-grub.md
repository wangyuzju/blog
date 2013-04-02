---
layout: default
title: 双系统重做windous启动菜单的恢复
category: Linux
---
今天发现win7电脑已经中毒了，声音很怪，而且上不了网，又到了2b这边，没啥事做，于是就准备重做下
系统，用了之前帮小马刻的光盘，安装很快，win8很赞，就是不知道怎么激活。。。

#用u盘做grub2引导
1. `df -h`命令查看一下u盘的盘符和挂载路径，分别为`/dev/sdc1``/run/media/wangyu/34F1-06DA`
2. `sudo grub2-install --force --root-directory="/run/media/wangyu/34F1-06DA" /dev/sdc1`
不报错就将引导程序安装到了u盘的根目录下面的boot文件夹下面
3. 拷贝当前的grub2配置文件到u盘对应目录下面`/boot/grub2/grub.cfg``/boot/grub2/device.map`

#安装windous后修复grub2到MBR
1. `df -h`找到/boot的盘符为`/dev/sda13`
2. 将/boot挂载到系统中：`mount /dev/sda13 /run/media/tempdir`
3. `grub2-install --force --root-directory=/run/media/tempdir /dev/sda`就创建了
`/dev/sda13/boot/grub2/`等文件，重新安装grub2到硬盘的主引导记录【MBR】里面。
(这时候有个问题就是grub2安装目录是`/boot/boot/grub2/`而不是原先的`/boot/grub2`，
可以通过指定--boot-directory来解决，默认是/boot/grub2)
4. `grub2-mkconfig -o /boot/boot/grub2/grub.cfg`重新生成grub2配置文件，并拷贝相应的
device.map文件到grub2目录下即可

#心得
用u盘装grub2实在是太方便了，而且步骤也很简单，这样就可以随意的重装windous系统了，哈哈 