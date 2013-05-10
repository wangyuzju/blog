---
layout: default
title: SSH的一些配置
category: Tips
---
[参考配置](http://blog.sanctum.geek.nz/uses-for-ssh-config/)
#建立Alias
例如想要通过`ssh vps`来实际执行`ssh wy@hellofe.com`，则在`~/.ssh/config`文件中，加入以下配置

    Host vps
        HostName hellofe.com
        User wy
        Port 1014

注意：需要`chmod ~/.ssh/*`将所有文件都变成600的模式才能正常执行

#避免每次都输入密码
1 用ssh-keygen命令生成private/public密钥对，提示问题都用默认回答即可。（.ssh/id_rsa为私有
密钥，.ssh/id_rsa.pub为公有密钥，这在github上也用到过）
2 用ssh-copy-id命令把公钥复制到远程主机上`ssh-cody-id -i /root/.ssh/id_rsa.pub user@remotehost`
这样下次再ssh到该主机上时，就不用输入密码了。（这里居然直接将id_rsa私钥上传也可以实现无密码登录..）
(**需要chmod600 authorized_keys**才能生效)
