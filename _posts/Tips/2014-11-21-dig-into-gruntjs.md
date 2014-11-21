---
layout: default
title: 深入浅出 GruntJS
category: fe
tags: 
---

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
