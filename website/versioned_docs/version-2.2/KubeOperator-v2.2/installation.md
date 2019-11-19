---
id: version-2.2-installation
title: 三、安装和升级 KubeOperator
original_id: installation
---

## 1 环境要求

-  最低硬件配置: 2 CPU, 8G 内存, 50G 磁盘 （推荐大小是：4核16G内存100G磁盘）
-  操作系统要求: CentOS 7.4 / 7.5 / 7.6 / 7.7 Minimal  （不支持 CentOS 8）

> 注：CentOS 7.6 Minimal ISO 下载链接：http://mirrors.cqu.edu.cn/CentOS/7.6.1810/isos/x86_64/CentOS-7-x86_64-Minimal-1810.iso
## 2 下载离线包

请自行下载 KubeOperator 完整离线包，并复制到目标机器的 /tmp 目录下。

-  下载链接: https://github.com/KubeOperator/KubeOperator/releases

> 注：KubeOperator 完整离线包大小约为 5 G。

## 3 安装 KubeOperator

``` bash
$ cd /tmp
# 解压离线包
$ tar zxvf kubeOperator-v2.1.xx-release.tar.gz
# 查看防火墙状态
$ firewall-cmd --state
# 关闭防火墙
$ systemctl stop firewalld.service
# 进入项目目录
$ cd kubeOperator-v2.1.xx-release
# 运行安装脚本
$ ./kubeopsctl.sh install
# 查看 KubeOperator 状态
$ systemctl status kubeops
```

## 4 访问 KubeOperator

KubeOperator 默认监听 HTTP 80 端口。安装完毕后，请使用浏览器登录 KubeOperator 管理控制台。

> 注：KubeOperator 默认用户名和密码为: admin / kubeoperator@admin123
> 为了保证系统的安全，请在完成登录后，点击控制台右上角的"修改密码"进行密码的重置。

## 5 升级 KubeOperator

``` bash
$ cd /tmp
# 下载新版本离线包
$ wget http://xxxxxxx.kubeOperator-v2.1.xx-release.tar.gz
# 解压离线包
$ tar zxvf kubeOperator-v2.1.xx-release.tar.gz
# 进入项目目录
$ cd kubeOperator-v2.1.xx-release
# 运行升级脚本
$ ./kubeopsctl.sh upgrade
# 查看 KubeOperator 状态
$ systemctl status kubeops
```
