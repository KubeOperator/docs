---
id: installation-source
title: KubeOperator 编译方式安装
---


### 下载离线包

请自行至百度云盘下载[数据文件](https://pan.baidu.com/s/1FxAywjA4zJOutBvVjKFGNQ) 提取码 9inf


> 注意: 文档中脚本默认均以root用户执行

```bash
$ yum update -y 
# 安装wget,git
$ yum install -y wget,git
# 下载KubeOperator
$  cd /opt/
$  git clone https://github.com/fit2anything/KubeOperator.git
# 请自行到百度网盘下载 nexus 数据文件: nexus-data.tar.gz
$ cp nexus-data.tar.gz /opt/KubeOperator/docker/nexus/
# 解压 nexus 数据文件
$ tar -zvxf nexus-data.tar.gz
```
# 运行安装脚本
```bash
$  ./kubeopsctl install
```

# 启动 KubeOperator

```bash
$  ./kubeopsctl start
```
# 查看 KubeOperator 状态
```bash
$ ./kubeopsctl status
```

