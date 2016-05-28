---
layout: default
title: 深入了解 Express 框架
category: NodeJS
tags:
  - Express
  - NodeJS
---

# 1. 基础

express 是基于nodejs的web框架，而一个传统的nodejs server 处理一个http请求的逻辑是这样的

```js
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

express 所做的，就是传入一个函数，来处理所有的请求：即 `http.createServer(app)`,
这个app函数`lib/express.js`，由`new Express()`而来，

```js
function createApplication() {
  var app = function(req, res, next) {
    app.handle(req, res, next);
  };

  mixin(app, EventEmitter.prototype, false);
  mixin(app, proto, false);

  app.request = { __proto__: req, app: app };
  app.response = { __proto__: res, app: app };
  app.init();
  return app;
}
```

`new Express()` 的时候，返回的是一个 `(req, res, next) => { app.handle(req, res, next); }`
函数，处理http模块派发的每一个请求，同时给这个对象加入了事件派发，默认的方法，并暴露request和
response的原型给app.request, app.response 属性。`init, use, route, engine, param, set, enabled,  disabled, enable, disable, all, [http_methods], render, listen` 等属性也被添加进去。

app._router 为Router实例，决定了每个请求的行为。

# 2. app.use 
    我们知道，express的middleware 和router都是通过app.use生效的，

## 2.1 middleware
    所有的express middleware，都是一个 `(req, res, next) => { ... next(); }` 结构的函数，
调用app.use(middleware)的时候，实际上是 app._router.use('/', middleware)。
    按照`express.Router()`声明的路由比如users, admin, ...本质上也是middleware，也被
`app._router.use('/', users)` 进行定义。    
    

## 2.2 路由
    大部分的路由，是一个个Router实例，其本质上也是middleware, 通过 `app._router.use('/', routerN)`
挂载到app._router对象。


3. app._router.use(path, fn)
    对每一个fn, 创建一个layer，`new Layer(path, opt_option, fn)`，然后将该layer push到当前Router的stack中去。
举例来说

```
    app._router.stack
        |-Layer
        |-Layer // jsonParser middleware
            |-name: "jsonParser"
            |-handle *function jsonParser*
        |...
        |- Layer // users router
            |-name: "router"
            |-handle: router // users router 的实例
                |- stack
                    |-Layer
                        |-name: "bound dispatch"
        

```

![示例图](http://labs.hellofe.com/upload/image/blog/bd/24/6b/efc5d1f1d9736a581f8444b153.png)

注意：node-inspector 在 node v6.2 下有bug，调试异步回调的时候出现 [**Internal Error: Illegal Access**](https://github.com/node-inspector/node-inspector/issues/864) 的报错，
将node版本切换到 v5.0 之后，就可以正常调试了

4. app.handle => app._router.handle
    app._router.handle 是处理每一个请求的入口，

5. 
    可以把每一个express的中间件看成是一个挂载在 '/' 目录

 
3. 

app.use 是express中最重要的方法，

3. 

    

3. 

3. 

3.
