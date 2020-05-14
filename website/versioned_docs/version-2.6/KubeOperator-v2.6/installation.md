---
id: version-2.6-installation
title: 三、安装和升级 KubeOperator
original_id: installation
---

## 1 环境要求

-  最低硬件配置: 2 CPU, 8G 内存, 50G 磁盘 （推荐大小是：4 核 16G 内存 100G 磁盘）
-  操作系统要求: CentOS 7.4 / 7.5 / 7.6 / 7.7 Minimal  （不支持 CentOS 8），RedHat 7.4 / 7.5 / 7.6 / 7.7 Minimal

> 注：CentOS 7.6 Minimal ISO 下载链接：http://mirrors.cqu.edu.cn/CentOS/7.6.1810/isos/x86_64/CentOS-7-x86_64-Minimal-1810.iso

## 2 下载离线包

请自行下载 KubeOperator 完整离线包，并复制到目标机器的 /tmp 目录下。

-  下载链接: https://github.com/KubeOperator/KubeOperator/releases

> 注：KubeOperator 完整离线包大小约为 6 G。
> 如需要高速下载通道，点击右侧链接 https://jinshuju.net/f/ahRYO2。

## 3 安装 KubeOperator

``` bash
$ cd /tmp
# 解压离线包
$ tar zxvf kubeOperator-v2.6.xx-release.tar.gz
# 查看防火墙状态
$ firewall-cmd --state
# 关闭防火墙
$ systemctl stop firewalld.service
# 进入项目目录
$ cd kubeOperator-v2.6.xx-release
# 运行安装脚本
$ ./kubeopsctl.sh install
# 查看 KubeOperator 状态
$ systemctl status kubeops
```

⚠️备注:默认KubeOperator的部署机防火墙是关闭状态，若需要开启防火墙，请放行以下端口以保证KubeOperator正常使用
应用|协议类型|端口
--|:--:|--:
KubeOperator-web|TCP|80
kubeOperator-预留（升级使用）|TCP|8080-8099
kubeOperator-预留（升级使用）|TCP|8180-8199
```bash
# 启动防火墙
$ systemctl start firewalld
# 加入开机自动启动
$ systemctl enable firewalld
# 开放端口
$ firewall-cmd --zone=public --add-port=80/tcp --permanent
$ firewall-cmd --zone=public --add-port=8080-8089/tcp --permanent
$ firewall-cmd --zone=public --add-port=8090-8099/tcp --permanent
# 重新加载防火墙配置使生效
$ firewall-cmd --reload
# 查看防火墙状态
$ firewall-cmd --list-all
```
## 4 访问 KubeOperator

KubeOperator 默认监听 HTTP 80 端口。安装完毕后，请使用浏览器登录 KubeOperator 管理控制台。

> 注：KubeOperator 默认用户名和密码为: admin / kubeoperator@admin123
> 为了保证系统的安全，请在完成登录后，点击控制台右上角的"修改密码"进行密码重置。

## 5 升级 KubeOperator

请自行下载 KubeOperator 完整离线包，并复制到目标机器的 /tmp 目录下。

-  下载链接: https://github.com/KubeOperator/KubeOperator/releases

``` bash
$ cd /tmp
# 解压离线包
$ tar zxvf kubeOperator-v2.6.xx-release.tar.gz
# 进入项目目录
$ cd kubeOperator-v2.6.xx-release
# 运行升级脚本
$ ./kubeopsctl.sh upgrade
# 查看 KubeOperator 状态
$ systemctl status kubeops
```

## 6 卸载 KubeOperator

如果要卸载 KubeOperator 重新安装，首先保存并记录已创建的 K8s 集群信息，然后登录到部署机器转到 /opt/kubeoperator 目录下使用如下命令卸载。

``` bash
$ cd /opt/kubeoperator
$ ./kubeopsctl.sh uninstall

```

