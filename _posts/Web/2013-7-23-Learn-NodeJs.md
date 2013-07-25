---
layout: default
title: NodeJS学习笔记
category: web
tags: 
  NodeJS
---

#console最大输出3层
今天打算实现一个nodejs的脚本，用于将项目中不再使用的图片清理出去，在用console.log查看输出结果的时候，发现深层的目录直接输出为[object]，开始还以为是递归程序出问题了，排查了下发现程序并没有出现问题。观察输出的格式终于得道了：当一个对象过深时，不再自动展开该对象内容，而是**直接输出对象的类型替代**
