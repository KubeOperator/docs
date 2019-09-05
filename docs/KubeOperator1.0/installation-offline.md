---
id: installation-offline
title: KubeOperator 离线包方式安装
---


### 下载离线包

请自行至百度云盘下载[数据文件](https://pan.baidu.com/s/1FxAywjA4zJOutBvVjKFGNQ) 提取码 9inf

# 解压离线包

```bash
$ unzip kubeOperator-release-xx.zip
# 进入项目目录
$ cd kubeOperator-release
```

# 运行安装脚本
```bash
$ ./kubeopsctl install
```
# 启动 KubeOperator
```bash
$  ./kubeopsctl start
```
# 查看 KubeOperator 状态
```bash
$ ./kubeopsctl status
```