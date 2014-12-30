---
layout: default
title: 深入浅出 GruntJS
category: fe
tags: 
---

## Links
+ [http://www.html5rocks.com/en/tutorials/tooling/supercharging-your-gruntfile/](http://www.html5rocks.com/en/tutorials/tooling/supercharging-your-gruntfile/)


## 使用 load-grunt-task 来自动 loadNpmTasks
该插件会自动扫描项目的 package.json 文件，解析出配置的全部`node_modules`, 然后匹配出`grunt-`开头的全部模块，如下所示：

![load-grunt-task 工作原理示意图](http://labs.hellofe.com/upload/image/blog/3d/df/68/e3b1e3be444261358755a38abb.png)

随后自动调用 grunt.loadNpmTasks 来加载这些模块，避免在 GruntFile.js 去手动维护这些命令

```
var pattern = arrayify(options.pattern || ['grunt-*']);
var config = options.config || findup('package.json');
var scope = arrayify(options.scope || ['dependencies', 'devDependencies', 'peerDependencies']);
...
multimatch(names, pattern).forEach(grunt.loadNpmTasks);
```

## API
Grunt 在调用在 GruntFile.js 配置文件时，会自动将 grunt 作为第一个参数传入，这是全部 API 的 root scope

### grunt 基本信息相关
+ grunt.option 命令行中传入的 grunt 运行选项
+ grunt.package grunt 所在的包中 package.json 的内容
+ grunt.version === grunt.package.version grunt 的 version

### 配置
+ `grunt.initConfig === grunt.config.init `

### 创建 task 
+ `grunt.registerTask === grunt.task.registerTask`
+ `grunt.registerMultiTask === grunt.task.registerMultiTask`
+ `grunt.renameTask === grunt.task.renameTask`

### 加载 task
+ `grunt.loadTasks === grunt.task.loadTasks`
+ `grunt.loadNpmTasks ===  grunt.task.loadNpmTasks`

### 警告和错误
+ `grunt.warn === grunt.fail.warn`
+ `grunt.fatal === grunt.fail.fatal`
