---
layout: default
title: window 对象上的只读属性
category: fe
tags: 
---

在对封装 localStorage 的库进行单元测试的时候，为了模拟 localStorage 不可以用的情况，想到了把 localStorage 进行复写来模拟 localStorage 不可用的情况，但是跑了单元测试才发现复写 localStorage 并没有生效，因为 **localStorage** 是 window 对象上的一个只读属性。


于是用下面的程序对 window 对象上的只读属性进行了筛选


{%highlight javascript%}
(function(){
    var i = 0,
        ri = 0,
        wi = 0,
        readOnly = [],
        writeAble = [];

    for(var k in window){
        i++;
        k !='location' && k != 'console' && (window[k] = '__');

        if( window[k] === '__' ){
            writeAble.push(k);
            wi++;
        }else{
            readOnly.push(k);
            ri++;
        }
    }

    console.log('--- read only ---');
    console.log(readOnly.slice(0,80));
    console.log(readOnly.slice(80));
    console.log('--- write able ---');
    console.log(writeAble);
    console.log('total:' + i, ' read:' + ri, ' write:' wi);
})();
{%endhighlight%}

<script>
var testAsignWindowProp = function(){
        var i = 0,
            ri = 0,
            wi = 0,
            readOnly = [],
            writeAble = [];

        for(var k in window){
            i++;
            k !='location' && k != 'console' && (window[k] = '__');

            if( window[k] === '__' ){
                writeAble.push(k);
                wi++;
            }else{
                readOnly.push(k);
                ri++;
            }
        }

        console.log('--- read only ---');
        console.log(readOnly.slice(0,80));
        console.log(readOnly.slice(80));
        console.log('--- write able ---');
        console.log(writeAble);
        console.log('total:' + i, ' read:' + ri, ' write:' + wi);
}
</script>

<a href="javascript:testAsignWindowProp();"> 打开 console ， 点我查看测试结果</a>

以上：

+ 放在闭包里面是为了避免 i，deleted 对象挂载到 window 上而在后面的遍历中被删除
+ 重写 location 页面会被跳转
+ 重写 console 就无法输出有用的信息了

最终：

+ 只读的属性如下所示，共102（104 - console - location）项，
![只读的属性](http://labs.hellofe.com/upload/image/blog/b9/f1/40/7f9677aa691c1ca68317f7015b.png)

+ 可写的属性如下所示，共75 (73 + console + location) 项
![可写的属性](http://labs.hellofe.com/upload/image/blog/f0/f1/f0/076ef815a9a7214d668cdcabb0.png)

## 总结
window 对象上可访问到的属性远不止（102+75 = 177）项这么多，只是通过 `for ... in` 的方法只能遍历出来这些属性，而实际上通过 <a  href="javascript:alert(Object.getOwnPropertyNames(window).length);"> Object.getOwnPropertyNames(window) </a> 方法获取到的 window 上的属性有 500 项目之多
