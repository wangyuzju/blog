---
layout: default
title: 使用 CORS 进行跨域
category: Web
tags: 
---

## CORS 协议
在浏览器的响应头里面添加`Access-Control-Allow-Origin: *`, 能够实现跨域 ajax 请求

## CORS 下的 OPTIONS 请求
[http://stackoverflow.com/questions/1256593/jquery-why-am-i-getting-an-options-request-instead-of-a-get-request](http://stackoverflow.com/questions/1256593/jquery-why-am-i-getting-an-options-request-instead-of-a-get-request)

## CORS 下的 cookie
CORS 下的请求默认不会带上 cookie，也就无法获取用户的登录信息，那么如何带上 cookie 呢？jQuery 的 ajax 请求中加上下列配置

```
$.ajax({
    type: "POST",
    ...
    xhrFields: {
        withCredentials: true
    },
    crossDomain: true,
    ...
});
```

但是报以下错误：

> XMLHttpRequest cannot load http://121.40.212.161:8000/data/design/edit?act=add&_dt=0.9176968049723655. A wildcard '*' cannot be used in the 'Access-Control-Allow-Origin' header when the credentials flag is true. Origin 'http://localhost:63342' is therefore not allowed access. 

因为浏览器的安全策略，当[允许 credentials 的时候，Access-Control-Allow-Origin 值不能是 `*`，而必须是一个指定的域名](http://stackoverflow.com/questions/19743396/cors-cannot-use-wildcard-in-access-control-allow-origin-when-credentials-flag-i)，例如上面例子必须是`http://localhost:63342`, 那么如何针对不同的访问设定对应的跨源允许域呢？

HTTP 中的 **Referer** 能很好地实现该需求，当在一个域下发起一个 CORS 请求时，HTTP 请求头的 Referer 值会自动被设置为当前页面域，此时只要在服务器端读取 Referer 值，构造出相应的 Access-Control-Allow-Origin 值即可，PHP 代码如下所示：

```
    // ****** 跨域相关 ******
    $referer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : false;

    if($referer){
        $urls = parse_url($referer);
        $url = $urls['scheme'] . '://' . $urls['host'];
        isset($urls['port']) ? $url .= ':' . $urls['port'] : '';
    }else{
        $url = '*';
    }

    header("Access-Control-Allow-Origin: " . $url);//跨域访问
    header("Access-Control-Allow-Credentials: true");
    // ****** 跨域相关 *****
```

注意对于设置了 `withCredentials` 值的请求，其响应头中的 `Access-Control-Allow-Credentials` 值必须为 `true`, 如此跨域的请求也能携带 cookie 参数了
