---
layout: default
title: 学习使用Kineticjs（Canvas类库）
category: tips
---
  由于采用SVG方案（Raphaeljs）在IPAD上的展示效果并不好，绘图耗时太大（600ms，5\*1000个点），
决定对比一下Canvas方案，找了（Kineticjs），经过测试，同等绘图在IPAD上时间降低到了仅有80ms
左右，**对于复杂图形曲线，Canvas才是王道**。本文简单记录在学习使用Kineticjs过程中的一些认识和心得。

#工作原理图
Kinetic stages are made up of user defined layers. Each layer has two canvas
renderers, a scene renderer and a hit graph renderer. The scene renderer is what
you can see, and the hit graph renderer is a special hidden canvas that's used for 
high performance event detection. Each layer can contain shapes, groups of shapes,
or groups of other groups. The stage, layers, groups, and shapes are virtual nodes, 
similar to DOM nodes in an HTML page. Here's an example Node hierarchy:  
Kinetic stages由用户定义的layers组成，每一个layer具有两个canvas渲染引擎，一个可见的场景
解析引擎，一个高性能事件检测的碰撞引擎，（在DOM中，每一个layer对应一个背景色透明的canvas元素
stages作为外层容器将所有add到其中的layer进行叠加。）每一个layer作为独立的Canvas元素，可以包含形状，
形状组合，组合的组合，其结构图可以图下所示  
<code style="white-space: pre-wrap;">
               Stage
                 |
          +------+------+
          |             |
        Layer         Layer
          |             |
    +-----+-----+     Shape
    |           |
  Group       Group
    |           |
    +       +---+---+
    |       |       |
 Shape   Group    Shape
            |
            +
            |
          Shape
</code>

#Kinetic.Path
能够根据提供的SVG String来绘制路径，方便复用Rapheal中的代码

#Kinetic.Text
直接使用文字来绘制坐标值，在我的项目中消耗了30ms之间，而绘制Grid和仅需要10ms，因此，将文字
作为HTML元素来进行控制，不采用原生的Text。

#碰到的问题
##无法通过context.fillText动态写入 / 无法使用原生API
因为在回调函数中，立即进行了stage.draw(),导致通过脚本写入的东西都会消失，（原理估计是Kinect
在draw()或者初始化时，不支持原声的Canvas API，而是完全通过Kinect的API来绘制）这也解释了之前
碰到的用Canvas默认的API绘制coordnate无效的原因。
**果然**，用setTimeout(fn, 0)或者将代码加到stage.add(layer)之后就可以了！
**总结**:只有stage.add(layer)之后，才是真正的在DOM中创建CANVAS元素，之后才能利用CanvasAPI
来进行操作，其他的调用Kinetic的操作都只是写入一些配置文件。

##对layer绑定click事件无效
Kinetic中的事件是由hit graph render实现检测的，对于layer，只能识别出该层上的元素上发生的
点击事件。由于整个stage是由多个layer叠加而成的，因此对于某一层上空白区域的点击，是不会触发
该层上的点击事件的。
