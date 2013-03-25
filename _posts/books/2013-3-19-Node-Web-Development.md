---
layout: default
title: Node Web开发 / Node.js开发指南
tags: Books
---
#前言
图书馆里来了两本关于Node.js的新书，于是果断借过来看了一下，《Node.js开发指南》是国人编著的，
因此和《Node Web开发》有很多类似的内容，索性将两者的读书笔记写在一起好了

#Node的优势
Node应用高性能的关键是要**快速返回事件循环**，确保服务器的利用率  
Node不适合计算密集型的程序，单用户多任务型应用，逻辑十分复杂的事务，Unicode和国际化

#Node服务器一直运行的原理
http.createServer().listen()创建了一个实现HTTP协议的事件监听器，会使当前脚本一直处于执行
状态,所以node进程不会退出

#Node模块
模块名就是一个没有文件后缀.js的路径名，Node也支持.node后缀的二进制原生语言库

#Node模块的加载
Node.js的模块可以分为两大类，一类是核心模块，一类是文件模块。
##核心模块
是Node.js标准API中提供的模块，如`fs`，`http`，`net`等，这些都已经编译成两二进制代码，拥有
最高的加载优先级
##文件模块
存储为单独的文件（文件夹），Node.js会分别试图加上`.js`,`.json`,`.node`扩展名
##加载顺序
1. 如果是核心模块，直接加载
2. 如果是以`/` `./` `../`等开头的，按路径加载查找相应的模块
3. 查找当前目录和父级目录的`node_modules`文件夹下相应的模块，直至找到为止

也就是说我有一个hello的包，可以将其放在`node_modules/`文件夹下，通过`require('hello')`
来加载，也可以直接放在当前目录下，通过`require('./hello')`来加载，效果是一样的

#Node.js包
Node.js包是一个目录，包含一个JSON格式的包说明文件`package.json`，具有以下特性

+ `./package.json` \[必须的，其余都是推荐的\]
+ `./bin/`下面存放二进制文件
+ `./lib/`下面存放js文件
+ `./doc/`下面存放文档
+ `./test/`下面存放单元测试

实例：创建`hello`目录，并且在hello/lib/interface.js中写入

    module.exports = function(){ 
      console.log("hello world!") 
    }

然后，在`hello/package.json`中写入

    {
      "main": "./lib/interface.js"
    }
    
这样，就可以在与hello同级的目录中，调用`require('./hello')`来加载`hello/lib/interface.js`
这个模块了，注意，这里`./hello`中的`./`必须要加，否则应该将hello模块放到node_modules文件夹下

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
###`npm init`初始化  
###`npm link`设置一个链接到源文件目录的符号链接，可以自由编辑源文件而不需要`npm rebuild <pkg>`
才生效,其使用分两个步骤

1. 将开发项目链接到node安装程序上，在项目根目录执行npm link
2. 将开发项目链接到应用中 npm link <mod>

###`npm publish`就发布到npmjs.org上去了

##npm的配置
1. 通过`npm config`和`npm set/get`在命令行中设定
2. `NPM_CONFIG_`开头的环境变量来设定
3. 配置文件：`~/.npmrc`或者`<NODE_INSTALL_DIR>/etc/npmrc`来设定