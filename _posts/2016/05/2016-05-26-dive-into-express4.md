---
layout: default
title: 深入了解 Express 框架
category: NodeJS
tags:
  - Express
  - NodeJS
---

## 1. 基础

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

app.\_router 为Router实例，决定了每个请求的行为。

## 2. app.use 
我们知道，express的middleware 和router都是通过app.use生效的，

### 2.1 middleware
所有的express middleware，都是一个 `(req, res, next) => { ... next(); }` 结构的函数，
调用app.use(middleware)的时候，实际上是 app.\_router.use('/', middleware)。
 
    
### 2.2 路由
按照`express.Router()`声明的路由本质上也是middleware， 通过 `app._router.use('/', routerN)`
挂载到app.\_router对象。

#### 2.2.1 路由内部的派发
看一个实际的例子

```js
var router = express.Router();

router.get('/all', (req, res, next) => {})

```
router.HTTP\_VERBS 实际上调用了 router.route(HTTP\_VERBS)。

假如在 user 相关的 Router routerU 上注册一个路由 `routerU.get('/test', fn)`, 过程如下：

1. 创建一个和路径 `/test` 相关的 Route 实例 routeT
2. 在routeT.stack 中插入一个新建的 路径为 '/', method 为 'GET' 的LayerFn
2. 创建一个和路径 `/test` 相关的 Layer 实例 layerT, layerT 的 handle 被设置为 routeT.dispatch，
将layerT push 到routerU.stack 中


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
                |- stack // router 的stack
                    |-Layer // Layer for router
                        |-name: "bound dispatch"
                        |-handle: route.dispatch
                        |-route: Route // users Route 具体的一条规则
                            |-path: "/register"
                            |-stack // router 的stack
                                |-Layer // Layer for route
                                    |- handle  *function (req, res, next) { return res.json('xxx') }*
                                    |- regexp: /^\/&/

```

![示例图2](http://labs.hellofe.com/upload/image/blog/5b/91/73/5b10c9eba4357a1445b5e3119d.png)


注意：node-inspector 在 node v6.2 下有bug，调试异步回调的时候出现 [**Internal Error: Illegal Access**](https://github.com/node-inspector/node-inspector/issues/864) 的报错，
将node版本切换到 v5.0 之后，就可以正常调试了
