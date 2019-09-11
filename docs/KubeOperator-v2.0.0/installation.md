---
id: installation
title: 安装指南
---

## 1 ova 方式安装

### 1.1 下载 ova 文件

请自行至百度云盘下载 ova 文件。

-  地址：https://pan.baidu.com/s/1FxAywjA4zJOutBvVjKFGNQ
-  提取码： 9inf 

### 1.2 安装步骤

TBD

## 2 离线包方式安装

### 2.1 环境要求

-  最低硬件配置: 2 CPU, 4G 内存, 50G 磁盘 （推荐大小是：4核8G内存100G磁盘）
-  操作系统要求: CentOS 7.6 Minimal （必须）

> 注：CentOS 7.6 Minimal ISO 下载链接：http://mirrors.aliyun.com/centos/7.6.1810/isos/x86_64/CentOS-7-x86_64-Minimal-1810.iso

### 2.2 下载离线包

请自行至百度云盘下载完整离线包。

-  地址：https://pan.baidu.com/s/1FxAywjA4zJOutBvVjKFGNQ
-  提取码： 9inf 

### 2.3 安装步骤

``` bash
# 解压离线包
$ unzip kubeOperator-release-xx.zip
# 进入项目目录
$ cd kubeOperator-release
# 运行安装脚本
$ ./kubeopsctl install
# 查看 KubeOperator 状态
$ systemctl status kubeops
# 启动 KubeOperator 
$ systemctl start kubeops
# 停止 KubeOperator 
$ systemctl stop kubeops
```

### 2.4 访问 KubeOperator

KubeOperator 默认监听 HTTP 80 端口。安装完毕后，请使用浏览器登录 KubeOperator 管理控制台。

> 注：KubeOperator 默认用户名和密码为: admin / kubeoperator@admin123

