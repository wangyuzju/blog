---
layout: default
title: 学习SeaJS的一些笔记
category: tips
---
#实用资源
[实例解析SeaJS内部执行过程](https://github.com/seajs/seajs/issues/308)
#SeaJS是什么？[模块的加载启动](https://github.com/seajs/seajs/issues/260)
SeaJS 是一个模块加载器，模块加载器需要实现两个基本功能：

1. 实现模块定义规范，这是模块系统的基础。
2. 模块系统的启动与运行。

##1. 模块定义规范的实现
这就是 `define`，`require`，`exports`，`module` 的实现。具体实现细节，有兴趣的可以看 
SeaJS 的源码：seajs/src。可以按照 build.xml 中声明的合并顺序阅读，核心是 module.js 文件。

##2. 模块系统的启动 / 使用

    //id = "seajsnode" 有助于sea.js直接确定自身路径，提升效率
    <script src="path/to/sea.js" id="seajsnode"></script>
    <script>
      //类似于node main.js, 执行main.js中的全部代码
      seajs.use('./main');
      //加载完后执行回调函数
      seajs.use('./main', function(main){
        //@param {Object} main - main.js中exports出来的对象，
      })
      /**
       *@param {Array} [] -- jquery是在config.js中定义的alias，指定了jQuery的位置
       *@desc:回调函数会在所有加载的文件都执行完毕之后再执行
       */
      seajs.use(['jquery', './main'], function($, main) {
        $(function() {
          main.init();
        });
      });
    </script>

##简便的调用方式
当seajs.use只加载一个模块，且没有回调函数的时候，可以通过在引入sea.js文件的同时，通过对应的
attribute来引入，data-config相当于加载其配置文件，配置文件中用seajs.config()来金喜配置
data-main加载模块文件，如下所示：

    <script src="static/seajs/sea.js?t=20130306"
            data-config="test/config.js?20130306"
            data-main="test/main.js?20130306"></script>

通过引入sea.js文件，同时提供sea.js的配置文件和使用文件(在该文件内使用seajs加载模块)即可。
其**路径**为：sea.js文件的父目录——seajs目录的位置，也就是说，seajs/sea.js与test是同级别的。

#SeaJS API
##配置：seajs.config()
      //基本的alise，用于加载符合cmd规范的模块
      alias: {
        'es5-safe': 'gallery/es5-safe/0.9.3/es5-safe',
        'json': 'gallery/json/1.0.2/json',
        'jquery': 'lib/jquery-1.9.1.min.js'
      },
      plugin: ['shim'],
      //使用shim插件来将现成代码转换成CMD规范
      alias: {
        /*将jquery对应到相应的文件路径，使seajs.use('jquery') == seajs.use('lib/jquery-1.9.1.min.js')*/
        'jquery': 
         {/*shim object, src {String}源文件路径, deps {Array}指定模块依赖, 
         exports {String|Function}表示require时该返回哪个全局变量或者函数：jQuery.noConflict()*/
          src: 'lib/jquery-1.9.1.min.js',
          /*指定导出该脚本中的变量jQuery，作为参数传入到seajs.use的callback中去，
            相当于手动将脚本封装在define()中，并且module.exports=jQuery的写法*/
          exports: 'jQuery'
        }
      }

**注意**：seajs.config()不能和define写在一起：

+ 配置文件应该独立出来
+ seajs.config()貌似是一个同步函数，也就是说只有当前脚本执行完毕之后才会正式的执行
+ 它的原理更接近于setTimeout(function(){},0),所以任何在同一个文件之后，直接require()通
过seajs.config()设定的alias都是无效的。


##加载(通过define()定义的)模块：seajs.use()
`seajs.use` 理论上只用于**加载启动**，**不应该出现在 define 中的模块代码**里。在模块代
码里需要异步加载其他模块时，可以使用 require.async 方法。

##定义模块：define()

    /**
     *@desc -- define()会自动传入三个变量
     *@param {Function} require -- 通过这个函数获取指定模块的接口
     *@param {Object} exports -- 通过这个对象来对外提供接口
     *@param {Object} module -- 通过module.exports对象来提供对外接口
     *                      .
     */
    define(function(require, exports, module) {
      // 模块代码
      var a = require('./a'); 
      //exports是module.exports的一个引用，只能通过赋值来添加
      exports.foo = 'bar';
      //module.exports支持覆盖赋值
      module.exports = {
        foo: 'bar';
      }
    });

##获取指定模块的接口：require()

    define(function(require) {
    
      // 获取模块 a 的接口,在文件a.js里面exports出来的所有方法被赋值作为一个对象返回
      var a = require('./a'); 
    
      // 调用模块 a 的方法
      a.doSomething();
    });

它和seajs.use()的不同主要在于后者用于加载启动，它用与在define()中加载文件
##在模块内部对外提供接口：exports() / modlue.exports() [区别 / CMD规范][00]
[00]: https://github.com/seajs/seajs/issues/242

    define(function(require, exports, module){
    
      // 对外提供 foo 属性
      exports.foo = 'bar';
    
      // 对外提供 doSomething 方法
      exports.doSomething = function() {};
    })
    
#require()的路径
不加任何前缀，表示的是在baseurl的基础之上查找，baseurl为seajs/目录所处的pathname，
比如blog.hellofe.com/asset/，加上"./"，表示的是当前代码文件所处的目录，与seajs无关。
**与默认的无任何前缀表示当前目录不同**
