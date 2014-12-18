---
layout: default
title: 使用appium进行移动端的自动化测试
category: fe
tags: 
---



appium 的核心是一个暴露了 REST API 的 web 服务器(使用 Node.js 实现)，接受服务器的连接请求，等待命令输入，然后在移动设备上执行这些命令，并通过 HTTP 响应来返回命令的执行结果。使用 Client/Server 的模型提供了很多可能性：

1. 能够使用具备有 http client API 的各种语言来编写测试代码。
2. 将测试服务器和运行测试程序的机器放在不同的机器上
3. 仅编写测试代码然后依赖类似 Sauce Labs 之类的云服务来接收和执行测试命令

客户端通过发送 POST /session 请求，提供"[desired capabilities](http://appium.io/slate/en/master/#caps.md)"对象（一系列的 k-v ，用于告诉 Appium 服务器需要启动怎样的测试 session），服务器然后创建一个自动化测试的 session，并返回 sessionid 用于后续的测试。
 

