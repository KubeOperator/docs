我们为用户准备了可以快速部署 KubeOperator 所有组件及所需的中间件的在线安装脚本, 你可以通过该脚本部署并体验 KubeOperator 所提供的功能

!!! warning "注意"
    快速安装脚本所部署的环境仅适用于测试体验目的, 生产环境请参考本文档[「在线安装」](installation/online_installation.md)章节内容进行部署

## 部署服务器要求

!!! info "部署服务器要求"
    * 操作系统: 任何支持 Docker 的 Linux x64
    * CPU/内存: 4核8G
    * 磁盘空间: 50G
    * 可访问互联网

## 安装步骤

### 执行安装脚本

以 root 用户 ssh 登录目标服务器, 执行如下命令

```sh
curl -sSL https://github.com/KubeOperator/KubeOperator/releases/latest/download/quick_start.sh | sh
```

安装脚本默认使用 /opt/kubeoperator 目录作为安装目录，kubeoperator 的配置文件、数据及日志等均存放在该安装目录

## 登录并使用

### 登录

安装成功后，通过浏览器访问如下页面登录 KubeOperator

```
地址: http://目标服务器IP地址:80
用户名: admin
密码: kubeoperator@admin123
```

### 系统设置

#### 主机 IP 和 NTP Server

在左侧导航菜单中选择【系统设置】，默认显示系统页中。
本机 IP : 指安装 KubeOperator 机器自身的 IP。KubeOperator 所管理的集群将使用该 IP 来访问 KubeOperator。
NTP Server : 用来实现集群所有主机时间同步，默认可以为空，也可以自建或网上查找公共的 NTP Server。

![setting-1](./img/user_manual/system_management/system-1.png)

#### 凭据

点击【添加】按钮添加 password 方式的凭据。

![key-1](./img/user_manual/system_management/key-1.png)

### 添加主机

在左侧导航菜单中选择【主机】，进入【主机】页后可以看到已添加主机的详细信息，包括 IP、CPU、内存、操作系统等。
点击【添加】按钮添加主机。输入名称和 IP 地址、指定端口号、选择对应的凭据，最后点击【提交】按钮即可完成一台主机的添加。

> 注: 推荐使用全新的机器 <br/>
KubeOperator部署机不能作为kubernetes集群节点使用。

![host-1](./img/user_manual/hosts/hosts-1.png)

### 创建集群

点击【项目】菜单进入目标项目，点击【集群】TAB页的【添加】按钮进行集群的创建。
在【集群信息】里输入集群的名称，选择提供商，选择该集群所要部署的 Kubernetes 版本，选择系统架构。

![deploy-1](./img/user_manual/cluster/deploy-1.png)

![deploy-2](./img/user_manual/cluster/deploy-2.png)

![deploy-3](./img/user_manual/cluster/deploy-3.png)

![deploy-4](./img/user_manual/cluster/deploy-4.png)
