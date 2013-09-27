---
layout: default
title: 学习AngularJS
category: web
tags:
- AngularJS
---

# Tips
+ **$inject**。`PhoneListCtrl.$inject = ['$scope', '$http'];` 避免JS代码压缩过程中造成的$scope, $http标识符被替换导致Angular失效的问题。或者用如下的方法`var PhoneListCtrl = ['$scope', '$http', function($scope, $http) { /* constructor body */ }];`
+ **ngSrc**。直接在图片的src属性中，设置Angular变量{{var}}，当Angular没有执行的时候，浏览器会请求带{{}}的地址，造成错误

#路由和视图
## 什么是Injector
注入器本身不知道$http, $route服务的作用，甚至不知道这些服务的存在，只有在定义模块的时候进行配置，Injector的核心功能是**加载模块的定义声明**，注册在这些定义声明中提供的所有服务，当被请求的时候，将这些服务注入对应的函数，通过服务的提供者实现延迟实例化。

## 服务提供者
服务提供者是一个对象，它提供服务，并且通过暴露配置这些服务的接口，控制一个服务的创建和运行行为，举$route服务的例子来说，$routeProvider接口用于开发人员定义应用的路由规则

## 定义路由
通过在定义模块的时候，申请$routeProvider，并提供相应配置来实现，如下的例子

    angular.module('phonecat', [])
      //request API $routerProvider to be injected into config function
      .config(['$routeProvider', function($routeProvider) {
        $routeProvider
          .when('/phones', {templateUrl: 'partials/phone-list.html',   controller: PhoneListCtrl})
          .when('/phones/:phoneId', {templateUrl: 'partials/phone-detail.html', controller: PhoneDetailCtrl})
          .otherwise({redirectTo: '/phones'});
      }]);

为了配置应用的路由规则，首先为应用创建一个模块（名为phonecat，在ng-app="xx"中使用），然后通过请求的API $routerProvider注入我们的配置函数，来实现路由配置路由的配置。
**注意**：这其实也是异步加载再初始化控制函数，这里可以是因为控制函数的初始化是在内容插入之后，而“用户运营项目”中，先初始化了控制函数，再插入被控制的内容，导致无法被控制。


## 使用路由
1. "ng-app"，设定使用的模块，`<html lang="en" ng-app="phonecat">`。
2. "ng-view"，设定视图容器，`<body><div ng-view></div></body>`

## 实现控制函数

    function PhoneDetailCtrl($scope, $routeParams) {
      $scope.phoneId = $routeParams.phoneId;
    }


## Tips
+ ':xxx'，定义在:后面的变量会被提取到$routeParams对象中
