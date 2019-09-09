---
id: installation
title: 安装指南
---

## 1 ova 方式

### 1.1 下载 ova 文件

安装前请自行至百度云盘下载完整离线包:  https://pan.baidu.com/s/1FxAywjA4zJOutBvVjKFGNQ 提取码 9inf 

### 1.2 安装步骤

TBD

## 2 离线包方式

### 2.1 环境要求

最低硬件配置: 2 CPU, 4G 内存, 50G 硬盘
操作系统要求: CentOS 7.6 Minimal （必须）

### 2.2 下载离线包

安装前请自行至百度云盘下载完整离线包:  https://pan.baidu.com/s/1FxAywjA4zJOutBvVjKFGNQ 提取码 9inf 

### 2.3 安装步骤

``` bash
# 解压离线包
$ unzip kubeOperator-release-xx.zip
# 进入项目目录
$ cd kubeOperator-release
# 运行安装脚本
$ ./kubeopsctl install
# 启动 KubeOperator
$  ./kubeopsctl start
# 查看 KubeOperator 状态
$ ./kubeopsctl status
```