---
id: version-2.0.0-installation
title: 安装 KubeOperator
original_id: installation
---

## 1 环境要求

-  最低硬件配置: 2 CPU, 4G 内存, 50G 磁盘 （推荐大小是：4核8G内存100G磁盘）
-  操作系统要求: CentOS 7.6 Minimal （推荐）

> 注：CentOS 7.6 Minimal ISO 下载链接：http://mirrors.aliyun.com/centos/7.6.1810/isos/x86_64/CentOS-7-x86_64-Minimal-1810.iso

## 2 下载离线包

请自行至百度云盘下载完整离线包，并复制到目标机器的 /tmp 目录下。

-  下载链接: https://kubeoperator-1256577600.file.myqcloud.com/release/2.0/kubeOperator-release-108.zip
-  MD5: a85a6b6096c1783609df8222723469dc

> 注：KubeOperator 完整离线包大小约为 5 G。

## 3 安装 KubeOperator

``` bash
$ cd /tmp
# 解压离线包
$ unzip kubeOperator-release-xx.zip
# 进入项目目录
$ cd kubeOperator-release
# 运行安装脚本
$ ./kubeopsctl install
# 启动 KubeOperator 
$ systemctl start kubeops
# 查看 KubeOperator 状态
$ systemctl status kubeops
```

## 4 访问 KubeOperator

KubeOperator 默认监听 HTTP 80 端口。安装完毕后，请使用浏览器登录 KubeOperator 管理控制台。

> 注：KubeOperator 默认用户名和密码为: admin / kubeoperator@admin123
