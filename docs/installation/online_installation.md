## 环境要求

!!! info "部署服务器要求"
    * 操作系统: 任何支持 Docker 的 Linux x64
    * CPU/内存: 4核8G
    * 磁盘空间: 50G
    * 可访问互联网
    * 防火墙或安全组需开放端口: 80、8081-8083

## 安装步骤

### 执行安装脚本

以 root 用户 ssh 登录目标服务器, 执行如下命令

```sh
curl -sSL https://github.com/KubeOperator/KubeOperator/releases/latest/download/quick_start.sh -o quick_start.sh
bash quick_start.sh
```

安装脚本默认使用 /opt/kubeoperator 目录作为安装目录，KubeOperator 的配置文件、数据及日志等均存放在该安装目录。安装过程中也可手动指定安装目录。

!!! warning "注意"
    安装完成后，安装过程中产生的离线文件可删除，离线文件存放在当前目录，目录名: kubeoperator-relase-v3.y.z
    
## 登录

安装成功后，通过浏览器访问，输入以下信息登录 KubeOperator

```
地址: http://目标服务器IP地址:80
用户名: admin
密码: kubeoperator@admin123
```

## 升级

```sh
# 升级到最新版本
koctl upgrade
# 升级到指定版本
koctl upgrade v3.x.y
```
