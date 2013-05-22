---
layout: default
title: IDEA创建File Watcher来自动编译CoffeeScript
category: test
---
#创建File Watcher
[官方文档](http://www.jetbrains.com/idea/webhelp/transpiling-coffeescript-to-javascript.html)
1. 从JetBrains plugin repository安装File Watcher插件，并重启
2. 找到设置中的File Watchers选项，添加相应的需求并指定程序
3. 勾选Immediate file synchronization，当文件发生变化时会自动编译，否则只有执行保存操作才会编译

注意：设置Output Path时，使用IDEA变量时注意，ProjectFileDir和ModuleFileDir是不一样的，根据
是Project还是Module来使用，不然不会生效（虽然在变量预览里面看是一样的）

#项目实践
##注意事项
+ File Watcher内的Output Paths设定并不好用，直接将输出目录通过**调用程序的参数**传入就好
+ 设定show cansole选项为Always，会显示调用程序的完整语句，便于调试
+ File Type选项确定监测文件类型
+ Scope确定监测范围
+ Working Directory选项确定语句执行的目录

##实现coffee文件的监测
###自动编译成JS和Source Map文件
由于CoffeeScript 1.6.1之后支持sourcemap，因此不再需要预设的CoffeeScript Source Map方案，
直接适用CoffeeScirpt方案就好，设定Scope为Coffee所在文件夹，传入参数为：
`--map --compile -o $ProjectFileDir$/assets/js/  $FileName$`

###自动拷贝开发目录下的.coffee文件到资源目录下
由于我并没有将开发目录开放到线上环境，<del>要支持source map必须要同时将.coffee文件同时拷贝到输出
的js文件所在的目录。</del>（**注意**：`coffee -m -o`参数连用时，会自动设定source map文件中的
`"sourceRoot": "../../dev/coffee",`属性，也就是用上面的参数编译时，指向的.coffee文件
是开发目录下面的原始文件）**而dev目录在测试时是不开放的**

要解决上面的文件，就需要换成：先在开发目录下面生成js和map文件，然后执行一个脚本，将coffee文件
拷贝，js和map文件移动到线上的`/assets/js/`目录下。（这里需要监听js与map文件的产生，只好使用
nodejs来实现了。）首先取消CoffeeScript监听输出目录的设定，即在当前文件下生成js和map文件。

1. 添加自定义Watcher
2. 监听**.coffee文件**（File Type设置为coffee）
3. 执行文件为node
4. 传入参数为genProductFiles.js
5. 执行目录为$ProjectFileDir$/dev/tools

###编写genProductFiles注意事项
+ 为了实现预期效果，必须使用`coffee -cm .`的形式，切换到.coffee所在目录再调用，
不要引入路径参数和输出目录参数`-o`，不然都会添加到map文件中去而无法实现效果
