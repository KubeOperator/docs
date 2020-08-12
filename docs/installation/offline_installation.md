## 环境要求

!!! info "部署服务器要求"
    * 操作系统: 任何支持 Docker 的 Linux x64
    * CPU/内存: 4核8G
    * 磁盘空间: 50G

## 下载安装包

请自行下载 KubeOperator 最新版本的离线安装包，并复制到目标机器的 /tmp 目录下

!!! tip ""
    安装包下载链接: https://github.com/KubeOperator/KubeOperator/releases

## 解压安装包

以 root 用户 ssh 登录到目标机器, 并执行如下命令

```sh
cd /tmp
# 解压安装包
tar zxvf KubeOperator-release-v3.x.y.tar.gz
```

## 执行安装脚本

```sh
# 进入安装包目录
cd KubeOperator-release-v3.x.y
# 运行安装脚本
/bin/bash install.sh
# 等待安装脚本执行完成后，查看 KubeOperator 状态
koctl status
```

安装成功后，通过浏览器访问，输入以下信息登录 KubeOperator
```
地址: http://目标服务器IP地址:80
用户名: admin
密码: kubeoperator@admin123
```

## 升级

```sh
# 进入项目目录
cd KubeOperator-release-v3.x.y
# 运行安装脚本
koctl upgrade
# 查看 KubeOperator 状态
koctl status
```
