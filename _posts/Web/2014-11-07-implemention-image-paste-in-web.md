---
layout: default
title: 网页实现复制系统剪切版中图片功能
category: Web
tags: 
---

使用 github 写博客的一个问题就是图片上传不太方便，于是想要做一个自己的图片服务，方便地将剪切板中的图片上传到服务器并返回一个可以使用的外部地址，以方便在博客中插入图片。只要解决了如何在网页中复制图片即可

这篇 [HTML5 JavaScript Pasting Image Data in Chrome](http://strd6.com/2011/09/html5-javascript-pasting-image-data-in-chrome/) 11年的文章就已经做到了，主要是利用了 FileReader 来加载图片内容。

+ [FilerReader](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader)
+ [如何在web应用程序中使用文件](https://developer.mozilla.org/zh-CN/docs/Using_files_from_web_applications)
+ [Reading files in JavaScript using the File APIs](http://www.html5rocks.com/en/tutorials/file/dndfiles/) - drag and drop files

## 实现参考

+ [将 dataURL 格式的图片发送给服务器]http://stackoverflow.com/questions/6850276/how-to-convert-dataurl-to-file-object-in-javascript()

## 背景技术
Blob 对象：一个Blob对象就是一个包含有只读原始数据的类文件对象.Blob对象中的数据并不一定得是JavaScript中的原生形式.**File接口基于Blob,继承了Blob的功能**,并且扩展支持了用户计算机上的本地文件.
创建Blob对象的方法有几种,可以调用Blob构造函数,还可以使用一个已有Blob对象上的slice()方法切出另一个Blob对象,还可以调用canvas对象上的toBlob方法.

>After you've obtained a File reference, instantiate a FileReader object to read its contents into memory. When the load finishes, the reader's onload event is fired and its result attribute can be used to access the file data.

FileReader includes four options for reading a file, asynchronously:

1. FileReader.readAsBinaryString(Blob|File) - The result property will contain the file/blob's data as a binary string. Every byte is represented by an integer in the range [0..255].
2. FileReader.readAsText(Blob|File, opt_encoding) - The result property will contain the file/blob's data as a text string. By default the string is decoded as 'UTF-8'. Use the optional encoding parameter can specify a different format.
3. FileReader.readAsDataURL(Blob|File) - The result property will contain the file/blob's data encoded as a data URL.
4. FileReader.readAsArrayBuffer(Blob|File) - The result property will contain the file/blob's data as an ArrayBuffer object.
