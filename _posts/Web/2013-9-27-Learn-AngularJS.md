---
layout: default
title: 学习AngularJS
category: web
tags:
- AngularJS
---

# 源代码结构
+ `/src/auto/injector.js`, 实现**Dependency Injection**

# Tips
+ **$inject**。`PhoneListCtrl.$inject = ['$scope', '$http'];` 避免JS代码压缩过程中造成的$scope, $http标识符被替换导致Angular失效的问题。或者用如下的方法`var PhoneListCtrl = ['$scope', '$http', function($scope, $http) { /* constructor body */ }];`
+ **ngSrc**。直接在图片的src属性中，设置Angular变量{{var}}，当Angular没有执行的时候，浏览器会请求带{{}}的地址，造成错误

#路由和视图
## 什么是Injector
Dependency Injector根据控制函数申明的参数（还原参数字符串值），向Angular内置的服务提供者请求相应服务的实例，并作为参数传入控制函数。

注入器本身不知道$http, $route服务的作用，甚至不知道这些服务的存在，只有在定义模块的时候进行配置，Injector的核心功能是**加载模块的定义声明**，注册在这些定义声明中提供的所有服务，当被请求的时候，将这些服务注入对应的函数，通过服务的提供者实现延迟实例化。

### 实现原理
根据实例函数的参数名，来加载该名字对应的函数，并作为参数传入。参考：

1. [Angular DI实现原理](http://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically-from-javascript)
2. [深入理解Angulay DI](https://github.com/angular/angular.js/wiki/Understanding-Dependency-Injection)(官方wiki)

### PS
Angular's dependency injector provides **services to your controller when the controller is being constructed**. The dependency injector also takes care of creating any transitive dependencies the service may have (services often depend upon other services).

Note that **the names of arguments are significant**, because **the injector uses these to look up the dependencies**.

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

# 自动初始化
当DOMContentLoaded/document.readyState=='complete'时，Angular会查找ng-app指令，如果找到

1. 加载ng-app指令关联的模块
2. 创建应用程序的injector
3. 编译ng-app下的DOM内容

# 手动初始化

    <script>
       angular.element(document).ready(function() {
         angular.module('myApp', []);
         angular.bootstrap(document, ['myApp']);
       });
    </script>
在应用根元素上添加ng-app属性会进行自动初始化，但是想在自动初始化之前做一些配置或者计算的话，需要用到**手动初始化**：如上，angular.element类似于jQ中的$，angular.bootstrap为初始化函数，将选择的元素**compile成应用程序**，他不会自动创建应用模块，因此需要手动创建myApp模块之后，再将其作为参数传入，以便Injector进行加载

# directives
通过Angular编译DOM，可以根据用户行为来改变HTML元素、元素的属性、HTML内容等，提供这些行为支持的扩展被称为directives。directive只是一个函数，编译DOM时会被自动执行。[Angular 编译原理](http://docs.angularjs.org/guide/compiler)，请参考[**可拖拽指令**的实现例子](http://docs.angularjs.org/guide/compiler)。

## 编译的过程
1. 编译：便历DOM，搜集所有的directives，返回一个映射函数
2. 隐射：将directives和一个作用域结合起来，并创建一个动态视图，作用域内发生的任何改变都会映射到视图中去，用户和视图的交互会映射到作用域中去，确保作用域的稳定。

## 开发Angular指令
### 方法一：返回Link函数
    
    angular
    .module('directives', [])    
    .directive('xx', function($document){
      // 返回一个该指令的初始化函数
      return function(scope, element, attr){
        
        // $document: 定义ng-app的元素
        
        // element: 使用了该指令的元素
            比如：<span dragable></span>，Angular在编译的时候就会将该span元素作为element参数传进来
            
        // 实际上是通过ng指令来进行事件的注册，因为是将指令加入到HTML中，因此不需要选择DOM的这一操作！
      }
    });
    
### 方法二：返回包含链接函数的对象，支持更多的配置

    angular
    .module('directives', [])
    .directive('contenteditable', function($document){
      // 返回的是包含了各种配置参数的对象
      return {
        require: "ngModel",
        link: function(scope, element, attrs, ctrl){
          // *ctrl* 为require模块的控制器，此处为NgModelController
                参考：http://docs.angularjs.org/api/ng.directive:ngModel.NgModelController#$setViewValue
                
          // View -> Model
          elm.on('bulr', function(){
            scope.$apply(function(){  
              ctrl.$setViewValue(elm.html());
            });
          });
          
          // model -> view
          ctrl.$render = function(value) {
            elm.html(value);
          };
 
          // load init value from DOM
          ctrl.$setViewValue(elm.html());
        }
      }
    })

    
