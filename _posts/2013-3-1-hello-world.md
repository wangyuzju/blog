---
layout: default
title: 关于github Pages和jekyll
---

#建立自己的博客系统
##基本教程
{{ page.date | date_to_string }}  
参照了[阮一峰](http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html)的教程，总结步骤如下：  
>+ 新建一个git仓库，并且切换的gh-pages分支，只有该分支中的页面才会生成网页文件
>+ 根目录下新建jekyll的配置文件`_config.yml`，baseurl:/blog *将来位于github上的repo名*
>+ 创建模板文件`_layouts`文件夹下
>+ 创建正文文件`_posts`文件夹下，文件命名格式为**年-月-日-标题.后缀**
>+ 创建默认页面index.html/index.md，可以在其中引用正文
>+ git push remote gh-pages提交到github上，就可以通过wangyuzju.github.com/blog访问了

---
##关于本地调试
只要在根目录下面jekyll --server就会根据`_config.yml`配置在4000端口提供服务，
比如访问127.0.0.1:4000/blog/index.html就可以访问到主页面，有几点需要注意：  
+ 每次调用jekyll --server都是基于当前文件提供web服务，文件的变化不会自动刷新服务器文件
+ 直接调用jekyll会将页面生成到\_sites文件夹下面，由于其他静态文件和路径设置的原因，在调试中并没有什么特别的意义
---

##一些目标
+ 全面利用CoffeeScript,LESS等技术，利用NODE实现代码自动部署
+ 将我的个人博客打造成为一个响应式的网页
+ 考虑做一个DailyDone性质的模块，整合到个人博客中
+ 主要用MarkDown进行创作，**[这篇教程](http://ux.etao.com/posts/620#main)**非常不错
>+ 反撇号\`包裹成为代码片段，或者行首缩进4空格
>+ 使用\\来对特殊字符进行转义
