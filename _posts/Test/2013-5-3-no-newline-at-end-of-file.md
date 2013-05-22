---
layout: default
title: No newline at end of file
category: Test
---
今天用gitk查看提交的项目时，发现了所有文件后都有`\No newline at end of file`，让我想起了
之前用vim和eclips的时候碰到的问题：vim默认在文件最后自动添加换行符，而eclips默认不会自动
添加，导致出错，应该设置成自动加上换行符。于是在intellij里面勾选
`ensure line feed at file end on save`，需要注意的是，intellij不会自动将原先不带换行符
的文件自动加上换行符，只有新建的文件或者手动添加或末尾的换行符时，才会在保存时自动添加
