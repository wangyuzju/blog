---
layout: default
title: Node Web开发
tags: Books
---

#Node的优势
Node应用高性能的关键是要**快速返回事件循环**，确保服务器的利用率

#Node服务器一直运行的原理
http.createServer().listen()创建了一个实现HTTP协议的事件监听器，会使当前脚本一直处于执行
状态,所以node进程不会退出

#Node模块
模块名就是一个没有文件后缀.js的路径名，Node也支持.node后缀的二进制原生语言库

#Node模块的查找
Node会在当前目录然后往父级（逐级）查找node_modules目录（而不仅仅是当前目录）

#npm包管理器
##获取npm的帮助
`npm help <cmd>`

##查看包信息
一个npm包是包含了package.json（描述这个文件夹的结构）的文件夹，`npm view <pkg>`
可以查看该模块的package.json信息，可以通过`npm help json`来查看帮助文档。  
*\[tips:今天发现直接npm view package无效，会报错，后来发现sudo下是可以的，但是请求了不同的
ip，于是想到是不是曾经配置过npm的repo，果然在.npmrc下面，registy='xxxx'设置过了，果断改之\]*

##安装包
`npm install`会将模块安装在.node_module/路径下，`npm install -g`会统一安装在核node的
安装位置相关的位置

##列出已安装的包
`npm list`查看当前目录和父级目录中安装的module，`--global`列出-g方式安装的module,
`--long`显示扩展信息，`--parseable`显示可解析的完整路径而不是树状图

##查看修改包内容
`npm explore package`会创建一个shell，并进入package对应的目录，可以对其进行修改，然后
`npm rebuild package`来使更改生效

##更新包内容
`npm outdated [-g]`会列出可以更新的包，再调用`npm update <pkg>`就可以了

##卸载
`npm uninstall [-g]`

##开发npm包
`npm init`初始化  
`npm link`设置一个链接到源文件目录的符号链接，可以自由编辑源文件而不需要`npm rebuild <pkg>`
才生效,其使用分两个步骤

1. 将开发项目链接到node安装程序上，在项目根目录执行npm link
2. 将开发项目链接到应用中 npm link <mod>

`npm publish`就发布到npmjs.org上去了

##npm的配置
1. 通过`npm config`和`npm set/get`在命令行中设定
2. `NPM_CONFIG_`开头的环境变量来设定
3. 配置文件：`~/.npmrc`或者`<NODE_INSTALL_DIR>/etc/npmrc`来设定